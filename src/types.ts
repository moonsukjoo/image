export type Category = 'home' | 'tool';

export type ToolId = 
  | 'compress' 
  | 'pdf'
  | 'pdf-to-image'
  | 'resize'
  | 'jpg-to-png' | 'png-to-jpg' | 'jpg-to-webp' | 'png-to-webp' 
  | 'webp-to-jpg' | 'webp-to-png' | 'gif-to-jpg' | 'gif-to-png' 
  | 'bmp-to-jpg' | 'bmp-to-png' | 'svg-to-png' | 'heic-to-jpg' 
  | 'heic-to-png'
  // Upcoming Tools
  | 'crop' | 'rotate' | 'flip' | 'brightness' | 'contrast' | 'dpi' 
  | 'metadata' | 'fileinfo' | 'png-bg' | 'split';

export interface ConversionSpec {
  id: ToolId;
  label: string;
  fromFormat: string;
  toFormat: string;
  ext: string;
}

export interface FileItem {
  id: string;
  originalFile: File;
  originalSize: number;
  previewUrl: string;
  status: 'idle' | 'processing' | 'success' | 'error';
  progress: number;
  resultBlob?: Blob;
  resultUrl?: string;
  resultSize?: number;
  errorMessage?: string;
  width?: number;
  height?: number;
  // Used for PDF to Image output pages
  fileName?: string;
}

export interface AppSettings {
  compressQuality: number;
  
  pdfPageSize: 'a4' | 'letter' | 'fit';
  pdfOrientation: 'p' | 'l';
  pdfMargin: number;
  
  pdfToImageFormat: 'image/jpeg' | 'image/png';
  pdfToImageResolution: 'low' | 'medium' | 'high';
  
  resizeWidth: number;
  resizeHeight: number;
  resizeKeepRatio: boolean;
  resizePercentage: number;
  resizeFormat: string;
  resizeQuality: number;
}
