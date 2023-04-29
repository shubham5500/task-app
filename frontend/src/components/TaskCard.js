import {Draggable} from "react-beautiful-dnd";

export default function TaskCard({ card, index }) {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white rounded-md shadow-md p-4 mb-4"
        >
          <p className="font-medium">{card.title}</p>
          <p className="text-sm text-gray-500 mt-2">{card.description}</p>
        </div>
      )}
    </Draggable>
  );
}
