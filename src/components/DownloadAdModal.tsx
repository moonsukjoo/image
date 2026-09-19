import React, { useEffect, useState } from 'react';
import { Download, X, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { AdUnit } from './AdUnit';
import { formatSize } from '../lib/utils';
import { getAdSettings } from '../lib/store';

interface DownloadAdModalProps {
  isOpen: boolean;
  onCloseAndDownload: () => void;
  fileName: string;
  fileSize?: number;
  fileCount?: number;
}

export function DownloadAdModal({
  isOpen,
  onCloseAndDownload,
  fileName,
  fileSize,
  fileCount
}: DownloadAdModalProps) {
  const [countdown, setCountdown] = useState(2);
  const [canSkip, setCanSkip] = useState(true);

  // Check if download-modal ad has custom code
  const adSettings = getAdSettings();
  const modalAd = adSettings.find(a => a.id === 'download-modal');
  const hasCustomCode = modalAd?.enabled && Boolean(modalAd?.code);

  useEffect(() => {
    if (isOpen) {
      setCountdown(2);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCloseAndDownload();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onCloseAndDownload]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onCloseAndDownload}
      />

      {/* Modal dialog */}
      <div 
        role="dialog" 
        aria-modal="true" 
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-lg overflow-hidden z-10 transition-all transform scale-100 flex flex-col"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg">다운로드 준비 완료</h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  변환 성공
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                광고를 확인하신 후 <b>[닫기]</b>를 누르면 다운로드가 즉시 시작됩니다.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onCloseAndDownload}
            className="p-1.5 -mr-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors"
            title="닫고 다운로드"
          >
            <X size={20} />
          </button>
        </div>

        {/* File summary badge */}
        <div className="px-6 py-3 bg-blue-50/50 border-b border-blue-100/60 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2 truncate pr-2">
            <FileText size={15} className="text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">
              {fileCount && fileCount > 1 ? `${fileCount}개 파일 (일괄 다운로드)` : fileName}
            </span>
          </div>
          {fileSize ? (
            <span className="font-bold text-blue-700 shrink-0 bg-white px-2 py-0.5 rounded-md border border-blue-200">
              {formatSize(fileSize)}
            </span>
          ) : null}
        </div>

        {/* Sponsor / Ad content area */}
        <div className="p-6 flex flex-col items-center justify-center min-h-[220px] bg-slate-50/30">
          <div className="w-full">
            {/* Try download-modal slot first */}
            <AdUnit slot="download-modal" height="h-44" className="w-full" />
            
            {/* Fallback attractive sponsor card if no ad code registered */}
            {!hasCustomCode && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-md relative overflow-hidden text-center my-2">
                <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  SPONSOR
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 text-blue-300 flex items-center justify-center mx-auto mb-2.5">
                  <Sparkles size={20} />
                </div>
                <h4 className="font-bold text-base text-white tracking-tight">이미지 매직 (Image Magic)</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  100% 브라우저 메모리 안에서 안전하게 동작하는 무료 이미지 도구입니다. 
                  서버에 파일이 전송되지 않아 개인정보가 안전합니다.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-blue-300 font-semibold bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  무제한 무료 변환 & 압축 지원
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            창을 닫으면 컴퓨터로 저장이 시작됩니다.
          </p>

          <button
            type="button"
            onClick={onCloseAndDownload}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 group"
          >
            <Download size={17} className="group-hover:translate-y-0.5 transition-transform" />
            닫기 및 다운로드 시작
          </button>
        </div>
      </div>
    </div>
  );
}
