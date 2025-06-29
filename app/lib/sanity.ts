import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Read-only client for general use
export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "wpi7zh8u",
  useCdn: false,
});

// Write client for server-side operations (with token)
export const writeClient = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "wpi7zh8u",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true, // Add this for server-side usage
});

// Add more detailed logging
console.log('Sanity Configuration:');
console.log('- Project ID:', 'wpi7zh8u');
console.log('- Dataset:', 'production');
console.log('- Token configured:', !!process.env.SANITY_API_TOKEN);
console.log('- Token length:', process.env.SANITY_API_TOKEN?.length || 0);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}