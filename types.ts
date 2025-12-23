
export type ElementType = 'text' | 'rect' | 'circle' | 'image';

export interface DesignElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fill?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  borderRadius?: number;
  opacity?: number;
  rotation?: number;
}

export interface DesignCanvas {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: DesignElement[];
}

export enum Page {
  LANDING = 'landing',
  EDITOR = 'editor'
}
