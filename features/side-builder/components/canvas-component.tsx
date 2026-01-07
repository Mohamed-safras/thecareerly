import {
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  GripVertical,
  Star,
  Check,
  X,
} from "lucide-react";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BuilderComponent, AnimationType } from "../types/builder";
import { useState, useRef, useEffect } from "react";

interface CanvasComponentProps {
  component: BuilderComponent;
  isSelected: boolean;
  isHovered: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onHover: (hovering: boolean) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCopy: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleLock: () => void;
  onToggleVisibility: () => void;
  onUpdateContent: (content: Partial<BuilderComponent["content"]>) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const getAnimationClass = (animation?: AnimationType): string => {
  switch (animation) {
    case "fadeIn":
      return "animate-fade-in";
    case "fadeUp":
      return "animate-fade-in";
    case "scaleIn":
      return "animate-scale-in";
    default:
      return "";
  }
};

const DynamicIcon = ({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) => {
  const IconComponent = (icons as any)[name];
  if (!IconComponent) return <Star size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
};

export function CanvasComponent({
  component,
  isSelected,
  isHovered,
  isPreviewMode,
  onSelect,
  onHover,
  onDelete,
  onDuplicate,
  onCopy,
  onMoveUp,
  onMoveDown,
  onToggleLock,
  onToggleVisibility,
  onUpdateContent,
  canMoveUp,
  canMoveDown,
}: CanvasComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(component.content.text || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isPreviewMode || component.isLocked) return;
    if (
      ["heading", "paragraph", "text", "link", "button"].includes(
        component.type
      )
    ) {
      e.stopPropagation();
      setEditValue(component.content.text || "");
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    onUpdateContent({ text: editValue });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(component.content.text || "");
    setIsEditing(false);
  };

  const getStyles = (): React.CSSProperties => {
    const s = component.styles;
    return {
      paddingTop: s.paddingTop,
      paddingRight: s.paddingRight,
      paddingBottom: s.paddingBottom,
      paddingLeft: s.paddingLeft,
      marginTop: s.marginTop,
      marginRight: s.marginRight,
      marginBottom: s.marginBottom,
      marginLeft: s.marginLeft,
      width: s.width,
      height: s.height,
      minHeight: s.minHeight,
      maxWidth: s.maxWidth,
      backgroundColor: s.backgroundColor,
      color: s.textColor,
      borderColor: s.borderColor,
      borderWidth: s.borderWidth,
      borderRadius: s.borderRadius,
      borderStyle: s.borderStyle,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textAlign: s.textAlign,
      textDecoration: s.textDecoration,
      opacity: s.opacity,
      boxShadow: s.boxShadow,
      backgroundImage: s.backgroundImage,
      backgroundSize: s.backgroundSize,
      backgroundPosition: s.backgroundPosition,
    };
  };

  const renderContent = () => {
    const styles = getStyles();
    const animClass = getAnimationClass(component.styles.animation);

    if (isEditing) {
      return (
        <div className="relative" style={styles}>
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") handleCancelEdit();
            }}
            className="w-full bg-transparent border-2 border-primary rounded px-2 py-1 outline-none"
            style={{ fontSize: styles.fontSize, fontWeight: styles.fontWeight }}
          />
          <div className="absolute -top-8 right-0 flex gap-1">
            <Button
              size="icon"
              variant="secondary"
              className="h-6 w-6"
              onClick={handleSaveEdit}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={handleCancelEdit}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      );
    }

    switch (component.type) {
      case "heading": {
        const Tag = (component.content.headingLevel ||
          "h1") as keyof JSX.IntrinsicElements;
        return (
          <Tag className={animClass} style={styles}>
            {component.content.text}
          </Tag>
        );
      }

      case "paragraph":
        return (
          <p className={animClass} style={styles}>
            {component.content.text}
          </p>
        );

      case "text":
        return (
          <span className={animClass} style={styles}>
            {component.content.text}
          </span>
        );

      case "link":
        return (
          <a
            href={component.content.href}
            target={component.content.target}
            className={cn("cursor-pointer", animClass)}
            style={styles}
            onClick={(e) => !isPreviewMode && e.preventDefault()}
          >
            {component.content.text}
          </a>
        );

      case "image":
        return (
          <img
            src={component.content.src}
            alt={component.content.alt || ""}
            className={animClass}
            style={{ ...styles, display: "block" }}
          />
        );

      case "video":
        return (
          <video
            src={component.content.src}
            poster={component.content.poster}
            autoPlay={component.content.autoplay}
            loop={component.content.loop}
            muted={component.content.muted}
            controls={component.content.controls}
            className={animClass}
            style={{ ...styles, display: "block" }}
          />
        );

      case "icon":
        return (
          <div className={animClass} style={styles}>
            <DynamicIcon
              name={component.content.iconName || "Star"}
              size={component.content.iconSize || 24}
            />
          </div>
        );

      case "container":
      case "section":
        return (
          <div className={cn("min-h-[100px]", animClass)} style={styles}>
            {(!component.content.children ||
              component.content.children.length === 0) && (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed rounded-lg p-4">
                Drop elements here
              </div>
            )}
          </div>
        );

      case "columns":
        return (
          <div
            className={animClass}
            style={{
              ...styles,
              display: "grid",
              gridTemplateColumns: `repeat(${
                component.content.columns || 2
              }, 1fr)`,
              gap: component.content.columnGap || "24px",
            }}
          >
            {Array.from({ length: component.content.columns || 2 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="min-h-[100px] border-2 border-dashed rounded-lg p-4 flex items-center justify-center text-muted-foreground text-sm"
                >
                  Column {i + 1}
                </div>
              )
            )}
          </div>
        );

      case "spacer":
        return (
          <div
            style={{
              height: component.content.spacerHeight || "40px",
              ...styles,
            }}
            className="bg-muted/30 border-2 border-dashed flex items-center justify-center text-xs text-muted-foreground"
          >
            {component.content.spacerHeight || "40px"}
          </div>
        );

      case "divider":
        return <hr style={styles} className={animClass} />;

      case "button": {
        const variants: Record<string, string> = {
          primary: "bg-primary text-primary-foreground hover:bg-primary/90",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          outline: "border-2 bg-transparent hover:bg-accent",
          ghost: "hover:bg-accent hover:text-accent-foreground",
        };
        return (
          <button
            className={cn(
              "inline-flex items-center justify-center transition-colors cursor-pointer",
              variants[component.content.buttonVariant || "primary"],
              animClass
            )}
            style={styles}
          >
            {component.content.text}
          </button>
        );
      }

      case "input":
        return (
          <input
            type="text"
            placeholder={component.content.text}
            className={cn("bg-background", animClass)}
            style={styles}
            readOnly={!isPreviewMode}
          />
        );

      case "form":
        return (
          <form className={animClass} style={styles}>
            <div className="min-h-[100px] border-2 border-dashed rounded-lg p-4 flex items-center justify-center text-muted-foreground text-sm">
              Add form elements here
            </div>
          </form>
        );

      case "embed":
        return (
          <div
            className={animClass}
            style={styles}
            dangerouslySetInnerHTML={{
              __html: component.content.embedCode || "",
            }}
          />
        );

      case "list":
        return (
          <ul
            className={animClass}
            style={{
              ...styles,
              listStyleType: component.content.listStyle || "disc",
            }}
          >
            {(component.content.listItems || []).map((item, i) => (
              <li key={i} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        );

      default:
        return <div style={styles}>Unknown component</div>;
    }
  };

  if (component.isHidden && !isPreviewMode) {
    return (
      <div
        className="opacity-30 relative"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <div className="absolute inset-0 bg-stripes pointer-events-none" />
        {renderContent()}
      </div>
    );
  }

  if (isPreviewMode) {
    return <div>{renderContent()}</div>;
  }

  return (
    <div
      className={cn(
        "relative group transition-all",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isHovered && !isSelected && "ring-2 ring-primary/50",
        component.isLocked && "cursor-not-allowed"
      )}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Hover/Selected Controls */}
      <div
        className={cn(
          "absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-card border rounded-lg p-0.5 shadow-lg z-20 transition-opacity",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={!canMoveUp || component.isLocked}
        >
          <MoveUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={!canMoveDown || component.isLocked}
        >
          <MoveDown className="h-3 w-3" />
        </Button>
        <div className="w-px h-4 bg-border mx-0.5" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <GripVertical className="h-3 w-3" />
        </Button>
        <div className="w-px h-4 bg-border mx-0.5" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
        >
          {component.isLocked ? (
            <Lock className="h-3 w-3" />
          ) : (
            <Unlock className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {component.isHidden ? (
            <EyeOff className="h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
        </Button>
        <div className="w-px h-4 bg-border mx-0.5" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={component.isLocked}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Component Label */}
      <div
        className={cn(
          "absolute -left-px top-0 px-2 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-br-md z-10 transition-opacity",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        {component.name}
      </div>

      {renderContent()}
    </div>
  );
}
