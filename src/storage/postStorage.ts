import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../data/posts.json");

function ensureFileExists() {
   if (!fs.existsSync(FILE_PATH)) {
      fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
   }
}

export function getLastPosts(limit = 10): string[] {
   ensureFileExists();

   const raw = fs.readFileSync(FILE_PATH, "utf-8");
   const posts: string[] = JSON.parse(raw);

   return posts.slice(-limit);
}

export function savePost(text: string) {
   ensureFileExists();

   const raw = fs.readFileSync(FILE_PATH, "utf-8");
   const posts: string[] = JSON.parse(raw);

   posts.push(text);

   // ограничим до 20 последних
   const trimmed = posts.slice(-20);

   fs.writeFileSync(FILE_PATH, JSON.stringify(trimmed, null, 2));
}
