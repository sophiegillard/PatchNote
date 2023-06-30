import {
    Button,
    Center,
    Flex,
    VStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Text,
    HStack,
} from "@chakra-ui/react";
import {t} from "i18next";
import {useAllStatutMessageQuery} from "@/services/queries/getAllStatutMessage.js";
import {BiTrash, MdAdd, BsFillSquareFill} from "react-icons/all.js";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {deleteStatutMessageRecommandationById
} from "@/services/statutMessageRecommandation/deleteStatutMessageRecommandation.js";
import {updateMessageRecommandationById} from "@/services/messageRecommandation/updateMessageRecommandationById.js";
import {AddStatutAccordion} from "../../Pages/AdminPages/Mailbox/AddStatutAccordion";
import {useForm, Controller} from "react-hook-form";
import {closeModal} from "@/Utils/basicFormFunctions.js";


export const OptionWithColorModal = ({ isOpen, onClose, statutMessageRecommandationId,id, modale, refetechMessages }) => {
    const [stateMessage, setStateMessage] = useState(statutMessageRecommandationId)
    const queryClient = useQueryClient();

    //Calling react query to get all status
    const { data: listAllStatutMessage, refetch : refetchAllStatut } = useAllStatutMessageQuery();

    //Handling delete statut message
    const { mutate: deleteStatutMessage } = useMutation(deleteStatutMessageRecommandationById, {
        onSuccess: () => {
            queryClient.invalidateQueries('statutMessageRecommandations')
            refetchAllStatut();
        },
    });

    const { handleSubmit, formState: { errors }, control} = useForm();


    //Update the statut of message
    const mutation = useMutation({
        mutationFn: updateMessageRecommandationById,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries("messages")
            closeModal(modale);
        },
        onError:() => {console.log("error")}
})


    const updateStatut = async (data) => {
        try {
            const result = await mutation.mutateAsync({ id,
                statutMessageRecommandationId: stateMessage,
            })
                .then((data) => {
                    queryClient.invalidateQueries("messages")
                    refetechMessages();
                })
                .catch((error) => {
                    console.error('Error updating statut message:', error)
                })
        } catch (error) {
            console.error('Error updating statut message:', error)
        }
    }


    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>

                <ModalOverlay />

                    <ModalContent alignContent="center" width={{base: "95%", lg: "25%"}}>


                        <ModalHeader>
                            <HStack>
                                <Text>{t('modales.messageRecommandationStatut.title')}</Text>
                                <ModalCloseButton />
                            </HStack>
                        </ModalHeader>

                        <AddStatutAccordion refetchAllStatut={refetchAllStatut}/>

                        <form onSubmit={handleSubmit(updateStatut)}>

                        <Flex flexDirection="column" pt="10" pb="4">

                                <ModalBody>

                                    <Controller
                                        name="statutMessageRecommandationId"
                                        control={control}
                                        defaultValue={stateMessage}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <RadioGroup maxH="230px"
                                                        overflowY="scroll"
                                                        pl="1"
                                                onChange={(e) => {
                                                setStateMessage(e);
                                                field.onChange(e);
                                            }} value={stateMessage} zIndex="10">
                                                {listAllStatutMessage && listAllStatutMessage
                                                    .filter((item) => item.id !== 4) // Filter out item with id = 4
                                                    .map((item) => {
                                                        return (
                                                            <Flex gap={3} pb={5} width="70%" key={item.id}>
                                                                <Radio value={item.id} width="100%">
                                                                    <Text>{item.name}</Text>
                                                                </Radio>
                                                                <BsFillSquareFill size="2rem" color={item.color} />
                                                                <BiTrash size="2rem" cursor="pointer" onClick={() => deleteStatutMessage(item.id)} />
                                                            </Flex>
                                                        )
                                                    })}
                                            </RadioGroup>
                                        )}
                                    />
                                    {errors.statutMessageRecommandationId && <span>This field is required</span>}
                                </ModalBody>

                                <ModalFooter gap="5" mt="6" >
                                    <Flex flexDirection="column-reverse" width="100%" gap="1">
                                        <Button variant='ghost' onClick={onClose}>{t('main.general.cancel')}</Button>
                                        <Button colorScheme='successButton' type="submit" disabled={mutation.isLoading}>
                                            {t('main.general.save')}
                                        </Button>
                                    </Flex>
                                </ModalFooter>

                            </Flex>
                        </form>

                </ModalContent>

            </Modal>
        </>
    )
}