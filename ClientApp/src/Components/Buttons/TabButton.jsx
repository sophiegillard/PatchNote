import {Button} from "@chakra-ui/react";
import React from "react";

export const TabButton = ({text, isActive, onClick}) =>{
    return(
    <Button
            onClick={onClick}
            flexGrow={1}
            letterSpacing={"0.2rem"}
            variant="ghost"
            borderRadius="full"
            color="primaryBlue.500"
            minW={"6rem"}
            isActive = {isActive}
            _active={{
                bg: "primaryBlue.200",
                color: "primaryBlue.700",
                transform: 'scale(0.98)',
            }}>
        {text}
    </Button>)
}