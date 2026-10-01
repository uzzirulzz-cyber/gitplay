import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';
import { THEME_PRESETS } from '../../data/mockData.ts';
import { CustomThemeTokens } from '../../types.ts';

export const AdminThemeStudio: React.FC = () => {
  const {
    themeStudioOpen,
    setThemeStudioOpen,
    theme,
    setTheme,
    customTokens,
    updateCustomTokens,
    addToast
  } = useCommerce();

  const [activeTab, setActiveTab] = useState<'presets' | 'builder'>('presets');
  const [localTokens, setLocalTokens] = useState<CustomThemeTokens>(customTokens);

  if (!themeStudioOpen) return null;

  const colorFields: { key: keyof CustomThemeTokens; label: string }[] = [
    { key: 'primary', label: 'Primary Accent' },
    { key: 'secondary', label: 'Secondary Accent' },
    { key: 'background', label: 'Background Field' },
    { key: 'surface', label: 'Surface Cards' },
    { key: 'sidebar', label: 'Sidebar Surface' },
    { key: 'text', label: 'Main Text' },
    { key: 'muted', label: 'Muted Text' },
    { key: 'border', label: 'Borders & Dividers' },
    { key: 'success', label: 'Success Green' },
    { key: 'warning', label: 'Warning Amber' },
    { key: 'danger', label: 'Danger Red' },
    { key: 'info', label: 'Info Cyan' }
  ];

  const handleApplyTheme = () => {
    if (activeTab === 'builder') {
      updateCustomTokens(localTokens);
      addToast('Custom theme tokens applied', 'palette');
    }
  };

  const handleSaveDefault = () => {
    handleApplyTheme();
    try {
      if (theme === 'custom' || activeTab === 'builder') {
        localStorage.setItem('pb-theme-custom', JSON.stringify(localTokens));
        localStorage.setItem('pb-theme', 'custom');
      } else {
        localStorage.removeItem('pb-theme-custom');
        localStorage.setItem('pb-theme', theme);
      }
    } catch {}
    addToast('Saved as default system theme', 'bookmark-check');
    setThemeStudioOpen(false);
  };

  const handleReset = () => {
    setTheme('navy');
    addToast('Theme reset to PlayBeat Navy default', 'arrow-counterclockwise');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setThemeStudioOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[var(--panel)] border-l border-[var(--line)] shadow-2xl flex flex-col justify-between text-[var(--text)]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <i className="bi bi-palette text-[var(--accent)] text-lg"></i>
                <h2 className="text-base font-bold text-[var(--text)]">Theme Studio</h2>
              </div>
              <p className="text-[11px] text-[var(--muted)] mt-0.5">
                Customize palette, typography scale, radii, and density in real-time.
              </p>
            </div>
            <button
              onClick={() => setThemeStudioOpen(false)}
              className="p-1.5 text-[var(--muted)] hover:text-[var(--text)] rounded-lg"
              aria-label="Close Theme Studio"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Tab switcher */}
            <div className="flex p-1 rounded-xl bg-[var(--chip)] border border-[var(--line)]">
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'presets'
                    ? 'bg-[var(--panel)] text-[var(--text)] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                Presets ({THEME_PRESETS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('builder')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'builder'
                    ? 'bg-[var(--panel)] text-[var(--text)] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                Custom Builder
              </button>
            </div>

            {/* Presets Grid */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-2 gap-2.5">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = theme === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setTheme(preset.id)}
                      className={`p-3 rounded-xl border text-left transition-all group ${
                        isSelected
                          ? 'border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--inner)] shadow-md'
                          : 'border-[var(--line)] bg-[var(--inner)]/60 hover:border-[var(--muted)]'
                      }`}
                    >
                      {/* Mini preview bar */}
                      <div
                        className="h-10 rounded-lg flex overflow-hidden mb-2 border border-white/10"
                        style={{ backgroundColor: preset.bg }}
                      >
                        <div className="w-1/3 h-full" style={{ backgroundColor: preset.side }} />
                        <div className="flex-1 h-full p-1.5 flex flex-col justify-between">
                          <div
                            className="w-1/2 h-1.5 rounded"
                            style={{ backgroundColor: preset.accent }}
                          />
                          <div
                            className="w-3/4 h-1 rounded"
                            style={{ backgroundColor: preset.accent, opacity: 0.4 }}
                          />
                        </div>
                      </div>

                      <div className="text-xs font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-[var(--muted)] line-clamp-1 mt-0.5">
                        {preset.sub}
                      </div>
                    </button>
                  );
                })}

                {/* Custom theme card */}
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    theme === 'custom'
                      ? 'border-[var(--accent)] ring-1 ring-[var(--accent)] bg-[var(--inner)]'
                      : 'border-[var(--line)] bg-[var(--inner)]/60'
                  }`}
                >
                  <div className="h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-2 border border-white/10 flex items-center justify-center text-white text-xs font-bold">
                    <i className="bi bi-sliders me-1"></i> Custom
                  </div>
                  <div className="text-xs font-bold text-[var(--text)]">Custom Tokens</div>
                  <div className="text-[10px] text-[var(--muted)]">Build your own palette</div>
                </button>
              </div>
            )}

            {/* Custom Builder */}
            {activeTab === 'builder' && (
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                  Color Tokens
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {colorFields.map((field) => (
                    <div
                      key={field.key}
                      className="p-2 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex items-center justify-between"
                    >
                      <label className="text-[11px] font-medium text-[var(--text)]">
                        {field.label}
                      </label>
                      <input
                        type="color"
                        value={String(localTokens[field.key])}
                        onChange={(e) => {
                          const next = { ...localTokens, [field.key]: e.target.value };
                          setLocalTokens(next);
                          updateCustomTokens(next);
                        }}
                        className="w-7 h-7 rounded-lg border border-[var(--line)] bg-transparent cursor-pointer p-0"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider pt-2">
                  Geometry &amp; Appearance
                </div>

                {/* Border Radius */}
                <div className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text)]">Border Radius:</span>
                    <span className="font-mono text-[var(--accent)]">{localTokens.radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={localTokens.radius}
                    onChange={(e) => {
                      const next = { ...localTokens, radius: Number(e.target.value) };
                      setLocalTokens(next);
                      updateCustomTokens(next);
                    }}
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                {/* Sidebar Width */}
                <div className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text)]">Sidebar Width:</span>
                    <span className="font-mono text-[var(--accent)]">
                      {localTokens.sidebarWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="320"
                    step="10"
                    value={localTokens.sidebarWidth}
                    onChange={(e) => {
                      const next = { ...localTokens, sidebarWidth: Number(e.target.value) };
                      setLocalTokens(next);
                      updateCustomTokens(next);
                    }}
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                {/* Density */}
                <div className="p-3 rounded-xl bg-[var(--inner)] border border-[var(--line)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text)]">Layout Density:</span>
                  <select
                    value={localTokens.density}
                    onChange={(e) => {
                      const next = { ...localTokens, density: Number(e.target.value) };
                      setLocalTokens(next);
                      updateCustomTokens(next);
                    }}
                    className="bg-[var(--chip)] text-[var(--text)] border border-[var(--line)] rounded-lg px-2.5 py-1 text-xs"
                  >
                    <option value="0.85">Compact</option>
                    <option value="1">Comfortable (Default)</option>
                    <option value="1.2">Relaxed</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-[var(--line)] bg-[var(--panel)] flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--muted)] hover:text-[var(--text)]"
            >
              Reset
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setThemeStudioOpen(false)}
                className="px-3 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--muted)] hover:text-[var(--text)]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDefault}
                className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold hover:brightness-110 active:scale-95 shadow-sm"
              >
                Save as Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
