import {Badge, Flex, HStack, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {IoArrowBack} from "react-icons/all.js";
import React from "react";
import {t} from "i18next";

export const BackAndTitle = ({pageTitle, children, isBrouillon, backNavigation}) =>{

    return<>
        <HStack spacing={6}
                justifyContent={"space-between"}
                bgGradient='linear(to-r, primaryBlue.600, primaryBlue.500)'
                borderTopRadius={{base: "0", lg: "md"}}
                px={3} py={{base:"5", lg:"0"}}>

            <Flex flexDirection={{base : "column", lg:"row"}}
                  gap={2}>
                <HStack >
                    <Link to={backNavigation}>
                        <IoArrowBack size="30px" color={"white"}/>
                    </Link>
                    <Text
                        fontSize={{base: "lg", lg: "2xl"}}
                        py={{base: "0", lg: "4"}}
                        textAlign="center"
                        color="white"
                        fontFamily={"Open Sans"}
                    >
                        {pageTitle}
                    </Text>
                </HStack>

                {isBrouillon &&
                    <HStack  pl={{base:"10", lg : "0"}}>
                        <Badge borderRadius="md"
                               fontSize='0.8em'
                               py={1.7} px={2}
                               colorScheme='secondaryPurple'>{t('pages.newsletter.newsletter_status_draft')}</Badge>
                    </HStack>}

            </Flex>

            {children}

        </HStack>
    </>
}