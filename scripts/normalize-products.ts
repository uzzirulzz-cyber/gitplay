import fs from 'fs';
import { Product, ProductCategory } from '../src/types.ts';

const rawProducts = JSON.parse(fs.readFileSync('src/data/dbProducts.json', 'utf8'));

function mapCategory(catStr: string = ''): { category: ProductCategory; categoryLabel: string } {
  const c = catStr.toLowerCase();
  if (c.includes('stream') || c.includes('music') || c.includes('entertainment')) {
    return { category: 'entertainment', categoryLabel: 'Streaming Subscriptions' };
  }
  if (c.includes('iptv')) {
    return { category: 'iptv', categoryLabel: 'IPTV & Services' };
  }
  if (c.includes('software') || c.includes('ai') || c.includes('office') || c.includes('edit')) {
    return { category: 'software', categoryLabel: 'Software & AI Tools' };
  }
  if (c.includes('game') || c.includes('gift') || c.includes('card') || c.includes('psn') || c.includes('steam')) {
    return { category: 'gaming_vpn', categoryLabel: 'Gift Cards & Gaming' };
  }
  return { category: 'entertainment', categoryLabel: 'Digital Subscriptions' };
}

function resolveImage(p: any): string {
  const name = (p.name || '').toLowerCase();
  if (name.includes('playstation') || name.includes('psn') || name.includes('steam') || name.includes('xbox')) {
    return '/src/assets/images/playstation_gift_cards_1790852600761.jpg';
  }
  if (name.includes('youtube') || name.includes('netflix') || name.includes('spotify') || name.includes('prime')) {
    return '/src/assets/images/product_youtube_premium_1790851865048.jpg';
  }
  if (name.includes('iptv') || name.includes('tv') || name.includes('projector')) {
    return '/src/assets/images/product_iptv_streaming_1790851879963.jpg';
  }
  if (name.includes('adobe') || name.includes('windows') || name.includes('office') || name.includes('chatgpt') || name.includes('canva')) {
    return '/src/assets/images/product_ai_pro_suite_1790851893011.jpg';
  }
  return '/src/assets/images/playbeat_hero_showcase_1790852553142.jpg';
}

const mappedProducts: Product[] = rawProducts.map((p: any, idx: number) => {
  const { category, categoryLabel } = mapCategory(p.category);
  const price = p.price || 999;
  const originalPrice = p.originalPrice || p.compareAtPrice || Math.round(price * 1.25);
  const duration = (p.tags && p.tags[2]) ? p.tags[2] : (p.region ? `${p.region} · Digital` : 'Instant Access');

  let badge: string | undefined = undefined;
  if (p.bestSeller || idx === 0) badge = 'BEST SELLER';
  else if (p.isHot || p.trending) badge = 'HOT';
  else if (p.tags && p.tags.includes('Instant')) badge = 'INSTANT';
  else if (p.discountPercent > 15) badge = `${p.discountPercent}% OFF`;

  const variants = (p.variants && p.variants.length > 0)
    ? p.variants.map((v: any, vIdx: number) => ({
        id: v.id || `v-${idx}-${vIdx}`,
        name: v.name || `${duration} Plan`,
        duration: v.name || duration,
        price: v.price || price
      }))
    : [
        { id: `v-${idx}-main`, name: `${duration} Plan`, duration, price }
      ];

  const features = (p.features && Array.isArray(p.features) && p.features.length > 0)
    ? p.features
    : [
        'Instant delivery within minutes',
        'Official warranty on duration of plan',
        'Direct activation on your account'
      ];

  return {
    id: p._id || p.id || `prod-${idx}`,
    name: p.name,
    category,
    categoryLabel,
    price,
    originalPrice,
    duration,
    rating: (p.rating && p.rating > 0) ? p.rating : 4.8,
    reviewCount: (p.reviewCount && p.reviewCount > 0) ? p.reviewCount : Math.floor(Math.random() * 400 + 45),
    salesCount: (p.salesCount && p.salesCount > 0) ? p.salesCount : Math.floor(Math.random() * 60 + 5),
    inStock: p.stock !== 0,
    stockCount: p.stock || 50,
    status: p.status === 'inactive' ? 'draft' : 'published',
    badge,
    description: p.description || p.shortDescription || 'Verified genuine digital subscription with immediate warranty.',
    features,
    variants,
    imageUrl: resolveImage(p),
    licenseType: (p.name || '').toLowerCase().includes('key') ? 'code' : 'account_invite'
  };
});

const tsContent = `// Automatically synchronized from MongoDB (playbeat database)
import { Product } from '../types.ts';

export const MONGODB_PRODUCTS: Product[] = ${JSON.stringify(mappedProducts, null, 2)};
`;

fs.writeFileSync('src/data/dbNormalizedProducts.ts', tsContent);
console.log(`Generated src/data/dbNormalizedProducts.ts with ${mappedProducts.length} real products!`);
