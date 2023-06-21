import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormControl,
    Input,
    Button,
    Text,
    Center,
    Stack,
    Show,
    Container,
    Textarea,
    useDisclosure,
    Flex,
    Image,
} from "@chakra-ui/react";
import { SidebarWithHeader } from "../../Components/main/SidebarWithHeader";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMutation } from "react-query";
import { createMessageRecommandation } from "../../services/messageRecommandation/createMessageRecommandation.jsx";
import { useAuthUser } from "react-auth-kit";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import success from "../../assets/images/completed.png";
import { AlertModal } from "../../Components/Modals/Alertmodal";
import { SuccessButton } from "@/Components/Buttons/SuccessButton.jsx";
import { CancelButton } from "@/Components/Buttons/CancelButton.jsx";

export const LeaveMessage = () => {
    const auth = useAuthUser();
    const [errorMessage, setErrorMessage] = useState("");
    const { t } = useTranslation();

    const successModal = useDisclosure();
    const alertModal = useDisclosure();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        clearErrors,
        reset,
    } = useForm();

    const createMessageMutation = useMutation({
        mutationFn: createMessageRecommandation,
        onSuccess: (e) => {
            e.preventDefault;
            successModal.onOpen();
            reset();
        },
        onError: (error) => {
            console.error(error);
            setErrorMessage("There was an error submitting the form. Please try again.");
            // set error message in state or display it to the user in some other way
        },
    });

    function onSubmit(data) {
        try {
            createMessageMutation.mutateAsync({
                userEcole: `${auth().ecole} - ${auth().ecoleAux}`,
                Auteur: data.auteur,
                Sujet: data.sujet,
                Message: data.message,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const cancelSubmit = () => {
        console.log("cancel submit");
        alertModal.onOpen();
    };

    const deleteMessage = () => {
        createMessageMutation.reset();
        // Redirect the user to the home page
        window.location.href = "/";
    };

    return (
        <SidebarWithHeader>
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={successModal.onClose}
                onOpen={successModal.onOpen}
                imageSrc={success}
                imageAlt="Success Icon"
                title={t("modales.sendingMessage.success.title")}
                message={t("modales.sendingMessage.success.message")}
            />

            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={alertModal.onClose}
                onOpen={alertModal.onOpen}
                title={t("modales.sendingMessage.alert.title")}
                message={t("modales.sendingMessage.alert.message")}
                handleSubmit={() => deleteMessage()}
            />

            <Flex
                height={{ base: "none", md: "80vh" }}
                pt={{ base: "4", md: "0" }}
                overflow={"hidden"}
                overflowY="scroll"
                flexDirection={{ base: "column", md: "row" }}
            >
                <Flex
                    flexDirection="column"
                    align="center"
                    justifyContent={"space-between"}
                    p="4"
                    pl="8"
                    gap={{ base: "8", lg: "2" }}
                    background="linear-gradient(151.52deg, #3D80BC 10.77%, #351153 91.65%)"
                    borderRightRadius={{ base: "15", md: "0" }}
                    borderRadius={15}
                    minHeight="full"
                    mx={{ base: "8", md: "0" }}
                >
                    <Stack flexGrow={1} gap="4" justifyContent={"center"}>
                        <Text color="White" fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"bold"} as="i">
                            {t("pages.leaveMessage.leaveMessage_intro")}
                        </Text>
                        <Text as="h5" color="White" fontSize={{ base: "", lg: "xl" }} fontWeight={"light"}>
                            {t("pages.leaveMessage.leaveMessage_text_1")}
                        </Text>
                        <Text as="i" fontSize={{ base: "", lg: "xl" }} color="White" fontWeight={"light"}>
                            {t("pages.leaveMessage.leaveMessage_text_2")}
                        </Text>
                    </Stack>
                </Flex>
                <Flex
                    flexDirection={"column"}
                    minHeight="full"
                    p="8"
                    borderLeftRadius={{ base: "15", md: "0" }}
                    borderRadius={15}
                    width="100%"
                    justifyContent="center"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {createMessageMutation.isError && JSON.stringify(error)}

                        <Flex flexDirection={"column"} gap="5">
                            <FormControl isInvalid={errors.auteur}>
                                <Input
                                    bgColor="white"
                                    boxShadow="md"
                                    name="auteur"
                                    id="auteur"
                                    placeholder={t("pages.leaveMessage.leaveMessage_name")}
                                    {...register("auteur", {
                                        required: t("main.errors.required_field"),
                                        minLength: { value: 4, message: "Minimum 4 caractères requis" },
                                    })}
                                />
                                <FormErrorMessage>{errors.auteur && errors.auteur.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.sujet}>
                                <Input
                                    bgColor="white"
                                    boxShadow="md"
                                    name="sujet"
                                    id="sujet"
                                    placeholder={t("pages.leaveMessage.leaveMessage_subject")}
                                    {...register("sujet", {
                                        required: t("main.errors.required_field"),
                                        minLength: { value: 4, message: "Minimum 4 caractères requis" },
                                    })}
                                />
                                <FormErrorMessage>{errors.sujet && errors.sujet.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.message}>
                                <Textarea
                                    bgColor="white"
                                    boxShadow="md"
                                    name="message"
                                    id="message"
                                    height={"250px"}
                                    placeholder={t("pages.leaveMessage.leaveMessage_message")}
                                    {...register("message", {
                                        required: t("main.errors.required_field"),
                                        minLength: { value: 30, message: "Votre message trop court" },
                                    })}
                                />
                                {errorMessage != "" && <p>{errorMessage}</p>}
                                <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
                            </FormControl>

                            <Flex align="center" justifyContent={"center"} gap="3">
                                <CancelButton onClick={() => cancelSubmit()} flex={1} />
                                <SuccessButton text={t("main.general.submit")} flex={2} />
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    );
};
