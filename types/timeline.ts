export interface EmbedContent {
  type: 'iframe' | 'html';
  src?: string;
  html?: string;
  height?: string | number;
  width?: string | number;
  title?: string;
}

export interface TimelineEmbed {
  type: 'embed';
  content: EmbedContent;
  title?: string;
  description?: string;
}

export interface StackItem {
  name: string;
  icon: string; // URL or icon name
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  fileUrl?: string;
  tags?: string[];
  layout?: 'side-by-side' | 'stacked' | 'carousel';
  stacks?: StackItem[];
  links?: Array<{
    label: string;
    url: string;
    target?: string;
    [key: string]: any; // Allow additional properties like className, data-* attributes
  }>;
  embeds?: TimelineEmbed[];
}


