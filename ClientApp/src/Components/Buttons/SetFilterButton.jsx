import {Button, Icon, Text} from "@chakra-ui/react";
import {FiFilter} from "react-icons/all.js";
import {t} from "i18next";
import React from "react";

export const SetFilterButton = ({onClick}) =>{
    return<>
        <Button 
                onClick={onClick}
                colorScheme='primaryBlue'
                m={4}
                color="white"
                shadow="lg"
                width="6rem"
                textAlign="right"
                bgGradient='linear(to-r, primaryBlue.600, primaryBlue.300)'
                gap={1}
                _hover={{
                    bgGradient: 'linear(to-l, primaryBlue.600, primaryBlue.300)',
                    boxShadow: 'xl',
                }}
        >

            <Icon as={FiFilter} />
            <Text>{t('main.general.filter')}</Text>

        </Button>
    </>
}