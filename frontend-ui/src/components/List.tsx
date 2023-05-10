import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Card, List } from '@/interfaces';
import AddTask from "@/components/AddTask";

interface pageProps {
  list: List, 
  index: number,
  onDragEnd?: string,
}

const List: FC<pageProps> = ({ list, index }) => {
  const sortFn = (a: Card, b: Card) => {
    return a.position - b.position;
  };

  return (
    <Draggable draggableId={list._id} index={list.position}>
      {(provided: any) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex-1 border rounded-md shadow-md p-4 m-4 bg-white dark:bg-gray-800"
        >
          <div className="flex justify-between items-center mb-4" {...provided.dragHandleProps}>
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">{list.title}</h2>
          </div>
          <Droppable droppableId={list._id} type="CARD">
            {(provided: any) => (
              <div {...provided.droppableProps}
              className={"min-h-full"}
              ref={provided.innerRef}>
                {list.cards.sort(sortFn).map((task, index) => (
                  <TaskCard key={task._id} task={task} index={task.position}/>
                ))}
                {provided.placeholder}
                <AddTask listId={list._id} position={list.cards.length}/>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
