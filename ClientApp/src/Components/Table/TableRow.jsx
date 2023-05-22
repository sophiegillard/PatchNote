import {
  Flex,
  HStack,
  MenuButton,
  Show,
  Td,
  Text,
  Tr,
  useMediaQuery,
  Menu,
  MenuItem,
  MenuList,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { t } from "i18next";
import { toggleIsArchivedById } from "../../services/articles/getArticlesQueries.js";
import { deleteArticleById } from "../../services/articles/deleteArticle.js";
import { useMutation } from "react-query";
import React from "react";
import { CrudActionMenu } from "@/Components/Menu/CrudActionMenu";
import { CrudActionButton } from "@/Components/Buttons/CrudActionButton.jsx";
import { createSuccessToast } from "@/Utils/toast.js";
import folderIcon from "@/assets/images/folder.png";

export const TableRow = ({ article, articleRefetch }) => {
  const [isLargerThanXl] = useMediaQuery("(min-width: 80rem)");

  const confirmDeleteToast = createSuccessToast(
    t("pages.patch_note.patch_note_deleted")
  );

  //Handling delete article
  const { mutate: deleteArticle } = useMutation(deleteArticleById, {
    onSuccess: () => {
      setTimeout(() => {
        articleRefetch();
      }, 300); // 1000 milliseconds = 1 second
      confirmDeleteToast();
    },
  });

  function handleDelete(article) {
    deleteArticle(article.id);
  }

  return (
    <Tr
      key={article.id}
      my={3}
      minW={{ base: "95%", lg: "75%" }}
      maxW={{ base: "55%", lg: "" }}
      rounded={{ base: "xl", lg: "" }}
      bgColor={{ base: "gray.100", lg: "white" }}
    >
      <Show below="xl">
        <Flex flexDirection="column">
          <Td fontWeight="bold" borderTopRadius={isLargerThanXl ? "" : "xl"}>
            <HStack justifyContent="space-between">
              <Flex flexDirection="column" gap="2">
                <Text textTransform="uppercase" letterSpacing="0.1rem">
                  {article.id} | {article.titreFR}
                </Text>
                <Text fontWeight="light">{article.datePublication}</Text>
              </Flex>

              <CrudActionMenu
                item={article}
                linkname={"article"}
                handleDelete={() => handleDelete(article)}
              >
                {!(article.isBrouillon == 1) && (
                  <MenuItem>
                    <CrudActionButton
                      onClick={() => {
                        toggleIsArchivedById(article.id);
                        setTimeout(() => {
                          articleRefetch();
                        }, 300);
                      }}
                      srcIcon={folderIcon}
                      label="Archive"
                      text={
                        article.isArchive === 0
                          ? t("main.general.archive")
                          : t("main.general.unarchive")
                      }
                    />
                  </MenuItem>
                )}
              </CrudActionMenu>
            </HStack>
          </Td>
          <Td mt="-1rem">
            <HStack>
              <Text>
                {t(`filters.filters_category.list.${article.categorie}`)} ||{" "}
                {t(`filters.filters_modules.list.${article.module}`)}
              </Text>
            </HStack>
          </Td>
        </Flex>
      </Show>

      <Show above="xl">
        <Td textAlign={isLargerThanXl ? "start" : "end"}>{article.id}</Td>

        <Td textAlign={isLargerThanXl ? "start" : "end"}>
          {article.datePublication}
        </Td>

        <Td textAlign={isLargerThanXl ? "start" : "end"}>
          {article.dateModification}
        </Td>
      </Show>

      <Show above="xl">
        <Td textAlign={isLargerThanXl ? "start" : "end"}>{article.titreFR}</Td>
        <Td>{t(`filters.filters_category.list.${article.categorie}`)}</Td>

        <Td>{t(`filters.filters_modules.list.${article.module}`)}</Td>

        {/*Action buttons*/}
        <Td p={0} textAlign={isLargerThanXl ? "center" : "end"}>
          <CrudActionMenu
            item={article}
            linkname={"article"}
            handleDelete={() => handleDelete(article)}
          >
            {/* Show archive button only if article is not archived and not brouillon*/}
            {!(article.isBrouillon == 1) && (
              <MenuItem>
                <CrudActionButton
                  onClick={() => {
                    toggleIsArchivedById(article.id);
                    setTimeout(() => {
                      articleRefetch();
                    }, 300);
                  }}
                  srcIcon={folderIcon}
                  label="Archive"
                  text={
                    article.isArchive === 0
                      ? t("main.general.archive")
                      : t("main.general.unarchive")
                  }
                />
              </MenuItem>
            )}
          </CrudActionMenu>
        </Td>
      </Show>
    </Tr>
  );
};
