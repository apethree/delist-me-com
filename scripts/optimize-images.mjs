import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');

// Configuration
const EXTERNAL_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1492112007959-c35ae067c37b?q=80&w=1584&auto=format&fit=crop',
    name: 'feature-silence.webp'
  },
  {
    url: 'https://images.unsplash.com/photo-1653762381400-2762e3a403e5?q=80&w=3271&auto=format&fit=crop',
    name: 'feature-reclaim.webp'
  },
  {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=90&w=1200',
    name: 'feature-peace.webp'
  },
  {
    url: 'https://i.pravatar.cc/100?img=11',
    name: 'avatar-1.webp'
  },
  {
    url: 'https://i.pravatar.cc/100?img=12',
    name: 'avatar-2.webp'
  },
  {
    url: 'https://i.pravatar.cc/100?img=13',
    name: 'avatar-3.webp'
  },
  {
    url: 'https://i.pravatar.cc/100?img=14',
    name: 'avatar-4.webp'
  }
];

const LOCAL_IMAGES = [
  { input: 'hero-image.png', output: 'hero-image.webp' },
  { input: 'ai.gif', output: 'ai.webp', animated: true },
  { input: 'images/happy-people.png', output: 'images/happy-people.webp' },
  { input: 'placeholder-logo.png', output: 'placeholder-logo.webp' },
  { input: 'placeholder-user.jpg', output: 'placeholder-user.webp' },
  { input: 'placeholder.jpg', output: 'placeholder.webp' },
];

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function optimize() {
  console.log('Starting image optimization...');

  // 1. Process Local Images
  for (const img of LOCAL_IMAGES) {
    try {
      const inputPath = path.join(PUBLIC_DIR, img.input);
      const outputPath = path.join(PUBLIC_DIR, img.output);
      
      // Check if input exists
      try {
        await fs.access(inputPath);
      } catch {
        console.warn(`Skipping missing file: ${img.input}`);
        continue;
      }

      console.log(`Optimizing ${img.input} -> ${img.output}...`);
      
      if (img.animated) {
        await sharp(inputPath, { animated: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
      } else {
        await sharp(inputPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
      }
    } catch (error) {
      console.error(`Error processing ${img.input}:`, error);
    }
  }

  // 2. Download and Optimize External Images
  const downloadDir = path.join(PUBLIC_DIR, 'images', 'features');
  await fs.mkdir(downloadDir, { recursive: true });
  const avatarDir = path.join(PUBLIC_DIR, 'images', 'avatars');
  await fs.mkdir(avatarDir, { recursive: true });

  for (const img of EXTERNAL_IMAGES) {
    try {
      const outputPath = img.name.startsWith('avatar') 
        ? path.join(avatarDir, img.name)
        : path.join(downloadDir, img.name); // features/name

        // Correct path logic
      const finalDir = path.dirname(outputPath);
      const fileName = path.basename(outputPath);
      
      console.log(`Downloading and optimizing ${fileName}...`);
      
      const buffer = await downloadImage(img.url);
      
      await sharp(buffer)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
        
    } catch (error) {
      console.error(`Error processing external image ${img.name}:`, error);
    }
  }

  console.log('Image optimization complete!');
}

optimize();
