import { ButtonGroup, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const PageHeader = ({ title, children, bgColor = "linear(to-r, primaryBlue.600, primaryBlue.500)" }) => {
    return (
        <Flex
            justifyContent={{ base: "center", md: "space-between" }}
            bgGradient={bgColor}
            borderTopRadius={{ base: "0", md: "md" }}
            px={3}
            py={{ base: "5", lg: "0" }}
        >
            <Text fontSize={{ base: "2xl", lg: "2xl" }} py={{ base: "0", lg: "4" }} textAlign="center" color="white" fontFamily={"Open Sans"}>
                {title}
            </Text>

            {children}
        </Flex>
    );
};
