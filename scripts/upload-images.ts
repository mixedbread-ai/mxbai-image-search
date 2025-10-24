#!/usr/bin/env bun

import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { Mixedbread } from "@mixedbread/sdk";

const apiKey = process.env.MXBAI_API_KEY;
const storeId = process.env.MXBAI_STORE_ID;

if (!apiKey || !storeId) {
  console.error("MXBAI_API_KEY and MXBAI_STORE_ID must be set");
  process.exit(1);
}

const mxbai = new Mixedbread({ apiKey });
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

async function getImageFiles(directory: string): Promise<string[]> {
  const files = await readdir(directory, {
    recursive: true,
    withFileTypes: true,
  });
  return files
    .filter((file) => file.isFile())
    .filter((file) =>
      IMAGE_EXTENSIONS.includes(extname(file.name).toLowerCase()),
    )
    .map((file) => join(file.parentPath || "", file.name));
}

async function uploadImage(filePath: string): Promise<void> {
  try {
    console.log(`Uploading ${filePath}`);
    const response = await mxbai.stores.files.upload({
      // biome-ignore lint/style/noNonNullAssertion: storeId is validated at script start
      storeIdentifier: storeId!,
      file: Bun.file(filePath),
    });
    console.log(`Uploaded ${filePath} with ID ${response.id}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to upload ${filePath}: ${message}`);
  }
}

async function main() {
  const directory = process.argv[2];

  if (!directory) {
    console.log("Usage: bun scripts/upload-images.ts <directory>");
    process.exit(1);
  }

  console.log(`Searching for images in ${directory}`);
  const imageFiles = await getImageFiles(directory);

  if (imageFiles.length === 0) {
    console.log("No images found");
    process.exit(0);
  }

  console.log(`Found ${imageFiles.length} images`);

  await Promise.all(imageFiles.map((filePath) => uploadImage(filePath)));

  // biome-ignore lint/style/noNonNullAssertion: storeId is validated at script start
  const store = await mxbai.stores.retrieve(storeId!);
  console.log("Upload complete");
  console.log("Store file counts:", store.file_counts);
}

main().catch(console.error);
