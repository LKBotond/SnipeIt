import type { SelectionRectangle } from "@/entrypoints/content/drawings";
export interface TextExtractionRequest {
  img: string;
  selectionRectangle: SelectionRectangle;
}
export interface ImageExtractionRequest {
  img: string;
  format: string;
}
