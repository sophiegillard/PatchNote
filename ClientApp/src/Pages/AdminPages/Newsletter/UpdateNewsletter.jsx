import {SidebarWithHeader} from "@/Components/main/SidebarWithHeader.jsx";
import {
    ButtonGroup,
    Container, Flex,
    FormControl, FormLabel,
    Input, Spinner, Stack, Switch, useDisclosure,
} from "@chakra-ui/react";
import {BackAndTitle} from "@/Components/Other/BackAndTitle.jsx";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getNewsletterById, useAllNewsletterQuery} from "@/services/newsletter/getNewsletters.js";
import {CheckBoxModal} from "@/Components/Modals/CheckBoxModal.jsx";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {CancelButton} from "@/Components/Buttons/CancelButton.jsx";
import {SuccessButton} from "@/Components/Buttons/SuccessButton.jsx";
import {updateNewsletterById} from "@/services/newsletter/updateNewsletterById.js";
import {convertDate} from "@/Utils/convertDate.js";
import {LanguageTabList} from "@/Components/Tabs/LanguageTabList.jsx";
import {createErrorToast, createSuccessToast} from "@/Utils/toast.js";
import {useTranslation} from "react-i18next";
import {PrimaryActionButton} from "@/Components/Buttons/PrimaryActionButton.jsx";
import {openModal, closeModal} from "@/Utils/basicFormFunctions.js";
import {UpdatedTabPanel} from "@/Components/Tabs/UpdatedTabPanel.jsx";
import { MyModalBody } from "../../../Components/Modals/MyModalBody";

export const UpdateNewsletter = () =>{
    const { t } = useTranslation();

    // Modal to select articles
    const checkboxModal = useDisclosure()
    const confirmationModal = useDisclosure()

    const {register, handleSubmit, setValue, reset, control, formState: {errors}} = useForm();

    //Get the id of the newsletter and all related data
    const { id } = useParams();
    const { data : individualNewsletter, isLoading, error, refetch : refetchOneNewsletter } = useQuery(
        ["individualNewsletter", id],
        () => getNewsletterById(id)
    );
        // Get the newsletter to display
        const thisNewsletter = individualNewsletter && individualNewsletter.newsletter;

    const { data : allNewsletters } = useAllNewsletterQuery();

    // List of articles to display in the modal
    const allArticles = [
        {id: 0, listArticles : individualNewsletter && individualNewsletter.newsletter.articles, label: t('modales.newsletter.newsletter_articles_included')},
        {id: 1, listArticles : individualNewsletter && individualNewsletter.latestArticles, label: t('modales.newsletter.newsletter_articles_latest')},
        {id: 2, listArticles : individualNewsletter && individualNewsletter.oldArticles, label: t('modales.newsletter.newsletter_articles_older')},
    ]

    // get the current date in the format expected by the input element
    const [currentDate] = useState(new Date().toISOString().substr(0, 10));

    //Creating toast
    const successToast = createSuccessToast(t('main.general.changes_saved'))
    const errorToast = createErrorToast(t('main.general.error'))

    const { mutateAsync, isLoading : isNewsLetterLoading, isError } = useMutation(updateNewsletterById, {
        onSuccess: () => {
            successToast();
        },
        onError: (error) => {
            errorToast();
        }
    })

    const onSubmit = async (formData) => {
        const {IsBrouillon, ...data } = formData;
        await mutateAsync({ id, IsBrouillon, ...data });
    };

    useEffect(() => {
        if (thisNewsletter) {
            const defaultDate = convertDate(thisNewsletter.datePublication);
            reset({
                TitreFR: thisNewsletter.titreFR,
                ResumeFR: thisNewsletter.resumeFR,
                ContenuFR: thisNewsletter.contenuFR,
                TitreEN: thisNewsletter.titreEN,
                ResumeEN: thisNewsletter.resumeEN,
                ContenuEN: thisNewsletter.contenuEN,
                TitreNL: thisNewsletter.titreNL,
                ResumeNL: thisNewsletter.resumeNL,
                ContenuNL: thisNewsletter.contenuNL,
                DatePublication: defaultDate,
                IsBrouillon: thisNewsletter.isBrouillon,
            });
        }
    }, [thisNewsletter]);


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

    return <>
        <SidebarWithHeader>

            {thisNewsletter &&
                (<CheckBoxModal
                    key={thisNewsletter.id}
                    listItems={allArticles}
                    refetch={refetchOneNewsletter}
                    isOpen={checkboxModal.isOpen}
                    onClose={checkboxModal.onClose}
                    checkboxModal={checkboxModal}
                    label='titreFR'
                />
            )}

    
            <BackAndTitle pageTitle={`${t('pages.newsletter.newsletter_update')} ${thisNewsletter.id}`}
                          backNavigation={"/newsletter"}/>

                    <Stack
                        bgColor="white"
                        borderBottomRadius="lg"
                        shadow="sm"
                        p={4}>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <MyModalBody 
                            isOpen={confirmationModal.isOpen} 
                            onClose={confirmationModal.onClose}
                            button2Text={"Retour"}
                            onClickButton2={()=> 
                                {
                                closeModal(confirmationModal)}}

                            button1Text={"Continuer sans enregistrer"}
                            onClickButton1={()=> 
                                {
                                closeModal(confirmationModal)
                                openModal(checkboxModal)}}
                                
                            message={"Attention la sélection d'articles entraine la suppression du contenu. Souhaitez-vous enregistrer vos modification?"}  />


                            <LanguageTabList>


                                <UpdatedTabPanel isNewsLetter={true}
                                                 errors={errors}
                                                 register={register}
                                                 languageCode={"FR"}/>
                                <UpdatedTabPanel isNewsLetter={true}
                                                 errors={errors}
                                                 register={register}
                                                 languageCode={"EN"}/>
                                <UpdatedTabPanel isNewsLetter={true}
                                                 errors={errors}
                                                 register={register}
                                                 languageCode={"NL"}/>

                            </LanguageTabList>


                            <Flex alignItems={"baseline"} flexDirection={{base:"column" , lg:"row"}} gap={5}>
                            <FormControl id="DatePublication" maxW="20rem" px={5}>
                                <FormLabel>{t('pages.patch_note.patch_note_date')}</FormLabel>
                                <Input
                                    {...register("DatePublication", { required: true })}
                                    type="date"
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                    min={currentDate}
                                    lang={t('selected_language')}
                                />
                                {errors.DatePublication &&
                                    (<span>{t('main.forms.error_message_field_required')}</span>)}
                            </FormControl>


                            <FormControl id="ArticlesIncluded"  maxW="fit-content">
                                <FormLabel>{t('pages.newsletter.newsletter_articles_included')}</FormLabel>

                                <PrimaryActionButton
                                    onClick={()=>openModal(confirmationModal)}
                                    text={t("pages.newsletter.newsletter_articles_select_short")}
                                />

                                {errors.ArticlesIncluded && (
                                    <span>{t("main.forms.error_message_field_required")}</span>
                                )}
                            </FormControl>


                            {/*Switch button to toggle isBrouillon*/}
                            <FormControl id="isBrouillon">
                                <Flex flexDirection={{base:"row" , lg:"column"}} px={5} alignItems={{base:"center", lg:"start"}}>
                                    <FormLabel pb={1.5}>{t('pages.patch_note.patch_note_status_draft')}</FormLabel>
                                    <Switch
                                        {...register("IsBrouillon")}
                                        defaultValue={thisNewsletter.isBrouillon}
                                        onChange={(event) => {
                                            const valueBrouillon = event.target.checked ? 1 : 0;
                                            setValue("IsBrouillon", Number(valueBrouillon));
                                        }}
                                        size="lg"
                                        colorScheme="successButton"
                                    />
                                </Flex>
                            </FormControl>
                            </Flex>

                            <Flex justify="flex-end" direction={{ base: "column", lg: "row" }} alignItems="center">
                                <ButtonGroup gap='2' mt={4} >
                                    <CancelButton onClick={()=>console.log("close modal")} />
                                    <SuccessButton isDisabled={isNewsLetterLoading} text={t('main.general.save')  }/>
                                </ButtonGroup>
                            </Flex>

                        </form>

                    </Stack>

        </SidebarWithHeader>
    </>
}