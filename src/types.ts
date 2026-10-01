export type ProductCategory = 'entertainment' | 'iptv' | 'software' | 'gaming_vpn';

export interface ProductVariant {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  inStock: boolean;
  stockCount: number;
  status: 'published' | 'draft';
  badge?: string;
  description: string;
  features: string[];
  variants: ProductVariant[];
  imageUrl: string;
  licenseType: 'code' | 'account_invite' | 'credentials' | 'm3u_stream';
}

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  product: Product;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'completed' | 'processing' | 'pending' | 'cancelled';
export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'card' | 'whatsapp';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  discount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  licenseKey?: string;
  createdAt: string;
  notes?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  sub: string;
  dark: boolean;
  pair: string;
  accent: string;
  bg: string;
  side: string;
  panel: string;
}

export interface CustomThemeTokens {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  sidebar: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  radius: number;
  shadow: number;
  sidebarWidth: number;
  density: number;
  fontScale: number;
  animSpeed: number;
  backgroundStyle: 'solid' | 'gradient' | 'mesh' | 'glow';
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ZipFileInfo {
  path: string;
  size: number;
  isDir: boolean;
  content?: string;
}

export interface StorefrontZipInspection {
  fileName: string;
  fileSize: number;
  totalFiles: number;
  frameworkDetected: string;
  packageJson?: Record<string, any>;
  files: ZipFileInfo[];
  inspectedFile?: string;
  uploadedAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  memberTier: 'Silver' | 'Gold' | 'VIP Platinum';
  rewardPoints: number;
  memberSince: string;
  preferredCurrency: string;
  isVerified: boolean;
  notificationPrefs: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
}

export interface CustomerLicense {
  id: string;
  orderNumber: string;
  productName: string;
  category: string;
  duration: string;
  licenseKey: string;
  licenseType: 'code' | 'account_invite' | 'credentials' | 'm3u_stream';
  status: 'active' | 'expiring_soon' | 'expired';
  activatedAt: string;
  expiresAt: string;
  instructions: string;
}
