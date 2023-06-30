import {Button} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";

export const SuccessButton = ({text = t('main.general.add'), onClick, flex, isDisabled}) =>{
    return <>
        <Button colorScheme='successButton'
                flex={flex}
                bgGradient='linear(to-r, successButton.600, successButton.400)'
                type="submit"
                isDisabled={isDisabled}
                onClick={onClick}>
            {text}
        </Button>
    </>
}