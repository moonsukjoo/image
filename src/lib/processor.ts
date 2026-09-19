import imageCompression from 'browser-image-compression';
import { jsPDF } from 'jspdf';
import heic2any from 'heic2any';
import * as pdfjsLib from 'pdfjs-dist';
import { FileItem, AppSettings } from '../types';

export interface ImageProcessor {
  compress(file: File, quality: number, onProgress: (p: number) => void): Promise<Blob>;
  convert(file: File, format: string, onProgress: (p: number) => void): Promise<Blob>;
  resize(file: File, width: number, height: number, format: string, quality: number, onProgress: (p: number) => void): Promise<Blob>;
  convertPdfToImages(file: File, format: string, resolution: string, onProgress: (p: number) => void): Promise<{name: string, blob: Blob}[]>;
}

class ClientImageProcessor implements ImageProcessor {
  async convertPdfToImages(file: File, format: string, resolution: string, onProgress: (p: number) => void): Promise<{name: string, blob: Blob}[]> {
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    }

    onProgress(10);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const results: {name: string, blob: Blob}[] = [];

    let scale = 1.5; // standard clear
    if (resolution === 'low') scale = 1.0;
    if (resolution === 'high') scale = 2.0;

    for (let i = 1; i <= numPages; i++) {
      onProgress(10 + Math.round(((i - 1) / numPages) * 80));
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) throw new Error('Canvas context failed');
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Fill white background for JPEG
      if (format === 'image/jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({ canvasContext: context, viewport } as any).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b); else reject(new Error('Canvas to Blob failed'));
        }, format, format === 'image/jpeg' ? 0.85 : undefined);
      });

      const ext = format === 'image/jpeg' ? 'jpg' : 'png';
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      results.push({ name: `${baseName}_page_${i}.${ext}`, blob });
    }

    onProgress(100);
    return results;
  }

  async compress(file: File, quality: number, onProgress: (p: number) => void): Promise<Blob> {
    let inputFile = file;
    if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      onProgress(5);
      try {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        const blob = Array.isArray(converted) ? converted[0] : converted;
        inputFile = new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (e) {
        console.warn("HEIC conversion failed", e);
      }
    }

    const originalSizeMB = inputFile.size / (1024 * 1024);
    const options = {
      maxSizeMB: Math.max(0.01, originalSizeMB * (quality / 100)),
      maxWidthOrHeight: 4096,
      useWebWorker: true,
      onProgress: (p: number) => onProgress(Math.max(10, p)),
    };
    return await imageCompression(inputFile, options);
  }

  async convert(file: File, format: string, onProgress: (p: number) => void): Promise<Blob> {
    let inputFile = file;
    const lowerName = file.name.toLowerCase();
    
    // HEIC conversion support
    if (lowerName.endsWith('.heic') || lowerName.endsWith('.heif')) {
      onProgress(10);
      try {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        const blob = Array.isArray(converted) ? converted[0] : converted;
        inputFile = new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (e) {
        throw new Error('HEIC 형식을 읽을 수 없습니다.');
      }
    }

    // 1. If same format (e.g. PNG -> PNG, JPG -> JPG) and no transformation requested, preserve original without inflating
    const isOriginalPng = lowerName.endsWith('.png') || inputFile.type === 'image/png';
    const isOriginalJpg = lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg') || inputFile.type === 'image/jpeg';
    const isOriginalWebp = lowerName.endsWith('.webp') || inputFile.type === 'image/webp';

    if (format === 'image/png' && isOriginalPng) {
      onProgress(100);
      return inputFile;
    }
    if (format === 'image/jpeg' && isOriginalJpg) {
      onProgress(100);
      return inputFile;
    }
    if (format === 'image/webp' && isOriginalWebp) {
      onProgress(100);
      return inputFile;
    }

    onProgress(30);
    await new Promise(r => setTimeout(r, 10)); // Allow UI to breathe
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(inputFile);
      
      img.onload = async () => {
        try {
          onProgress(50);
          URL.revokeObjectURL(url);
          
          let targetWidth = img.width || 800;
          let targetHeight = img.height || 800;

          // Cap abnormal dimension explosion for BMP and GIF
          // (BMP is uncompressed 24-bit raw: a 4000x3000 img is 36MB raw data! We cap BMP at max 2048px)
          if (format === 'image/bmp' || format === 'image/gif') {
            const maxDim = 2048;
            if (targetWidth > maxDim || targetHeight > maxDim) {
              const ratio = Math.min(maxDim / targetWidth, maxDim / targetHeight);
              targetWidth = Math.round(targetWidth * ratio);
              targetHeight = Math.round(targetHeight * ratio);
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('캔버스를 생성할 수 없습니다.'));
          
          if (format === 'image/jpeg' || format === 'image/bmp') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          onProgress(80);
          
          // Lossy formats use 0.85 quality to maintain visually pristine clarity without ballooning
          const isLossy = format === 'image/jpeg' || format === 'image/webp';
          const quality = isLossy ? 0.85 : undefined;

          // Helper to get blob from canvas
          const getCanvasBlob = (mime: string, q?: number) => {
            return new Promise<Blob | null>((res) => canvas.toBlob(res, mime, q));
          };

          let resultBlob = await getCanvasBlob(format, quality);

          // If browser does not support image/bmp or image/gif natively in canvas.toBlob,
          // or if result is null, fallback gracefully
          if (!resultBlob) {
            resultBlob = await getCanvasBlob('image/png');
          }

          if (!resultBlob) {
            return reject(new Error('해당 형식으로의 변환을 현재 브라우저가 지원하지 않습니다.'));
          }

          // Anti-inflation for PNG:
          // Browser native canvas.toBlob('image/png') uses fastest/lowest Deflate compression level (no filtering),
          // which can inflate a 3MB PNG into 21MB! If PNG output is unexpectedly huge compared to original,
          // run optimized compression to maintain reasonable size.
          if (format === 'image/png' && resultBlob.size > inputFile.size * 1.3 && resultBlob.size > 2 * 1024 * 1024) {
            try {
              const compressedPng = await imageCompression(new File([resultBlob], 'temp.png', { type: 'image/png' }), {
                maxSizeMB: Math.max(1, (inputFile.size / (1024 * 1024)) * 1.1),
                maxWidthOrHeight: 3840,
                useWebWorker: true,
                fileType: 'image/png'
              });
              if (compressedPng.size < resultBlob.size) {
                resultBlob = compressedPng;
              }
            } catch (err) {
              console.warn('PNG optimization fallback', err);
            }
          }

          onProgress(100);
          resolve(resultBlob);
        } catch (err: any) {
          reject(err);
        }
      };
      
      img.onerror = () => reject(new Error('이미지를 로드할 수 없습니다.'));
      img.src = url;
    });
  }

  async resize(file: File, width: number, height: number, format: string, quality: number, onProgress: (p: number) => void): Promise<Blob> {
    let inputFile = file;
    
    if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      onProgress(10);
      try {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        const blob = Array.isArray(converted) ? converted[0] : converted;
        inputFile = new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
      } catch (e) {
        throw new Error('HEIC 형식을 읽을 수 없습니다.');
      }
    }

    onProgress(30);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(inputFile);
      
      img.onload = () => {
        onProgress(50);
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        
        canvas.width = Math.max(1, Math.round(width));
        canvas.height = Math.max(1, Math.round(height));
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('캔버스를 생성할 수 없습니다.'));
        
        if (format === 'image/jpeg' || format === 'image/bmp') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        onProgress(80);
        
        const q = (format === 'image/jpeg' || format === 'image/webp') ? (quality / 100) : undefined;

        canvas.toBlob((blob) => {
          onProgress(100);
          if (blob) resolve(blob);
          else reject(new Error('해당 형식으로의 변환을 현재 브라우저가 지원하지 않습니다.'));
        }, format, q);
      };
      
      img.onerror = () => reject(new Error('이미지를 로드할 수 없습니다.'));
      img.src = url;
    });
  }
}

class ServerImageProcessor implements ImageProcessor {
  async compress(): Promise<Blob> { throw new Error('서버 처리 미구현'); }
  async convert(): Promise<Blob> { throw new Error('서버 처리 미구현'); }
  async resize(): Promise<Blob> { throw new Error('서버 처리 미구현'); }
  async convertPdfToImages(): Promise<{name: string, blob: Blob}[]> { throw new Error('서버 처리 미구현'); }
}

const processor = new ClientImageProcessor();

export const compressImage = (file: File, quality: number, onProgress: (p: number) => void) => processor.compress(file, quality, onProgress);
export const convertImage = (file: File, format: string, onProgress: (p: number) => void) => processor.convert(file, format, onProgress);
export const resizeImage = (file: File, width: number, height: number, format: string, quality: number, onProgress: (p: number) => void) => processor.resize(file, width, height, format, quality, onProgress);
export const convertPdfToImages = (file: File, format: string, resolution: string, onProgress: (p: number) => void) => processor.convertPdfToImages(file, format, resolution, onProgress);

// PDF Image helper: Optimizes resolution and compression to prevent 7MB+ file size explosion
const getImageDataUrlForPdf = async (file: File): Promise<{ dataUrl: string; width: number; height: number }> => {
  let inputFile = file;
  if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
    try {
      const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
      const blob = Array.isArray(converted) ? converted[0] : converted;
      inputFile = new File([blob as Blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
    } catch (e) {
      console.warn("HEIC conversion failed");
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(inputFile);
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      // Scale down excessively large images (>2400px) so PDF doesn't explode to 10MB+
      const maxPdfDim = 2400;
      let w = img.width;
      let h = img.height;
      if (w > maxPdfDim || h > maxPdfDim) {
        const ratio = Math.min(maxPdfDim / w, maxPdfDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context failed'));
      
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      
      // Use 0.82 quality JPEG for crisp document clarity while reducing file size by 70-80%
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', 0.82),
        width: w,
        height: h
      });
    };
    img.onerror = () => reject(new Error('이미지 로드 실패'));
    img.src = url;
  });
};

export const createPdfFromImages = async (
  files: FileItem[], 
  settings: Pick<AppSettings, 'pdfPageSize' | 'pdfOrientation' | 'pdfMargin'>,
  onProgress: (p: number) => void
): Promise<Blob> => {
  let pdf: jsPDF | null = null;

  for (let i = 0; i < files.length; i++) {
    onProgress(Math.round((i / files.length) * 100));
    await new Promise(r => setTimeout(r, 10)); // UI breathe
    
    const file = files[i].originalFile;
    const { dataUrl: base64, width: imgW, height: imgH } = await getImageDataUrlForPdf(file);

    const m = settings.pdfMargin;
    let pageW = 0;
    let pageH = 0;
    
    if (settings.pdfPageSize === 'fit') {
      pageW = imgW + (m * 2);
      pageH = imgH + (m * 2);
    }

    if (i === 0) {
      const format = settings.pdfPageSize === 'fit' ? [pageW, pageH] : settings.pdfPageSize;
      pdf = new jsPDF({ unit: 'px', format, orientation: settings.pdfOrientation, compress: true });
    } else {
      const format = settings.pdfPageSize === 'fit' ? [pageW, pageH] : settings.pdfPageSize;
      pdf!.addPage(format, settings.pdfOrientation);
    }
    
    const pdfW = pdf!.internal.pageSize.getWidth();
    const pdfH = pdf!.internal.pageSize.getHeight();
    
    const contentW = pdfW - (m * 2);
    const contentH = pdfH - (m * 2);

    const imgRatio = imgW / imgH;
    const contentRatio = contentW / contentH;
    
    let finalWidth, finalHeight;
    
    if (settings.pdfPageSize === 'fit') {
      finalWidth = imgW;
      finalHeight = imgH;
    } else {
      // 'a4' or 'letter' -> Fit within content area maintaining aspect ratio
      if (imgRatio > contentRatio) {
        finalWidth = contentW;
        finalHeight = contentW / imgRatio;
      } else {
        finalHeight = contentH;
        finalWidth = contentH * imgRatio;
      }
    }

    // Center image
    const x = m + (contentW - finalWidth) / 2;
    const y = m + (contentH - finalHeight) / 2;

    pdf!.addImage(base64, 'JPEG', x, y, finalWidth, finalHeight, undefined, 'FAST');
  }
  onProgress(100);
  return pdf!.output('blob');
};
