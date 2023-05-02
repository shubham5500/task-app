import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'

import List from "./List";


const Board = () => {
  const boards = useSelector((state) => state.boardReducer.boards)
  console.log({boards})
  const [board, setBoard] = useState({
    lists: [
      {
        id: "list-1",
        title: "To Do",
        cards: [
          { id: "card-1", title: "Task 1" },
          { id: "card-2", title: "Task 2" },
          { id: "card-3", title: "Task 3" },
        ],
        position: 1,
      },
      {
        id: "list-2",
        title: "In Progress",
        cards: [
          { id: "card-4", title: "Task 4" },
          { id: "card-5", title: "Task 5" },
        ],
        position: 2,
      },
      {
        id: "list-3",
        title: "Done",
        cards: [
          { id: "card-6", title: "Task 6" },
          { id: "card-7", title: "Task 7" },
          { id: "card-8", title: "Task 8" },
        ],
        position: 3,
      },
    ],
  });

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "list") {
      const newLists = Array.from(board.lists);
      const [removedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removedList);

      setBoard({
        ...board,
        lists: newLists,
      });
    } else {
      const sourceList = board.lists.find((list) => list.id === source.droppableId);
      const destinationList = board.lists.find((list) => list.id === destination.droppableId);

      if (sourceList === destinationList) {
        const newCards = Array.from(sourceList.cards);
        const [removedCard] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, removedCard);

        const newLists = board.lists.map((list) => {
          if (list.id === sourceList.id) {
            return {
              ...list,
              cards: newCards,
            };
          }
          return list;
        });

        setBoard({
          ...board,
          lists: newLists,
        });
      } else {
        const sourceCards = Array.from(sourceList.cards);
        const [removedCard] = sourceCards.splice(source.index, 1);

        const destinationCards = Array.from(destinationList.cards);
        destinationCards.splice(destination.index, 0, removedCard);

        const newLists = board.lists.map((list) => {
          if (list.id === sourceList.id) {
            return {
              ...list,
              cards: sourceCards,
            };
          }
          if (list.id === destinationList.id) {
            return {
              ...list,
              cards: destinationCards,
            };
          }
          return list;
        });

        setBoard({
          ...board,
          lists: newLists,
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="flex"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board.lists.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
