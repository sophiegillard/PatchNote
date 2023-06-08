import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { getDetailedArticleById } from "@/services/articles/getArticlesQueries.js";
import { SidebarWithHeader } from "@/Components/main/SidebarWithHeader.jsx";
import { SuccessModal } from "@/Components/Modals/SuccessModal.jsx";
import check from "../../../assets/images/check.png";
import { AlertModal } from "@/Components/Modals/Alertmodal.jsx";
import { openModal, resetForm } from "@/Utils/basicFormFunctions.js";
import {
    ButtonGroup,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
    Switch,
} from "@chakra-ui/react";
import Select from "react-select";
import { CancelButton } from "@/Components/Buttons/CancelButton.jsx";
import { SuccessButton } from "@/Components/Buttons/SuccessButton.jsx";
import React, { useEffect, useState } from "react";
import { useAllModulesQuery } from "@/services/queries/getAllModules.js";
import { useAllCategoriesQuery } from "@/services/queries/getAllCategories.js";
import { updateArticleById } from "@/services/articles/updateArticleById.js";
import { BackAndTitle } from "@/Components/Other/BackAndTitle.jsx";
import { Editor } from "@/Components/Editor/Editor.jsx";
import { convertDate } from "@/Utils/convertDate.js";
import { useTranslation } from "react-i18next";
import { LanguageTabList } from "@/Components/Tabs/LanguageTabList.jsx";
import { UpdatedTabPanel } from "@/Components/Tabs/UpdatedTabPanel.jsx";
import { createErrorToast, createSuccessToast } from "@/Utils/toast.js";

export const UpdateArticle = () => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        control,
    } = useForm();

    //Modals
    const alertModal = useDisclosure();

    //Creating toast
    const successToast = createSuccessToast(t("main.general.changes_saved"));
    const errorToast = createErrorToast(t("main.general.error"));

    //Get all modules and categories
    const { data: modules } = useAllModulesQuery();
    const { data: categories } = useAllCategoriesQuery();

    //Get the id of the article to update ad the article itself
    const { id } = useParams();
    const { data: article, isLoading, error, isError } = useQuery(["article", id], () => getDetailedArticleById(id));

    const { mutateAsync, isLoading: isUpdatingLoading } = useMutation(updateArticleById, {
        onSuccess: () => {
            successToast();
        },
        onError: () => {
            errorToast();
        },
    });

    const onSubmit = async (formData) => {
        const { IsBrouillon, ...data } = formData;
        console.log(formData);
        await mutateAsync({ id, IsBrouillon, ...data });
    };

    useEffect(() => {
        if (article) {
            const defaultDate = convertDate(article.datePublication);
            reset({
                TitreFR: article.titreFR,
                ContenuFR: article.contenuFR,
                TitreEN: article.titreEN,
                ContenuEN: article.contenuEN,
                TitreNL: article.titreNL,
                ContenuNL: article.contenuNL,
                Version: article.version,
                DatePublication: defaultDate,
                ModuleId: article.moduleId,
                CategorieId: article.categorieId,
                IsBrouillon: article.isBrouillon,
            });
        }
    }, [article]);

    if (isLoading) {
        return (
            <Container>
                <Flex py="5" justifyContent="center">
                    <Spinner />
                </Flex>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container>
                <Flex py="5" justifyContent="center">
                    Error: {error.message}
                </Flex>
            </Container>
        );
    }

    return (
        <>
            <SidebarWithHeader>
                {/*Modal opens when user doesn't want to save changes*/}
                <AlertModal
                    isOpen={alertModal.isOpen}
                    onClose={alertModal.onClose}
                    onOpen={alertModal.onOpen}
                    title={t("modales.sendingMessage.alert.title")}
                    message={t("modales.sendingMessage.alert.message")}
                    handleSubmit={() => resetForm(reset, alertModal)}
                />

                <BackAndTitle pageTitle={`${t("pages.patch_note.patch_note_update")} ${article.id}`} backNavigation={"/patchNote"} />

                <Stack bgColor="white" borderRadius="lg" shadow="sm" p={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <LanguageTabList>
                            <UpdatedTabPanel isArticle={true} errors={errors} languageCode={"FR"} register={register} control={control} />
                            <UpdatedTabPanel isArticle={true} errors={errors} languageCode={"EN"} register={register} control={control} />
                            <UpdatedTabPanel isArticle={true} errors={errors} languageCode={"NL"} register={register} control={control} />
                        </LanguageTabList>

                        <Flex gap={{ base: "0rem", lg: "1rem" }} pb="1rem" px={4} direction={{ base: "column", lg: "row" }}>
                            <FormControl id="DatePublication">
                                <FormLabel>{t("pages.patch_note.patch_note_date")}</FormLabel>
                                <Input {...register("DatePublication", { required: true })} type="date" lang={t("selected_language")} />
                                {errors.DatePublication && <span>{t("main.forms.error_message_field_required")}</span>}
                            </FormControl>

                            <FormControl id="ModuleId">
                                <FormLabel>{t("pages.patch_note.patch_note_module")}</FormLabel>
                                <Select
                                    {...register("ModuleId")}
                                    options={
                                        modules &&
                                        modules.map((module) => ({ value: module.id, label: t(`filters.filters_modules.list.${module.title}`) }))
                                    }
                                    defaultValue={{
                                        value: article.moduleId,
                                        label: t(`filters.filters_modules.list.${article.module}`),
                                    }}
                                    placeholder={t("pages.patch_note.patch_note_module_select")}
                                    onChange={(selectedOption) => {
                                        setValue("ModuleId", selectedOption.value);
                                    }}
                                />
                                {errors.ModuleId && <span>{t("main.forms.error_message_field_required")}</span>}
                            </FormControl>

                            <FormControl id="CategorieId">
                                <FormLabel>{t("pages.patch_note.patch_note_category")}</FormLabel>
                                <Select
                                    {...register("CategorieId")}
                                    options={
                                        categories &&
                                        categories.map((categorie) => ({
                                            value: categorie.id,
                                            label: t(`filters.filters_category.list.${categorie.name}`),
                                        }))
                                    }
                                    defaultValue={{
                                        value: article.categorieId,
                                        label: t(`filters.filters_category.list.${article.categorie}`),
                                    }}
                                    placeholder={t("pages.patch_note.patch_note_category_select")}
                                    onChange={(selectedOption) => {
                                        setValue("CategorieId", selectedOption.value);
                                    }}
                                />
                                {errors.CategorieId && <span>{t("main.forms.error_message_field_required")}</span>}
                            </FormControl>

                            <FormControl id="Version">
                                <FormLabel>{t("pages.patch_note.patch_note_version")}</FormLabel>
                                <Input {...register("Version", { required: false })} defaultValue={article.version} />
                                {errors.version && <span>{t("main.forms.error_message_field_required")}</span>}
                            </FormControl>
                        </Flex>

                        <FormControl id="isBrouillon">
                            <Flex alignItems="center" px={4}>
                                <FormLabel>{t("pages.patch_note.patch_note_status_draft")}</FormLabel>
                                <Switch
                                    {...register("IsBrouillon")}
                                    defaultValue={article.isBrouillon}
                                    onChange={(event) => {
                                        const valueBrouillon = event.target.checked ? 1 : 0;
                                        setValue("IsBrouillon", Number(valueBrouillon));
                                        console.log(valueBrouillon);
                                    }}
                                    size="lg"
                                    colorScheme="successButton"
                                />
                            </Flex>
                        </FormControl>

                        <Flex justify="flex-end">
                            <ButtonGroup gap="2" pt={{ base: "8rem", sm: "5rem", lg: "4rem", xl: "4rem" }}>
                                <CancelButton onClick={() => openModal(alertModal)} />
                                <SuccessButton isDisabled={isUpdatingLoading} text={t("main.general.save")} />
                            </ButtonGroup>
                        </Flex>
                    </form>
                </Stack>
            </SidebarWithHeader>
        </>
    );
};
