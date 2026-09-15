import type { Tool } from "./tools";

export type CompressVariant = {
  slug: string;
  targetBytes: number;
  targetLabel: string;
  tool: Tool;
};

const MB = 1024 * 1024;

function makeVariant(opts: {
  slug: string;
  targetMB: number;
  targetLabel: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
  faqExtra?: { q: string; a: string }[];
}): CompressVariant {
  const targetBytes = Math.round(opts.targetMB * MB);
  return {
    slug: opts.slug,
    targetBytes,
    targetLabel: opts.targetLabel,
    tool: {
      slug: opts.slug,
      name: opts.name,
      title: opts.title,
      description: opts.description,
      keywords: opts.keywords,
      category: "operations",
      shortDescription: `Get your PDF under ${opts.targetLabel}`,
      h1: opts.h1,
      intro: opts.intro,
      steps: [
        { name: "Drop your PDF", text: "Add the PDF you need to shrink." },
        {
          name: "We aim for the target",
          text: `The tool tries progressively stronger passes until the file fits under ${opts.targetLabel}, then stops.`,
        },
        {
          name: "Download",
          text: "Save the compressed PDF. Everything runs in your browser - no upload.",
        },
      ],
      faq: [
        {
          q: `Will my PDF always fit under ${opts.targetLabel}?`,
          a: "In most cases yes. Very long or image-heavy PDFs may not fit without dropping content - the tool will tell you the best size it could reach.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. Compression runs entirely in your browser using JavaScript. Files never leave your device.",
        },
        {
          q: "How does the tool decide when to stop?",
          a: "It runs a series of quality passes from best to most aggressive and stops the first time the output fits under the target size.",
        },
        {
          q: "Will text still be readable?",
          a: "Usually yes. Aggressive passes rasterize pages to JPEG, which can soften small text. Try a higher target first if sharpness matters.",
        },
        ...(opts.faqExtra ?? []),
      ],
      related: ["compress-pdf", "merge-pdf", "split-pdf"],
    },
  };
}

export const COMPRESS_VARIANTS: CompressVariant[] = [
  makeVariant({
    slug: "compress-pdf-to-1mb",
    targetMB: 1,
    targetLabel: "1 MB",
    name: "Compress PDF to 1 MB",
    h1: "Compress PDF to 1 MB",
    title: "Compress PDF to 1 MB - Online, in your browser · pdfeditorkit",
    description:
      "Reduce a PDF to under 1 MB for uploads and applications. Runs in your browser, no signup, no watermark.",
    intro:
      "Need your PDF under 1 MB for a form or upload? Drop the file - the tool compresses until it fits, then stops.",
    keywords: [
      "compress pdf to 1mb",
      "reduce pdf to 1mb",
      "pdf under 1mb",
      "pdf less than 1mb",
      "shrink pdf to 1mb",
    ],
  }),
  makeVariant({
    slug: "compress-pdf-to-2mb",
    targetMB: 2,
    targetLabel: "2 MB",
    name: "Compress PDF to 2 MB",
    h1: "Compress PDF to 2 MB",
    title: "Compress PDF to 2 MB - Online, in your browser · pdfeditorkit",
    description:
      "Get your PDF under 2 MB for online applications and portals. Client-side, private, free.",
    intro:
      "Shrink a PDF to under 2 MB - common for visa forms, job applications, and government portals.",
    keywords: [
      "compress pdf to 2mb",
      "reduce pdf to 2mb",
      "pdf under 2mb",
      "pdf less than 2mb",
      "make pdf 2mb",
    ],
  }),
  makeVariant({
    slug: "compress-pdf-to-5mb",
    targetMB: 5,
    targetLabel: "5 MB",
    name: "Compress PDF to 5 MB",
    h1: "Compress PDF to 5 MB",
    title: "Compress PDF to 5 MB - Online, in your browser · pdfeditorkit",
    description:
      "Reduce PDF size to under 5 MB for portals with a 5 MB upload limit. In-browser, no uploads.",
    intro:
      "Bring a PDF under 5 MB - a common ceiling for university, banking, and government uploads.",
    keywords: [
      "compress pdf to 5mb",
      "reduce pdf to 5mb",
      "pdf under 5mb",
      "pdf less than 5mb",
      "shrink pdf under 5mb",
    ],
  }),
  makeVariant({
    slug: "compress-pdf-to-10mb",
    targetMB: 10,
    targetLabel: "10 MB",
    name: "Compress PDF to 10 MB",
    h1: "Compress PDF to 10 MB",
    title: "Compress PDF to 10 MB - Online, in your browser · pdfeditorkit",
    description:
      "Get a PDF under 10 MB while keeping quality. Runs entirely in your browser.",
    intro:
      "Compress a PDF to under 10 MB - a comfortable size for most email and upload flows.",
    keywords: [
      "compress pdf to 10mb",
      "reduce pdf to 10mb",
      "pdf under 10mb",
      "pdf less than 10mb",
    ],
  }),
  makeVariant({
    slug: "compress-pdf-for-email",
    targetMB: 20,
    targetLabel: "20 MB",
    name: "Compress PDF for email",
    h1: "Compress PDF for email",
    title: "Compress PDF for Email - Fit under attachment limits · pdfeditorkit",
    description:
      "Shrink a PDF so it fits inside common email attachment limits (Gmail 25 MB, Outlook 20 MB). Runs in your browser.",
    intro:
      "Email providers cap attachments at around 20-25 MB. This tool aims for 20 MB so your PDF sends on the first try.",
    keywords: [
      "compress pdf for email",
      "reduce pdf for email",
      "pdf attachment size",
      "shrink pdf to email",
      "pdf under 25mb email",
    ],
    faqExtra: [
      {
        q: "What is the safe size for email?",
        a: "Gmail allows up to 25 MB, Outlook.com around 20 MB, Yahoo 25 MB. Aiming for 20 MB works across all common providers.",
      },
    ],
  }),
];

export function getCompressVariant(slug: string): CompressVariant | undefined {
  return COMPRESS_VARIANTS.find((v) => v.slug === slug);
}
