import { Flex, Stack, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, VStack, HStack, Image, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import logo from "@/assets/images/module_icon/logo.png";
import { categoryColors, categoryGradients, moduleIcons, TextGradients } from "@/Style/MainCardStyle.js";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton.jsx";

export const MainCard = ({ inputValue, articles, isArticleLoading }) => {
    const { t, i18n } = useTranslation();
    const lng = i18n.language.toUpperCase(); // log the current language
    console.log([`description${lng}`]);

    if (isArticleLoading)
        return (
            <Flex bgColor={"whiteApSchool"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primaryBlue.600" size="xl" />
            </Flex>
        );

    return (
        <>
            <Accordion allowMultiple>
                {articles
                    ?.filter(
                        (article) =>
                            article.titreFR.toLowerCase().includes(inputValue.toLowerCase()) ||
                            article.descriptionFR.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((article) => (
                        <AccordionItem pb="1rem" key={article.id} border={"none"}>
                            {({ isExpanded }) => (
                                <>
                                    <h2 style={{ paddingBottom: 0 }}>
                                        <AccordionButton borderRadius="xl" padding={0} bgColor={"#f0f0f0"} shadow="lg">
                                            <Box as="span" flex="1" textAlign="left" minHeight="130px">
                                                <HStack height="100%">
                                                    <Flex
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        p="3"
                                                        py={5}
                                                        gap={4}
                                                        borderLeftRadius="lg"
                                                        minW="190px"
                                                        bgGradient={categoryGradients[article.categorie]}
                                                    >
                                                        {moduleIcons[article.module] === undefined ? (
                                                            <Image maxHeight="60px" src={logo} alt="module icon" />
                                                        ) : (
                                                            <Image maxHeight="60px" src={moduleIcons[article.module]} alt="module icon" />
                                                        )}

                                                        <Text fontSize="sm" color="white" fontWeight={"bolder"}>
                                                            {t(`filters.filters_modules.list.${article.module}`)}
                                                        </Text>
                                                    </Flex>

                                                    <HStack flexGrow={1} justifyContent="space-between">
                                                        <VStack alignItems="flex-start" px={3}>
                                                            <VStack alignItems="start" pb={6}>
                                                                <HStack alignItems="baseline">
                                                                    <Text textStyle="h4" size="md" pb="0">
                                                                        {article[`titre${lng}`]}
                                                                    </Text>
                                                                    <Text size="s" pb="0">
                                                                        {article.version}
                                                                    </Text>
                                                                </HStack>
                                                                <Text fontSize="xs">{article.datePublication} </Text>
                                                            </VStack>
                                                            <Text
                                                                fontSize="md"
                                                                p={1}
                                                                px={4}
                                                                color="white"
                                                                bgColor={categoryColors[article.categorie]}
                                                                borderRadius="full"
                                                            >
                                                                {t(`filters.filters_category.list.${article.categorie}`)}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>

                                                    <Flex
                                                        flexDirection="column"
                                                        alignItems="center"
                                                        justifyContent={article.isNew ? undefined : "center"}
                                                        minHeight="135px"
                                                        gap={6}
                                                    >
                                                        {article.isNew && (
                                                            <Box
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
                                                        )}

                                                        {isExpanded ? (
                                                            <Box px={10} justifySelf="flex-end">
                                                                <MinusIcon fontSize="12px" />
                                                            </Box>
                                                        ) : (
                                                            <Box px={10} justifySelf="flex-end">
                                                                <AddIcon fontSize="12px" />
                                                            </Box>
                                                        )}
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
