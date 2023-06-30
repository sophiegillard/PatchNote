import {FormControl, FormLabel, Input, TabPanel, Textarea} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";

export const TabInputTextArea = () =>{
    return<>
        <TabPanel>
            <FormControl id="TitreFR">
                <FormLabel>{t('pages.patch_note.patch_note_title_fr')}</FormLabel>
                <Input {...register("TitreFR", { required: true })} />
                {errors.TitreFR && <span>{t('main.forms.error_message_field_required')}</span>}
            </FormControl>

            <FormControl id="ContenuFR">
                <FormLabel>{t('pages.patch_note.patch_note_description_fr')}</FormLabel>
                <Textarea {...register("ContenuFR", { required: true })} />
                {errors.description && <span>{t('main.forms.error_message_field_required')}</span>}
            </FormControl>

        </TabPanel>
    </>
}