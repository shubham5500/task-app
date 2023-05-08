import React from 'react';
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";

function AddTask(props) {
    return (
        <div
            className={`bg-white shadow-md  bg-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out mb-4`}
        >
            <div className="px-4 py-3">
                <h2 className="text-lg font-medium text-gray-800">Add Card</h2>
            </div>
            <div className={'px-3 py-3'}>
                <Input name={'add-task'}
                       placeholder={'Title'}
                       onChange={() => {
                           console.log('')
                       }}/>
                <Textarea name={'add-task'}
                          placeholder={'Title'}
                          type={'textarea'}
                          inputProps={{rows: 4}}
                          onChange={() => {
                              console.log('')
                          }}/>
                <Button className={'block w-full bg-button-secondary hover:bg-button-secondary-hover'} text={'Add'}/>
            </div>

        </div>
    );
}

export default AddTask;
