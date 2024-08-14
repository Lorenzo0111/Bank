import sharp from "sharp";

export async function optimizeImage(image: Buffer) {
  return await sharp(image)
    .resize(256, 256, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function resizeImage(
  image: Buffer,
  width: number,
  quality: number,
) {
  return await sharp(image)
    .resize(width, width, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();
}
