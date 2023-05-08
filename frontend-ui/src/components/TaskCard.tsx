
import { Card } from "@/interfaces";
import React, { FC } from "react";
import { Draggable } from 'react-beautiful-dnd';

interface pageProps {
  task: Card,
  index: number,
  onClick: () => {},
}

const TaskCard: FC<pageProps> = ({ task:{_id, title, createdAt}, index, onClick }) => {
  const getTime = () => {
    const time = new Date(createdAt).toTimeString().split(' ')[0].split(':');
    return `${time[0]}:${time[1]} ${new Date(createdAt).toDateString()}`
  }
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out mb-4 ${
            snapshot.isDragging ? 'primary-light-100' : ''
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <li className="flex px-4 py-4">

            <div className="flex flex-1 flex-col">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <h3>
                  <a href="#">{title}</a>
                </h3>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">{getTime()}</p>

                <div className="flex">
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Detail</button>
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
