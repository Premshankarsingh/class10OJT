import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "app", "data");

export function readJsonFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function writeJsonFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getJsonFiles() {
  return fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
}
