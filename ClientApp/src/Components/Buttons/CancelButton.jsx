import {Button} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";

export const CancelButton = ({text= t('main.general.cancel'), onClick, flex}) =>{
    return <>
        <Button
                onClick={onClick}
                colorScheme='cancelButton'
                color="gray.600"
                fontWeight={"noraml"}
                variant="ghost"
                flex={flex}
                _hover={{ boxShadow: "lg" }} >

            {text}

        </Button>
    </>
}