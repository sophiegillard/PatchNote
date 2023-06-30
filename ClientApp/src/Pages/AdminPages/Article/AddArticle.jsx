import { SidebarWithHeader } from "@/Components/main/SidebarWithHeader.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { FormControl, FormLabel, Input, Flex, FormErrorMessage, useDisclosure, ButtonGroup, Stack } from "@chakra-ui/react";
import { useAllModulesQuery } from "@/services/queries/getAllModules.js";
import { useAllCategoriesQuery } from "@/services/queries/getAllCategories.js";
import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { createArticle } from "@/services/articles/createArticle.js";
import check from "../../../assets/images/check.png";
import { SuccessModal } from "@/Components/Modals/SuccessModal.jsx";
import { SuccessButton } from "@/Components/Buttons/SuccessButton";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton.jsx";
import { CancelButton } from "@/Components/Buttons/CancelButton";
import { AlertModal } from "@/Components/Modals/Alertmodal.jsx";
import { openModal, resetFormMutation } from "@/Utils/basicFormFunctions.js";
import { BackAndTitle } from "@/Components/Other/BackAndTitle.jsx";
import { formattedDate } from "@/Utils/getCurrentDate.js";
import { useTranslation } from "react-i18next";
import { UpdatedTabPanel } from "@/Components/Tabs/UpdatedTabPanel.jsx";
import { LanguageTabList } from "@/Components/Tabs/LanguageTabList.jsx";

export const AddArticle = () => {
    const { t } = useTranslation();
    const auth = useAuthUser();

    //Form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm();

    //Modals
    const successModal = useDisclosure();
    const draftSuccessModal = useDisclosure();
    const alertModal = useDisclosure();

    //Get all modules and categories
    const { data: modules } = useAllModulesQuery();
    const { data: categories } = useAllCategoriesQuery();

    const createArticleMutation = useMutation({
        mutationFn: createArticle,
        onError: (error) => {
            console.log("error" + error);
        },
    });

    function onSubmitCreateArticle(data, e) {
        e.preventDefault();
        console.log(data);
        try {
            createArticleMutation.mutateAsync(
                {
                    TitreFR: data?.TitreFR,
                    ContenuFR: data?.ContenuFR,
                    TitreEN: data?.TitreEN,
                    ContenuEN: data?.ContenuEN,
                    TitreNL: data?.TitreNL,
                    ContenuNL: data?.ContenuNL,
                    Version: data.Version,
                    DatePublication: `${data.DatePublication}T08:00:00Z`,
                    DateModification: formattedDate,
                    CategorieId: data.CategorieId,
                    AuteurId: auth().utilisateurId,
                    ModuleId: data.ModuleId,
                    IsBrouillon: 0,
                },
                {
                    onSuccess: () => {
                        successModal.onOpen();
                        reset();
                    },
                    onError: (error) => {
                        console.log("error" + error);
                    },
                    context: { isCreated: true },
                }
            );
        } catch (error) {
            console.error("the error is" + error);
        }
    }

    function onSubmitCreateBrouillonArticle(data) {
        try {
            createArticleMutation.mutateAsync(
                {
                    TitreFR: data?.TitreFR,
                    ContenuFR: data?.ContenuFR,
                    TitreEN: data?.TitreEN,
                    ContenuEN: data?.ContenuEN,
                    TitreNL: data?.TitreNL,
                    ContenuNL: data?.ContenuNL,
                    Version: data?.Version,
                    DatePublication: `${data.DatePublication}T08:00:00Z`,
                    DateModification: formattedDate,
                    CategorieId: data.CategorieId,
                    AuteurId: auth().utilisateurId,
                    ModuleId: data.ModuleId,
                    IsBrouillon: 1,
                },
                {
                    onSuccess: () => {
                        draftSuccessModal.onOpen();
                        console.log("success draft");
                        reset();
                    },
                    onError: (error) => {
                        console.log("error" + error);
                    },
                    context: { isDraft: true },
                }
            );
        } catch (error) {
            console.error("the error is" + error);
        }
    }

    return (
        <SidebarWithHeader>
            {/*Modal opens when the article is sent successfully*/}
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={successModal.onClose}
                onOpen={successModal.onOpen}
                imageSrc={check}
                imageAlt="Success Icon"
                title={t("modales.article.article_creation.success.title")}
            />

            <SuccessModal
                isOpen={draftSuccessModal.isOpen}
                onClose={draftSuccessModal.onClose}
                onOpen={draftSuccessModal.onOpen}
                imageSrc={check}
                imageAlt="Success Icon"
                title={t("modales.article.article_creation.article_creation_draft.success.title")}
            />

            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={alertModal.onClose}
                onOpen={alertModal.onOpen}
                title={t("modales.sendingMessage.alert.title")}
                message={t("modales.sendingMessage.alert.message")}
                handleSubmit={() => resetFormMutation(createArticleMutation, reset, alertModal)}
            />

            <BackAndTitle pageTitle={t("pages.patch_note.patch_note_add")} backNavigation={"/patchNote"} />

            <Stack bgColor="white" borderRadius="lg" shadow="sm" p={4}>
                <form onSubmit={handleSubmit(onSubmitCreateArticle)}>
                    <LanguageTabList>
                        <UpdatedTabPanel
                            isArticle={true}
                            errors={errors}
                            languageCode={"FR"}
                            register={register}
                            control={control}
                            isTitleRequired={true}
                            isContentRequired={true}
                        />

                        <UpdatedTabPanel isArticle={true} errors={errors} languageCode={"EN"} register={register} control={control} />
                        <UpdatedTabPanel isArticle={true} errors={errors} languageCode={"NL"} register={register} control={control} />
                    </LanguageTabList>

                    <Flex gap={{ base: "0rem", lg: "1rem" }} pb="1rem" px={4} direction={{ base: "column", lg: "row" }}>
                        <FormControl id="DatePublication" maxW="20rem" isInvalid={errors.DatePublication}>
                            <FormLabel>{t("pages.patch_note.patch_note_date")}</FormLabel>

                            <Input
                                {...register("DatePublication", {
                                    required: { value: true, message: t("main.errors.required_field") },
                                })}
                                type="date"
                                lang={t("selected_language")}
                            />
                            <FormErrorMessage>{errors.DatePublication && errors.DatePublication.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="ModuleId" maxW="20rem" isInvalid={errors.ModuleId}>
                            <FormLabel>{t("pages.patch_note.patch_note_module")}</FormLabel>

                            <Select
                                {...register("ModuleId", {
                                    required: { value: true, message: t("main.errors.required_field") },
                                })}
                                options={
                                    modules &&
                                    modules.map((module) => ({ value: module.id, label: t(`filters.filters_modules.list.${module.title}`) }))
                                }
                                placeholder={t("pages.patch_note.patch_note_module_select")}
                                onChange={(selectedOption) => {
                                    setValue("ModuleId", selectedOption.value);
                                }}
                            />

                            <FormErrorMessage>{errors.ModuleId && errors.ModuleId.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="CategorieId" maxW="20rem" isInvalid={errors.CategorieId}>
                            <FormLabel>{t("pages.patch_note.patch_note_category")}</FormLabel>

                            <Select
                                {...register("CategorieId", {
                                    required: { value: true, message: t("main.errors.required_field") },
                                })}
                                options={
                                    categories &&
                                    categories.map((categorie) => ({
                                        value: categorie.id,
                                        label: t(`filters.filters_category.list.${categorie.name}`),
                                    }))
                                }
                                placeholder={t("pages.patch_note.patch_note_category_select")}
                                onChange={(selectedOption) => {
                                    setValue("CategorieId", selectedOption.value);
                                }}
                            />

                            <FormErrorMessage>{errors.CategorieId && errors.CategorieId.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="Version" maxW="20rem" isInvalid={errors.Version}>
                            <FormLabel>{t("pages.patch_note.patch_note_version")}</FormLabel>

                            <Input
                                {...register("Version", {
                                    required: { value: false, message: t("main.errors.required_field") },
                                })}
                            />

                            <FormErrorMessage>{errors.Version && errors.Version.message}</FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <Flex justify="flex-end" direction={{ base: "column", lg: "row" }} alignItems="center">
                        <ButtonGroup gap="2" mt={{ sm: "10 " }} mr={{ base: "0", md: "4" }}>
                            <Flex direction={{ base: "column-reverse", sm: "row" }} gap="2">
                                <CancelButton onClick={() => openModal(alertModal)} />

                                <PrimaryActionButton
                                    onClick={handleSubmit(onSubmitCreateBrouillonArticle)}
                                    text={t("pages.patch_note.patch_note_add_draft")}
                                />

                                <SuccessButton />
                            </Flex>
                        </ButtonGroup>
                    </Flex>
                </form>
            </Stack>
        </SidebarWithHeader>
    );
};
