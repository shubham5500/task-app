import React, {FC, useState} from "react";
import Input from "@/components/Input";
import {useForm, FormProvider} from "react-hook-form";
import Button from "@/components/Button";
import {useMutation} from "@apollo/client";
import {ADD_LIST} from "@/graphql/queries/list.query";
import {showToast} from "@/components/Toast";
import {GET_BOARD} from "@/graphql/queries/board.query";

interface pageProps {
    position: number,
}

const AddList: FC<pageProps> = ({position}) => {

    const methods = useForm();

    const [addList, {data, loading, error}] = useMutation(ADD_LIST, {
        refetchQueries: [ {
            query: GET_BOARD,
        },]
    })

    const submit = async ({title} : any) => {
        await addList({
            variables: {
                "boardId": "6452bae23d86e209443930e8",
                position,
                title,
            }
        });
        showToast('List successfully added!', 'success');
        methods.reset();
    }

    return (
        <div className="min-w-[400px] border rounded-md shadow-md p-3 m-2 bg-white-500 dark:bg-gray-800 align-center"
             style={{border: '2px dashed #e5e5e5'}}>
            <FormProvider {...methods}>
                <form>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Add a list..."
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={methods.handleSubmit(submit)}
                        text={'Add List'}
                    />

                </form>
            </FormProvider>
        </div>
    );
};

export default AddList;
