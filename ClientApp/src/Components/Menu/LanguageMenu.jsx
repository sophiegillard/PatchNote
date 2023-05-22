import {Flex, Image, MenuGroup, MenuItem, Text, VStack} from "@chakra-ui/react";
import frenchFlag from "@/assets/images/france.png";
import englishFlag from "@/assets/images/united-kingdom.png";
import dutchFlag from "@/assets/images/netherlands.png";
import React from "react";
import {useTranslation} from "react-i18next";
import {t} from "i18next";

const languagesOptionsData=[
    {
        flagImage: frenchFlag,
        language: 'FR',
        text: 'FR'
    },
    {
        flagImage: englishFlag,
        language: 'EN',
        text: 'EN'
    },
    {
        flagImage: dutchFlag,
        language: 'NL',
        text: 'NL'
    }
]

const LanguageMenuOption = ({flagImage, language, text}) =>{
    const { t, i18n } = useTranslation()

    const changeLanguageHandler = (lng) => {
        i18n.changeLanguage(lng)
    }

    return(
        <MenuItem width="fit-content"
                  _hover={{filter:'grayscale(0%)'}}
                  filter={language === i18n.language ? 'none' : 'grayscale(60%)'}
                  onClick={() => {
                      changeLanguageHandler(language)
                  }}
        >
            <VStack>
                <Image src={flagImage} alt={`flag_${language}`} height='35px'  />
                <Text fontSize="small">{text}</Text>
            </VStack>
        </MenuItem>
    )
}

export const LanguageMenu = () =>{
    return(
        <MenuGroup title={t('main.userMenu.languages_options')}>
            <Flex justifyContent={"space-around"}>
                {languagesOptionsData.map((languageOption, index) =>
                    <LanguageMenuOption key={index} {...languageOption} />)}
            </Flex>
        </MenuGroup>
    )
}