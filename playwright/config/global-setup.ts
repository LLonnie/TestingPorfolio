import dotenv from "dotenv";
import path from "path";

export default async function globalSetup() {
  // Load .env file
  dotenv.config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
  });
}
