import type { Product } from '../types/product';

const categories = ['Electronics', 'Audio', 'Computers', 'Mobile', 'Gaming', 'Wearables', 'Accessories'];

const productNames = {
  Electronics: ['Smart TV', 'Tablet', 'E-Reader', 'Digital Camera', 'Action Camera', 'Drone'],
  Audio: ['Wireless Headphones', 'Earbuds', 'Bluetooth Speaker', 'Soundbar', 'Studio Monitors', 'Microphone'],
  Computers: ['Laptop', 'Desktop PC', 'Monitor', 'Keyboard', 'Mouse', 'Webcam'],
  Mobile: ['Smartphone', 'Phone Case', 'Screen Protector', 'Wireless Charger', 'Power Bank', 'Car Mount'],
  Gaming: ['Gaming Console', 'Controller', 'Gaming Headset', 'Gaming Chair', 'Gaming Mouse', 'Mechanical Keyboard'],
  Wearables: ['Smartwatch', 'Fitness Tracker', 'Smart Ring', 'Smart Glasses', 'Heart Rate Monitor'],
  Accessories: ['USB Cable', 'Adapter', 'External SSD', 'Memory Card', 'Laptop Bag', 'Phone Stand']
};

const brands = ['TechPro', 'SoundWave', 'PixelMax', 'GameForce', 'SmartLife', 'Premium', 'Elite', 'Ultra'];
const adjectives = ['Pro', 'Plus', 'Max', 'Lite', 'Air', 'Mini', 'Ultra', 'Premium', 'Elite', 'Essential'];

function generateProducts(): Product[] {
  const products: Product[] = [];
  let idCounter = 1;

  categories.forEach(category => {
    const categoryProducts = productNames[category as keyof typeof productNames];

    // Generate 30-40 products per category
    for (let i = 0; i < 35; i++) {
      const baseName = categoryProducts[i % categoryProducts.length];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const variant = i > categoryProducts.length ? ` ${adj}` : '';

      const id = `itm_${String(idCounter).padStart(3, '0')}`;
      const price = parseFloat((Math.random() * 900 + 50).toFixed(2));
      const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 - 5.0
      const reviewCount = Math.floor(Math.random() * 500) + 10;
      const inStock = Math.random() > 0.15; // 85% in stock

      // Generate tags based on category and random attributes
      const tags: string[] = [category.toLowerCase()];
      if (baseName.toLowerCase().includes('wireless') || Math.random() > 0.7) tags.push('wireless');
      if (price > 500) tags.push('premium');
      if (rating > 4.5) tags.push('top-rated');
      if (Math.random() > 0.7) tags.push('bestseller');
      if (Math.random() > 0.8) tags.push('new');

      // Generate random date within last 2 years
      const daysAgo = Math.floor(Math.random() * 730);
      const updatedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

      // Generate specifications based on category
      const specifications: Record<string, string> = {};
      if (category === 'Electronics' || category === 'Computers') {
        specifications['Screen Size'] = `${Math.floor(Math.random() * 20 + 13)}"`;
        specifications['Resolution'] = ['1920x1080', '2560x1440', '3840x2160'][Math.floor(Math.random() * 3)];
      }
      if (category === 'Audio') {
        specifications['Battery Life'] = `${Math.floor(Math.random() * 30 + 10)} hours`;
        specifications['Driver Size'] = `${Math.floor(Math.random() * 10 + 40)}mm`;
      }
      if (category === 'Gaming') {
        specifications['Platform'] = ['PlayStation', 'Xbox', 'PC', 'Multi-platform'][Math.floor(Math.random() * 4)];
        specifications['Color'] = ['Black', 'White', 'Red', 'Blue'][Math.floor(Math.random() * 4)];
      }
      specifications['Weight'] = `${(Math.random() * 2 + 0.2).toFixed(1)} kg`;
      specifications['Brand'] = brand;

      const product: Product = {
        id,
        name: `${brand} ${baseName}${variant}`,
        price,
        currency: 'ZAR',
        rating,
        reviewCount,
        tags,
        category,
        inStock,
        imageUrl: `https://placehold.co/400x400/e2e8f0/475569?text=${encodeURIComponent(baseName)}`,
        description: `Experience the ${brand} ${baseName}${variant} - a perfect blend of performance and design. ${baseName} designed for modern users who demand quality and reliability. Features cutting-edge technology and premium materials for an exceptional user experience.`,
        specifications,
        updatedAt,
        images: [
          `https://placehold.co/800x800/e2e8f0/475569?text=${encodeURIComponent(baseName)}`,
          `https://placehold.co/800x800/cbd5e1/334155?text=${encodeURIComponent(baseName + ' 2')}`,
          `https://placehold.co/800x800/94a3b8/1e293b?text=${encodeURIComponent(baseName + ' 3')}`
        ]
      };

      products.push(product);
      idCounter++;
    }
  });

  return products;
}

export const mockProducts = generateProducts();
