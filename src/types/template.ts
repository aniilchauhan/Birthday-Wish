export type LayoutType =
  | 'single'
  | 'split-2'
  | 'grid-4'
  | 'collage-5-10'
  | 'collage-dense'
  | 'polaroid'
  | 'overlap'
  | 'scrapbook'
  | 'timeline'
  | 'circle-grid'
  | 'diagonal'
  | 'heart-shape';

export interface Template {
  name: string;
  imageCount: number;
  layout: LayoutType;
  images: string[];
  text: {
    main?: string;
    sub?: string;
    mainStyle: string;
    subStyle: string;
    fontFamily: string;
    subFont?: string;
  };
  style: {
    background: string;
    textColor: string;
    filter?: string;
    overlay?: string;
  };
  decorations?: {
    confetti?: boolean;
    balloons?: boolean;
    sparkles?: boolean;
    hearts?: boolean;
  };
}
