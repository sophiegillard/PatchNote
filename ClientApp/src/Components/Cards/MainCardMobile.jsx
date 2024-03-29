import { Flex, Text, Stack, Accordion, Spinner, AccordionItem, AccordionButton, AccordionPanel, Box, VStack, HStack, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import logo from "@/assets/images/module_icon/module_base.png";
import { categoryColors, categoryGradients, moduleColors, moduleIcons, TextGradients } from "@/Style/MainCardStyle.js";

export const MainCardMobile = ({ inputValue, articles, isArticleLoading }) => {
    const { t, i18n } = useTranslation();
    const lng = i18n.language.toUpperCase(); // log the current language

    if (isArticleLoading)
        return (
            <Flex bgColor={"whiteFoodBell"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primaryBlue.600" size="xl" />
            </Flex>
        );

    if (isArticleLoading) return <p>Error</p>;

    return (
        <>
            <Accordion allowMultiple>
                {articles
                    ?.filter((article) => article.titreFR.toLowerCase().includes(inputValue.toLowerCase()))
                    .map((article) => (
                        <AccordionItem key={article.id} pb="1rem" borderRadius="full" border={"none"}>
                            {({ isExpanded }) => (
                                <>
                                    <h2 style={{ paddingBottom: 0 }}>
                                        <AccordionButton borderRadius="xl" padding={0} shadow="lg" bgColor={"#f0f0f0"}>
                                            <Box as="span" flex="1" textAlign="left" height="140px">
                                                <HStack height="100%">
                                                    <Flex
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        p="3"
                                                        py={5}
                                                        gap={4}
                                                        borderLeftRadius="lg"
                                                        maxW="20%"
                                                        minW="20%"
                                                        height="100%"
                                                        justifyContent="center"
                                                        bgGradient={categoryGradients[article.categorie]}
                                                    >
                                                        {moduleIcons[article.module] === undefined ? (
                                                            <Image maxHeight="60px" src={logo} alt="module icon" />
                                                        ) : (
                                                            <Image maxHeight="60px" src={moduleIcons[article.module]} alt="module icon" />
                                                        )}
                                                    </Flex>

                                                    <VStack height="80%" width={"90%"} justifyContent={"space-between"} pt="4" pl="2">
                                                        <VStack alignItems="start" pb={1} width="full">
                                                            <Text textStyle="h4Mobile" pb="0">
                                                                {article[`titre${lng}`]}
                                                            </Text>

                                                            <Text fontSize="xs">{article.datePublication} </Text>
                                                        </VStack>
                                                        <HStack width="full">
                                                            <Text
                                                                fontSize="0.8rem"
                                                                p={1}
                                                                px={2}
                                                                color="white"
                                                                bgColor={moduleColors[article.categorie]}
                                                                borderRadius="full"
                                                            >
                                                                {t(`filters.filters_modules.list.${article.module}`)}
                                                            </Text>
                                                            <Text
                                                                fontSize="0.8rem"
                                                                p={1}
                                                                px={2}
                                                                color="white"
                                                                bgColor={categoryColors[article.categorie]}
                                                                borderRadius="full"
                                                            >
                                                                {t(`filters.filters_category.list.${article.categorie}`)}
                                                            </Text>
                                                        </HStack>
                                                    </VStack>

                                                    <Flex
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        justifyContent={article.isNew ? undefined : "center"}
                                                        height="100%"
                                                        gap={6}
                                                    >
                                                        {article.isNew ? (
                                                            <Box
                                                                position="absolute"
                                                                right={{ base: "3", md: "14", lg: "0", xl: "0" }}
                                                                bgGradient="linear(to-b, gradientColors.redStart, gradientColors.redEnd)"
                                                                style={{
                                                                    clipPath: "polygon(20% 0, 80% 0, 80% 81%, 50% 100%, 20% 81%)",
                                                                }}
                                                                height={"30px"}
                                                            >
                                                                <Text
                                                                    fontFamily="Open Sans"
                                                                    fontWeight="bold"
                                                                    fontSize="15px"
                                                                    color="white"
                                                                    width="100px"
                                                                    textAlign="center"
                                                                    justifySelf="center"
                                                                >
                                                                    NEW
                                                                </Text>
                                                            </Box>
                                                        ) : null}
                                                    </Flex>
                                                </HStack>
                                            </Box>
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel py={6} px={8} mx={3} bgGradient={TextGradients[article.categorie]} borderBottomRadius="xl">
                                        <Text dangerouslySetInnerHTML={{ __html: `${article[`contenu${lng}`]}` }} />
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    ))}
            </Accordion>
        </>
    );
};
