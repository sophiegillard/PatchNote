import { useParams } from "react-router-dom";
import { SidebarWithHeader } from "@/Components/main/SidebarWithHeader.jsx";
import { getDetailedArticleById } from "@/services/articles/getArticlesQueries.js";
import { useQuery } from "react-query";
import { HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Badge, useMediaQuery, Flex, Text, Show, Box } from "@chakra-ui/react";
import { BackAndTitle } from "@/Components/Other/BackAndTitle.jsx";
import React from "react";
import { EditButton } from "@/Components/Buttons/EditButton.jsx";
import { MobileCircleButton } from "@/Components/Buttons/MobileCircleButton.jsx";
import { FiEdit2, IoMdAdd } from "react-icons/all.js";
import { useTranslation } from "react-i18next";
import { LanguageTabList } from "@/Components/Tabs/LanguageTabList.jsx";
import { ArticleDisplayTabPanel } from "@/Pages/AdminPages/Article/Components/ArticleDisplayTabPanel.jsx";

export const IndiviualArticle = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [isLargerThanMd] = useMediaQuery("(min-width: 70rem)");

    const { data, isLoading, error } = useQuery(["article", id], () => getDetailedArticleById(id));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <SidebarWithHeader>
            <Flex flexDirection={"column"}>
                <BackAndTitle pageTitle={`${t("pages.patch_note.patch_note_show")} ${data.id}`} backNavigation={"/patchNote"}>
                    <Show above={"sm"}>
                        <EditButton redirectLink={`/article/update/${data.id}`} />
                    </Show>
                </BackAndTitle>

                <Stack bgColor="white" borderRadius="lg" p={4} gap={3} flexGrow="1">
                    {data.isBrouillon === 1 && (
                        <HStack spacing="6rem">
                            <Badge borderRadius="md" fontSize="1em" colorScheme="secondaryPurple">
                                {t("pages.patch_note.patch_note_status_draft")}
                            </Badge>
                        </HStack>
                    )}

                    <LanguageTabList>
                        <ArticleDisplayTabPanel data={data} languageCode={"FR"} isLargerThanMd={isLargerThanMd} />
                        <ArticleDisplayTabPanel data={data} languageCode={"EN"} isLargerThanMd={isLargerThanMd} />
                        <ArticleDisplayTabPanel data={data} languageCode={"NL"} isLargerThanMd={isLargerThanMd} />
                    </LanguageTabList>

                    <Show below="sm">
                        <MobileCircleButton
                            icon={<FiEdit2 />}
                            redirectLink={`/article/update/${data.id}`}
                            bottomPx={"20px"}
                            rightPx={"20px"}
                            bgGradient={"linear(to-r, yellowGradient.start, yellowGradient.end)"}
                        />
                    </Show>
                </Stack>
            </Flex>
        </SidebarWithHeader>
    );
};
