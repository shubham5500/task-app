import React, {FC} from 'react';
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import {FormProvider, useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {CREATE_CARD} from "@/graphql/queries/card.query";
import {GET_BOARD} from "@/graphql/queries/board.query";
import {showToast} from "@/components/Toast";

interface pageProps {
    listId: string,
    position: number,
}

const AddTask: FC<pageProps> = ({listId, position}) => {

    const methods = useForm();
    const [addCard, {data, loading, error}] = useMutation(CREATE_CARD, {
        refetchQueries: [ {
            query: GET_BOARD,
        },]
    })

    const onSubmit = async ({title, description} : any) => {
        const payload = {
            listId,
            position,
            title,
            description
        }
        await addCard({variables: payload});
        showToast('Successfully created!', 'success');
        methods.reset();
    };


    return (
        <div
            className={`w-[400px] bg-grey bg-gray-200 rounded-lg overflow-hidden transition duration-300 ease-in-out mx-3 mb-4`}
        >
            <div className="px-4 py-3">
                <h2 className="text-lg font-medium text-gray-800">Add Card</h2>
            </div>
            <FormProvider {...methods}>
               <form className={"px-3 py-3"}>
                   <Input placeholder={'Title'} name={'title'}/>
                   <Textarea placeholder={'Description'}
                             type={'textarea'}
                             inputProps={{rows: 3}}
                             name={'description'}/>
                   <Button className={'block w-full bg-button-secondary hover:bg-button-secondary-hover'}
                           type={'submit'}
                           onClick={methods.handleSubmit(onSubmit)}
                           text={'Add'}/>
               </form>
            </FormProvider>

        </div>
    );
}

export default AddTask;
