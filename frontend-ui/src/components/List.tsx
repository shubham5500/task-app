import React, {FC, useEffect, useState} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Card, List } from '@/interfaces';
import Modal from "@/components/Modal";
import {useLazyQuery} from "@apollo/client";
import {GET_CARD_DETAIL} from "@/graphql/queries/card.query";
import AddOrUpdateTaskForm from "@/components/AddOrUpdateTaskForm";

interface pageProps {
  list: List, 
  index: number,
  onDragEnd?: string,
}

interface CardDetail {
  isOpen: boolean,
  cardDetail: any,
}

const List: FC<pageProps> = ({ list, index }) => {

  const [modalData, setModalData] = useState<CardDetail>({isOpen: false, cardDetail: {}});
  const sortFn = (a: Card, b: Card) => {
    return a.position - b.position;
  };

  const [getCardDetail] = useLazyQuery(GET_CARD_DETAIL);

  const toggleModal = () => {
    setModalData({isOpen: false, cardDetail: {}});
    return;
  }

  const onCardDetailHandler = async (cardId?: any) => {
    const res = await getCardDetail({
      variables: {
        cardId
      }
    })
    setModalData({isOpen: true, cardDetail: res.data.getCard});
  }

  return (
    <Draggable draggableId={list._id} index={list.position}>
      {(provided: any) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="border rounded-md shadow-md m-4 bg-white dark:bg-gray-800 relative"
        >
          <div className="flex justify-between bg-button-secondary items-center mb-4 rounded px-3 py-3 capitalize sticky top-0" {...provided.dragHandleProps}>
            <h2 className="text-lg font-medium dark:text-gray-100">{list.title}</h2>
          </div>
          <Modal isOpen={modalData.isOpen}
                 showFooter={false}
                 toggleModal={() => toggleModal()}>
            <div>
              <AddOrUpdateTaskForm listId={list._id}
                       cardDetail={modalData.cardDetail}
                                   toggleModal={toggleModal}
                       position={modalData.cardDetail.position}/>
            </div>
          </Modal>
          <Droppable droppableId={list._id} type="CARD">
            {(provided: any) => (
              <div {...provided.droppableProps}
              className={"min-h-full"}
              ref={provided.innerRef}>
                {list.cards.sort(sortFn).map((task, index) => (
                  <TaskCard key={task._id}
                            task={task}
                            onCardDetailHandler={onCardDetailHandler}
                            index={task.position}/>
                ))}
                {provided.placeholder}
                <AddOrUpdateTaskForm listId={list._id}
                         position={list.cards.length}/>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
