import React, { FC, useEffect, useState } from "react";
import NoSSR from "react-no-ssr";
import { cloneDeep } from "lodash";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListComponent from "./List";
import Loading from "./Loading";
import { List } from "@/interfaces";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOARD, UPDATE_BOARD } from "@/graphql/queries/board.query";
import { UPDATE_CARD } from "@/graphql/queries/card.query";
import { UPDATE_LIST } from "@/graphql/queries/list.query";
import ErrorComponent from "./Error";
import AddList from "@/components/AddList";

const BoardComponent = () => {

  const { loading, error, data } = useQuery(GET_BOARD);

  const [
    updateBoard,
    { loading: loadingUpdate, error: updateBoardError, data: updatedData },
  ] = useMutation(UPDATE_BOARD, {
    refetchQueries: [ {
      query: GET_BOARD,
    },]
  });

  const [
    updateCard,
    {
      loading: loadingUpdateCard,
      error: updateCardError,
      data: updateCardData,
    },
  ] = useMutation(UPDATE_CARD, {
    refetchQueries: [
      {
        query: GET_BOARD,
      },
    ],
  });


  const boardData = data && cloneDeep(data.getBoards[0]);

  const handleDragEnd = async (result: {
    destination: any;
    source: any;
    draggableId: any;
    type: any;
  }) => {
    
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const initialPosition = source.index;
    const finalPosition = destination.index;

    if (type === "LIST") {
     await updateBoard({
        variables: {
          boardId: boardData._id,
          listId: draggableId,
          sourcePosition: initialPosition,
          destinationPosition: finalPosition,
        },
      });
    } else if (type === "CARD") {
      await updateCard({
        variables: {
          cardId: draggableId,
          sourceListId: source.droppableId,
          destinationListId: destination.droppableId,
          sourcePosition: initialPosition,
          destinationPosition: finalPosition,
        },
      });
    }
  };

  if (loading || loadingUpdate || loadingUpdateCard) {
    return <Loading />;
  }

  if (error || updateBoardError || updateCardError) {
    return <ErrorComponent />;
  }

  const sortFn = (a: List, b: List) => {
    return a.position - b.position;
  };

  return (
    <NoSSR onSSR={<Loading />}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="LIST">
          {(provided: any) => (
            <div
              className="flex"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boardData.lists.sort(sortFn).map((list: List) => (
                <ListComponent
                  key={list._id}
                  list={list}
                  index={list.position}
                />
              ))}
              {provided.placeholder}
              <AddList position={boardData.lists.length}/>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </NoSSR>
  );
};

export default BoardComponent;
