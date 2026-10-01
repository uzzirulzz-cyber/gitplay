import { Product, Order, ThemePreset, CustomThemeTokens } from '../types.ts';
import { MONGODB_PRODUCTS } from './dbNormalizedProducts.ts';

export const INITIAL_PRODUCTS: Product[] = MONGODB_PRODUCTS;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1011',
    orderNumber: 'PB-1011',
    customerName: 'Hamza Tariq',
    customerEmail: 'hamza.tariq@gmail.com',
    customerPhone: '+92 332 1049333',
    items: [
      {
        id: 'prod-ps-gift-50-ps-50',
        product: INITIAL_PRODUCTS[0],
        variantId: 'ps-50',
        variantName: '$50 USD PlayStation Gift Card',
        price: 14500,
        quantity: 1
      }
    ],
    total: 14500,
    discount: 0,
    status: 'completed',
    paymentMethod: 'jazzcash',
    licenseKey: '4K8M-N39B-8Q2W',
    createdAt: '2026-09-30T14:22:00Z',
    notes: 'PSN US $50 digital code delivered via WhatsApp.'
  },
  {
    id: 'ord-1010',
    orderNumber: 'PB-1010',
    customerName: 'Zainab Bibi',
    customerEmail: 'zainab.design@outlook.com',
    customerPhone: '+92 300 4492019',
    items: [
      {
        id: 'prod-netflix-prem-nf-1m-priv',
        product: INITIAL_PRODUCTS[1],
        variantId: 'nf-1m-priv',
        variantName: '1 Month Private Profile (PIN)',
        price: 2800,
        quantity: 1
      }
    ],
    total: 2800,
    discount: 0,
    status: 'completed',
    paymentMethod: 'easypaisa',
    licenseKey: 'netflix4k@playbeat.io | PIN: 9021',
    createdAt: '2026-09-29T19:15:00Z'
  },
  {
    id: 'ord-1009',
    orderNumber: 'PB-1009',
    customerName: 'Bilal Khan',
    customerEmail: 'bilal.k@live.com',
    customerPhone: '+92 333 1184920',
    items: [
      {
        id: 'prod-spotify-prem-sp-1m',
        product: INITIAL_PRODUCTS[2],
        variantId: 'sp-1m',
        variantName: '1 Month Individual Upgrade',
        price: 1200,
        quantity: 1
      }
    ],
    total: 1200,
    discount: 0,
    status: 'completed',
    paymentMethod: 'bank_transfer',
    createdAt: '2026-09-29T10:40:00Z',
    notes: 'Spotify personal family slot invitation.'
  },
  {
    id: 'ord-1008',
    orderNumber: 'PB-1008',
    customerName: 'Usman Ali',
    customerEmail: 'usman.music@gmail.com',
    customerPhone: '+92 312 9012345',
    items: [
      {
        id: 'prod-ms-365-ms-1y-pers',
        product: INITIAL_PRODUCTS[3],
        variantId: 'ms-1y-pers',
        variantName: '1 Year Personal (5 Devices + 1TB Cloud)',
        price: 8500,
        quantity: 1
      }
    ],
    total: 8500,
    discount: 0,
    status: 'completed',
    paymentMethod: 'jazzcash',
    licenseKey: 'XN9Y8-2B7R4-4Q9K2-7H8J1-3V5M6',
    createdAt: '2026-09-28T16:50:00Z'
  },
  {
    id: 'ord-1007',
    orderNumber: 'PB-1007',
    customerName: 'Ahmad Raza',
    customerEmail: 'ahmad.tech@gmail.com',
    customerPhone: '+92 345 7719283',
    items: [
      {
        id: 'prod-adobe-photoshop-ps-app-1y',
        product: INITIAL_PRODUCTS[4],
        variantId: 'ps-app-1y',
        variantName: '1 Year Photoshop Single App',
        price: 12000,
        quantity: 1
      }
    ],
    total: 12000,
    discount: 0,
    status: 'completed',
    paymentMethod: 'easypaisa',
    licenseKey: 'PB-ADB-PS-9921-INVITED',
    createdAt: '2026-09-27T11:10:00Z'
  },
  {
    id: 'ord-1006',
    orderNumber: 'PB-1006',
    customerName: 'Sana Malik',
    customerEmail: 'sana.malik@yahoo.com',
    customerPhone: '+92 301 2289410',
    items: [
      {
        id: 'prod-steam-gift-stm-20',
        product: INITIAL_PRODUCTS[5],
        variantId: 'stm-20',
        variantName: '$20 USD Steam Wallet Card',
        price: 6800,
        quantity: 1
      }
    ],
    total: 6800,
    discount: 0,
    status: 'completed',
    paymentMethod: 'whatsapp',
    licenseKey: '89B7V-6C4X2-1Z8Q9',
    createdAt: '2026-09-26T21:05:00Z'
  }
];

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'navy', name: 'Playbeat Navy', sub: 'Signature deep navy + blue', dark: true, pair: 'platinum', accent: '#2f7cf6', bg: '#050a16', side: '#070d1c', panel: '#0b1324' },
  { id: 'platinum', name: 'Platinum Enterprise', sub: 'Clean slate-on-white', dark: false, pair: 'navy', accent: '#475569', bg: '#f4f5f8', side: '#ffffff', panel: '#ffffff' },
  { id: 'midnightpro', name: 'Midnight Pro', sub: 'Near-black, high contrast', dark: true, pair: 'arctic', accent: '#3b82f6', bg: '#02050c', side: '#04070f', panel: '#070b16' },
  { id: 'graphite', name: 'Graphite Executive', sub: 'Neutral charcoal tones', dark: true, pair: 'minimal', accent: '#6b7280', bg: '#0c0d10', side: '#0f1013', panel: '#151619' },
  { id: 'arctic', name: 'Arctic Silver', sub: 'Cool light, muted blue-gray', dark: false, pair: 'midnightpro', accent: '#64748b', bg: '#eef1f7', side: '#ffffff', panel: '#ffffff' },
  { id: 'ocean', name: 'Ocean Enterprise', sub: 'Deep teal + cyan accents', dark: true, pair: 'arctic', accent: '#06b6d4', bg: '#03131a', side: '#051a22', panel: '#07212b' },
  { id: 'royal', name: 'Royal Blue', sub: 'Rich indigo-blue', dark: true, pair: 'platinum', accent: '#4f5fe8', bg: '#060a1c', side: '#080d20', panel: '#0d1430' },
  { id: 'minimal', name: 'Minimal White', sub: 'Flat, airy, minimal chrome', dark: false, pair: 'graphite', accent: '#2563eb', bg: '#fafafa', side: '#ffffff', panel: '#ffffff' },
  { id: 'darkexec', name: 'Dark Executive', sub: 'Black + warm gold accent', dark: true, pair: 'minimal', accent: '#d4af37', bg: '#0a0a0d', side: '#0c0c10', panel: '#131317' }
];

export const DEFAULT_CUSTOM_TOKENS: CustomThemeTokens = {
  primary: '#2f7cf6',
  secondary: '#1d5fd8',
  background: '#050a16',
  surface: '#0b1324',
  sidebar: '#070d1c',
  text: '#e6ebf5',
  muted: '#7d8aa5',
  border: '#1a2540',
  success: '#22c88a',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#22d3ee',
  radius: 14,
  shadow: 1,
  sidebarWidth: 260,
  density: 1,
  fontScale: 1,
  animSpeed: 1,
  backgroundStyle: 'solid'
};
