import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Button,
    FormControl,
    HStack, Input,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {t} from "i18next";
import {Controller, useForm} from "react-hook-form";
import {BsFillSquareFill, IoAddOutline, IoIosAddCircle, MdAdd} from "react-icons/all.js";
import {HexColorPicker} from "react-colorful";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {
    createStatutMessageRecommandation
} from "../../../services/statutMessageRecommandation/createStatutMessageRecommandation.js";

export const AddStatutAccordion = ({refetchAllStatut}) =>{
    const [isColorPickerPanel, setColorPickerPanel] = useState(false);
    const [colorPicker, setColorPicker] = useState("#aabbcc");

    const queryClient = useQueryClient();

    //Calling react hook form to handle form
    const { register: registerStatut,
        handleSubmit: handleSubmitStatut,
        reset : resetStatut,
        control : controlStatut,
        formState: { errors : errorsStatut } } = useForm();

    //Handling adding of status


        //Calling react query to handle mutation
        const createMessageMutation = useMutation({
            mutationFn: createStatutMessageRecommandation,
            onSuccess: (data) => {
                queryClient.setQueryData(["statutMessageRecommandations", data.id], data)
                queryClient.invalidateQueries(['statutMessageRecommandations'])
                refetchAllStatut();
                resetStatut()
                setColorPickerPanel(false)
            },
        })

        //Function to create a new status
        const createStatut = async (data) => {
            try {
                const result = await createMessageMutation.mutateAsync({
                    nomStatut: data.statutName,
                    color: colorPicker
                })
                    .then((data) => {
                    })
                    .catch((error) => {
                        console.error('Error creating statut message:', error)
                    })
            } catch (error) {
                console.error('Error creating statut message:', error)
            }
        }

    //Function to handle form submit
    function onSubmit(data) {
        createStatut(data);
    }

    //Open color picker
    const toggleColorPickerPanel = () => {
        setColorPickerPanel(!isColorPickerPanel);
    };

    return <>
        <Accordion allowToggle={true} border="transparent" >
            <AccordionItem >

                <AccordionButton>
                    <HStack>
                        <MdAdd />
                        <Text>{t('modales.messageRecommandationStatut.add_status')}</Text>
                    </HStack>
                </AccordionButton>

                <AccordionPanel paddingX={0} zIndex="20"  px={6}>

                    <form onSubmit={handleSubmitStatut(createStatut)}>
                        <HStack>
                            <FormControl width="70%" id="statutName" name='statutName'>
                                <Input variant='flushed'
                                       {...registerStatut("statutName", { required: true })}
                                       placeholder="Nom du statut"  />
                                {errorsStatut.statutName && <span>{t('main.forms.error_message_field_required')}</span>}
                            </FormControl>

                            <Controller
                                control={controlStatut}
                                name={name}
                                rules={{ required: true }}
                                defaultValue={colorPicker}
                                render={({ field: { onChange, onBlur, value, name } }) => (
                                    <FormControl id={name} value={colorPicker} maxW="fit-content">
                                        <VStack>
                                            <BsFillSquareFill
                                                size="2rem"
                                                color={colorPicker}
                                                cursor="pointer"
                                                onClick={() => toggleColorPickerPanel()}
                                            />
                                            {isColorPickerPanel && (
                                                <Stack
                                                    borderRadius="9px"
                                                    shadow="md"
                                                    position="fixed"
                                                    zIndex="999"
                                                    top="43%"
                                                    left="50%"
                                                    transform="translate(-50%, -50%)"
                                                >
                                                    <HexColorPicker
                                                        color={colorPicker}
                                                        hue={180}
                                                        onChange={(color) => {
                                                            if (color.toLowerCase() === "#ffffff") {
                                                                // If the color is white, set it to a dark color instead
                                                                color = "#edf2f7";
                                                            }
                                                            setColorPicker(color);
                                                            onChange(color);
                                                        }}
                                                    />
                                                </Stack>
                                            )}
                                        </VStack>
                                    </FormControl>
                                )}
                            />

                            <Button type='submit'
                                    fontSize="xs"
                                    bgColor="transparent"
                                    _hover={{bgColor: "transparent"}}>
                                <IoAddOutline size="30px"/>
                            </Button>
                        </HStack>
                    </form>

                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </>
}