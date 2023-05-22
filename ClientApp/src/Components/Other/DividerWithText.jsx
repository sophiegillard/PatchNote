import {Divider, Text, HStack} from "@chakra-ui/react"
import React from "react";

export const DividerWithText = ({text}) => {
    return (
        <HStack d="flex" alignItems="center" >
            <Divider />
            <Text size="sm" textTransform="uppercase" mx="2">{text}</Text>
            <Divider />
        </HStack>
    )
}
