import React, {FC, useEffect} from 'react';
import {isEmpty} from 'lodash';
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import {FormProvider, useForm} from "react-hook-form";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {CREATE_CARD, GET_CARD_DETAIL, UPDATE_CARD} from "@/graphql/queries/card.query";
import {GET_BOARD} from "@/graphql/queries/board.query";
import {showToast} from "@/components/Toast";
import {Card} from "@/interfaces";

interface pageProps {
    listId: string,
    position: number,
    toggleModal?(): void,
    cardDetail?: Card,
}

const AddOrUpdateTaskForm: FC<pageProps> = ({listId, position, cardDetail, toggleModal = () => {}}) => {

    const methods = useForm();

    const [addCard] = useMutation(CREATE_CARD, {
        refetchQueries: [{
            query: GET_BOARD,
        },]
    })


    const [updateCard] = useMutation(UPDATE_CARD, {
        refetchQueries: [{
            query: GET_BOARD,
        },]
    })

    const onSubmit = async () => {
        const {title, description} = methods.getValues()
        const payload = {
            listId,
            position,
            title,
            description
        }

        if (isUpdateMode)  {
            await updateCard({variables: {
                title, description, cardId: cardDetail?._id
            }});
            toggleModal();
        }
        else {
            await addCard({variables: payload});
        }

        showToast('Successfully created!', 'success');
        methods.reset();
    };

    const isUpdateMode = !isEmpty(cardDetail);

    useEffect(() => {
        if (!isEmpty(cardDetail)) {
            const {title, description} = cardDetail;
            methods.setValue('title', title);
            methods.setValue('description', description);
        }
    }, [cardDetail]);

    const title = isUpdateMode ? 'Update Task' : 'Add Task';

    return (
        <div
            className={`w-[400px] bg-grey bg-gray-200 rounded-lg overflow-hidden transition duration-300 ease-in-out mx-3 mb-4`}
        >
            <div className="px-4 py-3">
                <h2 className="text-lg font-medium text-gray-800">{title}</h2>
            </div>
            <FormProvider {...methods}>
                <form className={"px-3 py-3"}>
                    <Input placeholder={'Title'}
                           name={'title'}/>
                    <Textarea placeholder={'Description'}
                              type={'textarea'}
                              inputProps={{rows: 3}}
                              name={'description'}/>
                    <Button className={'block w-full bg-button-secondary hover:bg-button-secondary-hover'}
                            type={'submit'}
                            onClick={methods.handleSubmit(onSubmit)}
                            text={isUpdateMode ? 'Update' : 'Add'}/>
                </form>
            </FormProvider>

        </div>
    );
};

export default AddOrUpdateTaskForm;
