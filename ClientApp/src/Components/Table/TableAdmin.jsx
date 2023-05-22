import {
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  css,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import "./table.css";
import React, { useState } from "react";
import { t } from "i18next";
import { PatchNoteTableTabPanel } from "./PatchNoteTableTabPanel.jsx";
import { TabButton } from "@/Components/Buttons/TabButton.jsx";

export const TableAdmin = ({
  articles,
  isLoading,
  currentPage,
  setCurrentPage,
  stateArticle,
  setStateArticle,
  pagination,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
  articleRefetch,
}) => {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="responsiveTable">
      <Flex
        colorscheme="primaryBlue"
        bgColor="primaryBlue.10"
        width="100%"
        gap={3}
        p={3}
        overflow={"hidden"}
        overflowX={"scroll"}
      >
        <TabButton
          text={t("filters.filters_state.list.all")}
          isActive={stateArticle == "all"}
          onClick={() => setStateArticle("all")}
        />
        <TabButton
          text={t("filters.filters_state.list.scheduled")}
          isActive={stateArticle === "scheduled"}
          onClick={() => setStateArticle("scheduled")}
        />
        <TabButton
          text={t("filters.filters_state.list.published")}
          isActive={stateArticle === "published"}
          onClick={() => setStateArticle("published")}
        />
        <TabButton
          text={t("filters.filters_state.list.draft")}
          isActive={stateArticle === "draft"}
          onClick={() => setStateArticle("draft")}
        />
        <TabButton
          text={t("filters.filters_state.list.archived")}
          isActive={stateArticle === "archive"}
          onClick={() => setStateArticle("archive")}
        />
      </Flex>

      {/*All articles*/}
      <PatchNoteTableTabPanel
        articles={articles}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagination={pagination}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        articleRefetch={articleRefetch}
      />
    </div>
  );
};
