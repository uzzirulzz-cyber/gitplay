import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import JSZip from 'jszip';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  CustomThemeTokens,
  ChatMessage,
  StorefrontZipInspection,
  ZipFileInfo,
} from '../types.ts';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, THEME_PRESETS, DEFAULT_CUSTOM_TOKENS } from '../data/mockData.ts';

interface ToastItem {
  id: string;
  msg: string;
  icon?: string;
}

interface CommerceContextType {
  currentView: 'storefront' | 'admin';
  setCurrentView: (view: 'storefront' | 'admin') => void;
  adminSection: string;
  setAdminSection: (section: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, licenseKey?: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  theme: string;
  setTheme: (themeId: string) => void;
  customTokens: CustomThemeTokens;
  updateCustomTokens: (tokens: Partial<CustomThemeTokens>) => void;
  appearanceMode: 'light' | 'auto' | 'dark';
  setAppearanceMode: (mode: 'light' | 'auto' | 'dark') => void;
  themeStudioOpen: boolean;
  setThemeStudioOpen: (open: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  quickAddOpen: boolean;
  setQuickAddOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, sender?: 'customer' | 'agent') => void;
  zipInspection: StorefrontZipInspection | null;
  setZipInspection: (data: StorefrontZipInspection | null) => void;
  inspectZipFile: (fileOrBuffer: File | ArrayBuffer, fileName: string) => Promise<void>;
  inspectDefaultSampleZip: () => Promise<void>;
  toasts: ToastItem[];
  addToast: (msg: string, icon?: string) => void;
  removeToast: (id: string) => void;
  connectedIntegrations: Record<string, boolean>;
  toggleIntegration: (key: string, value?: boolean) => void;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export const CommerceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // URL Routing: /storefront or /admin
  const checkUrlForView = (): 'storefront' | 'admin' => {
    try {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (path.includes('/admin') || hash.includes('/admin') || params.get('view') === 'admin') {
        return 'admin';
      }
      return 'storefront';
    } catch {
      return 'storefront';
    }
  };

  const [currentView, setCurrentViewState] = useState<'storefront' | 'admin'>(checkUrlForView);

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pb-admin-auth') === 'true';
    } catch {
      return false;
    }
  });

  const setCurrentView = (view: 'storefront' | 'admin') => {
    setCurrentViewState(view);
    try {
      localStorage.setItem('pb-active-view', view);
      if (view === 'admin') {
        window.history.pushState({ view: 'admin' }, '', '/admin');
        document.title = 'PlayBeat Commerce OS — Administrator Operations';
      } else {
        window.history.pushState({ view: 'storefront' }, '', '/storefront');
        document.title = 'PlayBeat Digital — Premium Subscriptions & Digital Licenses';
      }
    } catch {}
  };

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    document.title =
      currentView === 'admin'
        ? 'PlayBeat Commerce OS — Administrator Operations'
        : 'PlayBeat Digital — Premium Subscriptions & Digital Licenses';

    const handlePopState = () => {
      const view = checkUrlForView();
      setCurrentViewState(view);
      document.title =
        view === 'admin'
          ? 'PlayBeat Commerce OS — Administrator Operations'
          : 'PlayBeat Digital — Premium Subscriptions & Digital Licenses';
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [currentView]);

  const adminLogin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    if (
      (cleanEmail === 'admin@playbeat.digital' || cleanEmail === 'admin') &&
      cleanPass === 'playbeat1122'
    ) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('pb-admin-auth', 'true');
      } catch {}
      addToast('Welcome to PlayBeat Commerce OS!', 'shield-lock-fill');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('pb-admin-auth');
    } catch {}
    setCurrentView('storefront');
    addToast('Signed out of Commerce OS', 'box-arrow-right');
  };

  const [adminSection, setAdminSection] = useState<string>('dashboard');

  // Products state (178 items from MongoDB)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pb-products-v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 20) return parsed;
      }
      localStorage.setItem('pb-products-v4', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pb-orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pb-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [themeStudioOpen, setThemeStudioOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pb-wishlist');
      return saved ? JSON.parse(saved) : ['prod-ps-gift-50', 'prod-netflix-prem'];
    } catch {
      return ['prod-ps-gift-50', 'prod-netflix-prem'];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('pb-wishlist', JSON.stringify(next));
      } catch {}
      addToast(
        exists ? 'Removed from your wishlist' : 'Added to your wishlist',
        exists ? 'heart' : 'heart-fill'
      );
      return next;
    });
  };

  // Theme & Appearance
  const [theme, setThemeState] = useState<string>(() => {
    try {
      return localStorage.getItem('pb-theme') || 'navy';
    } catch {
      return 'navy';
    }
  });

  const [customTokens, setCustomTokens] = useState<CustomThemeTokens>(() => {
    try {
      const saved = localStorage.getItem('pb-theme-custom');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_TOKENS;
    } catch {
      return DEFAULT_CUSTOM_TOKENS;
    }
  });

  const [appearanceMode, setAppearanceModeState] = useState<'light' | 'auto' | 'dark'>(() => {
    try {
      return (localStorage.getItem('pb-mode') as any) || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pb-chat-messages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'msg-1',
        sender: 'customer',
        text: 'Hi! Is the YouTube Premium 12 Months plan still available for instant activation?',
        timestamp: '11:20 AM',
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        text: 'Hello! Yes, absolutely. It activates directly on your personal Gmail account within 2 minutes of checkout.',
        timestamp: '11:21 AM',
        status: 'read'
      }
    ];
  });

  // Integrations state
  const [connectedIntegrations, setConnectedIntegrations] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('pb-int');
      return saved ? JSON.parse(saved) : { whatsapp: true, facebook: false, instagram: false, tiktok: false };
    } catch {
      return { whatsapp: true, facebook: false, instagram: false, tiktok: false };
    }
  });

  // Storefront ZIP Inspection
  const [zipInspection, setZipInspection] = useState<StorefrontZipInspection | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pb-active-view', currentView);
    } catch {}
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('pb-products-v4', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('pb-orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('pb-cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('pb-chat-messages', JSON.stringify(chatMessages));
    } catch {}
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('pb-int', JSON.stringify(connectedIntegrations));
    } catch {}
  }, [connectedIntegrations]);

  // CSS variables application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'custom') {
      root.dataset.theme = 'custom';
      root.dataset.pbCustom = '1';
      // Apply custom tokens
      root.style.setProperty('--accent', customTokens.primary);
      root.style.setProperty('--pb-primary', customTokens.primary);
      root.style.setProperty('--pb-accent', customTokens.primary);
      root.style.setProperty('--accent2', customTokens.secondary);
      root.style.setProperty('--pb-secondary', customTokens.secondary);
      root.style.setProperty('--bg', customTokens.background);
      root.style.setProperty('--pb-background', customTokens.background);
      root.style.setProperty('--panel', customTokens.surface);
      root.style.setProperty('--pb-surface', customTokens.surface);
      root.style.setProperty('--sidebg', customTokens.sidebar);
      root.style.setProperty('--pb-sidebar', customTokens.sidebar);
      root.style.setProperty('--text', customTokens.text);
      root.style.setProperty('--pb-text', customTokens.text);
      root.style.setProperty('--muted', customTokens.muted);
      root.style.setProperty('--navtext', customTokens.muted);
      root.style.setProperty('--pb-text-muted', customTokens.muted);
      root.style.setProperty('--line', customTokens.border);
      root.style.setProperty('--pb-border', customTokens.border);
      root.style.setProperty('--success', customTokens.success);
      root.style.setProperty('--warning', customTokens.warning);
      root.style.setProperty('--danger', customTokens.danger);
      root.style.setProperty('--info', customTokens.info);

      root.style.setProperty('--pb-radius-lg', `${customTokens.radius}px`);
      root.style.setProperty('--pb-radius-md', `calc(${customTokens.radius}px - 0.15rem)`);
      root.style.setProperty('--pb-radius-sm', `calc(${customTokens.radius}px - 0.4rem)`);
      root.style.setProperty('--pb-sidebar-width', `${customTokens.sidebarWidth}px`);
      root.style.setProperty('--pb-density', `${customTokens.density}`);
      root.style.setProperty('--pb-font-scale', `${customTokens.fontScale}`);
      root.style.setProperty('--pb-anim-speed', `${customTokens.animSpeed * 0.2}s`);
    } else {
      root.removeAttribute('style');
      root.removeAttribute('data-pb-custom');
      root.dataset.theme = theme;
      const preset = THEME_PRESETS.find((t) => t.id === theme);
      if (preset) {
        root.dataset.bsTheme = preset.dark ? 'dark' : 'light';
      }
    }
  }, [theme, customTokens]);

  const addToast = (msg: string, icon = 'check-circle') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, msg, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setTheme = (themeId: string) => {
    setThemeState(themeId);
    try {
      localStorage.setItem('pb-theme', themeId);
    } catch {}
    const preset = THEME_PRESETS.find((t) => t.id === themeId);
    if (preset) {
      addToast(`${preset.name} applied`, 'palette');
    }
  };

  const updateCustomTokens = (tokens: Partial<CustomThemeTokens>) => {
    setCustomTokens((prev) => {
      const next = { ...prev, ...tokens };
      try {
        localStorage.setItem('pb-theme-custom', JSON.stringify(next));
        localStorage.setItem('pb-theme', 'custom');
      } catch {}
      return next;
    });
    setThemeState('custom');
  };

  const setAppearanceMode = (mode: 'light' | 'auto' | 'dark') => {
    setAppearanceModeState(mode);
    try {
      localStorage.setItem('pb-mode', mode);
    } catch {}

    const curPreset = THEME_PRESETS.find((t) => t.id === theme) || THEME_PRESETS[0];
    let wantDark = true;
    if (mode === 'auto') {
      wantDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      wantDark = mode === 'dark';
    }

    if (curPreset.dark !== wantDark) {
      const paired = THEME_PRESETS.find((t) => t.id === curPreset.pair) || curPreset;
      setThemeState(paired.id);
    }
    addToast(`Appearance switched to ${mode}`, mode === 'light' ? 'sun' : 'moon-stars');
  };

  // Products
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast(`Product "${newProd.name}" added to catalog`, 'box-seam');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('Product catalog updated', 'check-circle');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog', 'trash');
  };

  // Orders
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const ordNum = `PB-${1012 + orders.length}`;
    const generatedLicense = `PB-KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-DELIVERED`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: ordNum,
      licenseKey: orderData.licenseKey || generatedLicense,
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    addToast(`Order ${ordNum} created successfully!`, 'bag-check');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, licenseKey?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          return {
            ...o,
            status,
            ...(licenseKey ? { licenseKey } : {})
          };
        }
        return o;
      })
    );
    addToast(`Order status updated to ${status}`, 'arrow-repeat');
  };

  // Cart
  const addToCart = (product: Product, variantId?: string, quantity = 1) => {
    const selectedVariant = variantId ? product.variants.find((v) => v.id === variantId) : product.variants[0];
    const unitPrice = selectedVariant ? selectedVariant.price : product.price;
    const cartItemId = `${product.id}-${selectedVariant ? selectedVariant.id : 'base'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          variantId: selectedVariant?.id,
          variantName: selectedVariant?.name,
          price: unitPrice,
          quantity
        }
      ];
    });

    addToast(`Added "${product.name}" to cart`, 'cart-plus');
    setCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Chat
  const sendChatMessage = (text: string, sender: 'customer' | 'agent' = 'customer') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // If customer sends a message, simulate agent response after 1.5s if in storefront
    if (sender === 'customer') {
      setTimeout(() => {
        const autoReplies = [
          'Thanks for messaging PlayBeat! An operator from our Commerce OS team is reviewing your inquiry.',
          'Your request has been received. Our average response time is under 3 minutes.',
          'Feel free to proceed with checkout; digital license credentials are dispatched automatically after payment confirmation.'
        ];
        const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'agent',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered'
          }
        ]);
      }, 1500);
    }
  };

  // Integrations toggle
  const toggleIntegration = (key: string, value?: boolean) => {
    setConnectedIntegrations((prev) => {
      const next = { ...prev, [key]: value !== undefined ? value : !prev[key] };
      return next;
    });
    addToast(`${key.toUpperCase()} integration updated`, 'link-45deg');
  };

  // Inspect ZIP file
  const inspectZipFile = async (fileOrBuffer: File | ArrayBuffer, fileName: string) => {
    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(fileOrBuffer);
      const files: ZipFileInfo[] = [];
      let packageJsonContent: Record<string, any> | undefined;

      const entries = Object.keys(loadedZip.files);
      for (const relativePath of entries) {
        const zipEntry = loadedZip.files[relativePath];
        if (zipEntry.dir) {
          files.push({ path: relativePath, size: 0, isDir: true });
        } else {
          let textPreview: string | undefined;
          // preview text files < 50kb
          if (
            relativePath.endsWith('.json') ||
            relativePath.endsWith('.html') ||
            relativePath.endsWith('.tsx') ||
            relativePath.endsWith('.jsx') ||
            relativePath.endsWith('.ts') ||
            relativePath.endsWith('.js') ||
            relativePath.endsWith('.css') ||
            relativePath.endsWith('.md')
          ) {
            try {
              const text = await zipEntry.async('string');
              textPreview = text.slice(0, 5000);
              if (relativePath.endsWith('package.json')) {
                try {
                  packageJsonContent = JSON.parse(text);
                } catch {}
              }
            } catch {}
          }
          files.push({
            path: relativePath,
            size: (zipEntry as any)._data?.uncompressedSize || 0,
            isDir: false,
            content: textPreview
          });
        }
      }

      // Framework detection
      let detected = 'HTML/CSS/JS Static Storefront';
      if (packageJsonContent?.dependencies?.next || entries.some((e) => e.includes('next.config'))) {
        detected = 'Next.js App Directory Storefront';
      } else if (packageJsonContent?.dependencies?.react || entries.some((e) => e.includes('src/App.tsx'))) {
        detected = 'React + Vite Single Page Storefront';
      } else if (packageJsonContent?.dependencies?.vue) {
        detected = 'Vue.js Storefront';
      }

      const inspection: StorefrontZipInspection = {
        fileName,
        fileSize: fileOrBuffer instanceof File ? fileOrBuffer.size : 124500,
        totalFiles: entries.length,
        frameworkDetected: detected,
        packageJson: packageJsonContent,
        files,
        inspectedFile: files.find((f) => f.path.endsWith('package.json'))?.path || files[0]?.path,
        uploadedAt: new Date().toLocaleTimeString()
      };

      setZipInspection(inspection);
      addToast(`Storefront ZIP "${fileName}" unpacked & inspected (${entries.length} files)`, 'file-earmark-zip');
    } catch (err) {
      console.error(err);
      addToast('Failed to parse ZIP archive', 'exclamation-triangle');
    }
  };

  // Built-in sample storefront ZIP for quick one-click inspection
  const inspectDefaultSampleZip = async () => {
    const zip = new JSZip();
    zip.file(
      'package.json',
      JSON.stringify(
        {
          name: 'playbeat-customer-storefront',
          version: '2.4.0',
          private: true,
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
            tailwindcss: '^4.0.0',
            'lucide-react': '^0.540.0'
          },
          scripts: {
            dev: 'vite',
            build: 'vite build'
          }
        },
        null,
        2
      )
    );
    zip.file(
      'index.html',
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>PlayBeat - Storefront</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    );
    zip.file(
      'src/App.tsx',
      `import React from 'react';
export default function StorefrontApp() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <h1>PlayBeat Digital Subscriptions</h1>
    </main>
  );
}`
    );
    zip.file(
      'src/components/ProductCard.tsx',
      `export const ProductCard = ({ title, price }) => (
  <div className="product-card">
    <h3>{title}</h3>
    <p>Rs {price}</p>
  </div>
);`
    );
    zip.file('src/styles/theme.css', `:root { --primary: #2f7cf6; }`);

    const blob = await zip.generateAsync({ type: 'arraybuffer' });
    await inspectZipFile(blob, 'playbeat-storefront-source-of-truth.zip');
  };

  return (
    <CommerceContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminSection,
        setAdminSection,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrderStatus,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        cartDrawerOpen,
        setCartDrawerOpen,
        selectedProduct,
        setSelectedProduct,
        checkoutOpen,
        setCheckoutOpen,
        lastOrder,
        setLastOrder,
        theme,
        setTheme,
        customTokens,
        updateCustomTokens,
        appearanceMode,
        setAppearanceMode,
        themeStudioOpen,
        setThemeStudioOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        notificationsOpen,
        setNotificationsOpen,
        quickAddOpen,
        setQuickAddOpen,
        wishlist,
        toggleWishlist,
        wishlistOpen,
        setWishlistOpen,
        chatMessages,
        sendChatMessage,
        zipInspection,
        setZipInspection,
        inspectZipFile,
        inspectDefaultSampleZip,
        toasts,
        addToast,
        removeToast,
        connectedIntegrations,
        toggleIntegration,
        isAdminAuthenticated,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
