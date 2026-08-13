import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAssets() {
  const logoBuffer = fs.readFileSync('public/logo-new.webp');
  
  // Extract emblem
  const emblemBuf = await sharp(logoBuffer)
    .extract({ left: 30, top: 10, width: 285, height: 285 })
    .png()
    .toBuffer();
  
  const trimmedEmblemBuf = await sharp(emblemBuf)
    .trim()
    .png()
    .toBuffer();
  
  const emblemSize = 512;
  const pad = 40;
  const innerSize = emblemSize - (pad * 2);
  
  const resizedEmblem = await sharp(trimmedEmblemBuf)
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
    
  const squareIcon512 = await sharp({
    create: {
      width: emblemSize,
      height: emblemSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedEmblem, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync('public/favicon-512x512.png', squareIcon512);

  const icon192 = await sharp(squareIcon512).resize(192, 192).png().toBuffer();
  fs.writeFileSync('public/favicon-192x192.png', icon192);

  const icon32 = await sharp(squareIcon512).resize(32, 32).png().toBuffer();
  fs.writeFileSync('public/favicon-32x32.png', icon32);

  const icon16 = await sharp(squareIcon512).resize(16, 16).png().toBuffer();
  fs.writeFileSync('public/favicon-16x16.png', icon16);

  const appleTouch = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 10, g: 10, b: 12, alpha: 1 }
    }
  })
  .composite([{ input: await sharp(trimmedEmblemBuf).resize(130, 130, { fit: 'contain' }).png().toBuffer(), gravity: 'center' }])
  .png()
  .toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', appleTouch);
  fs.writeFileSync('public/favicon2.png', icon192);

  // favicon.ico container format with 32x32 and 16x16 PNG entries
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type 1 = icon
  icoHeader.writeUInt16LE(2, 4); // 2 images (32x32 and 16x16)

  const offset1 = 6 + 16 * 2;
  const offset2 = offset1 + icon32.length;

  const dir1 = Buffer.alloc(16);
  dir1.writeUInt8(32, 0); // width
  dir1.writeUInt8(32, 1); // height
  dir1.writeUInt8(0, 2); // colors
  dir1.writeUInt8(0, 3); // reserved
  dir1.writeUInt16LE(1, 4); // color planes
  dir1.writeUInt16LE(32, 6); // bpp
  dir1.writeUInt32LE(icon32.length, 8); // size
  dir1.writeUInt32LE(offset1, 12); // offset

  const dir2 = Buffer.alloc(16);
  dir2.writeUInt8(16, 0); // width
  dir2.writeUInt8(16, 1); // height
  dir2.writeUInt8(0, 2); // colors
  dir2.writeUInt8(0, 3); // reserved
  dir2.writeUInt16LE(1, 4); // color planes
  dir2.writeUInt16LE(32, 6); // bpp
  dir2.writeUInt32LE(icon16.length, 8); // size
  dir2.writeUInt32LE(offset2, 12); // offset

  const icoBuf = Buffer.concat([icoHeader, dir1, dir2, icon32, icon16]);
  fs.writeFileSync('public/favicon.ico', icoBuf);

  // Open Graph & Twitter & WhatsApp Share Image (1200x630)
  const fullLogoTrimmed = await sharp(logoBuffer).trim().png().toBuffer();
  const logoResizedForOG = await sharp(fullLogoTrimmed)
    .resize(720, 160, { fit: 'inside' })
    .png()
    .toBuffer();

  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="greenGlow" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
        <stop offset="0%" stop-color="#BAFC50" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="#10b981" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0e1014"/>
        <stop offset="100%" stop-color="#040506"/>
      </linearGradient>
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#BAFC50" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#27272a" stop-opacity="0.2"/>
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <circle cx="600" cy="280" r="450" fill="url(#greenGlow)"/>
    <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="url(#borderGrad)" stroke-width="1.5"/>
    
    <g transform="translate(600, 130)">
      <rect x="-150" y="-18" width="300" height="36" rx="18" fill="#18181b" stroke="#BAFC50" stroke-width="1" stroke-opacity="0.6"/>
      <circle cx="-120" cy="0" r="4" fill="#BAFC50"/>
      <text x="-105" y="5" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#BAFC50" letter-spacing="2">MĀJASLAPU IZSTRĀDE</text>
    </g>

    <text x="600" y="445" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#f4f4f5" letter-spacing="0.5">
      Mūsdienīgs dizains · Ātra veiktspēja · SEO optimizācija
    </text>

    <text x="600" y="495" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="#a1a1aa">
      https://sageonmedia.eu
    </text>
  </svg>`;

  const ogMeta = await sharp(logoResizedForOG).metadata();
  const ogLeft = Math.round((1200 - (ogMeta.width || 720)) / 2);

  const ogComposite = await sharp(Buffer.from(ogSvg))
    .composite([
      { input: logoResizedForOG, top: 205, left: ogLeft }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync('public/og-image.png', ogComposite);
  
  const ogJpg = await sharp(ogComposite).jpeg({ quality: 90 }).toBuffer();
  fs.writeFileSync('public/og-image.jpg', ogJpg);

  // 400x400 square for public/images/logo_share.png (specifically used by WhatsApp, Telegram, iMessage)
  const shareLogoSvg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="greenGlowSquare" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#BAFC50" stop-opacity="0.4"/>
        <stop offset="60%" stop-color="#10b981" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="bgGradSquare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d0f12"/>
        <stop offset="100%" stop-color="#050607"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bgGradSquare)"/>
    <circle cx="200" cy="200" r="180" fill="url(#greenGlowSquare)"/>
    <rect x="12" y="12" width="376" height="376" rx="28" fill="none" stroke="#BAFC50" stroke-width="1.5" stroke-opacity="0.4"/>
  </svg>`;

  const logoShareEmblem = await sharp(trimmedEmblemBuf).resize(240, 240, { fit: 'contain' }).png().toBuffer();
  const logoShareBuf = await sharp(Buffer.from(shareLogoSvg))
    .composite([
      { input: logoShareEmblem, gravity: 'center' }
    ])
    .png()
    .toBuffer();

  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  fs.writeFileSync('public/images/logo_share.png', logoShareBuf);

  console.log('SUCCESS: Generated all favicons, apple touch icon, og-image, and logo_share.png');
}

generateAssets().catch(console.error);
