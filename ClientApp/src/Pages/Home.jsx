import { Box, Button, Container, Flex, HStack, Link, Show, Spinner, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../Components/main/SearchBar.jsx";
import { SidebarWithHeader } from "../Components/main/SidebarWithHeader.jsx";
import { MainCard } from "../Components/Cards/MainCard.jsx";
import { ScrollToTopButton } from "../Components/Buttons/ScrollToTopButton.jsx";
import { NoResult } from "../Components/Filters/NoResult";
import { FilterDrawerPatchNoteAdmin } from "../Components/Filters/FilterDrawerPatchNoteAdmin.jsx";
import { MainCardMobile } from "@/Components/Cards/MainCardMobile.jsx";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { useArticleLoadMoreQuery } from "@/services/queries/articlesQuery.js";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton.jsx";

export const Home = () => {
    const auth = useAuthUser();
    const { t, i18n } = useTranslation();

    const [isLargerThan60em] = useMediaQuery("(min-width: 60em)");

    const [scrollBehavior] = useState("inside");
    const [isVisible, setIsVisible] = useState(false);

    //Setting filters
    const [activeModuleIdFilter, setActiveModuleIdFilter] = useState("");
    const [activeCategorieIdFilter, setActiveCategorieIdFilter] = useState("");
    const [activeDatePublication, setActiveDatePublication] = useState("");

    const [startDatePublication, setStartDatePublication] = useState("");
    const [endDatePublication, setEndDatePublication] = useState("");

    const [inputValue, setInputValue] = useState("");
    const [search, setSearch] = useState("");

    const useQuery = useQueryClient();

    //Information about the user
    const userId = auth().utilisateurId;

    //Get all articles to display
    const {
        data,
        isLoading: isArticleLoading,
        fetchNextPage,
    } = useArticleLoadMoreQuery(activeCategorieIdFilter, activeModuleIdFilter, startDatePublication, endDatePublication, search);

    const lng = i18n.language.toUpperCase(); // log the current language

    const articles =
        data &&
        data.pages
            .map((page) => page.articles.data)
            .flat()
            .filter(
                (article) =>
                    article[`titre${lng}`] !== null &&
                    article[`titre${lng}`] !== undefined &&
                    article[`titre${lng}`] !== "" &&
                    article[`contenu${lng}`] !== `<p><br></p>` &&
                    article[`contenu${lng}`] !== undefined &&
                    article[`contenu${lng}`] !== ""
            );

    //Handle the scroll to top button
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            useQuery.invalidateQueries("articleLoadMore");
        }
    };

    return (
        <>
            <SidebarWithHeader>
                <Container m="0" px="5" maxW="none" pt={{ base: 4, lg: 0 }}>
                    {/*SearchBar*/}
                    <HStack w="100%" justifyContent="space-between" pb={3}>
                        <SearchBar
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            bgColor={"white"}
                            onEnter={() => handleKeyDown(event)}
                        />

                        <FilterDrawerPatchNoteAdmin
                            activeDatePublication={activeDatePublication}
                            setActiveDatePublication={setActiveDatePublication}
                            setStartDatePublication={setStartDatePublication}
                            setEndDatePublication={setEndDatePublication}
                            activeCategorieIdFilter={activeCategorieIdFilter}
                            setActiveCategorieIdFilter={setActiveCategorieIdFilter}
                            activeModuleIdFilter={activeModuleIdFilter}
                            setActiveModuleIdFilter={setActiveModuleIdFilter}
                            startDatePublication={startDatePublication}
                            endDatePublication={endDatePublication}
                            search={search}
                        />
                    </HStack>

                    {/*Cards*/}
                    <Stack spacing="4" pt="3">
                        {isLargerThan60em ? (
                            <MainCard inputValue={inputValue} articles={articles} isArticleLoading={isArticleLoading} />
                        ) : (
                            <MainCardMobile inputValue={inputValue} articles={articles} isArticleLoading={isArticleLoading} />
                        )}

                        {data &&
                            data.pageParams.length * 10 < data.pages[0].articles.totalCount &&
                            articles.length !== 0 &&
                            articles.length >= 10 && (
                                <Stack p={3} alignSelf="center">
                                    <PrimaryActionButton
                                        text={t("main.general.load_more")}
                                        onClick={() => {
                                            fetchNextPage({
                                                pageParam: data.pageParams.length + 1,
                                            });
                                        }}
                                        disabled={isArticleLoading}
                                    />
                                </Stack>
                            )}

                        <Flex flexGrow={1} flexDirection={"column"} justifyContent={"center"}>
                            <NoResult data={articles} />
                        </Flex>
                    </Stack>

                    {/* Floating buttons*/}
                    <Box>
                        {auth().typeUtilisateur === 1 && (
                            <Show below="md">
                                <Link href={"/contact"}>
                                    <Button position="fixed" bottom="20px" size={"sm"} colorScheme="purple" zIndex={3}>
                                        Leave a message
                                    </Button>
                                </Link>
                            </Show>
                        )}

                        {isVisible && <ScrollToTopButton isVisible={isVisible} scrollBehavior={scrollBehavior} />}
                    </Box>
                </Container>
            </SidebarWithHeader>
        </>
    );
};
