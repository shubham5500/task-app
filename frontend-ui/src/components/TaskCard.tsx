import React from "react";
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`px-4 py-2 bg-white shadow-md rounded-md mb-3 ${
            snapshot.isDragging ? 'primary-light-100' : ''
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className="font-medium">{task.title}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
