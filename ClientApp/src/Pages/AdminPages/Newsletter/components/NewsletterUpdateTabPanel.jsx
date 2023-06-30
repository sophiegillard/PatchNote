import {Flex, FormControl, FormLabel, Input, Switch, TabPanel, Textarea} from "@chakra-ui/react";
import {t} from "i18next";
import {PrimaryActionButton} from "@/Components/Buttons/PrimaryActionButton.jsx";
import {openModal} from "@/Utils/basicFormFunctions.js";
import React from "react";

export const NewsletterUpdateTabPanel = ({newsletter, currentDate, errors, modal, register, languageCode, setValue }) =>{
    return(
        <TabPanel>

            <FormControl id={`Titre${languageCode}`}>
                <FormLabel>{t('pages.newsletter.newsletter_title_main')}</FormLabel>
                <Input {...register(`Titre${languageCode}`, { required: true })} />
                {errors.TitreFR && <span>{t('main.forms.error_message_field_required')}</span>}
            </FormControl>

            <FormControl id={`Resume${languageCode}`}>
                <FormLabel>{t('pages.newsletter.newsletter_summary_main')}</FormLabel>
                <Textarea bgColor={"white"}
                          {...register(`Resume${languageCode}`, { required: true })} />
                {errors.ResumeFR && <span>{t('main.forms.error_message_field_required')}</span>}
            </FormControl>
        </TabPanel>
    )
}