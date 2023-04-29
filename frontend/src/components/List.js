import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const List = ({ list, index, onDragEnd }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex-1 border rounded-md shadow-md p-4 m-4 bg-white dark:bg-gray-800"
        >
          <div className="flex justify-between items-center mb-4" {...provided.dragHandleProps}>
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">{list.title}</h2>
          </div>
          <Droppable droppableId={list.id} type="CARD">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.cards.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
