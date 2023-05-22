import {SidebarWithHeader} from "@/Components/main/SidebarWithHeader.jsx";
import {
    Show, Stack,
} from "@chakra-ui/react";
import {BackAndTitle} from "@/Components/Other/BackAndTitle.jsx";
import React, {useState} from "react";
import {
    useNewsletterByIdQuery
} from "@/services/newsletter/getNewsletters.js";
import {useParams} from "react-router-dom";
import {EditButton} from "@/Components/Buttons/EditButton.jsx";
import {NewsletterDisplayTabPanel} from "@/Pages/AdminPages/Newsletter/components/NewsletterDisplayTabPanel.jsx";
import {LanguageTabList} from "@/Components/Tabs/LanguageTabList.jsx";
import {useTranslation} from "react-i18next";

export const IndividualNewsletter = () =>{
    const { t } = useTranslation();
    const { id } = useParams();

    const { data : thisNewsletter,
        isLoading,
        error } = useNewsletterByIdQuery(id);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <>
        <SidebarWithHeader>

            <BackAndTitle pageTitle={`${t('pages.newsletter.newsletter_show')} ${thisNewsletter.id}`}
                          isBrouillon={thisNewsletter.isBrouillon === 1}
                          backNavigation={"/newsletter"}
                >
                <Show above={"sm"}>
                    <EditButton redirectLink={`/newsletter/update/${thisNewsletter.id}`} />
                </Show>
            </BackAndTitle>

            <Stack
                bgColor="white"
                borderRadius="lg"
                shadow="sm"
                p={4}>

                <LanguageTabList>
                    <NewsletterDisplayTabPanel item={thisNewsletter} languageCode={"FR"} />
                    <NewsletterDisplayTabPanel item={thisNewsletter} languageCode={"EN"} />
                    <NewsletterDisplayTabPanel item={thisNewsletter} languageCode={"NL"} />
                </LanguageTabList>


            </Stack>



        </SidebarWithHeader>
    </>
}