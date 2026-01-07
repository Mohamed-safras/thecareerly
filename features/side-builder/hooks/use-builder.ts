import { useState, useCallback } from "react";
import {
  BuilderComponent,
  BuilderState,
  ComponentType,
  getTemplateByType,
  defaultSiteSettings,
  ComponentStyles,
  ComponentContent,
  SiteSettings,
} from "../types/builder";

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialState: BuilderState = {
  components: [],
  selectedComponentId: null,
  hoveredComponentId: null,
  siteSettings: defaultSiteSettings,
  isDragging: false,
  previewMode: false,
  zoom: 100,
  deviceMode: "desktop",
  history: [[]],
  historyIndex: 0,
  clipboard: null,
};

export function useBuilder() {
  const [state, setState] = useState<BuilderState>(initialState);

  const addComponent = useCallback(
    (type: ComponentType, parentId?: string) => {
      const template = getTemplateByType(type);
      if (!template) return;

      const newComponent: BuilderComponent = {
        id: generateId(),
        type: template.type,
        name: template.name,
        content: { ...template.defaultContent },
        styles: { ...template.defaultStyles },
        order: state.components.length,
        parentId: parentId || null,
      };

      setState((prev) => {
        const newComponents = [...prev.components, newComponent];
        const newHistory = [
          ...prev.history.slice(0, prev.historyIndex + 1),
          newComponents,
        ];
        return {
          ...prev,
          components: newComponents,
          selectedComponentId: newComponent.id,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });

      return newComponent.id;
    },
    [state.components.length]
  );

  const removeComponent = useCallback((id: string) => {
    setState((prev) => {
      // Also remove children
      const idsToRemove = new Set<string>([id]);
      const findChildren = (parentId: string) => {
        prev.components.forEach((c) => {
          if (c.parentId === parentId) {
            idsToRemove.add(c.id);
            findChildren(c.id);
          }
        });
      };
      findChildren(id);

      const newComponents = prev.components
        .filter((c) => !idsToRemove.has(c.id))
        .map((c, index) => ({ ...c, order: index }));
      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        newComponents,
      ];
      return {
        ...prev,
        components: newComponents,
        selectedComponentId:
          prev.selectedComponentId === id ? null : prev.selectedComponentId,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const duplicateComponent = useCallback((id: string) => {
    setState((prev) => {
      const component = prev.components.find((c) => c.id === id);
      if (!component) return prev;

      const newComponent: BuilderComponent = {
        ...component,
        id: generateId(),
        name: `${component.name} (Copy)`,
        order: prev.components.length,
      };

      const newComponents = [...prev.components, newComponent];
      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        newComponents,
      ];
      return {
        ...prev,
        components: newComponents,
        selectedComponentId: newComponent.id,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const copyComponent = useCallback((id: string) => {
    setState((prev) => {
      const component = prev.components.find((c) => c.id === id);
      if (!component) return prev;
      return { ...prev, clipboard: { ...component } };
    });
  }, []);

  const pasteComponent = useCallback(() => {
    setState((prev) => {
      if (!prev.clipboard) return prev;
      const newComponent: BuilderComponent = {
        ...prev.clipboard,
        id: generateId(),
        name: `${prev.clipboard.name} (Pasted)`,
        order: prev.components.length,
      };
      const newComponents = [...prev.components, newComponent];
      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        newComponents,
      ];
      return {
        ...prev,
        components: newComponents,
        selectedComponentId: newComponent.id,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const selectComponent = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedComponentId: id }));
  }, []);

  const hoverComponent = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, hoveredComponentId: id }));
  }, []);

  const updateComponentStyles = useCallback(
    (id: string, styles: Partial<ComponentStyles>) => {
      setState((prev) => {
        const newComponents = prev.components.map((c) =>
          c.id === id ? { ...c, styles: { ...c.styles, ...styles } } : c
        );
        return { ...prev, components: newComponents };
      });
    },
    []
  );

  const updateComponentContent = useCallback(
    (id: string, content: Partial<ComponentContent>) => {
      setState((prev) => {
        const newComponents = prev.components.map((c) =>
          c.id === id ? { ...c, content: { ...c.content, ...content } } : c
        );
        return { ...prev, components: newComponents };
      });
    },
    []
  );

  const updateComponentName = useCallback((id: string, name: string) => {
    setState((prev) => {
      const newComponents = prev.components.map((c) =>
        c.id === id ? { ...c, name } : c
      );
      return { ...prev, components: newComponents };
    });
  }, []);

  const toggleComponentLock = useCallback((id: string) => {
    setState((prev) => {
      const newComponents = prev.components.map((c) =>
        c.id === id ? { ...c, isLocked: !c.isLocked } : c
      );
      return { ...prev, components: newComponents };
    });
  }, []);

  const toggleComponentVisibility = useCallback((id: string) => {
    setState((prev) => {
      const newComponents = prev.components.map((c) =>
        c.id === id ? { ...c, isHidden: !c.isHidden } : c
      );
      return { ...prev, components: newComponents };
    });
  }, []);

  const updateSiteSettings = useCallback((settings: Partial<SiteSettings>) => {
    setState((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settings },
    }));
  }, []);

  const reorderComponents = useCallback(
    (fromIndex: number, toIndex: number) => {
      setState((prev) => {
        const newComponents = [...prev.components];
        const [removed] = newComponents.splice(fromIndex, 1);
        newComponents.splice(toIndex, 0, removed);
        const reorderedComponents = newComponents.map((c, index) => ({
          ...c,
          order: index,
        }));
        const newHistory = [
          ...prev.history.slice(0, prev.historyIndex + 1),
          reorderedComponents,
        ];
        return {
          ...prev,
          components: reorderedComponents,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },
    []
  );

  const setPreviewMode = useCallback((enabled: boolean) => {
    setState((prev) => ({
      ...prev,
      previewMode: enabled,
      selectedComponentId: null,
    }));
  }, []);

  const setDeviceMode = useCallback((mode: "desktop" | "tablet" | "mobile") => {
    setState((prev) => ({ ...prev, deviceMode: mode }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => ({ ...prev, zoom: Math.max(50, Math.min(150, zoom)) }));
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const newIndex = prev.historyIndex - 1;
      return {
        ...prev,
        components: prev.history[newIndex],
        historyIndex: newIndex,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const newIndex = prev.historyIndex + 1;
      return {
        ...prev,
        components: prev.history[newIndex],
        historyIndex: newIndex,
      };
    });
  }, []);

  const saveHistory = useCallback(() => {
    setState((prev) => {
      const newHistory = [
        ...prev.history.slice(0, prev.historyIndex + 1),
        prev.components,
      ];
      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const clearCanvas = useCallback(() => {
    setState((prev) => {
      const newHistory = [...prev.history.slice(0, prev.historyIndex + 1), []];
      return {
        ...prev,
        components: [],
        selectedComponentId: null,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const selectedComponent =
    state.components.find((c) => c.id === state.selectedComponentId) || null;

  // Get root-level components (no parent)
  const rootComponents = state.components
    .filter((c) => !c.parentId)
    .sort((a, b) => a.order - b.order);

  return {
    ...state,
    selectedComponent,
    rootComponents,
    addComponent,
    removeComponent,
    duplicateComponent,
    copyComponent,
    pasteComponent,
    selectComponent,
    hoverComponent,
    updateComponentStyles,
    updateComponentContent,
    updateComponentName,
    toggleComponentLock,
    toggleComponentVisibility,
    updateSiteSettings,
    reorderComponents,
    setPreviewMode,
    setDeviceMode,
    setZoom,
    undo,
    redo,
    saveHistory,
    clearCanvas,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
  };
}
