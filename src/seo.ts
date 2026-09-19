import { getCustomSeoOverrides } from './lib/store';
import { SupportedLocale } from './lib/i18n';

export interface SeoContent {
  title: string;
  description: string;
  keywords?: string;
  h1: string;
  subDescription: string;
  howToUse: string[];
  faq: { q: string; a: string }[];
}

export const MULTI_LANG_SEO: Record<SupportedLocale, Record<string, SeoContent>> = {
  ko: {
    'home': {
      title: '이미지 매직 - 쉽고 빠른 무료 이미지 변환 및 압축 도구',
      description: '이미지 형식 변환, 용량 압축, 크기 리사이즈, PDF 병합 및 추출을 서버 업로드 없이 웹 브라우저에서 100% 무료로 안전하게 해결하세요.',
      keywords: '이미지 변환, 이미지 압축, 사진 용량 줄이기, jpg png 변환, webp 변환, 이미지 pdf 변환, 무료 이미지 편집',
      h1: '이미지를 쉽고 빠르게 변환하세요',
      subDescription: '이미지 형식 변환부터 용량 최적화, 리사이즈, PDF 병합까지 한곳에서 해결하세요. 외부 서버로 파일이 전송되지 않아 개인정보가 안전합니다.',
      howToUse: [
        '변환하거나 압축할 이미지 또는 PDF 파일을 화면에 드래그하거나 선택하여 업로드합니다.',
        '필요에 따라 대상 포맷(PNG, JPG, WEBP 등), 압축 품질 또는 크기 옵션을 지정합니다.',
        '변환 완료 즉시 파일별로 받거나 전체 파일을 압축 ZIP으로 한 번에 다운로드합니다.'
      ],
      faq: [
        { q: '업로드한 사진이나 문서가 외부 서버에 저장되나요?', a: '전혀 저장되지 않습니다. 이미지 매직의 모든 작업은 브라우저(WebAssembly 및 Canvas) 내부 메모리에서만 처리되며, 어떤 파일도 외부 서버로 전송되지 않습니다.' },
        { q: '이용 요금이나 변환 가능한 파일 개수 제한이 있나요?', a: '회원가입, 프로그램 설치, 결제 없이 100% 무료로 무제한 이용하실 수 있습니다.' },
        { q: '아이폰(HEIC)이나 안드로이드 스마트폰에서도 지원되나요?', a: '네! PC는 물론 모바일 브라우저에서도 HEIC, JPG, PNG, WEBP, PDF 변환을 완벽하게 지원합니다.' }
      ]
    },
    'compress': {
      title: '이미지 압축 - 무료 화질 유지 용량 줄이기',
      description: 'JPG, PNG, WEBP 이미지의 화질 손실을 최소화하면서 파일 용량을 크게 줄여줍니다.',
      keywords: '이미지 압축, 사진 용량 줄이기, jpg 압축, png 압축, 이미지 최적화',
      h1: '이미지 압축 (용량 줄이기)',
      subDescription: '육안으로 구별하기 힘든 화질 저하만으로 이미지 파일의 용량을 획기적으로 줄여보세요.',
      howToUse: [
        '압축할 이미지 파일들을 업로드합니다.',
        '원하는 압축 품질(목표 용량 비율)을 슬라이더로 조절합니다.',
        '줄어든 용량을 확인하고 결과물을 다운로드합니다.'
      ],
      faq: [
        { q: '어떤 형식의 이미지를 압축할 수 있나요?', a: 'JPG, PNG, WEBP 등 대부분의 일반적인 웹 이미지 형식을 압축할 수 있습니다.' },
        { q: '용량이 얼마나 줄어드나요?', a: '원본 이미지의 상태와 설정한 압축 품질에 따라 다르지만 보통 30%~70% 정도 용량을 줄일 수 있습니다.' }
      ]
    },
    'resize': {
      title: '이미지 크기 조절 - 리사이즈, 픽셀 변경 무료 툴',
      description: '비율을 유지하거나 원하는 픽셀 해상도로 여러 이미지의 크기를 한 번에 조절하세요.',
      keywords: '이미지 리사이즈, 이미지 크기 변경, 사진 해상도 조절, 픽셀 변경',
      h1: '이미지 크기 조절 (리사이즈)',
      subDescription: '소셜 미디어나 블로그에 맞게 이미지의 가로/세로 픽셀을 일괄 조절하세요.',
      howToUse: [
        '크기를 변경할 이미지들을 업로드합니다.',
        '원하는 가로, 세로 픽셀을 입력하거나 비율(%)로 조절합니다.',
        '적용 후 다운로드합니다.'
      ],
      faq: [
        { q: '비율이 깨지지 않게 줄일 수 있나요?', a: '"원본 비율 유지" 옵션을 체크하면 가로나 세로 중 하나만 입력해도 나머지 길이가 비율에 맞게 자동 계산됩니다.' }
      ]
    },
    'pdf': {
      title: '이미지 PDF 변환 - JPG, PNG를 하나의 PDF로 병합',
      description: '여러 장의 이미지 파일을 하나의 PDF 문서로 깔끔하게 병합하세요.',
      keywords: '이미지 pdf 변환, jpg pdf 변환, 사진 pdf 합치기, png pdf 변환',
      h1: '이미지를 PDF로 병합',
      subDescription: '여러 장의 사진을 순서대로 정렬하여 하나의 PDF 문서로 만듭니다.',
      howToUse: [
        'PDF로 만들 여러 이미지 파일들을 업로드합니다.',
        '목록에서 드래그 앤 드롭으로 이미지의 순서를 정렬합니다.',
        '페이지 크기와 여백을 설정한 후 "PDF 생성" 또는 바로 다운로드를 진행합니다.'
      ],
      faq: [
        { q: 'PDF 페이지 크기를 변경할 수 있나요?', a: '네, A4, Letter, 혹은 이미지 원본 크기에 맞춤 설정이 가능합니다.' },
        { q: '가로 세로 이미지가 섞여 있어도 되나요?', a: '네, 각 이미지 비율에 맞게 페이지 중앙에 여백을 두고 배치됩니다.' }
      ]
    },
    'pdf-to-image': {
      title: 'PDF 이미지 변환 - PDF 문서 추출 및 JPG 저장',
      description: 'PDF 문서의 모든 페이지를 고화질 JPG 또는 PNG 이미지 파일로 추출하세요.',
      keywords: 'pdf 이미지 변환, pdf jpg 변환, pdf 사진 추출, pdf png 변환',
      h1: 'PDF 이미지를 추출하여 저장',
      subDescription: 'PDF의 각 페이지를 분리하여 개별 이미지 파일(JPG, PNG)로 저장합니다.',
      howToUse: [
        '추출할 PDF 문서를 업로드합니다.',
        '출력 형식(JPG/PNG)과 해상도를 선택합니다.',
        '각 페이지가 이미지로 변환되면 개별로 또는 ZIP으로 묶어 다운로드합니다.'
      ],
      faq: [
        { q: '여러 페이지를 한 번에 받을 수 있나요?', a: '네, 여러 페이지가 추출된 경우 "모두 ZIP으로 다운로드" 버튼을 통해 한 번에 묶어서 받을 수 있습니다.' },
        { q: 'PDF의 해상도를 높일 수 있나요?', a: '해상도 옵션에서 "높음"을 선택하면 글씨가 더 선명한 고화질 이미지로 추출됩니다.' }
      ]
    },
    'jpg-to-png': {
      title: 'JPG PNG 변환 - 고화질 이미지 무료 변환',
      description: 'JPG 이미지를 배경 투명화가 가능한 PNG 이미지로 무료 변환하세요. 화질 손상 없이 빠르고 안전하게 변환됩니다.',
      keywords: 'jpg png 변환, jpg to png, 이미지 포맷 변경',
      h1: 'JPG PNG 변환',
      subDescription: 'JPG 이미지를 고화질 PNG 파일로 쉽게 변환하세요.',
      howToUse: [
        'JPG 파일을 위 영역에 드래그 앤 드롭하거나 클릭하여 업로드합니다.',
        '변환 버튼을 클릭하여 PNG로 변환합니다.',
        '변환된 PNG 파일을 다운로드합니다.'
      ],
      faq: [
        { q: 'JPG와 PNG의 차이점은 무엇인가요?', a: 'JPG는 압축률이 높아 사진에 적합하고, PNG는 무손실 압축으로 텍스트나 로고, 투명 배경이 필요한 이미지에 적합합니다.' },
        { q: '여러 장을 한 번에 변환할 수 있나요?', a: '네, 여러 파일을 드래그하여 한 번에 변환하고 ZIP 파일로 묶어서 다운로드할 수 있습니다.' }
      ]
    },
    'png-to-jpg': {
      title: 'PNG JPG 변환 - 무료 이미지 용량 줄이기',
      description: 'PNG 이미지를 용량이 적은 JPG 이미지로 무료 변환하세요. 빠른 속도와 최적화된 압축을 제공합니다.',
      keywords: 'png jpg 변환, png to jpg, 용량 줄이기',
      h1: 'PNG JPG 변환',
      subDescription: '용량이 큰 PNG 이미지를 최적화된 JPG 파일로 변환하세요.',
      howToUse: [
        'PNG 파일을 위 영역에 업로드합니다.',
        '변환이 완료될 때까지 기다립니다.',
        '변환된 JPG 파일을 다운로드합니다.'
      ],
      faq: [
        { q: 'PNG를 JPG로 변환하면 화질이 떨어지나요?', a: '육안으로 구별하기 어려운 수준의 최적화된 압축을 적용하여 화질 저하를 최소화합니다.' },
        { q: '투명 배경은 어떻게 되나요?', a: 'JPG는 투명 배경을 지원하지 않으므로, 투명한 영역은 기본적으로 흰색 배경으로 채워집니다.' }
      ]
    },
    'jpg-to-webp': {
      title: 'JPG WEBP 변환 - 차세대 웹 이미지 포맷 무료 변환',
      description: '일반 JPG 이미지를 웹 로딩 속도에 최적화된 WEBP 포맷으로 변환하세요.',
      keywords: 'jpg webp 변환, 웹 최적화 이미지, webp 변환기',
      h1: 'JPG WEBP 변환',
      subDescription: 'JPG 이미지를 더 작고 빠른 WEBP 포맷으로 변환하세요.',
      howToUse: [
        'JPG 파일을 화면에 드래그하여 업로드합니다.',
        'WEBP 변환이 진행됩니다.',
        '변환된 WEBP 파일을 저장합니다.'
      ],
      faq: [
        { q: 'WEBP 포맷이 무엇인가요?', a: '구글에서 개발한 이미지 포맷으로, 기존 JPG나 PNG 대비 약 30% 이상 용량을 줄일 수 있는 차세대 포맷입니다.' }
      ]
    },
    'png-to-webp': {
      title: 'PNG WEBP 변환 - 투명 배경 지원 고효율 웹 이미지 변환',
      description: '무거운 PNG 이미지를 투명도를 유지한 채 가벼운 WEBP 이미지로 변환하세요.',
      keywords: 'png webp 변환, 투명배경 webp, 웹피 변환',
      h1: 'PNG WEBP 변환',
      subDescription: '투명도를 유지하면서 PNG를 WEBP로 가볍게 변환하세요.',
      howToUse: [
        'PNG 파일을 업로드합니다.',
        '자동으로 WEBP로 변환됩니다.',
        '파일을 다운로드합니다.'
      ],
      faq: [
        { q: 'WEBP도 투명 배경을 지원하나요?', a: '네, WEBP는 무손실 압축과 알파 채널(투명도)을 모두 지원하여 PNG를 완벽히 대체할 수 있습니다.' }
      ]
    },
    'webp-to-jpg': {
      title: 'WEBP JPG 변환 - 모든 기기에서 호환되는 이미지로 변환',
      description: '구형 기기나 소프트웨어에서 열리지 않는 WEBP 파일을 가장 널리 쓰이는 JPG로 무료 변환하세요.',
      keywords: 'webp jpg 변환, webp to jpg, 이미지 호환성',
      h1: 'WEBP JPG 변환',
      subDescription: 'WEBP 파일을 호환성이 높은 JPG 파일로 변환하세요.',
      howToUse: [
        'WEBP 파일을 업로드 영역에 드롭합니다.',
        'JPG 변환을 시작합니다.',
        '결과물을 다운로드합니다.'
      ],
      faq: [
        { q: '왜 WEBP를 JPG로 변환해야 하나요?', a: '일부 구형 웹 브라우저나 이미지 편집 프로그램에서는 WEBP를 지원하지 않기 때문에 JPG 변환이 필요할 수 있습니다.' }
      ]
    },
    'webp-to-png': {
      title: 'WEBP PNG 변환 - 투명도 유지 고화질 이미지 변환',
      description: '웹에서 다운받은 WEBP 이미지를 편집하기 쉬운 고화질 PNG 파일로 변환하세요.',
      keywords: 'webp png 변환, webp to png, 고화질 변환',
      h1: 'WEBP PNG 변환',
      subDescription: '투명도를 유지하며 WEBP를 편집하기 쉬운 PNG로 변환하세요.',
      howToUse: [
        'WEBP 파일을 업로드합니다.',
        'PNG 변환 후 다운로드합니다.'
      ],
      faq: [
        { q: '투명 배경이 유지되나요?', a: '네, 원본 WEBP에 투명 배경이 있다면 변환된 PNG에서도 투명 배경이 그대로 유지됩니다.' }
      ]
    }
  },
  en: {
    'home': {
      title: 'Image Magic - Fast, Free & Private Image Converter and Compressor',
      description: 'Convert image formats, compress file size, resize dimensions, and merge/extract PDFs securely right inside your browser without uploading to any server.',
      keywords: 'image converter, image compressor, reduce photo size, jpg to png, png to jpg, webp converter, image to pdf, free image tools',
      h1: 'Convert & Compress Images Instantly',
      subDescription: 'Fast, secure and unlimited image processing. Convert formats, optimize file sizes, resize, and handle PDFs with 100% privacy.',
      howToUse: [
        'Drag & drop or select image/PDF files to upload.',
        'Choose your desired format (PNG, JPG, WEBP), compression quality, or dimensions.',
        'Download files individually or grab all in a single ZIP bundle.'
      ],
      faq: [
        { q: 'Are my uploaded files stored on your server?', a: 'Never. All operations run strictly inside your browser memory (WebAssembly & Canvas). No files are ever sent to an external server.' },
        { q: 'Is there any fee or file limit?', a: 'It is 100% free with unlimited conversions, requiring no sign-up or installation.' },
        { q: 'Does this work on mobile phones (iOS/Android)?', a: 'Yes! It works smoothly across all modern desktop and mobile browsers, supporting HEIC, JPG, PNG, WEBP, and PDF.' }
      ]
    },
    'compress': {
      title: 'Compress Images - Reduce File Size with High Quality',
      description: 'Dramatically reduce JPG, PNG, and WEBP image file sizes while preserving visual clarity.',
      keywords: 'image compression, reduce image size, compress jpg, compress png, optimize photo',
      h1: 'Compress Images (Reduce File Size)',
      subDescription: 'Save disk space and speed up web pages with smart, high-efficiency image compression.',
      howToUse: [
        'Upload your image files.',
        'Adjust the quality slider to find the sweet spot between size and clarity.',
        'Review the reduced size and download your optimized images.'
      ],
      faq: [
        { q: 'Which formats are supported?', a: 'JPG, PNG, WEBP and other common web image formats.' },
        { q: 'How much size can I save?', a: 'Typically 30% to 70% reduction depending on the original image content and chosen quality setting.' }
      ]
    },
    'resize': {
      title: 'Resize Image - Free Online Pixel & Dimension Resizer',
      description: 'Batch resize multiple images to target pixel widths, heights, or percentage scales.',
      keywords: 'resize image, image resizer, change resolution, change photo dimensions',
      h1: 'Resize Image Dimensions',
      subDescription: 'Easily adjust image width and height for social media, blogs, or web assets.',
      howToUse: [
        'Upload images you want to resize.',
        'Enter desired width/height or adjust percentage with aspect ratio lock.',
        'Apply changes and download.'
      ],
      faq: [
        { q: 'Can I keep the original aspect ratio?', a: 'Yes, keeping "Keep Aspect Ratio" checked automatically calculates the complementary dimension.' }
      ]
    },
    'pdf': {
      title: 'Images to PDF - Merge JPG and PNG into a Single PDF',
      description: 'Combine multiple photos and graphics into a clean, formatted PDF document.',
      keywords: 'images to pdf, jpg to pdf, merge photos to pdf, png to pdf',
      h1: 'Merge Images to PDF',
      subDescription: 'Arrange photos in order and generate a high-quality PDF in seconds.',
      howToUse: [
        'Upload the images to include in your PDF.',
        'Drag and drop items to reorder pages.',
        'Set page size and margins, then click generate.'
      ],
      faq: [
        { q: 'Can I customize page sizes?', a: 'Yes, A4, US Letter, or auto-fit to image dimensions are supported.' }
      ]
    },
    'pdf-to-image': {
      title: 'PDF to Image - Extract PDF Pages as JPG/PNG',
      description: 'Convert every page of your PDF document into crisp, high-resolution image files.',
      keywords: 'pdf to image, pdf to jpg, extract pdf pages, pdf to png',
      h1: 'Extract PDF Pages as Images',
      subDescription: 'Separate PDF pages into standalone JPG or PNG images effortlessly.',
      howToUse: [
        'Upload your PDF document.',
        'Select output format (JPG/PNG) and resolution.',
        'Download individual page images or all at once in a ZIP archive.'
      ],
      faq: [
        { q: 'Can I download all pages together?', a: 'Yes, click "Download All as ZIP" to get every page bundled in one archive.' }
      ]
    },
    'jpg-to-png': {
      title: 'JPG to PNG Converter - Free & High Quality',
      description: 'Convert JPG images to transparent-ready PNG files with lossless precision.',
      keywords: 'jpg to png, convert jpg to png, image format converter',
      h1: 'JPG to PNG Converter',
      subDescription: 'Transform JPG images into crisp PNG files easily.',
      howToUse: ['Upload JPG files.', 'Click convert.', 'Download your PNG.'],
      faq: [{ q: 'Why convert JPG to PNG?', a: 'PNG supports lossless quality and transparent backgrounds.' }]
    },
    'png-to-jpg': {
      title: 'PNG to JPG Converter - Reduce Image File Size',
      description: 'Convert PNG graphics to lightweight JPG photos for fast web loading.',
      keywords: 'png to jpg, convert png to jpg, compress image',
      h1: 'PNG to JPG Converter',
      subDescription: 'Convert heavy PNGs into compact JPGs effortlessly.',
      howToUse: ['Upload PNG files.', 'Process conversion.', 'Download JPG files.'],
      faq: [{ q: 'What happens to transparent backgrounds?', a: 'Since JPG does not support alpha channels, transparent areas will default to white.' }]
    },
    'jpg-to-webp': {
      title: 'JPG to WEBP Converter - Modern Web Image Optimization',
      description: 'Convert JPG photos to modern WEBP format for smaller sizes and faster load times.',
      keywords: 'jpg to webp, convert jpg to webp, modern image format',
      h1: 'JPG to WEBP Converter',
      subDescription: 'Make your web images faster with next-gen WEBP format.',
      howToUse: ['Upload JPG files.', 'Convert to WEBP.', 'Save your files.'],
      faq: [{ q: 'What is WEBP?', a: 'A modern image format created by Google that saves ~30% more file size compared to JPG.' }]
    },
    'png-to-webp': {
      title: 'PNG to WEBP Converter - Transparent & Lightweight',
      description: 'Convert PNG images to WEBP while keeping full transparency and cutting file weight.',
      keywords: 'png to webp, transparent webp, convert png to webp',
      h1: 'PNG to WEBP Converter',
      subDescription: 'Keep transparency with significantly smaller file size.',
      howToUse: ['Upload PNG files.', 'Convert automatically.', 'Download WEBP.'],
      faq: [{ q: 'Does WEBP support transparency?', a: 'Yes, WEBP supports both lossless alpha channels and lossy compression.' }]
    },
    'webp-to-jpg': {
      title: 'WEBP to JPG Converter - Universal Compatibility',
      description: 'Convert WEBP files into universally compatible JPG images for all devices and software.',
      keywords: 'webp to jpg, convert webp to jpg, image compatibility',
      h1: 'WEBP to JPG Converter',
      subDescription: 'Open and share WEBP images anywhere as standard JPGs.',
      howToUse: ['Drop WEBP files.', 'Convert to JPG.', 'Download results.'],
      faq: [{ q: 'Why convert WEBP to JPG?', a: 'Some legacy viewers and image editing applications do not open WEBP files natively.' }]
    },
    'webp-to-png': {
      title: 'WEBP to PNG Converter - High Fidelity & Transparent',
      description: 'Turn downloaded WEBP images into editable, high-definition PNG files.',
      keywords: 'webp to png, convert webp to png, hd image converter',
      h1: 'WEBP to PNG Converter',
      subDescription: 'Preserve transparency and details when converting WEBP to PNG.',
      howToUse: ['Upload WEBP files.', 'Convert to PNG.', 'Save your file.'],
      faq: [{ q: 'Is transparency preserved?', a: 'Yes, existing transparent backgrounds remain intact in the output PNG.' }]
    }
  },
  ja: {
    'home': {
      title: 'Image Magic - 安全・高速な無料画像変換＆圧縮ツール',
      description: '画像形式の変換、容量圧縮、リサイズ、PDF結合＆抽出をブラウザ上で100%安全かつ無料で完結。サーバー送信なしで安心です。',
      keywords: '画像変換, 画像圧縮, 写真容量削減, jpg png 変換, webp 変換, 画像 pdf 変換, 無料画像編集',
      h1: '画像を簡単・スピーディに変換＆圧縮',
      subDescription: '画像のフォーマット変換から容量の最適化、リサイズ、PDF作成まで一つで完了。端末内処理だからプライバシーも安心。',
      howToUse: [
        '変換または圧縮したい画像やPDFファイルを画面にドラッグ＆ドロップします。',
        '必要に応じて変換形式(PNG, JPG, WEBP等)や圧縮品質、リサイズ寸法を設定します。',
        '完了後、個別またはZIPで一括ダウンロードします。'
      ],
      faq: [
        { q: 'アップロードした画像はサーバーに保存されますか？', a: '一切保存されません。すべての処理はお客様のブラウザメモリ内でのみ実行され、外部サーバーへ送信されることはありません。' },
        { q: '料金や枚数制限はありますか？', a: '完全無料で、会員登録や回数制限なく何枚でもご利用いただけます。' }
      ]
    },
    'compress': {
      title: '画像圧縮 - 高画質のままファイル容量を削減',
      description: 'JPG、PNG、WEBPの画質劣化を最小限に抑えながら大幅にファイルサイズを小さくします。',
      keywords: '画像圧縮, 写真容量削減, jpg圧縮, png圧縮, 画像軽量化',
      h1: '画像圧縮（ファイル容量削減）',
      subDescription: '見た目の美しさを保ったまま画像のデータ量を劇的に削減します。',
      howToUse: ['画像をアップロードします。', 'スライダーで圧縮品質を調整します。', '削減されたサイズを確認してダウンロードします。'],
      faq: [{ q: 'どのくらい容量が減りますか？', a: '元画像の状態にもよりますが、通常30%〜70%程度の容量削減が可能です。' }]
    },
    'resize': {
      title: '画像サイズ変更 - ピクセル解像度リサイズ',
      description: '比率を保ったまま複数の画像を希望のピクセル幅・高さに一括変更します。',
      keywords: '画像リサイズ, 画像サイズ変更, 解像度調整, 縦横比維持',
      h1: '画像サイズ変更（リサイズ）',
      subDescription: 'SNSやブログに最適なサイズへ簡単に一括調整できます。',
      howToUse: ['サイズ変更したい画像をアップロードします。', '横幅・高さを指定します。', '適用してダウンロードします。'],
      faq: [{ q: '縦横比を崩さずに変更できますか？', a: '「縦横比を維持」をチェックしておけば、片方を入力するだけで自動計算されます。' }]
    },
    'pdf': {
      title: '画像からPDF変換 - JPGやPNGを1つのPDFに結合',
      description: '複数の写真や画像を順番通りに1つのきれいなPDFドキュメントにまとめます。',
      keywords: '画像 pdf 変換, 写真 pdf 結合, jpg pdf まとめる',
      h1: '画像をPDFに結合',
      subDescription: '複数の写真を並び替えて高品質なPDFを作成します。',
      howToUse: ['PDFにしたい画像をアップロードします。', 'ドラッグ＆ドロップでページの順序を並び替えます。', 'PDFを作成してダウンロードします。'],
      faq: [{ q: '用紙サイズは変更できますか？', a: 'はい、A4、US Letter、または画像本来のサイズに合わせた出力が可能です。' }]
    },
    'pdf-to-image': {
      title: 'PDFから画像抽出 - 各ページを高画質JPG/PNGで保存',
      description: 'PDFドキュメントの各ページを鮮明な画像ファイルとして一括抽出します。',
      keywords: 'pdf 画像抽出, pdf jpg 変換, pdf ページ画像化',
      h1: 'PDFから画像を抽出',
      subDescription: 'PDFの全ページを個別の画像ファイルに素早く分割保存します。',
      howToUse: ['PDFファイルをアップロードします。', '形式(JPG/PNG)と解像度を選択します。', '個別またはZIPで一括保存します。'],
      faq: [{ q: '全ページを一括で保存できますか？', a: 'はい、「まとめてZIP保存」ボタンから一度にダウンロード可能です。' }]
    }
  },
  zh: {
    'home': {
      title: 'Image Magic - 安全极速的免费在线图片转换与压缩工具',
      description: '无需上传服务器，100%在浏览器本地安全完成图片格式转换、体积压缩、尺寸调整以及PDF合并与提取。',
      keywords: '图片转换, 图片压缩, 缩小图片大小, jpg转png, webp转换, 图片转pdf, 免费图片处理',
      h1: '轻松快速转换与压缩图片',
      subDescription: '一站式解决图片格式转换、体积优化、尺寸重置与PDF制作，端侧本地处理，全方位守护您的隐私安全。',
      howToUse: [
        '拖放或点击选择要处理的图片或PDF文件。',
        '按需选择目标格式（PNG, JPG, WEBP等）、压缩质量或调整尺寸。',
        '处理完成后可单独下载或一键打包下载ZIP文件。'
      ],
      faq: [
        { q: '上传的文件会被保存在服务器上吗？', a: '绝对不会。所有操作均在您本地浏览器的内存中进行，文件绝不会上传到任何外部服务器。' },
        { q: '是否有收费或使用次数限制？', a: '完全免费，无需注册账号，不限制转换数量与次数。' }
      ]
    },
    'compress': {
      title: '图片压缩 - 保持高画质大幅缩小体积',
      description: '极低画质损耗，大幅减小JPG、PNG、WEBP图片的文件大小。',
      keywords: '图片压缩, 缩小照片体积, jpg压缩, png压缩, 图片瘦身',
      h1: '图片体积压缩',
      subDescription: '肉眼几乎无损的情况下，大幅度精简图片大小，节省存储与加快网页加载。',
      howToUse: ['上传需要压缩的图片。', '滑动滑块调节目标质量。', '查看缩减大小并下载优化后的图片。'],
      faq: [{ q: '能减少多少体积？', a: '根据原图细节和质量设置，通常可减少30%至70%的文件体积。' }]
    },
    'resize': {
      title: '图片尺寸调整 - 在线快速修改像素分辨率',
      description: '按比例锁定或自定义像素宽高，快速批量调整多张图片的分辨率。',
      keywords: '图片尺寸修改, 调整像素, 改变图片大小, 保持比例缩放',
      h1: '调整图片尺寸与分辨率',
      subDescription: '轻松适配社交媒体、网页配图与博客展示的最佳尺寸。',
      howToUse: ['上传需要改尺寸的图片。', '输入期望的宽度或高度。', '应用并下载。'],
      faq: [{ q: '如何保持原图比例？', a: '勾选“保持原始比例”后，输入宽度或高度其中一项即可自动换算另一项。' }]
    },
    'pdf': {
      title: '图片转PDF - 多张JPG/PNG合并为一个PDF文档',
      description: '将多张照片按指定顺序快速合并为排版整齐的高清PDF文件。',
      keywords: '图片转pdf, jpg转pdf, 照片合并pdf, png转pdf',
      h1: '图片合并为PDF',
      subDescription: '拖动排序照片，一键生成高质量PDF文档。',
      howToUse: ['上传欲合并的图片。', '拖动调整页面先后顺序。', '设定纸张尺寸与边距后生成下载。'],
      faq: [{ q: '支持哪些页面尺寸？', a: '支持A4、US Letter及原图尺寸自适应。' }]
    },
    'pdf-to-image': {
      title: 'PDF提取图片 - PDF各页转存为高清JPG/PNG',
      description: '快速将PDF文档的每一页分割导出为独立的JPG或PNG图片。',
      keywords: 'pdf提取图片, pdf转jpg, pdf转png, pdf分割图片',
      h1: 'PDF提取为高清图片',
      subDescription: '轻松将PDF文档逐页转换为高分辨率独立图片文件。',
      howToUse: ['上传PDF文件。', '选择输出格式与清晰度。', '单页下载或一键打包ZIP下载。'],
      faq: [{ q: '支持批量下载全部页面吗？', a: '支持，点击“打包下载为ZIP”即可一次性获取所有提取页面。' }]
    }
  },
  es: {
    'home': {
      title: 'Image Magic - Conversor y Compresor de Imágenes Rápido, Seguro y Gratis',
      description: 'Convierte formatos de imagen, reduce tamaño, cambia resolución y combina/extrae PDF de forma 100% privada dentro de tu navegador.',
      keywords: 'convertidor de imagenes, compresor de imagenes, reducir tamano foto, jpg a png, png a jpg, webp a jpg, imagenes a pdf',
      h1: 'Convierte y Comprime Imágenes al Instante',
      subDescription: 'Procesamiento ilimitado y seguro. Sin subir fotos a servidores externos: privacidad total garantizada.',
      howToUse: [
        'Arrastra o selecciona las imágenes o archivos PDF.',
        'Elige el formato deseado (PNG, JPG, WEBP), calidad o dimensiones.',
        'Descarga los archivos individualmente o todos juntos en un ZIP.'
      ],
      faq: [
        { q: '¿Mis fotos se guardan en algún servidor?', a: 'Nunca. Todo se procesa estrictamente en la memoria de tu navegador local.' },
        { q: '¿Es completamente gratis?', a: 'Sí, 100% gratis y sin límites de archivos ni registros obligatorios.' }
      ]
    },
    'compress': {
      title: 'Comprimir Imágenes - Reduce el Tamaño sin Perder Calidad',
      description: 'Reduce significativamente el tamaño de archivos JPG, PNG y WEBP preservando la máxima nitidez.',
      keywords: 'comprimir imagenes, optimizar fotos, reducir peso jpg, comprimir png',
      h1: 'Comprimir Imágenes',
      subDescription: 'Ahorra espacio de almacenamiento y acelera tus páginas web con compresión inteligente.',
      howToUse: ['Sube tus imágenes.', 'Ajusta el nivel de compresión deseado.', 'Descarga tus imágenes optimizadas.'],
      faq: [{ q: '¿Cuánto peso se puede ahorrar?', a: 'Habitualmente entre un 30% y un 70% según la imagen original.' }]
    },
    'resize': {
      title: 'Redimensionar Imágenes - Cambia Píxeles y Dimensiones',
      description: 'Ajusta el ancho y alto en píxeles de varias imágenes a la vez manteniendo la proporción.',
      keywords: 'redimensionar imagen, cambiar tamano foto, ajustar pixeles',
      h1: 'Redimensionar Imágenes',
      subDescription: 'Adapta tus fotos a las medidas exactas que necesitas.',
      howToUse: ['Sube las imágenes a redimensionar.', 'Indica el ancho o alto deseado.', 'Aplica y descarga.'],
      faq: [{ q: '¿Se mantiene la proporción?', a: 'Sí, con la casilla "Mantener proporción" marcada, se calcula automáticamente.' }]
    },
    'pdf': {
      title: 'Imágenes a PDF - Unir JPG y PNG en un solo documento PDF',
      description: 'Combina múltiples fotos en un documento PDF ordenado y de alta calidad.',
      keywords: 'imagenes a pdf, unir fotos en pdf, jpg a pdf',
      h1: 'Unir Imágenes en PDF',
      subDescription: 'Ordena tus fotos y crea un PDF listo para compartir.',
      howToUse: ['Sube las imágenes.', 'Arrastra para ordenar las páginas.', 'Genera y descarga tu PDF.'],
      faq: [{ q: '¿Puedo elegir el tamaño de página?', a: 'Sí, incluye soporte para A4, Carta o ajuste al tamaño de la imagen.' }]
    },
    'pdf-to-image': {
      title: 'PDF a Imagen - Extraer páginas de PDF como JPG o PNG',
      description: 'Convierte cada página de tu documento PDF en una imagen nítida e independiente.',
      keywords: 'pdf a imagen, pdf a jpg, extraer paginas pdf, pdf a png',
      h1: 'Extraer PDF a Imágenes',
      subDescription: 'Convierte páginas completas de PDF en imágenes JPG o PNG.',
      howToUse: ['Sube el archivo PDF.', 'Selecciona formato y resolución.', 'Descarga en ZIP o de forma individual.'],
      faq: [{ q: '¿Puedo bajar todas las páginas a la vez?', a: 'Sí, usando el botón de descarga en archivo ZIP.' }]
    }
  },
  fr: {
    'home': {
      title: 'Image Magic - Convertisseur et Compresseur d’Images Gratuit & Sécurisé',
      description: 'Convertissez, compressez, redimensionnez vos images et fusionnez/extrayez des PDF en toute sécurité dans votre navigateur.',
      keywords: 'convertisseur image, compresseur image, reduire taille photo, jpg en png, png en jpg, webp, images en pdf',
      h1: 'Convertissez et Compressez vos Images Rapidement',
      subDescription: 'Traitement local ultra-rapide. Vos images ne quittent jamais votre ordinateur ou téléphone.',
      howToUse: [
        'Glissez-déposez vos fichiers image ou PDF.',
        'Sélectionnez le format désiré, la qualité ou les dimensions.',
        'Téléchargez vos fichiers individuellement ou en archive ZIP.'
      ],
      faq: [
        { q: 'Mes photos sont-elles envoyées sur un serveur ?', a: 'Non, tout est traité localement dans la mémoire de votre navigateur.' },
        { q: 'Le service est-il gratuit ?', a: 'Oui, entièrement gratuit et sans limite d’utilisation.' }
      ]
    },
    'compress': {
      title: 'Compresser Images - Réduire la taille sans perte visible',
      description: 'Réduisez le poids de vos fichiers JPG, PNG et WEBP tout en préservant leur qualité visuelle.',
      keywords: 'compresser image, reduire taille jpg, optimiser photo, compression png',
      h1: 'Compression d’Images',
      subDescription: 'Économisez de l’espace disque et accélérez le chargement de vos pages web.',
      howToUse: ['Ajoutez vos images.', 'Ajustez la qualité souhaitée.', 'Téléchargez le résultat.'],
      faq: [{ q: 'Combien d’espace peut-on économiser ?', a: 'Généralement entre 30% et 70% selon le fichier d’origine.' }]
    },
    'resize': {
      title: 'Redimensionner Images - Modifier la résolution en pixels',
      description: 'Changez la largeur et la hauteur de vos images en conservant les proportions.',
      keywords: 'redimensionner image, modifier resolution, taille pixels',
      h1: 'Redimensionnement d’Images',
      subDescription: 'Adaptez vos photos aux formats réseaux sociaux, web ou blogs.',
      howToUse: ['Importez les images.', 'Saisissez la largeur ou hauteur.', 'Téléchargez.'],
      faq: [{ q: 'Le ratio est-il préservé ?', a: 'Oui, en cochant "Conserver les proportions", le calcul se fait automatiquement.' }]
    },
    'pdf': {
      title: 'Images en PDF - Fusionner JPG et PNG en un seul PDF',
      description: 'Regroupez vos photos dans un document PDF clair et structuré.',
      keywords: 'images en pdf, jpg en pdf, fusionner photos pdf',
      h1: 'Fusionner des Images en PDF',
      subDescription: 'Ordonnez vos photos pour créer un fichier PDF parfait.',
      howToUse: ['Chargez les images.', 'Glissez pour organiser l’ordre des pages.', 'Générez et téléchargez le PDF.'],
      faq: [{ q: 'Quels formats de page sont disponibles ?', a: 'A4, Lettre US ou ajustement à l’image.' }]
    },
    'pdf-to-image': {
      title: 'PDF en Images - Extraire les pages en JPG ou PNG',
      description: 'Convertissez toutes les pages d’un PDF en fichiers images haute résolution.',
      keywords: 'pdf en images, pdf en jpg, extraire pages pdf',
      h1: 'Extraire des Images depuis un PDF',
      subDescription: 'Exportez chaque page d’un PDF sous forme d’image JPG ou PNG.',
      howToUse: ['Déposez le fichier PDF.', 'Choisissez le format de sortie.', 'Téléchargez les images.'],
      faq: [{ q: 'Puis-je télécharger toutes les pages en un clic ?', a: 'Oui, grâce au téléchargement global en archive ZIP.' }]
    }
  },
  de: {
    'home': {
      title: 'Image Magic - Schneller, sicherer & kostenloser Bildkonverter',
      description: 'Konvertieren, komprimieren und skalieren Sie Bilder sowie PDF-Dokumente 100% sicher und direkt in Ihrem Browser.',
      keywords: 'bildkonverter, bilder komprimieren, fotogroesse verringern, jpg in png, png in jpg, webp konvertieren, bilder in pdf',
      h1: 'Bilder blitzschnell konvertieren & komprimieren',
      subDescription: 'Lokale Verarbeitung im Browser für maximale Privatsphäre und rasante Geschwindigkeit ohne Server-Upload.',
      howToUse: [
        'Bilder oder PDF-Dateien per Drag & Drop ablegen.',
        'Gewünschtes Format, Kompressionsqualität oder Größe auswählen.',
        'Ergebnisse einzeln oder als ZIP-Archiv herunterladen.'
      ],
      faq: [
        { q: 'Werden meine Dateien auf Servern gespeichert?', a: 'Nein, alle Berechnungen laufen ausschließlich lokal im Speicher Ihres Browsers ab.' },
        { q: 'Ist die Nutzung kostenlos?', a: 'Ja, 100% kostenlos ohne Registrierung und ohne Begrenzung.' }
      ]
    },
    'compress': {
      title: 'Bilder komprimieren - Dateigröße bei hoher Qualität reduzieren',
      description: 'Verringern Sie die Größe von JPG-, PNG- und WEBP-Dateien drastisch bei minimalem Qualitätsverlust.',
      keywords: 'bilder komprimieren, jpg verkleinern, png komprimieren, foto optimieren',
      h1: 'Bilder komprimieren',
      subDescription: 'Sparen Sie Speicherplatz und beschleunigen Sie Webseiten mit intelligenter Bildkompression.',
      howToUse: ['Dateien hochladen.', 'Qualitätsregler einstellen.', 'Optimierte Bilder herunterladen.'],
      faq: [{ q: 'Wie viel Speicherplatz wird gespart?', a: 'Je nach Bildinhalt in der Regel zwischen 30% und 70%.' }]
    },
    'resize': {
      title: 'Bildgröße anpassen - Pixel und Auflösung ändern',
      description: 'Passen Sie Breite und Höhe mehrerer Bilder unter Beibehaltung des Seitenverhältnisses an.',
      keywords: 'bildgroesse anpassen, bild skalieren, aufloesung aendern',
      h1: 'Bildabmessungen anpassen',
      subDescription: 'Bilder perfekt für Social Media, Webseiten oder Blogs skalieren.',
      howToUse: ['Bilder auswählen.', 'Gewünschte Pixel angeben.', 'Herunterladen.'],
      faq: [{ q: 'Bleibt das Seitenverhältnis erhalten?', a: 'Ja, mit aktivierter Option wird die zweite Dimension automatisch berechnet.' }]
    },
    'pdf': {
      title: 'Bilder zu PDF - JPG und PNG in einem PDF zusammenfügen',
      description: 'Erstellen Sie aus mehreren Fotos ein sauberes und hochwertiges PDF-Dokument.',
      keywords: 'bilder in pdf, fotos zu pdf verbinden, jpg zu pdf',
      h1: 'Bilder zu PDF zusammenfügen',
      subDescription: 'Bilder anordnen und in Sekundenschnelle ein PDF generieren.',
      howToUse: ['Bilder hochladen.', 'Seiten per Drag & Drop sortieren.', 'PDF generieren und herunterladen.'],
      faq: [{ q: 'Können Papierformate gewählt werden?', a: 'Ja, A4, US Letter oder automatische Anpassung werden unterstützt.' }]
    },
    'pdf-to-image': {
      title: 'PDF zu Bildern - PDF-Seiten als JPG oder PNG extrahieren',
      description: 'Wandeln Sie jede Seite eines PDF-Dokuments in hochauflösende Bilddateien um.',
      keywords: 'pdf zu bildern, pdf in jpg, pdf seiten extrahieren',
      h1: 'PDF als Bilder extrahieren',
      subDescription: 'Extrahieren Sie einzelne Seiten als JPG oder PNG.',
      howToUse: ['PDF-Datei hochladen.', 'Ausgabeformat wählen.', 'Einzeln oder als ZIP herunterladen.'],
      faq: [{ q: 'Können alle Seiten auf einmal geladen werden?', a: 'Ja, über den "Alle als ZIP herunterladen"-Button.' }]
    }
  }
};

export function getSeoData(toolId: string | null, locale: SupportedLocale = 'ko'): SeoContent {
  const key = toolId || 'home';
  const customOverrides = getCustomSeoOverrides();
  const langPack = MULTI_LANG_SEO[locale] || MULTI_LANG_SEO['en'];
  
  let baseSeo: SeoContent = langPack[key];

  if (!baseSeo) {
    if (toolId && toolId.includes('-to-')) {
      const parts = toolId.split('-to-');
      const from = parts[0].toUpperCase();
      const to = parts[1].toUpperCase();

      if (locale === 'ko') {
        baseSeo = {
          title: `${from} ${to} 변환 - 빠르고 쉬운 무료 이미지 변환`,
          description: `${from} 이미지를 ${to} 포맷으로 안전하고 빠르게 무료 변환하세요.`,
          keywords: `${from} ${to} 변환, ${from} to ${to}, 이미지 포맷 변경`,
          h1: `${from} ${to} 변환`,
          subDescription: `${from} 이미지를 ${to} 파일로 쉽게 변환합니다.`,
          howToUse: [
            `${from} 파일을 업로드 영역에 놓습니다.`,
            `변환이 완료될 때까지 잠시 기다립니다.`,
            `변환된 ${to} 파일을 다운로드합니다.`
          ],
          faq: []
        };
      } else if (locale === 'ja') {
        baseSeo = {
          title: `${from}から${to}へ変換 - 無料・高速な画像変換`,
          description: `${from}画像を${to}形式へ安全かつスピーディに無料変換します。`,
          keywords: `${from} ${to} 変換, 画像フォーマット変換`,
          h1: `${from}から${to}への変換`,
          subDescription: `${from}ファイルを${to}形式へ簡単に変換します。`,
          howToUse: [
            `${from}ファイルをアップロードします。`,
            `変換完了まで待機します。`,
            `変換された${to}ファイルをダウンロードします。`
          ],
          faq: []
        };
      } else if (locale === 'zh') {
        baseSeo = {
          title: `${from} 转 ${to} - 极速免费在线图片转换`,
          description: `将 ${from} 图片安全快速地转换为 ${to} 格式，无需上传服务器。`,
          keywords: `${from}转${to}, ${from} to ${to}, 图片格式转换`,
          h1: `${from} 转 ${to}`,
          subDescription: `轻松将 ${from} 文件转换为 ${to} 格式。`,
          howToUse: [
            `上传 ${from} 文件。`,
            `等待转换完成。`,
            `下载转换后的 ${to} 文件。`
          ],
          faq: []
        };
      } else {
        baseSeo = {
          title: `${from} to ${to} Converter - Fast & Free Online Tool`,
          description: `Convert ${from} images to ${to} format safely and quickly in your browser.`,
          keywords: `${from} to ${to}, convert ${from} to ${to}, image format converter`,
          h1: `${from} to ${to} Converter`,
          subDescription: `Easily convert ${from} files into ${to} format with high quality.`,
          howToUse: [
            `Upload ${from} file to the drop area.`,
            `Wait for conversion to complete.`,
            `Download your converted ${to} file.`
          ],
          faq: []
        };
      }
    } else {
      baseSeo = langPack['home'] || MULTI_LANG_SEO['en']['home'];
    }
  }

  // If Korean custom override exists and current locale is Korean, apply custom overrides
  if (locale === 'ko' && customOverrides[key]) {
    return {
      ...baseSeo,
      ...customOverrides[key]
    };
  }

  return baseSeo;
}

// Backward compatibility alias for Admin console SEO editing
export const SEO_DATA = MULTI_LANG_SEO.ko;
