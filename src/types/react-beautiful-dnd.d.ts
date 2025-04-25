declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  // DragDropContext
  export type DragStart = {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
  };

  export type DropResult = {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    };
    reason: 'DROP' | 'CANCEL';
  };

  export type DragDropContextProps = {
    onBeforeDragStart?: (start: DragStart) => void;
    onDragStart?: (start: DragStart) => void;
    onDragUpdate?: (update: any) => void;
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  };

  export const DragDropContext: React.FC<DragDropContextProps>;

  // Droppable
  export type DroppableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: {
      'data-rbd-droppable-id': string;
      'data-rbd-droppable-context-id': string;
    };
    placeholder?: React.ReactNode;
  };

  export type DroppableProps = {
    droppableId: string;
    type?: string;
    mode?: 'standard' | 'virtual';
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    direction?: 'horizontal' | 'vertical';
    ignoreContainerClipping?: boolean;
    children: (provided: DroppableProvided) => React.ReactNode;
  };

  export const Droppable: React.FC<DroppableProps>;

  // Draggable
  export type DraggableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      'data-rbd-draggable-context-id': string;
      'data-rbd-draggable-id': string;
      tabIndex: number;
    };
    dragHandleProps: {
      role: string;
      'aria-describedby': string;
      'data-rbd-drag-handle-draggable-id': string;
      'data-rbd-drag-handle-context-id': string;
      draggable: boolean;
      tabIndex: number;
    };
  };

  export type DraggableProps = {
    draggableId: string;
    index: number;
    isDragDisabled?: boolean;
    disableInteractiveElementBlocking?: boolean;
    children: (provided: DraggableProvided) => React.ReactNode;
  };

  export const Draggable: React.FC<DraggableProps>;
} 