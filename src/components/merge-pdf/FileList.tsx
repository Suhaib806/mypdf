import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
import { formatFileSize } from '@/utils/fileUtils';

interface FileListProps {
  files: File[];
  onDragEnd: (result: DropResult) => void;
  onRemoveFile: (index: number) => void;
  getTotalSize: () => number;
}

const FileList: React.FC<FileListProps> = ({ files, onDragEnd, onRemoveFile, getTotalSize }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Selected files: {files.length}</h3>
        <span className="text-sm text-gray-500">
          Total: {formatFileSize(getTotalSize())}
        </span>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="files">
          {(provided: DroppableProvided) => (
            <ul 
              className="mt-2 divide-y divide-gray-100 border-t border-gray-100"
              {...provided.droppableProps}
              ref={(el) => provided.innerRef(el as HTMLElement)}
            >
              {files.map((file, index) => (
                <Draggable key={index} draggableId={`file-${index}`} index={index}>
                  {(provided: DraggableProvided) => (
                    <li 
                      ref={(el) => provided.innerRef(el as HTMLElement)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="size-5 text-indigo-600" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        <div className="ml-2">
                          <span className="text-sm text-gray-700 truncate max-w-xs block">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFile(index)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FileList; 