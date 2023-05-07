import React, { useState } from 'react';
import Input from './Input';
import Button from "./Button";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createBoardAction } from '@/store/thunks/board.thunk';


function CreateBoard(props) {
  const [boardName, setBoardName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBoardAction(boardName))

    setBoardName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input
          label={'Create Board'}
          type="text"
          name="boardName"
          value={boardName}
          placeholder="Enter board name"
          onChange={(event: any) => setBoardName(event?.target?.value)}
        />
      </div>
      <Button
        text={'Create Board'}
        className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
    </form>
  );
}

export default CreateBoard;
