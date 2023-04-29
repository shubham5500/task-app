import React, {useEffect, useState} from 'react';
import {Droppable} from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const List = ({ list }) => {
  console.log({list})
  return (
    <div className="flex-shrink-0 w-80 mr-4">
      <h2 className="text-lg font-medium mb-2">{list.title}</h2>
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-100 rounded-lg p-4 h-full overflow-y-auto"
          >
            {list.cards.map((card, index) => (
              <TaskCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default List;
