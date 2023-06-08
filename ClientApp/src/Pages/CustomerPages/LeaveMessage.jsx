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
import { t } from "i18next";
import { useState } from "react";
import { useMutation } from "react-query";
import { createMessageRecommandation } from "../../services/messageRecommandation/createMessageRecommandation.jsx";
import { useAuthUser } from "react-auth-kit";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import success from "../../assets/images/completed.png";
import logo from "../../assets/images/logo_small_light_blue.png";
import logo_white from "../../assets/images/texte-logo-apschool-blanc.e7163821.svg";
import { AlertModal } from "../../Components/Modals/Alertmodal";
import { SuccessButton } from "@/Components/Buttons/SuccessButton.jsx";
import { CancelButton } from "@/Components/Buttons/CancelButton.jsx";

export const LeaveMessage = () => {
    const auth = useAuthUser();
    const [errorMessage, setErrorMessage] = useState("");

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
            <Show above="xl">
                <Image
                    src={logo}
                    position={"absolute"}
                    maxWidth={"100%"}
                    height={"30%"}
                    overflow={"hidden"}
                    bottom={0}
                    zIndex={0}
                    p={0}
                    right={"-10"}
                    top="38%"
                />
            </Show>
            <Container minWidth={{ base: "70vw", xl: "60vw" }} maxH={{ base: "none", md: "60vh" }} zIndex={100} py={7}>
                <Flex zIndex={30} flexDirection={{ base: "column", md: "row" }} gap={{ base: "4", md: "0" }}>
                    <Center
                        flexDirection="column"
                        align="center"
                        justifyContent={"space-between"}
                        p="4"
                        gap={{ base: "8", lg: "2" }}
                        py={{ base: "4", lg: "8" }}
                        maxW={{ base: "100%", lg: "35%" }}
                        background="linear-gradient(151.52deg, #3D80BC 10.77%, #351153 91.65%)"
                        borderRightRadius={{ base: "15", md: "0" }}
                        borderRadius={15}
                    >
                        <Stack flexGrow={1} gap="4" justifyContent={"center"}>
                            <Text color="White" fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"bold"} as="i">
                                L'équipe est à votre écoute!
                            </Text>
                            <Text as="h5" color="White" fontSize={{ base: "", lg: "xl" }} fontWeight={"light"}>
                                Vous avez une idée d’amélioration ou un commentaire pour APSCHOOL?
                            </Text>
                            <Text as="i" fontSize={{ base: "", lg: "xl" }} color="White" fontWeight={"light"}>
                                Partagez-le nous en remplissant ce formulaire.{" "}
                            </Text>
                        </Stack>
                        <Image src={logo_white} alt={"Apschool_white"} width={{ base: "150px", lg: "200px" }} />
                    </Center>

                    <Flex bgColor="white" p="8" borderLeftRadius={{ base: "15", md: "0" }} borderRadius={15} width="100%">
                        <Stack flexGrow="1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Flex flexDirection={"column"} gap="6">
                                    {createMessageMutation.isError && JSON.stringify(error)}
                                    <FormControl isInvalid={errors.auteur}>
                                        <Input
                                            bgColor="white"
                                            boxShadow="md"
                                            name="auteur"
                                            id="auteur"
                                            placeholder="Votre nom"
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
                                            placeholder="Sujet"
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
                                            placeholder="Votre message"
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
                        </Stack>
                    </Flex>
                </Flex>
            </Container>
        </SidebarWithHeader>
    );
};
