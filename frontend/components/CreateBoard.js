import React, { useState } from 'react';
import Input from './Input';
import Button from "./Button";

function CreateBoard(props) {
  const [boardName, setBoardName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    // props.onBoardSubmit(boardName);
    setBoardName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="boardName" className="block text-gray-700 font-bold mb-2">
          Board Name
        </label>
        <Input
          type="text"
          name="boardName"
          value={boardName}
          placeholder="Enter board name"
          onChange={(event) => setBoardName(event.target.value)}
        />
      </div>
      <Button
        text={'Create Board'}
        className="bg-primary-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
    </form>
  );
}

export default CreateBoard;
