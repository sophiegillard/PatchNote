import {
    FormControl,
    FormLabel,
    Input,
    TabPanel,
    Textarea,
    Text,
    FormErrorMessage,
} from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";
import { Editor } from "@/Components/Editor/Editor.jsx";

export const UpdatedTabPanel = ({
    isArticle,
    isNewsLetter,
    control,
    errors,
    languageCode,
    register,
    isTitleRequired = false,
    isContentRequired = false,
}) => {
    return (
        <>
            <TabPanel>
                <FormControl id={`Titre${languageCode}`}>
                    <FormLabel>
                        {t("pages.newsletter.newsletter_title_main")}
                    </FormLabel>
                    <Input
                        {...register(`Titre${languageCode}`, {
                            required: {
                                value: isTitleRequired,
                                message: t("main.errors.required_field"),
                            },
                        })}
                    />

                    {errors[`Titre${languageCode}`] && (
                        <Text color="#e53e3e" fontSize={"sm"} pt="2">
                            {errors[`Titre${languageCode}`].message}
                        </Text>
                    )}
                </FormControl>

                {isNewsLetter && (
                    <FormControl id={`Resume${languageCode}`}>
                        <FormLabel>
                            {t("pages.newsletter.newsletter_summary_main")}
                        </FormLabel>
                        <Textarea
                            bgColor={"white"}
                            {...register(`Resume${languageCode}`)}
                        />

                        {errors[`Resume${languageCode}`] && (
                            <Text color="#e53e3e" fontSize={"sm"} pt="2">
                                {errors[`Resume${languageCode}`].message}
                            </Text>
                        )}
                    </FormControl>
                )}

                {isArticle && (
                    <FormControl id={`Contenu${languageCode}`}>
                        <FormLabel>
                            {t(
                                "pages.patch_note.patch_note_description_article"
                            )}
                        </FormLabel>
                        <Editor
                            name={`Contenu${languageCode}`}
                            control={control}
                            isRequired={isContentRequired}
                            {...register(`Contenu${languageCode}`)}
                        />

                        {errors[`Contenu${languageCode}`] && (
                            <Text color="#e53e3e" fontSize={"sm"} pt="2">
                                {t("pages.newsletter.newsletter_summary_main")}
                            </Text>
                        )}
                    </FormControl>
                )}
            </TabPanel>
        </>
    );
};
