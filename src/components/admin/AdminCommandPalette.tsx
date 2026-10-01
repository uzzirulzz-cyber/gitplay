import React, { useState, useEffect, useRef } from 'react';
import { useCommerce } from '../../context/CommerceContext.tsx';

export const AdminCommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentView,
    setAdminSection,
    setThemeStudioOpen,
    setNotificationsOpen,
    setAppearanceMode,
    setQuickAddOpen,
    products,
    orders
  } = useCommerce();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      } else if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const allActions = [
    {
      group: 'Quick Actions',
      items: [
        {
          label: 'Launch Customer Storefront',
          icon: 'bi-shop',
          run: () => setCurrentView('storefront')
        },
        {
          label: 'Inspect Storefront ZIP Architecture',
          icon: 'bi-file-earmark-zip',
          run: () => {
            setAdminSection('storefront-importer');
          }
        },
        {
          label: 'Open Theme Studio',
          icon: 'bi-palette',
          run: () => setThemeStudioOpen(true)
        },
        {
          label: 'Open Notifications Drawer',
          icon: 'bi-bell',
          run: () => setNotificationsOpen(true)
        },
        {
          label: 'Quick Add Product or Order',
          icon: 'bi-plus-lg',
          run: () => setQuickAddOpen(true)
        },
        {
          label: 'Switch to Light Mode',
          icon: 'bi-sun',
          run: () => setAppearanceMode('light')
        },
        {
          label: 'Switch to Dark Mode',
          icon: 'bi-moon-stars',
          run: () => setAppearanceMode('dark')
        }
      ]
    },
    {
      group: 'Navigation & Sections',
      items: [
        {
          label: 'Go to Dashboard Overview',
          icon: 'bi-grid',
          run: () => setAdminSection('dashboard')
        },
        {
          label: `Go to Orders & Fulfillment (${orders.length})`,
          icon: 'bi-bag',
          run: () => setAdminSection('orders')
        },
        {
          label: `Go to Catalog Products (${products.length})`,
          icon: 'bi-box',
          run: () => setAdminSection('catalog')
        },
        {
          label: 'Go to Digital License Vault',
          icon: 'bi-key',
          run: () => setAdminSection('licenses')
        },
        {
          label: 'Go to WhatsApp Live Meta CRM',
          icon: 'bi-whatsapp',
          run: () => setAdminSection('whatsapp')
        },
        {
          label: 'Go to Social Integrations',
          icon: 'bi-link-45deg',
          run: () => setAdminSection('integrations')
        }
      ]
    }
  ];

  // Filter actions by query
  const filteredGroups = allActions
    .map((g) => ({
      ...g,
      items: g.items.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter((g) => g.items.length > 0);

  const flatItems = filteredGroups.flatMap((g) => g.items);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatItems[selectedIndex]) {
      e.preventDefault();
      flatItems[selectedIndex].run();
      setCommandPaletteOpen(false);
    }
  };

  let currentIndex = 0;

  return (
    <div
      onClick={() => setCommandPaletteOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[var(--panel)] border border-[var(--line)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Input */}
        <div className="flex items-center px-4 border-b border-[var(--line)]">
          <i className="bi bi-search text-[var(--muted)] text-sm mr-3"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search customers, products, orders, pages, theme..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full py-3.5 bg-transparent text-sm text-[var(--text)] placeholder-[var(--muted)] focus:outline-none"
          />
          <kbd className="text-[10px] bg-[var(--chip)] border border-[var(--line)] rounded px-1.5 py-0.5 text-[var(--muted)] mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto p-2 space-y-3">
          {filteredGroups.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--muted)]">
              No matching actions or pages found.
            </div>
          ) : (
            filteredGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] px-3 pt-1">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const isSelected = currentIndex === selectedIndex;
                  const itemIndex = currentIndex;
                  currentIndex++;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.run();
                        setCommandPaletteOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-3 transition-colors ${
                        isSelected
                          ? 'bg-[var(--accent)] text-white font-semibold'
                          : 'text-[var(--text)] hover:bg-[var(--hover)]'
                      }`}
                    >
                      <i
                        className={`bi ${item.icon} text-sm ${
                          isSelected ? 'text-white' : 'text-[var(--accent)]'
                        }`}
                      ></i>
                      <span className="flex-1 truncate">{item.label}</span>
                      <i className="bi bi-arrow-return-left text-[10px] opacity-60"></i>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
