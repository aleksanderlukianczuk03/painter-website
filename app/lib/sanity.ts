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


const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}