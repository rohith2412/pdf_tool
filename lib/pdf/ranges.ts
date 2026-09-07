export function parseRanges(input: string, totalPages: number): number[] {
  const out = new Set<number>();
  for (const chunk of input.split(",")) {
    const s = chunk.trim();
    if (!s) continue;
    const m = s.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      let a = parseInt(m[1], 10);
      let b = parseInt(m[2], 10);
      if (isNaN(a) || isNaN(b)) throw new Error(`Bad range: ${s}`);
      if (a > b) [a, b] = [b, a];
      for (let i = a; i <= b; i++) {
        if (i >= 1 && i <= totalPages) out.add(i);
      }
    } else {
      const n = parseInt(s, 10);
      if (isNaN(n)) throw new Error(`Bad page: ${s}`);
      if (n >= 1 && n <= totalPages) out.add(n);
    }
  }
  return [...out].sort((x, y) => x - y);
}

export function downloadBlob(bytes: Uint8Array | ArrayBuffer, filename: string, mime: string) {
  const part: BlobPart = bytes instanceof Uint8Array ? (bytes as BlobPart) : new Uint8Array(bytes);
  const blob = new Blob([part], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
