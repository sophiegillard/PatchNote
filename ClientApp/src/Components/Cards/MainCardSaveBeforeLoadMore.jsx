import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Stack,
    Text,
    Collapse,
    Accordion,
    AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, VStack, HStack, Image, Icon
} from "@chakra-ui/react";
import {articlesQuery} from "@/services/queries/articlesQuery.js";
import {t} from "i18next";
import React, {useState} from "react";
import {useAuthUser} from "react-auth-kit";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import logo from "@/assets/images/module_icon/module_base.png";
import {categoryColors, categoryGradients, moduleIcons, TextGradients} from "@/Style/MainCardStyle.js";
import {PrimaryActionButton} from "@/Components/Buttons/PrimaryActionButton.jsx";


export const MainCard = ({
                             activeModuleFilter,
                             activeCategoryFilter,
                             startDate,
                             endDate,
                             inputValue,
                             setNoResult
                         }) => {
    const [show, setShow] = useState(false)
    const auth = useAuthUser();


    const handleToggle = () => setShow(!show)

    const {
        data: articles,
        isLoading: isArticleLoading
    } = articlesQuery(activeCategoryFilter, activeModuleFilter, startDate, endDate);

    console.log(articles)

    if (isArticleLoading) return <p>Loading...</p>
    if (isArticleLoading) return <p>Error</p>


    articles.length === 0 ? setNoResult(true) : setNoResult(false);



    return (
        <>

            <Accordion allowMultiple>
                {articles
                    ?.filter((article) =>
                        article.titre.toLowerCase().includes(inputValue.toLowerCase()) ||
                        article.description.toLowerCase().includes(inputValue.toLowerCase())
                    ).map((article) => (
                        <AccordionItem pb="1rem">
                            {({isExpanded}) => (
                                <>
                                    <h2 style={{paddingBottom: 0}}>
                                        <AccordionButton borderRadius="xl" padding={0}
                                                         bgColor="white" shadow="lg"
                                        >

                                            <Box as="span" flex='1' textAlign='left' height="100%">
                                                <HStack height="100%">
                                                    <Flex flexDirection="column"
                                                          alignItems="center"
                                                          p="3" py={5} gap={4}
                                                          borderLeftRadius="lg"
                                                          minW="180px"
                                                          bgGradient={categoryGradients[article.categorie]}>


                                                        {moduleIcons[article.module] === undefined ?
                                                            (<Image maxHeight="60px" src={logo} alt="module icon"/>)
                                                            :
                                                            (<Image maxHeight="60px" src={moduleIcons[article.module]} alt="module icon"/>)
                                                        }

                                                        <Text fontSize='sm' color="white" fontWeight={"bolder"} >
                                                            {t(`filters.filters_modules.list.${article.module}`)}
                                                        </Text>
                                                    </Flex>

                                                    <HStack flexGrow={1} height="100%" justifyContent="space-between" >
                                                        <VStack alignItems="flex-start" px={3}>

                                                            <VStack alignItems="start" pb={6}>
                                                                <HStack alignItems="baseline">
                                                                    <Text textStyle='h4' size='md' pb="0">{article.titre}</Text>
                                                                    <Text size='s' pb="0">{article.version}</Text>
                                                                </HStack>
                                                                <Text fontSize="xs">{article.datePublication} </Text>

                                                            </VStack>
                                                            <Text fontSize='md'
                                                                  p={1} px={4} color="white"
                                                                  bgColor={categoryColors[article.categorie]} borderRadius="full">
                                                                {t(`filters.filters_category.list.${article.categorie}`)}
                                                            </Text>

                                                        </VStack>

                                                    </HStack>

                                                    <Flex flexDirection="column"
                                                          alignItems="center"
                                                          justifyContent={article.isNew ? undefined : "center"}
                                                          height="100%"
                                                          gap={6}
                                                    >

                                                        {article.isNew &&
                                                            <Box
                                                                bgGradient='linear(to-b, gradientColors.redStart, gradientColors.redEnd)'
                                                                style={{
                                                                    clipPath: "polygon(20% 0, 80% 0, 80% 81%, 50% 100%, 20% 81%)"
                                                                }}
                                                                height={"30px"}>
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

                                                            </Box>}


                                                        {isExpanded ? (
                                                            <Box px={10} justifySelf="flex-end">
                                                                <MinusIcon fontSize='12px'/>
                                                            </Box>
                                                        ) : (
                                                            <Box px={10} justifySelf="flex-end">
                                                                <AddIcon fontSize='12px'/>
                                                            </Box>
                                                        )}
                                                    </Flex>

                                                </HStack>
                                            </Box>

                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel py={6} px={8}
                                                    mx={3}
                                                    bgGradient={TextGradients[article.categorie]}
                                                    borderBottomRadius="xl"
                                                    >
                                        <Text dangerouslySetInnerHTML={{ __html: `${article.description}` }} />
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    ))}

            </Accordion>

            <Stack p={3}>
                <PrimaryActionButton text={t('main.general.load_more')}
                                    />
            </Stack>

        </>
    )
}

