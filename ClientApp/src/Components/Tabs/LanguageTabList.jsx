import {Flex, Tab, TabList, TabPanels, Tabs} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";

export const LanguageTabList = ({children}) =>{
    return(
        <Tabs size='md' colorScheme='primaryBlue' variant={"solid-rounded"} >
            <Flex flexDirection="row" justifyContent={"space-between"} >
                <TabList>
                    <Tab letterSpacing="0.1rem"
                         _selected={{ color: 'primaryBlue.500', bg: 'primaryBlue.10', letterSpacing:"0.1rem", fontWeight:"600" }}>{t('main.languagesISO.fr')}</Tab>
                    <Tab letterSpacing="0.1rem"
                         _selected={{ color: 'primaryBlue.500', bg: 'primaryBlue.10', letterSpacing:"0.1rem", fontWeight:"600" }}>{t('main.languagesISO.en')}</Tab>
                    <Tab letterSpacing="0.1rem"
                         _selected={{ color: 'primaryBlue.500', bg: 'primaryBlue.10', letterSpacing:"0.1rem", fontWeight:"600" }}>{t('main.languagesISO.nl')}</Tab>
                </TabList>
            </Flex>

            <TabPanels>
                {children}
            </TabPanels>
        </Tabs>
    )
}