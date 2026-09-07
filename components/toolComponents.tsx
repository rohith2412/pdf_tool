import type { ComponentType } from "react";
import { AddPageNumbersTool } from "./AddPageNumbersTool";
import { CompressTool } from "./CompressTool";
import { DeletePagesTool } from "./DeletePagesTool";
import { ExtractTextTool } from "./ExtractTextTool";
import { JpgToPdfTool } from "./JpgToPdfTool";
import { MergeTool } from "./MergeTool";
import { PdfToJpgTool } from "./PdfToJpgTool";
import { ReorderPagesTool } from "./ReorderPagesTool";
import { RotateTool } from "./RotateTool";
import { SplitTool } from "./SplitTool";

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "merge-pdf": MergeTool,
  "split-pdf": SplitTool,
  "rotate-pdf": RotateTool,
  "compress-pdf": CompressTool,
  "pdf-to-jpg": PdfToJpgTool,
  "jpg-to-pdf": JpgToPdfTool,
  "extract-text": ExtractTextTool,
  "add-page-numbers": AddPageNumbersTool,
  "delete-pages": DeletePagesTool,
  "reorder-pages": ReorderPagesTool,
};
