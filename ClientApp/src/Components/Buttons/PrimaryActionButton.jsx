import { Button } from "@chakra-ui/react";
import { t } from "i18next";
import React from "react";

export const PrimaryActionButton = ({ text, onClick, disabled, type, isLoading }) => {
    return (
        <>
            <Button
                colorScheme="primaryBlue"
                bgGradient="linear(to-r, primaryBlue.600, primaryBlue.400)"
                onClick={onClick}
                disabled={disabled}
                flexGrow={10}
                type={type}
                isLoading={isLoading}
            >
                {text}
            </Button>
        </>
    );
};
