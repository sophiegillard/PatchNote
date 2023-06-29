import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    FormErrorMessage,
    Image,
    Center,
    Divider,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import logo from "../assets/images/logo_blue.png";
import { WarningModal } from "@/Components/Modals/WarningModal";
import { useTranslation } from "react-i18next";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton.jsx";

export const LoginPage = () => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const signIn = useSignIn();

    const loginErrorModal = useDisclosure();

    const onSubmit = (data) => {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_DEV_BASE_URL}/auth/login`,
            data: {
                UserName: data.userName,
                motDePasse: data.password,
            },
            proxy: false,
        })
            .then(function (response) {
                // Set a cookie with the JWT token from the response
                document.cookie = `jwtToken=${response.data.jwtToken}; HttpOnly`;

                // Redirect the user to the dashboard or home page
                window.location.href = "/";

                //Stores requested datas in local storage using React auth kit
                signIn({
                    token: data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: {
                        utilisateurId: response.data.utilisateur.id,
                        typeUtilisateur: response.data.utilisateur.typeUtilisateur,
                        nom: response.data.utilisateur.nom,
                        prenom: response.data.utilisateur.prenom,
                        isSubscribed: response.data.utilisateur.newsletter,
                        language: response.data.utilisateur.langue,
                    },
                });
            })

            .catch(function (error) {
                if (error.response && error.response.status === 500) {
                    console.log("Error 500: Internal Server Error");
                    loginErrorModal.onOpen();
                } else {
                    console.log("An error occurred:", error);
                }
            });
    };

    const handlePredefinedLogin = (login, password) => {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_DEV_BASE_URL}/auth/login`,
            data: {
                UserName: login,
                motDePasse: password,
            },
            proxy: false,
        })
            .then(function (response) {
                // Set a cookie with the JWT token from the response
                document.cookie = `jwtToken=${response.data.jwtToken}; HttpOnly`;

                // Redirect the user to the dashboard or home page
                window.location.href = "/";

                //Stores requested datas in local storage using React auth kit
                signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: {
                        utilisateurId: response.data.utilisateur.id,
                        typeUtilisateur: response.data.utilisateur.typeUtilisateur,
                        nom: response.data.utilisateur.nom,
                        prenom: response.data.utilisateur.prenom,
                        isSubscribed: response.data.utilisateur.newsletter,
                        language: response.data.utilisateur.langue,
                    },
                });
            })

            .catch(function (error) {
                console.log("the error is" + error);
            });
    };

    return (
        <>
            <WarningModal isOpen={loginErrorModal.isOpen} onClose={loginErrorModal.onClose} message={t("pages.login.login_not_found")} />
            <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
                <Stack
                    spacing={8}
                    align={"center"}
                    justify={"center"}
                    mx={"auto"}
                    maxW={"lg"}
                    py={8}
                    px={6}
                    rounded={"lg"}
                    bg={{ base: "none", md: useColorModeValue("white", "gray.700") }}
                    boxShadow={{ base: "none", md: "lg" }}
                    p={8}
                >
                    <Image src={logo} alt="logo" boxSize="130px" />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <Center>
                                <Heading fontSize={{ base: "md", md: "2xl" }} textAlign="center">
                                    {t("pages.login.login_title")}
                                </Heading>
                            </Center>

                            <Stack>
                                <FormControl id="userName" isInvalid={errors.userName}>
                                    <FormLabel>{t("pages.login.login_username")}</FormLabel>
                                    <Input
                                        type="userName"
                                        {...register("userName", {
                                            required: true,
                                        })}
                                    />
                                    {errors.userName && <FormErrorMessage>{t("pages.login.login_error")}</FormErrorMessage>}
                                </FormControl>

                                <FormControl id="password" isInvalid={errors.password}>
                                    <FormLabel>{t("pages.login.login_password")}</FormLabel>
                                    <Input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password && <FormErrorMessage>{t("pages.login.login_error")}</FormErrorMessage>}
                                </FormControl>

                                <Stack pt={6} spacing={6}>
                                    <PrimaryActionButton text={t("pages.login.login_submit")} type="submit" isLoading={isSubmitting} />

                                    <Box display="flex" alignItems="center">
                                        <Divider flex="1" borderColor="black" />
                                        <Text px="2" fontWeight="bold">
                                            {t("main.general.or")}
                                        </Text>
                                        <Divider flex="1" borderColor="black" />
                                    </Box>

                                    <Stack spacing={4}>
                                        <Text textAlign={"center"}>{t("pages.login.discover")}</Text>
                                        <Flex justifyContent={"space-between"}>
                                            <Button
                                                onClick={() => handlePredefinedLogin("admin", "passwordAdmin")}
                                                colorScheme="gray"
                                                flexGrow={10}
                                                isLoading={isSubmitting}
                                                maxWidth="48%"
                                            >
                                                {t("pages.login.admin_try")}
                                            </Button>
                                            <Button
                                                onClick={() => handlePredefinedLogin("user", "passwordUser")}
                                                colorScheme="gray"
                                                flexGrow={10}
                                                isLoading={isSubmitting}
                                                maxWidth="48%"
                                            >
                                                {t("pages.login.user_try")}
                                            </Button>
                                        </Flex>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
        </>
    );
};
