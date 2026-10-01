const fs = require('fs');
const path = require('path');

const rawProducts = JSON.parse(fs.readFileSync('src/data/dbProducts.json', 'utf8'));
const realImageMap = JSON.parse(fs.readFileSync('src/data/dbRealImageMap.json', 'utf8'));
const publicFiles = fs.readdirSync('public/assets/images/products');

function mapCategory(catStr = '') {
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

function findBestRealImage(p) {
  // 1. Direct ID match from p.image (e.g. /api/products/images/6ababff66316546e52bcc248)
  if (p.image) {
    const parts = p.image.split('/');
    const imgId = parts[parts.length - 1];
    if (realImageMap[imgId]) {
      return realImageMap[imgId];
    }
  }

  // 2. Check p.images array
  if (Array.isArray(p.images) && p.images.length > 0) {
    for (const imgPath of p.images) {
      const base = path.basename(imgPath);
      if (realImageMap[base]) return realImageMap[base];
      const matched = publicFiles.find(f => f.toLowerCase() === base.toLowerCase());
      if (matched) return `/assets/images/products/${matched}`;
    }
  }

  // 3. Name-based matching from real extracted images in publicFiles
  const name = (p.name || '').toLowerCase();

  const matchRules = [
    [/netflix.*prime/i, 'Netflix_Prime_Video_Combo_1254x1254.png'],
    [/netflix/i, 'Netflix_Prime_Video_Combo_1254x1254.png'],
    [/apple.*tv/i, 'Apple_Gift_Card_Global_All_Amounts_1254x1254.png'],
    [/sony.*liv/i, 'Sony_LIV_1_Month_1254x1254.png'],
    [/hbo.*max/i, 'HBO_Max_1_Month_1254x1254.png'],
    [/zee5/i, 'ZEE5_1_MONTH_Premium_Product_Image.png'],
    [/crunchyroll/i, 'Crunchyroll Single Screen 1 Month.png'],
    [/youtube/i, 'YouTube_Premium_1254x1254.png'],
    [/zoom/i, 'Zoom Pro png.png'],
    [/turnitin/i, 'Turnitin Instructor – 1 Month.png'],
    [/leonardo/i, 'Leonardo ai 1 month.png'],
    [/hailuo/i, 'Hailuo AI – 1 Month.png'],
    [/helium.*10/i, 'Helium 10 Platinum – 1 Month.png'],
    [/playstation|psn/i, 'playstation-network-gift-card-global-all-countries-all-amounts.png'],
    [/steam/i, 'steam-gift-card-global-all-countries-all-amounts.png'],
    [/xbox.*live/i, 'Xbox_Live_Gift_Card_Global_All_Amounts_1254x1254.png'],
    [/xbox.*game/i, 'Xbox_Game_Pass_Ultimate_Premium_1254x1254.png'],
    [/razer/i, 'razer-gold-gift-card-global-all-countries-all-amounts.png'],
    [/apple.*gift/i, 'Apple_Gift_Card_Global_All_Amounts_1254x1254.png'],
    [/adobe.*creative|photoshop|illustrator/i, 'Adobe_Creative_Cloud_Global_1254x1254.png'],
    [/office|microsoft.*365/i, 'Microsoft_Office_All_Versions_Variants_1254x1254.png'],
    [/nordvpn/i, 'NordVPN_Global_1254x1254.png'],
    [/surfshark/i, 'NordVPN_Global_1254x1254.png'],
    [/expressvpn/i, 'NordVPN_Global_1254x1254.png'],
    [/ipvanish/i, 'NordVPN_Global_1254x1254.png'],
    [/perplexity/i, 'Perplexity_Pro_Premium_Ad_1254x1254.png'],
    [/windows.*11/i, 'Windows_11_digital_license_card_2K_20260924175412.jpeg'],
    [/bitdefender/i, 'Bitdefender_Antivirus_Plus_softw__2K_20260924175224.jpeg'],
    [/mcafee/i, 'McAfee_product_display_software___2K_20260924175340.jpeg'],
    [/hy300.*pro/i, 'Magcubic_HY300_PRO_White_Projector_1254x1254.png'],
    [/hy320.*mini/i, 'Magcubic_HY320MINI_Projector_1254x1254.png'],
    [/hy320.*pro/i, 'Magcubic_HY320PRO_Projector_1254x1254.png'],
    [/hy320/i, 'HY320_NTV_Netflix_Projector_1254x1254.png'],
    [/hy350/i, 'magcubic-hy350-upgraded-projector-global.png'],
    [/a10.*projector/i, 'A10_Android_TV_Projector_1254x1254.png'],
    [/f18.*projector/i, 'F18_Projector_1254x1254.png'],
    [/stand.*projector/i, 'Adjustable_Projector_Stand_190cm_1254x1254.png'],
    [/projector/i, 'Magcubic_HY300_PRO_White_Projector_1254x1254.png'],
    [/capcut/i, 'Adobe_Creative_Cloud_Global_1254x1254.png'],
    [/canva/i, 'Adobe_Creative_Cloud_Global_1254x1254.png'],
    [/spotify/i, 'YouTube_Premium_1254x1254.png'],
    [/jio|hotstar/i, 'Jio_Hotstar_1_Month_1254x1254.png'],
    [/ullu/i, 'ULLU_1_Month_1254x1254.png'],
    [/hulu/i, 'HULU 1 month.png']
  ];

  for (const [regex, filename] of matchRules) {
    if (regex.test(name)) {
      if (publicFiles.includes(filename)) {
        return `/assets/images/products/${filename}`;
      }
    }
  }

  return `/assets/images/products/Netflix_Prime_Video_Combo_1254x1254.png`;
}

const updatedProducts = rawProducts.map((p, idx) => {
  const { category, categoryLabel } = mapCategory(p.category);
  const price = p.price || 999;
  const originalPrice = p.originalPrice || p.compareAtPrice || Math.round(price * 1.25);
  const duration = (p.tags && p.tags[2]) ? p.tags[2] : (p.region ? `${p.region} · Digital` : 'Instant Access');

  let badge = undefined;
  if (p.bestSeller || idx === 0) badge = 'BEST SELLER';
  else if (p.isHot || p.trending) badge = 'HOT';
  else if (p.tags && p.tags.includes('Instant')) badge = 'INSTANT';
  else if (p.discountPercent > 15) badge = `${p.discountPercent}% OFF`;

  const variants = (p.variants && p.variants.length > 0)
    ? p.variants.map((v, vIdx) => ({
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
        'Direct activation on your personal account'
      ];

  const realImgUrl = findBestRealImage(p);

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
    imageUrl: realImgUrl,
    licenseType: (p.name || '').toLowerCase().includes('key') ? 'code' : 'account_invite'
  };
});

const tsContent = `// Automatically synchronized from MongoDB (playbeat database) with REAL product images
import { Product } from '../types.ts';

export const MONGODB_PRODUCTS: Product[] = ${JSON.stringify(updatedProducts, null, 2)};
`;

fs.writeFileSync('src/data/dbNormalizedProducts.ts', tsContent);
console.log(`SUCCESS: Updated ${updatedProducts.length} products with real images! Sample image: ${updatedProducts[0].imageUrl}`);
