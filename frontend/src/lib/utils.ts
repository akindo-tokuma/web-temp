import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 配列のオブジェクトをCSV形式に変換し、ダウンロードをトリガーする
 * @param data - ダウンロードしたいデータ（オブジェクト配列）
 * @param filename - 保存するファイル名（例: "data.csv"）
 */
export function downloadAsCSV(data: Record<string, unknown>[], filename: string) {
  if (!data || data.length === 0) return;
  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.join(","), // ヘッダー
    ...data.map(row =>
      keys.map(k => {
        const val = row[k];
        // カンマや改行を含む場合はダブルクォートで囲む
        const escaped = String(val ?? "").replace(/"/g, '""');
        return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
      }).join(",")
    )
  ];
  const csvContent = csvRows.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * 配列のオブジェクトをXML形式に変換し、ダウンロードをトリガーする
 * @param data - ダウンロードしたいデータ（オブジェクト配列）
 * @param filename - 保存するファイル名（例: "data.xml"）
 * @param rootName - ルート要素名（省略時は "items"）
 */
export function downloadAsXML(
  data: Record<string, unknown>[],
  filename: string,
  rootName: string = "items"
) {
  if (!data || data.length === 0) return;
  const itemName = "item";
  const escapeXml = (unsafe: string): string =>
    unsafe.replace(/[<>&'"]/g, (c) => {
      if (c === "<") return "<";
      if (c === ">") return ">";
      if (c === "&") return "&";
      if (c === "'") return "'";
      if (c === '"') return '"';
      return c;
    });
  const xmlRows = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<${rootName}>`,
    ...data.map(row =>
      `  <${itemName}>` +
      Object.entries(row)
        .map(([k, v]) => `<${k}>${escapeXml(String(v ?? ""))}</${k}>`)
        .join("") +
      `</${itemName}>`
    ),
    `</${rootName}>`
  ];
  const xmlContent = xmlRows.join("\n");
  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
