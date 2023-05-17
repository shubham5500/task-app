
import moment from "moment";
import { Card } from "@/interfaces";
import React, {FC, useState} from "react";
import { Draggable } from 'react-beautiful-dnd';
import { HiTrash } from "react-icons/hi";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {DELETE_CARD, GET_CARD_DETAIL} from "@/graphql/queries/card.query";
import {GET_BOARD} from "@/graphql/queries/board.query";

interface pageProps {
  task: Card,
  index: number,
  onCardDetailHandler?(cardId: any): void,
}

const TaskCard: FC<pageProps> = ({ task:{_id, title, position, createdAt, listId}, index, onCardDetailHandler = () => {} }) => {

  const getTime = moment(Number(createdAt)).format('llll');


  const [deleteCard] = useMutation(DELETE_CARD, {
    refetchQueries: [
        GET_BOARD
    ]
  });

  const onDeleteCard = async () => {
    await deleteCard({
      variables: {
        cardId: _id,
        listId: listId,
      }
    })
  };


  return (
    <Draggable draggableId={_id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          className={`bg-white w-[400px] shadow-md rounded-lg cursor-grab overflow-hidden hover:shadow-xl transition duration-300 ease-in-out mb-4 mx-3 ${
            snapshot.isDragging ? 'primary-light-100' : ''
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <li className="flex px-4 py-4">
            <div className="flex flex-1 flex-col" onClick={() => onCardDetailHandler(_id)}>
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <h3>
                  <a href="#">{title}</a>
                </h3>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">{getTime}</p>

                <div className="flex">
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Detail</button>
                  <HiTrash size={20}
                           onClick={onDeleteCard}
                           className={'text-danger mx-3'}/>
                </div>
              </div>
            </div>
          </li>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
