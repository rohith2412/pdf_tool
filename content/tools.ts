export type ToolCategory = "operations" | "conversion" | "other";

export type FaqItem = { q: string; a: string };
export type HowToStep = { name: string; text: string };

export type Tool = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  category: ToolCategory;
  shortDescription: string;
  h1: string;
  intro: string;
  steps: HowToStep[];
  faq: FaqItem[];
  related: string[];
  howToSlugs?: string[];
};

export const TOOLS: Tool[] = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    title: "Merge PDF - Combine PDF files in your browser · pdftools",
    description:
      "Merge PDF files into one document, in your browser. No uploads, no signup, no watermark. Fast, private, free.",
    keywords: [
      "merge pdf",
      "combine pdf",
      "join pdf",
      "merge pdf files",
      "combine pdfs online",
      "merge pdf without upload",
    ],
    category: "operations",
    shortDescription: "Combine multiple PDF files into one",
    h1: "Merge PDF files",
    intro:
      "Combine two or more PDFs into a single file. Everything happens in your browser - your PDFs are never uploaded.",
    steps: [
      {
        name: "Add your PDFs",
        text: "Drop PDF files into the box, or click to browse. Add as many as you like.",
      },
      {
        name: "Arrange the order",
        text: "Drag files to reorder them, or remove any file you didn't mean to add.",
      },
      {
        name: "Merge and download",
        text: "Click Merge. The combined PDF downloads to your device - nothing is uploaded.",
      },
    ],
    faq: [
      {
        q: "Is it safe to merge PDFs online here?",
        a: "Yes. The merge runs entirely in your browser using JavaScript. Your files are never sent to a server.",
      },
      {
        q: "Is there a file size limit?",
        a: "There's no hard limit imposed by us. Your browser's memory is the practical ceiling - most desktops handle several hundred MB.",
      },
      {
        q: "Does it work offline?",
        a: "After the page loads once, the tool runs client-side. If your connection drops, merging still works.",
      },
      {
        q: "Are my files uploaded anywhere?",
        a: "No. We never upload, store, or log your PDF contents or file names.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes, on modern iOS and Android browsers. Very large files may hit mobile memory limits.",
      },
      {
        q: "Do I need to sign in?",
        a: "No. Every tool works without an account. Signing in is optional and only saves your preferences.",
      },
    ],
    related: ["split-pdf", "compress-pdf", "rotate-pdf"],
    howToSlugs: ["how-to-merge-pdf"],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    title: "Split PDF - Extract pages from a PDF · pdftools",
    description:
      "Split a PDF by page range or extract single pages, in your browser. No uploads, no signup.",
    keywords: ["split pdf", "extract pdf pages", "split pdf by page", "pdf splitter"],
    category: "operations",
    shortDescription: "Extract pages or split by range",
    h1: "Split PDF",
    intro: "Extract specific pages or ranges from a PDF. Runs in your browser - no uploads.",
    steps: [
      { name: "Open your PDF", text: "Drop your PDF file into the box." },
      { name: "Pick pages", text: "Type page numbers or ranges, e.g. 1-3, 5, 8-10." },
      { name: "Download", text: "Click Split. The extracted PDF downloads instantly." },
    ],
    faq: [
      {
        q: "Are my PDFs uploaded?",
        a: "No. Splitting runs entirely in your browser.",
      },
      {
        q: "Can I split into multiple PDFs at once?",
        a: "Yes. Enter multiple ranges separated by commas.",
      },
    ],
    related: ["merge-pdf", "delete-pages", "reorder-pages"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    title: "Rotate PDF - Rotate pages and save · pdftools",
    description:
      "Rotate PDF pages by 90, 180, or 270 degrees and save the result. Runs in your browser.",
    keywords: ["rotate pdf", "rotate pdf pages", "rotate pdf and save"],
    category: "operations",
    shortDescription: "Rotate specific pages",
    h1: "Rotate PDF pages",
    intro: "Turn pages the right way up and save the result. No uploads.",
    steps: [
      { name: "Open your PDF", text: "Drop the PDF into the box." },
      { name: "Pick angle", text: "Choose 90°, 180°, or 270°." },
      { name: "Download", text: "Click Rotate. Save the corrected PDF." },
    ],
    faq: [
      { q: "Does rotation save with the file?", a: "Yes, rotation is applied to the saved PDF." },
    ],
    related: ["merge-pdf", "reorder-pages", "delete-pages"],
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    title: "Compress PDF - Reduce PDF file size in your browser · pdftools",
    description:
      "Compress PDF files in your browser to reduce file size. No uploads, no signup.",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf"],
    category: "operations",
    shortDescription: "Reduce file size",
    h1: "Compress PDF",
    intro: "Shrink PDF file size in your browser. Everything stays on your device.",
    steps: [
      { name: "Drop your PDF", text: "Add the file you want to compress." },
      { name: "Pick a quality", text: "Choose low, medium, or high compression." },
      { name: "Download", text: "Click Compress. Save the smaller PDF." },
    ],
    faq: [
      { q: "How much smaller will my PDF be?", a: "It depends on the content. Image-heavy PDFs shrink the most." },
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF → JPG",
    title: "PDF to JPG - Convert PDF pages to images · pdftools",
    description: "Convert PDF pages to JPG or PNG images in your browser. No uploads.",
    keywords: ["pdf to jpg", "pdf to image", "pdf to png"],
    category: "conversion",
    shortDescription: "Export each page as an image",
    h1: "PDF to JPG",
    intro: "Turn each PDF page into a high-quality JPG.",
    steps: [
      { name: "Drop your PDF", text: "Add a PDF file." },
      { name: "Choose quality", text: "Pick the DPI you need." },
      { name: "Download", text: "Save each page as an image." },
    ],
    faq: [{ q: "What quality do I get?", a: "Up to 300 DPI, plenty for print." }],
    related: ["jpg-to-pdf", "extract-text", "compress-pdf"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG → PDF",
    title: "JPG to PDF - Combine images into a PDF · pdftools",
    description: "Turn JPG or PNG images into a single PDF in your browser.",
    keywords: ["jpg to pdf", "image to pdf", "combine images into pdf"],
    category: "conversion",
    shortDescription: "Combine images into a PDF",
    h1: "JPG to PDF",
    intro: "Combine multiple images into one PDF, in the order you choose.",
    steps: [
      { name: "Add images", text: "Drop JPG or PNG files." },
      { name: "Reorder", text: "Drag to set page order." },
      { name: "Download", text: "Save the combined PDF." },
    ],
    faq: [{ q: "What formats work?", a: "JPG, PNG, and WEBP." }],
    related: ["pdf-to-jpg", "merge-pdf", "compress-pdf"],
  },
  {
    slug: "extract-text",
    name: "Extract text",
    title: "Extract Text from PDF - In-browser text extraction · pdftools",
    description: "Pull all text out of a PDF file in your browser. No uploads.",
    keywords: ["extract text from pdf", "pdf to text", "pdf text extractor"],
    category: "conversion",
    shortDescription: "Pull all text out of a PDF",
    h1: "Extract text from PDF",
    intro: "Get the plain text of a PDF - quotes, lists, everything.",
    steps: [
      { name: "Drop your PDF", text: "Add the file." },
      { name: "Extract", text: "Click Extract." },
      { name: "Copy or save", text: "Copy the text or download it as .txt." },
    ],
    faq: [
      {
        q: "Does it work on scanned PDFs?",
        a: "Not yet - scanned PDFs need OCR, which is on the roadmap.",
      },
    ],
    related: ["pdf-to-jpg", "merge-pdf", "split-pdf"],
  },
  {
    slug: "add-page-numbers",
    name: "Add page numbers",
    title: "Add Page Numbers to PDF - In your browser · pdftools",
    description: "Insert page numbers on each page of a PDF. Runs in your browser.",
    keywords: ["add page numbers to pdf", "pdf page numbers", "number pdf pages"],
    category: "other",
    shortDescription: "Insert page numbers on each page",
    h1: "Add page numbers to PDF",
    intro: "Add page numbers to any PDF in a single click.",
    steps: [
      { name: "Drop your PDF", text: "Add the file." },
      { name: "Pick placement", text: "Choose bottom-center, bottom-right, etc." },
      { name: "Download", text: "Save the numbered PDF." },
    ],
    faq: [{ q: "Can I skip the first page?", a: "Yes, choose which page to start on." }],
    related: ["merge-pdf", "split-pdf", "rotate-pdf"],
  },
  {
    slug: "delete-pages",
    name: "Delete pages",
    title: "Delete Pages from PDF · pdftools",
    description: "Remove specific pages from a PDF in your browser.",
    keywords: ["delete pdf pages", "remove pdf pages", "delete pages from pdf"],
    category: "operations",
    shortDescription: "Remove pages from a PDF",
    h1: "Delete pages from a PDF",
    intro: "Remove the pages you don't want, keep the rest.",
    steps: [
      { name: "Drop your PDF", text: "Add the file." },
      { name: "Pick pages", text: "Type page numbers to remove." },
      { name: "Download", text: "Save the trimmed PDF." },
    ],
    faq: [{ q: "Can I preview pages?", a: "Yes, thumbnails render in your browser." }],
    related: ["split-pdf", "merge-pdf", "reorder-pages"],
  },
  {
    slug: "reorder-pages",
    name: "Reorder pages",
    title: "Reorder PDF Pages · pdftools",
    description: "Rearrange the pages of a PDF file, in your browser.",
    keywords: ["reorder pdf pages", "rearrange pdf pages", "pdf page order"],
    category: "operations",
    shortDescription: "Rearrange page order",
    h1: "Reorder PDF pages",
    intro: "Drag pages into the order you want.",
    steps: [
      { name: "Drop your PDF", text: "Add the file." },
      { name: "Drag pages", text: "Rearrange thumbnails." },
      { name: "Download", text: "Save the reordered PDF." },
    ],
    faq: [{ q: "Is the original PDF changed?", a: "No - a new file is generated." }],
    related: ["merge-pdf", "split-pdf", "delete-pages"],
  },
];

export type HowToPageMeta = {
  slug: string;
  toolSlug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  lede: string;
  extraSections?: Array<{ h2: string; body: string }>;
};

export const HOW_TO_PAGES: HowToPageMeta[] = [
  {
    slug: "how-to-merge-pdf",
    toolSlug: "merge-pdf",
    title: "How to merge PDF files (free, in your browser) · pdftools",
    description:
      "Step-by-step guide to merging PDF files without uploading them. Free, in-browser, no signup, no watermark.",
    h1: "How to merge PDF files",
    keywords: [
      "how to merge pdf",
      "combine pdf files",
      "merge pdf online free",
      "merge pdf without watermark",
      "merge pdf in browser",
      "combine two pdfs",
    ],
    lede:
      "Drop your PDFs into the box below, arrange the order, and click Merge. Everything runs in your browser - no upload.",
    extraSections: [
      {
        h2: "Why merge PDFs in your browser?",
        body:
          "Merging PDFs online usually means uploading them to a server owned by someone you don't know. If the PDFs contain contracts, invoices, or scans of ID documents, that's a real problem. This page does the merge in JavaScript, in your browser - the files never touch a server.",
      },
      {
        h2: "Does it work with 2, 5, or 20 PDFs?",
        body:
          "Yes - add as many PDFs as you like. The only practical limit is your browser's available memory, which is comfortable for hundreds of megabytes on desktop and typically fine on modern phones.",
      },
      {
        h2: "Common ways people merge PDFs",
        body:
          "Combining a signed cover letter with a scanned form. Stitching invoice pages saved from different vendors into one file. Turning a stack of scanned images (already PDF) into one deliverable.",
      },
    ],
  },
  {
    slug: "how-to-split-pdf",
    toolSlug: "split-pdf",
    title: "How to split a PDF (extract pages by range) · pdftools",
    description:
      "Split a PDF into separate files by page number or range. Free, in-browser, no upload.",
    h1: "How to split a PDF",
    keywords: [
      "how to split pdf",
      "split pdf by page",
      "extract pages from pdf",
      "pdf splitter free",
      "split pdf without watermark",
    ],
    lede:
      "Drop your PDF, type the page numbers you want to keep (e.g. 1-3, 5, 8-10), and click Split. You'll get a new PDF with just those pages.",
    extraSections: [
      {
        h2: "How ranges work",
        body:
          "You can mix single pages and ranges: 1, 3, 5-10, 15. Duplicates are ignored. Out-of-range numbers are skipped, not an error - useful when you're not sure how many pages the PDF has.",
      },
      {
        h2: "Split every page into its own file",
        body:
          "For now, this tool exports a single PDF containing your selection. To split into many one-page PDFs, run it once per page range.",
      },
    ],
  },
  {
    slug: "how-to-compress-pdf",
    toolSlug: "compress-pdf",
    title: "How to compress a PDF (reduce file size in-browser) · pdftools",
    description:
      "Compress large PDFs so they're easier to email or upload. Runs in your browser - no upload.",
    h1: "How to compress a PDF",
    keywords: [
      "how to compress pdf",
      "reduce pdf file size",
      "compress pdf online free",
      "shrink pdf",
      "compress pdf without losing quality",
    ],
    lede:
      "Drop your PDF, pick a compression level, and click Compress. The tool rasterizes each page to a JPEG and re-packages it - image-heavy PDFs shrink the most.",
    extraSections: [
      {
        h2: "How much smaller will my PDF be?",
        body:
          "It depends on the content. Image-heavy PDFs (scans, brochures) often shrink 60–90%. Text-only PDFs may shrink less because text is already compact. The tool shows the before/after size so you can decide whether to save the result.",
      },
      {
        h2: "Which level should I pick?",
        body:
          "Medium is the safe default. Low keeps sharp text with modest savings. High squeezes hardest - best for scans where text sharpness isn't critical.",
      },
      {
        h2: "Does it work for scanned PDFs?",
        body:
          "Yes, scans compress especially well because they're already images. Text-searchability may be lost during rasterization - use the Extract Text tool first if you need to preserve it.",
      },
    ],
  },
  {
    slug: "how-to-rotate-pdf",
    toolSlug: "rotate-pdf",
    title: "How to rotate a PDF (and save the rotation) · pdftools",
    description:
      "Rotate PDF pages by 90, 180, or 270 degrees. The rotation is saved into the file. In-browser, no upload.",
    h1: "How to rotate a PDF and save it",
    keywords: [
      "how to rotate pdf",
      "rotate pdf and save",
      "rotate pdf pages",
      "fix pdf orientation",
    ],
    lede:
      "Drop your PDF, pick 90°, 180°, or 270°, optionally choose which pages to rotate, then Rotate. The saved file opens rotated everywhere.",
    extraSections: [
      {
        h2: "Why does my PDF viewer 'rotate' but not save?",
        body:
          "Viewers like Preview and Chrome let you rotate for viewing, but many don't persist that rotation in the file. This tool writes the rotation into the PDF itself so it opens correctly in every reader.",
      },
      {
        h2: "Rotate a single page",
        body:
          "Leave the pages field blank to rotate everything, or type a specific page or range (like `2` or `3-5`) to rotate only those.",
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-jpg",
    toolSlug: "pdf-to-jpg",
    title: "How to convert a PDF to JPG images · pdftools",
    description:
      "Export every page of a PDF as a JPG image. High-quality, in your browser.",
    h1: "How to convert PDF pages to JPG",
    keywords: [
      "how to convert pdf to jpg",
      "pdf to jpg free",
      "pdf to image online",
      "export pdf pages as images",
      "pdf to jpg high quality",
    ],
    lede:
      "Drop the PDF, pick a quality (Screen, Print, or High-res), and hit Convert. Each page renders as a JPG you can download individually or all at once.",
    extraSections: [
      {
        h2: "What quality should I pick?",
        body:
          "Screen (~110 DPI) is fine for previews or embedding on a webpage. Print (~180 DPI) matches most printers. High-res (~250 DPI) is for anything you'll print large or crop into.",
      },
      {
        h2: "Can I get PNG instead?",
        body:
          "The tool exports JPG by default because it's much smaller. If you need lossless PNG (transparent backgrounds, sharp diagrams), export as JPG for now and re-encode locally - a full PNG option is on the roadmap.",
      },
    ],
  },
  {
    slug: "how-to-convert-jpg-to-pdf",
    toolSlug: "jpg-to-pdf",
    title: "How to combine images into a PDF (JPG or PNG) · pdftools",
    description:
      "Combine multiple JPG or PNG images into a single PDF file. In your browser - no upload.",
    h1: "How to combine images into a PDF",
    keywords: [
      "how to convert jpg to pdf",
      "combine images into pdf",
      "jpg to pdf free",
      "png to pdf",
      "multiple images to one pdf",
    ],
    lede:
      "Drop your JPG or PNG images into the box, drag them into the order you want, and click Convert. The result is a single PDF with one page per image.",
    extraSections: [
      {
        h2: "Do the images stay original quality?",
        body:
          "Yes. The tool embeds your images directly - JPGs are re-embedded as-is, PNGs stay lossless. There's no re-encoding pass.",
      },
      {
        h2: "Can I mix JPG and PNG in the same PDF?",
        body:
          "Yes. Each image becomes a page sized to the image itself. Reorder before you export.",
      },
    ],
  },
  {
    slug: "how-to-extract-text-from-pdf",
    toolSlug: "extract-text",
    title: "How to extract text from a PDF (in your browser) · pdftools",
    description:
      "Pull all the plain text out of a PDF and copy or download it. Runs in-browser.",
    h1: "How to extract text from a PDF",
    keywords: [
      "how to extract text from pdf",
      "pdf to text free",
      "copy text from pdf",
      "extract pdf text online",
    ],
    lede:
      "Drop your PDF and click Extract. The tool reads the text layer page-by-page and gives you a copyable block you can save as .txt.",
    extraSections: [
      {
        h2: "Does it work on scanned PDFs?",
        body:
          "Not yet - scanned PDFs are images, so they need OCR (optical character recognition). We'll add OCR later. For now the tool extracts embedded text only.",
      },
      {
        h2: "Layout gets weird - why?",
        body:
          "PDFs don't store paragraphs, only positioned glyphs. The tool joins glyphs into lines, but tables and multi-column layouts can look jumbled. Paste into a text editor to reflow.",
      },
    ],
  },
  {
    slug: "how-to-add-page-numbers-to-pdf",
    toolSlug: "add-page-numbers",
    title: "How to add page numbers to a PDF · pdftools",
    description:
      "Add page numbers to any PDF, in any position. In your browser, free.",
    h1: "How to add page numbers to a PDF",
    keywords: [
      "how to add page numbers to pdf",
      "add page numbers pdf free",
      "number pdf pages",
      "insert page numbers in pdf",
    ],
    lede:
      "Drop the PDF, pick where the numbers go (bottom-center is standard), and click Add page numbers.",
    extraSections: [
      {
        h2: "Skip the cover page",
        body:
          "Set 'Start on page' to 2 so the cover isn't numbered, and 'Start number' to 1 so the numbering begins at the first content page.",
      },
      {
        h2: "Roman numerals for the intro",
        body:
          "Not supported yet - the tool numbers in arabic digits. Run it twice with different starting pages if you need a mixed layout, though that will overwrite existing content.",
      },
    ],
  },
  {
    slug: "how-to-delete-pages-from-pdf",
    toolSlug: "delete-pages",
    title: "How to delete pages from a PDF · pdftools",
    description:
      "Remove specific pages from a PDF file and keep the rest. In-browser, no upload.",
    h1: "How to delete pages from a PDF",
    keywords: [
      "how to delete pages from pdf",
      "remove pdf pages",
      "delete page pdf online",
      "trim pdf pages",
    ],
    lede:
      "Drop the PDF, type the pages you want to remove (like `2, 4-6`), and click Delete pages. Everything else stays put.",
    extraSections: [
      {
        h2: "Delete every-other page or a range",
        body:
          "The pages field takes any combination - `1, 5-10, 20` works. You can't remove every page (the tool will refuse).",
      },
    ],
  },
  {
    slug: "how-to-reorder-pdf-pages",
    toolSlug: "reorder-pages",
    title: "How to reorder pages in a PDF · pdftools",
    description:
      "Rearrange PDF pages visually with thumbnails. In-browser, no upload.",
    h1: "How to reorder PDF pages",
    keywords: [
      "how to reorder pdf pages",
      "rearrange pdf pages",
      "move pdf pages",
      "pdf page order",
    ],
    lede:
      "Drop the PDF - thumbnails render right away. Use the arrows on each thumbnail to move pages left or right, then save the reordered PDF.",
    extraSections: [
      {
        h2: "Is the original file changed?",
        body:
          "No - a new PDF is generated. Your source file stays exactly as it was.",
      },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  operations: "PDF operations",
  conversion: "Conversion",
  other: "Other",
};
