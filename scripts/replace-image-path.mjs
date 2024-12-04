#!/usr/bin/env zx

import { readdir, readFile, writeFile, stat } from "fs/promises";
import path from "path";

// 作業ディレクトリを指定
const baseDir = "/workspace";
const articlesDir = path.join(baseDir, "articles");
const booksDir = path.join(baseDir, "books");

// 画像パスの置換ロジック
async function replaceImagePaths(targetPath) {
  const stats = await stat(targetPath);

  if (stats.isDirectory()) {
    // ディレクトリ内のファイル・フォルダを取得
    const entries = await readdir(targetPath, { withFileTypes: true });

    // 各エントリを処理
    for (const entry of entries) {
      const fullPath = path.join(targetPath, entry.name);

      if (entry.isDirectory()) {
        // サブディレクトリがあれば再帰的に処理
        await replaceImagePaths(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        // .md ファイルの場合、内容を読み込んで置換
        await processMarkdownFile(fullPath);
      }
    }
  } else if (stats.isFile() && targetPath.endsWith(".md")) {
    // 単一の .md ファイルの場合
    await processMarkdownFile(targetPath);
  } else {
    console.log(`Skipped: ${targetPath} (not a markdown file or directory)`);
  }
}

// Markdown ファイルを処理
async function processMarkdownFile(filePath) {
  const content = await readFile(filePath, "utf-8");
  const updatedContent = content.replace(/(?:\.\.\/)+images\//g, "/images/");

  // 内容が変更された場合のみファイルを更新
  if (content !== updatedContent) {
    await writeFile(filePath, updatedContent, "utf-8");
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`No changes: ${filePath}`);
  }
}

// メイン処理
(async () => {
  const args = process.argv.slice(3); // コマンドライン引数を取得

  if (args.length > 0) {
    // 引数が指定された場合、指定されたパスを処理
    const targetPath = args[0];
    try {
      await replaceImagePaths(targetPath);
    } catch (error) {
      console.error(`Error processing ${targetPath}:`, error);
    }
  } else {
    // 引数がない場合、デフォルトの articles と books を処理
    console.log("No arguments provided. Processing default directories...");
    try {
      await replaceImagePaths(articlesDir);
      await replaceImagePaths(booksDir);
    } catch (error) {
      console.error("Error processing default directories:", error);
    }
  }

  console.log("Replacement completed!");
})();
