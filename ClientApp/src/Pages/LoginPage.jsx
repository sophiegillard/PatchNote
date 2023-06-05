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
} from "@chakra-ui/react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import logo from "../assets/images/APSchool-logo-couleur-CMJN.png";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const signIn = useSignIn();

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
                        typeUtilisateur:
                            response.data.utilisateur.typeUtilisateur,
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
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={12} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Image src={logo} alt="logo ApKiosk" />
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <Center>
                                <Heading fontSize={"4xl"} textAlign="center">
                                    {t("pages.login.login_title")}
                                </Heading>
                            </Center>

                            <Stack>
                                <FormControl
                                    id="userName"
                                    isInvalid={errors.userName}
                                >
                                    <FormLabel>
                                        {t("pages.login.login_username")}
                                    </FormLabel>
                                    <Input
                                        type="userName"
                                        {...register("userName", {
                                            required: true,
                                        })}
                                    />
                                    {errors.userName && (
                                        <FormErrorMessage>
                                            {t("pages.login.login_error")}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl
                                    id="password"
                                    isInvalid={errors.password}
                                >
                                    <FormLabel>
                                        {t("pages.login.login_password")}
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password && (
                                        <FormErrorMessage>
                                            {t("pages.login.login_error")}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>

                                <Stack pt={6}>
                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        bg={"primaryBlue.300"}
                                        color={"white"}
                                        _hover={{
                                            bg: "primaryBlue.400",
                                        }}
                                    >
                                        {t("pages.login.login_submit")}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};
