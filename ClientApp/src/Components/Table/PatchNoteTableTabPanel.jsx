import { Table, Tbody, TabPanel, useMediaQuery, Center, Show, Container, Flex } from "@chakra-ui/react";
import { Pagination } from "../Pagination/Pagination.jsx";
import { TableRow } from "./TableRow.jsx";
import { tableHeadContentArticles, tableHeadContentNewsletters } from "@/Datas/tableHeadContent.js";
import { TableHeader } from "@/Components/Table/TableHeader.jsx";
import React from "react";

export const PatchNoteTableTabPanel = ({
    articles,
    filter,
    currentPage,
    setCurrentPage,
    pagination,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    articleRefetch,
}) => {
    const [isLargerThanMd] = useMediaQuery("(min-width: 80em)");

    return (
        <Flex flexDirection={"column"} pe={0} ps={0}>
            <Table colorScheme="SuppBlue" pe={0} variant={isLargerThanMd ? "simple" : "unstyled"}>
                <Show above={"xl"}>
                    <TableHeader
                        headerTitles={tableHeadContentArticles}
                        setSortColumn={setSortColumn}
                        setSortDirection={setSortDirection}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                    />
                </Show>
                <Tbody>
                    {articles &&
                        articles
                            /*.filter(filter)*/
                            .map((article) =>
                                isLargerThanMd ? (
                                    <TableRow article={article} articleRefetch={articleRefetch} />
                                ) : (
                                    <Center>
                                        <TableRow article={article} articleRefetch={articleRefetch} />
                                    </Center>
                                )
                            )}
                </Tbody>
            </Table>
            <Center>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagination={pagination} />
            </Center>
        </Flex>
    );
};
