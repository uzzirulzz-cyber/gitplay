import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { ZipFileInfo } from '../../types.ts';

export const AdminStorefrontImporter: React.FC = () => {
  const {
    zipInspection,
    inspectZipFile,
    inspectDefaultSampleZip,
    setCurrentView,
    addToast
  } = useCommerce();

  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoadingZip(true);
    await inspectZipFile(file, file.name);
    setLoadingZip(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.endsWith('.zip')) {
      addToast('Please drop a valid .zip file', 'exclamation-circle');
      return;
    }
    setLoadingZip(true);
    await inspectZipFile(file, file.name);
    setLoadingZip(false);
  };

  const handleInspectSample = async () => {
    setLoadingZip(true);
    await inspectDefaultSampleZip();
    setLoadingZip(false);
  };

  const currentInspectedFile = zipInspection?.files.find(
    (f) => f.path === (activeFile || zipInspection.inspectedFile)
  );

  return (
    <div className="p-4 sm:p-6 max-w-[var(--pb-content-width,1600px)] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] font-syne">
              Storefront ZIP Source-of-Truth &amp; Inspector
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30">
              VITE + REACT
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1 max-w-2xl">
            Upload or inspect your Storefront ZIP package. Inspect its structure, examine files, and ensure the frontend source-of-truth remains in sync with the Commerce OS Admin.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleInspectSample}
            disabled={loadingZip}
            className="px-3.5 py-2 rounded-xl bg-[var(--inner)] hover:bg-[var(--chip)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] transition-colors flex items-center gap-1.5"
          >
            <i className="bi bi-box-arrow-in-down text-[var(--accent)]"></i>
            <span>Load Sample Storefront ZIP</span>
          </button>
          <button
            onClick={() => setCurrentView('storefront')}
            className="px-3.5 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <i className="bi bi-shop"></i>
            <span>Launch Live Storefront</span>
          </button>
        </div>
      </div>

      {/* Upload & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging
            ? 'border-[var(--accent)] bg-[var(--accent)]/10 scale-[1.01]'
            : 'border-[var(--line)] bg-[var(--panel)]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--inner)] border border-[var(--line)] mx-auto flex items-center justify-center text-2xl text-[var(--accent)] shadow-sm">
            <i className="bi bi-file-earmark-zip"></i>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--text)]">
              Drop Storefront ZIP here, or browse files
            </h3>
            <p className="text-xs text-[var(--muted)] mt-1">
              Supports Vite, Next.js, or HTML static storefront archives.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <label className="cursor-pointer px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-sm">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="hidden"
              />
              Select ZIP File
            </label>
            <button
              onClick={handleInspectSample}
              className="px-4 py-2 rounded-xl bg-[var(--inner)] border border-[var(--line)] text-xs font-semibold text-[var(--navtext)] hover:text-[var(--text)] transition-colors"
            >
              Inspect Bundled Demo ZIP
            </button>
          </div>

          {loadingZip && (
            <div className="text-xs text-[var(--accent)] font-semibold flex items-center justify-center gap-2 pt-2">
              <span className="w-3.5 h-3.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              <span>Unpacking and parsing ZIP structure in-memory...</span>
            </div>
          )}
        </div>
      </div>

      {/* ZIP Inspection Results */}
      {zipInspection ? (
        <div className="space-y-4">
          {/* Metadata Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[var(--panel)] border border-[var(--line)]">
              <span className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider block">
                Archive Name
              </span>
              <div className="text-xs font-bold text-[var(--text)] truncate mt-0.5 mono">
                {zipInspection.fileName}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--panel)] border border-[var(--line)]">
              <span className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider block">
                Total Files
              </span>
              <div className="text-xs font-bold text-[var(--text)] mt-0.5 mono">
                {zipInspection.totalFiles} files detected
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--panel)] border border-[var(--line)]">
              <span className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider block">
                Architecture
              </span>
              <div className="text-xs font-bold text-[var(--green)] mt-0.5">
                {zipInspection.frameworkDetected}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--panel)] border border-[var(--line)]">
              <span className="text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider block">
                Sync State
              </span>
              <div className="text-xs font-bold text-[var(--accent)] mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                <span>Commerce OS Connected</span>
              </div>
            </div>
          </div>

          {/* Explorer View: File Tree + Code Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[var(--panel)] border border-[var(--line)] rounded-2xl overflow-hidden shadow-sm">
            {/* Left: File Tree */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--line)] bg-[var(--inner)] p-4 flex flex-col h-[480px]">
              <div className="text-xs font-bold text-[var(--text)] pb-3 border-b border-[var(--line)] flex items-center justify-between">
                <span>Archive File Tree</span>
                <span className="text-[10px] text-[var(--muted)] mono">
                  {zipInspection.files.length} items
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pt-2 space-y-1">
                {zipInspection.files.map((file, idx) => {
                  const isSelected = (activeFile || zipInspection.inspectedFile) === file.path;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveFile(file.path)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-[var(--accent)] text-white font-semibold'
                          : 'text-[var(--navtext)] hover:bg-[var(--chip)] hover:text-[var(--text)]'
                      }`}
                    >
                      <i
                        className={`bi ${
                          file.isDir
                            ? 'bi-folder-fill text-[var(--amber)]'
                            : file.path.endsWith('.json')
                            ? 'bi-filetype-json text-[var(--green)]'
                            : file.path.endsWith('.tsx') || file.path.endsWith('.jsx')
                            ? 'bi-filetype-tsx text-[var(--cyan)]'
                            : file.path.endsWith('.css')
                            ? 'bi-filetype-css text-[var(--violet)]'
                            : file.path.endsWith('.html')
                            ? 'bi-filetype-html text-[var(--red)]'
                            : 'bi-file-earmark-code'
                        } text-xs flex-none`}
                      ></i>
                      <span className="truncate flex-1 font-mono text-[11px]">{file.path}</span>
                      {!file.isDir && file.size > 0 && (
                        <span className="text-[9px] opacity-60 mono flex-none">
                          {(file.size / 1024).toFixed(1)}k
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Code Inspector */}
            <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col h-[480px] bg-[var(--panel)]">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <i className="bi bi-code-slash text-[var(--accent)]"></i>
                  <span className="text-xs font-bold text-[var(--text)] mono">
                    {currentInspectedFile?.path || 'Select a file to inspect'}
                  </span>
                </div>
                {currentInspectedFile && (
                  <button
                    onClick={() => {
                      if (currentInspectedFile.content) {
                        navigator.clipboard.writeText(currentInspectedFile.content);
                        addToast('File content copied', 'clipboard-check');
                      }
                    }}
                    className="px-2.5 py-1 rounded bg-[var(--inner)] hover:bg-[var(--chip)] text-[10px] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)] transition-colors"
                  >
                    Copy Source
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-auto pt-3 font-mono text-xs bg-[var(--inner)] border border-[var(--line)] rounded-xl p-4 text-[var(--text)] mt-3">
                {currentInspectedFile?.content ? (
                  <pre className="whitespace-pre leading-relaxed">
                    {currentInspectedFile.content}
                  </pre>
                ) : (
                  <div className="text-[var(--muted)] text-center py-20">
                    Binary or non-previewable file. Select a code or configuration file (.tsx, .html, .json, .css) to view.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Default Initial Inspection Prompt */
        <div className="p-6 rounded-2xl bg-[var(--panel)] border border-[var(--line)] space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--green)]/20 text-[var(--green)] flex items-center justify-center font-bold text-sm">
              <i className="bi bi-shield-check"></i>
            </span>
            <div>
              <h3 className="text-sm font-bold text-[var(--text)]">
                Active Storefront Architecture
              </h3>
              <p className="text-xs text-[var(--muted)]">
                The current system integrates a full React + Vite customer storefront with real-time Commerce OS state synchronization.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <i className="bi bi-arrow-repeat text-[var(--accent)]"></i>
                <span>Live State Bridge</span>
              </div>
              <p className="text-[11px] text-[var(--muted)]">
                Orders placed in Storefront immediately appear in Orders &amp; Fulfillment and increment revenue KPIs.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <i className="bi bi-palette text-[var(--violet)]"></i>
                <span>Theme Studio Shared Tokens</span>
              </div>
              <p className="text-[11px] text-[var(--muted)]">
                Preset and custom colors applied in Theme Studio update both the Admin console and Storefront instantly.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-1">
              <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
                <i className="bi bi-whatsapp text-[var(--green)]"></i>
                <span>Meta CRM Synced Chat</span>
              </div>
              <p className="text-[11px] text-[var(--muted)]">
                Storefront customer inquiries sync in real time with the Admin WhatsApp live chat module.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
