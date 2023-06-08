import { SidebarWithHeader } from "../../../Components/main/SidebarWithHeader.jsx";
import { Box, ButtonGroup, Card, Container, Show } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { TableAdmin } from "@/Components/Table/TableAdmin.jsx";
import { AddButton } from "@/Components/Buttons/AddButton.jsx";
import { FilterDrawerPatchNoteAdmin } from "@/Components/Filters/FilterDrawerPatchNoteAdmin.jsx";
import { articlePaginationQuery, articlesQuery } from "@/services/queries/articlesQuery.js";
import { IoMdAdd } from "react-icons/all.js";
import { MobileCircleButton } from "@/Components/Buttons/MobileCircleButton.jsx";
import { PageHeader } from "@/Components/main/PageHeader";
import { useTranslation } from "react-i18next";

export const PatchNoteHandler = () => {
    const { t } = useTranslation();
    const auth = useAuthUser();

    //Setting filters
    const [activeModuleIdFilter, setActiveModuleIdFilter] = useState("");
    const [activeCategorieIdFilter, setActiveCategorieIdFilter] = useState("");
    const [activeDatePublication, setActiveDatePublication] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [stateArticle, setStateArticle] = useState("all");
    const [sortColumn, setSortColumn] = useState("DatePublication");
    const [sortDirection, setSortDirection] = useState();

    const [startDatePublication, setStartDatePublication] = useState("");
    const [endDatePublication, setEndDatePublication] = useState("");

    const {
        data: articles,
        isLoading: isArticleLoading,
        refetch: articleRefetch,
    } = articlesQuery(
        activeCategorieIdFilter,
        activeModuleIdFilter,
        startDatePublication,
        endDatePublication,
        currentPage,
        stateArticle,
        sortColumn,
        sortDirection
    );
    const { data: pagination, isLoading: isPaginationLoading } = articlePaginationQuery(
        activeCategorieIdFilter,
        activeModuleIdFilter,
        startDatePublication,
        endDatePublication,
        currentPage,
        stateArticle,
        sortColumn,
        sortDirection
    );

    return (
        <SidebarWithHeader>
            <Container minW="100%" p="0">
                {/*Heading title and action buttons*/}
                <PageHeader title={t("pages.patch_note.patch_note_title")}>
                    <Show above="lg">
                        <ButtonGroup>
                            <AddButton redirectLink={"/addArticle"} />
                            <FilterDrawerPatchNoteAdmin
                                activeDatePublication={activeDatePublication}
                                setActiveDatePublication={setActiveDatePublication}
                                setStartDatePublication={setStartDatePublication}
                                setEndDatePublication={setEndDatePublication}
                                activeCategorieIdFilter={activeCategorieIdFilter}
                                setActiveCategorieIdFilter={setActiveCategorieIdFilter}
                                activeModuleIdFilter={activeModuleIdFilter}
                                setActiveModuleIdFilter={setActiveModuleIdFilter}
                                sortColumn={sortColumn}
                                setSortColumn={setSortColumn}
                                sortDirection={sortDirection}
                                setSortDirection={setSortDirection}
                            />
                        </ButtonGroup>
                    </Show>
                </PageHeader>

                <Card>
                    <TableAdmin
                        activeModuleIdFilter={activeModuleIdFilter}
                        articles={articles}
                        isLoading={isArticleLoading}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        stateArticle={stateArticle}
                        setStateArticle={setStateArticle}
                        pagination={pagination}
                        sortColumn={sortColumn}
                        setSortColumn={setSortColumn}
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        articleRefetch={articleRefetch}
                    />
                </Card>

                {/* Floating buttons*/}
                <Box>
                    <Show below="lg">
                        <MobileCircleButton
                            icon={<IoMdAdd />}
                            redirectLink={"/addArticle"}
                            bottomPx={"80px"}
                            rightPx={"20px"}
                            bgGradient={"linear(to-r, successButton.600, successButton.400)"}
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
                            sortColumn={sortColumn}
                            setSortColumn={setSortColumn}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            isMobileAndPatchNote={true}
                        />
                    </Show>
                </Box>
            </Container>
        </SidebarWithHeader>
    );
};
