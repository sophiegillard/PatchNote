import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    HStack, Image,
    Stack,
    TabPanel, Text
} from "@chakra-ui/react";
import {TitleAndContent} from "@/Components/Other/TitleAndContent.jsx";
import {t} from "i18next";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import {categoryGradients, moduleIcons} from "@/Style/MainCardStyle.js";
import React from "react";

export const NewsletterDisplayTabPanel = ({item, languageCode}) =>{
    return(
        <TabPanel>
            <Flex
                gap={{ base: "0rem", lg: "1rem" }}
                direction={{ base: "column", sm: "row" }}>

                <TitleAndContent
                    title={t('pages.patch_note.patch_note_id')}
                    content={item.id}/>

                <TitleAndContent
                    title={t('pages.newsletter.newsletter_date')}
                    content={item.datePublication}/>

                <TitleAndContent
                    title={t('pages.newsletter.newsletter_date_update')}
                    content={item.dateModification}/>

            </Flex>

            <TitleAndContent
                title={t('pages.newsletter.newsletter_title_main')}
                content={item[`titre${languageCode}`]}/>
            <TitleAndContent
                title={t('pages.newsletter.newsletter_summary_main')}
                content={item[`resume${languageCode}`]}/>
            <TitleAndContent
                title={'Articles inclus'}/>
            <Accordion defaultIndex={[0]} allowMultiple borderColor={"white"}>
                <AccordionItem>
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton  p={"0"} color={"black"}
                                                 _hover={{ fontWeight: '600'}}>
                                    <Box as="span"
                                         textAlign='left'
                                         flex={{base:"1", lg:"0"}}
                                         minW={"fit-content"}
                                         pr={3} >
                                        {item.articles.length} {t('pages.newsletter.newsletter_articles_included')}
                                    </Box>
                                    {isExpanded ? (
                                        <MinusIcon fontSize='12px' />
                                    ) : (
                                        <AddIcon fontSize='12px' />
                                    )}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} p={"0"}>
                                <Flex gap={3} wrap={"wrap"} flexDirection={{base:"column", lg:"row"}}>
                                    {item.articles.map((article) => (
                                        <Stack  bgColor={"gray.100"}
                                                borderRadius={"lg"}
                                                maxW={{base:"100%", lg:"32%"}}
                                                minW={{base:"100%", lg:"32%"}}>
                                            <Link to={`/article/${article.id}`}>

                                                <HStack bgGradient={categoryGradients[article.categorie]}
                                                        borderTopRadius={"lg"}>
                                                    <Flex boxSize='40px' justifyContent={"center"} alignItems={"center"}>
                                                        <Image src={moduleIcons[article.module]} p={2} alt="module icon"/>
                                                    </Flex>
                                                    <Text color={"white"} fontSize={"13px"}>
                                                        {t(`filters.filters_modules.list.${article.module}`)}  |  {t(`filters.filters_category.list.${article.categorie}`)}
                                                    </Text>
                                                </HStack>

                                                <Stack p={3} pb={2}>
                                                    <Text fontWeight={"bold"}>
                                                        {article[`titre${languageCode}`]}
                                                    </Text>
                                                    <Text fontSize={"small"}>
                                                        ID {article.id} | Date publication : {article.datePublication}
                                                    </Text>
                                                </Stack>
                                            </Link>
                                        </Stack>)
                                    )}
                                </Flex>
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>

            </Accordion>
        </TabPanel>
    )
}