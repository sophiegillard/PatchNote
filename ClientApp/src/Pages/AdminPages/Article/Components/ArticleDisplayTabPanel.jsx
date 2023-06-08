import { Flex, HStack, Stack, TabPanel } from "@chakra-ui/react";
import { TitleAndContent } from "@/Components/Other/TitleAndContent.jsx";
import React from "react";
import { t } from "i18next";

export const ArticleDisplayTabPanel = ({ isLargerThanMd, data, languageCode }) => {
    return (
        <>
            <TabPanel>
                {!isLargerThanMd ? (
                    <Stack>
                        <TitleAndContent title={t("pages.patch_note.patch_note_id")} content={data.id} />

                        <HStack spacing="6rem">
                            <TitleAndContent title={t("pages.patch_note.patch_note_date")} content={data.datePublication} />
                            <TitleAndContent title={t("pages.patch_note.patch_note_date_update")} content={data.dateModification} />
                        </HStack>

                        <HStack spacing="6rem">
                            <TitleAndContent
                                title={t("pages.patch_note.patch_note_category")}
                                content={t(`filters.filters_category.list.${data.categorie}`)}
                            />
                            <TitleAndContent
                                title={t("pages.patch_note.patch_note_module")}
                                content={t(`filters.filters_modules.list.${data.module}`)}
                            />
                        </HStack>

                        <HStack spacing="6rem">
                            <TitleAndContent title={t("pages.patch_note.patch_note_version")} content={data.version} />
                        </HStack>
                    </Stack>
                ) : (
                    <Flex justifyContent="space-between" pr={10}>
                        <TitleAndContent title={t("pages.patch_note.patch_note_id")} content={data.id} />

                        <TitleAndContent title={t("pages.patch_note.patch_note_author")} content={data.auteur} />

                        <TitleAndContent title={t("pages.patch_note.patch_note_date")} content={data.datePublication} />

                        <TitleAndContent title={t("pages.patch_note.patch_note_date_update")} content={data.dateModification} />

                        <TitleAndContent
                            title={t("pages.patch_note.patch_note_category")}
                            content={t(`filters.filters_category.list.${data.categorie}`)}
                        />

                        <TitleAndContent title={t("pages.patch_note.patch_note_module")} content={t(`filters.filters_modules.list.${data.module}`)} />

                        <TitleAndContent title={t("pages.patch_note.patch_note_version")} content={data.version} />
                    </Flex>
                )}

                <TitleAndContent title={t("pages.patch_note.patch_note_title_article")} content={data[`titre${languageCode}`]} />
                <TitleAndContent title={t("pages.patch_note.patch_note_description_article")} content={data[`contenu${languageCode}`]} />
            </TabPanel>
        </>
    );
};
