import {
  ArrowDownWideNarrow,
  FileImage,
  FilePlus2,
  FileText,
  FileType,
  Hash,
  ImagePlus,
  ListOrdered,
  RotateCw,
  Scissors,
  Trash2,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "merge-pdf": FilePlus2,
  "split-pdf": Scissors,
  "rotate-pdf": RotateCw,
  "compress-pdf": ArrowDownWideNarrow,
  "pdf-to-jpg": FileImage,
  "jpg-to-pdf": ImagePlus,
  "extract-text": FileText,
  "add-page-numbers": Hash,
  "delete-pages": Trash2,
  "reorder-pages": ListOrdered,
};

export function ToolIcon({ slug, className = "h-4 w-4" }: { slug: string; className?: string }) {
  const Icon = MAP[slug] ?? FileType;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
