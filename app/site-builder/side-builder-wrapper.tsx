"use client";
import { BuilderCanvas } from "@/features/side-builder/components/builder-canvas";
import { BuilderToolbar } from "@/features/side-builder/components/builder-toolbar";
import { ComponentLibrary } from "@/features/side-builder/components/component-library";
import { PropertiesPanel } from "@/features/side-builder/components/properties-panel";
import { SiteSettingsDialog } from "@/features/side-builder/components/site-settings-dialog";
import { useBuilder } from "@/features/side-builder/hooks/use-builder";
import { useState } from "react";

const SiteBuilder = () => {
  const builder = useBuilder();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <BuilderToolbar
        zoom={builder.zoom}
        previewMode={builder.previewMode}
        deviceMode={builder.deviceMode}
        canUndo={builder.canUndo}
        canRedo={builder.canRedo}
        hasClipboard={!!builder.clipboard}
        onZoomIn={() => builder.setZoom(builder.zoom + 10)}
        onZoomOut={() => builder.setZoom(builder.zoom - 10)}
        onUndo={builder.undo}
        onRedo={builder.redo}
        onTogglePreview={() => builder.setPreviewMode(!builder.previewMode)}
        onDeviceChange={builder.setDeviceMode}
        onOpenSettings={() => setSettingsOpen(true)}
        onClearCanvas={builder.clearCanvas}
        onPaste={builder.pasteComponent}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Component Library */}
        {!builder.previewMode && (
          <ComponentLibrary onAddComponent={builder.addComponent} />
        )}

        {/* Center: Canvas */}
        <BuilderCanvas
          components={builder.components}
          selectedComponentId={builder.selectedComponentId}
          hoveredComponentId={builder.hoveredComponentId}
          previewMode={builder.previewMode}
          zoom={builder.zoom}
          deviceMode={builder.deviceMode}
          onSelectComponent={builder.selectComponent}
          onHoverComponent={builder.hoverComponent}
          onDeleteComponent={builder.removeComponent}
          onDuplicateComponent={builder.duplicateComponent}
          onCopyComponent={builder.copyComponent}
          onReorderComponents={builder.reorderComponents}
          onToggleLock={builder.toggleComponentLock}
          onToggleVisibility={builder.toggleComponentVisibility}
          onUpdateContent={builder.updateComponentContent}
        />

        {/* Right: Properties Panel */}
        {!builder.previewMode && (
          <PropertiesPanel
            component={builder.selectedComponent}
            onUpdateStyles={builder.updateComponentStyles}
            onUpdateContent={builder.updateComponentContent}
          />
        )}
      </div>

      {/* Site Settings Dialog */}
      <SiteSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={builder.siteSettings}
        onUpdateSettings={builder.updateSiteSettings}
      />
    </div>
  );
};

export default SiteBuilder;
