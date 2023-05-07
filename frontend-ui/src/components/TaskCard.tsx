
import { Card } from "@/interfaces";
import React, { FC } from "react";
import { Draggable } from 'react-beautiful-dnd';

interface pageProps {
  task: Card,
  index: number
}

const TaskCard: FC<pageProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          className={`px-4 py-2 bg-white shadow-md rounded-md mb-3 ${
            snapshot.isDragging ? 'primary-light-100' : ''
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p style={{color: 'blue'}}>{task._id}</p>
          <p className="font-medium">{task.title}
          <span style={{color: 'red', margin: '0 10px', fontSize: '20px'}}>{task.position}</span>
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
