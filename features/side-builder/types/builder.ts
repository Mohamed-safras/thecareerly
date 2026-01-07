export type ComponentType =
  // Typography
  | "heading"
  | "paragraph"
  | "text"
  | "link"
  // Media
  | "image"
  | "video"
  | "icon"
  // Layout
  | "container"
  | "section"
  | "columns"
  | "spacer"
  | "divider"
  // Interactive
  | "button"
  | "form"
  | "input"
  // Special
  | "embed"
  | "list";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextAlign = "left" | "center" | "right" | "justify";
export type FlexDirection = "row" | "column";
export type JustifyContent = "start" | "center" | "end" | "between" | "around";
export type AlignItems = "start" | "center" | "end" | "stretch";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type AnimationType =
  | "none"
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleIn"
  | "bounce"
  | "pulse";

export interface ComponentStyles {
  // Spacing
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  // Size
  width?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;
  // Colors
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  // Border
  borderWidth?: string;
  borderRadius?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";
  // Typography
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: TextAlign;
  textDecoration?: "none" | "underline" | "line-through";
  // Layout
  display?: "block" | "flex" | "grid" | "inline" | "inline-block";
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: string;
  gridColumns?: number;
  // Effects
  opacity?: number;
  boxShadow?: string;
  // Background
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain" | "auto";
  backgroundPosition?: string;
  // Animation
  animation?: AnimationType;
  animationDuration?: string;
  animationDelay?: string;
}

export interface ComponentContent {
  // Text
  text?: string;
  headingLevel?: HeadingLevel;
  // Link
  href?: string;
  target?: "_self" | "_blank";
  // Media
  src?: string;
  alt?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  // Icon
  iconName?: string;
  iconSize?: number;
  // Button
  buttonVariant?: ButtonVariant;
  // Layout
  columns?: number;
  columnGap?: string;
  // Spacer
  spacerHeight?: string;
  // Embed
  embedCode?: string;
  // List
  listItems?: string[];
  listStyle?: "disc" | "decimal" | "none";
  // Children components
  children?: string[];
}

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  name: string;
  content: ComponentContent;
  styles: ComponentStyles;
  order: number;
  parentId?: string | null;
  isLocked?: boolean;
  isHidden?: boolean;
}

export interface SiteSettings {
  siteName: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  headingFont?: string;
  headerStyle: "fixed" | "static";
  footerEnabled: boolean;
  customCSS?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BuilderState {
  components: BuilderComponent[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  siteSettings: SiteSettings;
  isDragging: boolean;
  previewMode: boolean;
  zoom: number;
  deviceMode: "desktop" | "tablet" | "mobile";
  history: BuilderComponent[][];
  historyIndex: number;
  clipboard: BuilderComponent | null;
}

export const defaultSiteSettings: SiteSettings = {
  siteName: "My Career Site",
  primaryColor: "hsl(var(--primary))",
  secondaryColor: "hsl(var(--secondary))",
  fontFamily: "Inter",
  headerStyle: "fixed",
  footerEnabled: true,
};

export const defaultStyles: ComponentStyles = {
  paddingTop: "0px",
  paddingRight: "0px",
  paddingBottom: "0px",
  paddingLeft: "0px",
  marginTop: "0px",
  marginRight: "0px",
  marginBottom: "0px",
  marginLeft: "0px",
  textAlign: "left",
  animation: "none",
};

export interface ComponentTemplate {
  type: ComponentType;
  name: string;
  icon: string;
  category: "typography" | "media" | "layout" | "interactive" | "special";
  defaultContent: ComponentContent;
  defaultStyles: Partial<ComponentStyles>;
}

export const componentTemplates: ComponentTemplate[] = [
  // Typography
  {
    type: "heading",
    name: "Heading",
    icon: "Type",
    category: "typography",
    defaultContent: { text: "Heading Text", headingLevel: "h1" },
    defaultStyles: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "16px",
    },
  },
  {
    type: "paragraph",
    name: "Paragraph",
    icon: "AlignLeft",
    category: "typography",
    defaultContent: {
      text: "Enter your paragraph text here. Click to edit and customize this content.",
    },
    defaultStyles: {
      fontSize: "16px",
      lineHeight: "1.6",
      marginBottom: "16px",
    },
  },
  {
    type: "text",
    name: "Text",
    icon: "Type",
    category: "typography",
    defaultContent: { text: "Text block" },
    defaultStyles: { fontSize: "14px" },
  },
  {
    type: "link",
    name: "Link",
    icon: "Link",
    category: "typography",
    defaultContent: { text: "Click here", href: "#", target: "_self" },
    defaultStyles: {
      textColor: "hsl(var(--primary))",
      textDecoration: "underline",
    },
  },
  // Media
  {
    type: "image",
    name: "Image",
    icon: "Image",
    category: "media",
    defaultContent: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      alt: "Image description",
    },
    defaultStyles: { width: "100%", borderRadius: "8px" },
  },
  {
    type: "video",
    name: "Video",
    icon: "Video",
    category: "media",
    defaultContent: {
      src: "",
      poster: "",
      autoplay: false,
      loop: false,
      muted: true,
      controls: true,
    },
    defaultStyles: { width: "100%", borderRadius: "8px" },
  },
  {
    type: "icon",
    name: "Icon",
    icon: "Smile",
    category: "media",
    defaultContent: { iconName: "Star", iconSize: 24 },
    defaultStyles: { textColor: "hsl(var(--primary))" },
  },
  // Layout
  {
    type: "container",
    name: "Container",
    icon: "Box",
    category: "layout",
    defaultContent: { children: [] },
    defaultStyles: {
      paddingTop: "24px",
      paddingRight: "24px",
      paddingBottom: "24px",
      paddingLeft: "24px",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  {
    type: "section",
    name: "Section",
    icon: "Layers",
    category: "layout",
    defaultContent: { children: [] },
    defaultStyles: { paddingTop: "60px", paddingBottom: "60px", width: "100%" },
  },
  {
    type: "columns",
    name: "Columns",
    icon: "Columns",
    category: "layout",
    defaultContent: { columns: 2, columnGap: "24px", children: [] },
    defaultStyles: { display: "grid", gridColumns: 2, gap: "24px" },
  },
  {
    type: "spacer",
    name: "Spacer",
    icon: "ArrowUpDown",
    category: "layout",
    defaultContent: { spacerHeight: "40px" },
    defaultStyles: { height: "40px" },
  },
  {
    type: "divider",
    name: "Divider",
    icon: "Minus",
    category: "layout",
    defaultContent: {},
    defaultStyles: {
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "hsl(var(--border))",
      marginTop: "24px",
      marginBottom: "24px",
    },
  },
  // Interactive
  {
    type: "button",
    name: "Button",
    icon: "MousePointer",
    category: "interactive",
    defaultContent: { text: "Click Me", href: "#", buttonVariant: "primary" },
    defaultStyles: {
      paddingTop: "12px",
      paddingRight: "24px",
      paddingBottom: "12px",
      paddingLeft: "24px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  {
    type: "form",
    name: "Form",
    icon: "FileInput",
    category: "interactive",
    defaultContent: { children: [] },
    defaultStyles: { display: "flex", flexDirection: "column", gap: "16px" },
  },
  {
    type: "input",
    name: "Input",
    icon: "TextCursor",
    category: "interactive",
    defaultContent: { text: "Enter text..." },
    defaultStyles: {
      paddingTop: "12px",
      paddingRight: "16px",
      paddingBottom: "12px",
      paddingLeft: "16px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "8px",
      width: "100%",
    },
  },
  // Special
  {
    type: "embed",
    name: "Embed",
    icon: "Code",
    category: "special",
    defaultContent: { embedCode: "<div>Paste embed code here</div>" },
    defaultStyles: { width: "100%" },
  },
  {
    type: "list",
    name: "List",
    icon: "List",
    category: "special",
    defaultContent: {
      listItems: ["Item 1", "Item 2", "Item 3"],
      listStyle: "disc",
    },
    defaultStyles: { paddingLeft: "24px", marginBottom: "16px" },
  },
];

export const getTemplateByType = (
  type: ComponentType
): ComponentTemplate | undefined => {
  return componentTemplates.find((t) => t.type === type);
};
