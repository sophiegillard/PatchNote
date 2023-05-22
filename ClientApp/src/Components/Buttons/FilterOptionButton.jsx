import {Button, Text} from "@chakra-ui/react";
import React from "react";

export const FilterOptionButton = ({key, buttonTitle, isActive, onClick}) =>{
    return<>
        <Button key={key}
                onClick={onClick}
                colorScheme='primaryBlue'
                isActive={isActive}
                variant='outline'
                borderRadius="full"
                >

            <Text>{buttonTitle}</Text>

        </Button>
    </>
}