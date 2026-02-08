import dotenv from "dotenv";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default async function globalSetup() {
  // Load .env file
  dotenv.config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
  });
}
