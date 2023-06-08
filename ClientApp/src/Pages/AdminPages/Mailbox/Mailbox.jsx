import { SidebarWithHeader } from "@/Components/main/SidebarWithHeader.jsx";
import { SearchBar } from "@/Components/main/SearchBar.jsx";
import React from "react";
import { MessageCard } from "@/Components/Cards/MessageCard.jsx";
import { Flex, Heading, HStack, Show, Stack, Text, useMediaQuery, useDisclosure } from "@chakra-ui/react";
import { useAllMessageRecommandation } from "@/services/messageRecommandation/queryMessageRecommandation.js";
import { QueryClient, useMutation, QueryClientProvider, useQueryClient } from "react-query";
import axios from "axios";
import { useAllStatutMessageQuery } from "@/services/queries/getAllStatutMessage.js";
import { t } from "i18next";
import { useState } from "react";
import Select from "react-select";
import { IoOptionsOutline } from "react-icons/all.js";
import { MailContent } from "./MailContent.jsx";
import { MailContentMobile } from "./MailContentMobile.jsx";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton";
import { NoResult } from "@/Components/Filters/NoResult";
import emailIcon from "@/assets/images/email2.png";
import { useTranslation } from "react-i18next";

const messageStates = [
    { value: "all", label: "All", id: "" },
    { value: "read", label: "Read", id: 1 },
    { value: "unread", label: "Unread", id: 0 },
];

export const Mailbox = () => {
    const { t } = useTranslation();
    const [categoryFilter, setCategoryFilter] = useState("");
    const [activeEmailId, setactiveEmailId] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [isLargerThan60em] = useMediaQuery("(min-width: 60em)");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: listAllCategoryMessage } = useAllStatutMessageQuery();

    const {
        status,
        error,
        data,
        refetch,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch: refetechMessages,
    } = useAllMessageRecommandation(categoryFilter, stateFilter, inputValue);

    const filteredMessagesById =
        data &&
        data.pages
            .map((page) => page.messages.data)
            .flat()
            .filter((message) => message.id === activeEmailId);

    const filteredMessages = data && data.pages.map((page) => page.messages.data).flat();

    const useQuery = useQueryClient();

    const queryClient = new QueryClient();

    const markMessageAsRead = (messageId) => {
        return axios.put(`${import.meta.env.VITE_DEV_BASE_URL}/messageRecommandation/setRead/${messageId}`, { isLu: 1 });
    };

    const updateMessageMutation = useMutation({
        mutationFn: markMessageAsRead,
        onSuccess: (data) => {
            useQuery.invalidateQueries("messages", { exact: true });
        },
    });

    const handleClick = (message) => {
        updateMessageMutation.mutate(message.id);
    };

    const toggleFilterPanel = () => {
        setFilterPanelOpen(!isFilterPanelOpen);
    };

    console.log(filteredMessages);

    if (status === "loading") return <h1>Loading...</h1>;
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

    return (
        <QueryClientProvider client={queryClient}>
            <SidebarWithHeader>
                <Stack minW="100%" gap="4" maxH={{ base: "none", md: "78vh" }}>
                    <Flex borderRadius="md" overscrollY={"true"} overflow="hidden">
                        <Flex
                            direction="column"
                            borderRight={{ base: "none", lg: "solid 2px" }}
                            borderColor={{ base: "none", lg: "gray.300" }}
                            maxW={{ base: "100%", lg: "30%" }}
                            width={{ base: "100%", lg: "40%" }}
                        >
                            <Stack
                                width="100%"
                                shadow="md"
                                allowtoggle="true"
                                bgGradient={`linear(to-b, primaryBlue.600, primaryBlue.500)`}
                                borderTopRightRadius={{ base: "none", md: "xl", lg: "none" }}
                                borderTopLeftRadius={{ base: "none", md: "xl" }}
                            >
                                <HStack justifyContent="space-between" alignItems="start" p={3} color="white">
                                    <Stack>
                                        <Heading pb={0} color="white">
                                            {t("pages.mailbox.mailbox")}
                                        </Heading>
                                        <Text pb={4}>
                                            {data.pages[0].messages.totalCount} {t("pages.mailbox.messages")} · {data.pages[0].messages.unreadCount}{" "}
                                            {t("pages.mailbox.unread")}
                                        </Text>
                                    </Stack>

                                    <IoOptionsOutline size="25px" cursor="pointer" onClick={toggleFilterPanel} />
                                </HStack>

                                {isFilterPanelOpen && (
                                    <Stack bgGradient={`linear(to-b, primaryBlue.10, primaryBlue.5)`} p={3}>
                                        <SearchBar
                                            onChange={(e) => {
                                                {
                                                    setInputValue(e.target.value);
                                                    refetch();
                                                }
                                            }}
                                        />
                                        <HStack flexGrow={"1"} flexWrap="wrap">
                                            <Select
                                                options={[
                                                    { value: "", label: "Tout" },
                                                    ...listAllCategoryMessage.map((category) => ({ value: category.id, label: category.name })),
                                                ]}
                                                placeholder={t("filters.filters_category_message.title")}
                                                onChange={(selectedOption) => {
                                                    setCategoryFilter(selectedOption.value);
                                                    setTimeout(() => {
                                                        refetechMessages();
                                                    }, 100);
                                                }}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        flex: "1",
                                                        width: "100%",
                                                        borderRadius: "40px",
                                                    }),
                                                }}
                                            />

                                            <Select
                                                options={
                                                    messageStates &&
                                                    messageStates.map((state) => ({
                                                        id: state.id,
                                                        value: state.value,
                                                        label: t(`pages.mailbox.${state.value}`),
                                                    }))
                                                }
                                                placeholder={t("pages.mailbox.mail_status")}
                                                onChange={(selectedOption) => {
                                                    setStateFilter(selectedOption.id);
                                                    setTimeout(() => {
                                                        refetechMessages();
                                                    }, 100);
                                                }}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        flex: "1",
                                                        borderRadius: "40px",
                                                    }),
                                                }}
                                            />
                                        </HStack>
                                    </Stack>
                                )}
                            </Stack>

                            <Flex direction="column" maxW="100%" overflowY="scroll">
                                {filteredMessages.map((message) => (
                                    <MessageCard
                                        message={message}
                                        activeEmailId={activeEmailId}
                                        onClick={() => {
                                            if (!isLargerThan60em) {
                                                onOpen();
                                            }
                                            setactiveEmailId(message.id);
                                            if (message.isLu === 0) {
                                                handleClick(message);
                                            }
                                        }}
                                    />
                                ))}
                                {data && data.pageParams.length * 10 < data.pages[0].messages.totalCount && (
                                    <Stack p={3}>
                                        <PrimaryActionButton
                                            text={t("main.general.load_more")}
                                            onClick={() => {
                                                fetchNextPage({ pageParam: data.pageParams.length + 1 });
                                            }}
                                            disabled={isFetchingNextPage}
                                        />
                                    </Stack>
                                )}
                            </Flex>
                        </Flex>

                        <Show above="lg">
                            {filteredMessagesById.length === 0 && (
                                <Flex p={3} width="100%" height="100%" justifyContent="center" pt="35vh">
                                    <NoResult
                                        altImage="NoEmail"
                                        srcImage={emailIcon}
                                        data={filteredMessagesById}
                                        title={"pages.mailbox.select_message"}
                                        text={""}
                                    />
                                </Flex>
                            )}

                            {data &&
                                filteredMessagesById.length > 0 &&
                                filteredMessagesById.map((message) => (
                                    <MailContent
                                        id={message.id}
                                        auteur={message.auteur}
                                        sujet={message.sujet}
                                        dateCreation={message.dateCreation}
                                        message={message.message}
                                        statutMessageRecommandation={message.statutMessageRecommandation}
                                        statutMessageRecommandationId={message.statutMessageRecommandationId}
                                        statutMessageRecommandationColor={message.statutMessageRecommandationColor}
                                        refetechMessages={refetechMessages}
                                    />
                                ))}
                        </Show>

                        <Show below="lg">
                            {data &&
                                filteredMessagesById.map((message) => (
                                    <MailContentMobile
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        id={message.id}
                                        auteur={message.auteur}
                                        sujet={message.sujet}
                                        dateCreation={message.dateCreation}
                                        message={message.message}
                                        statutMessageRecommandation={message.statutMessageRecommandation}
                                        statutMessageRecommandationId={message.statutMessageRecommandationId}
                                        statutMessageRecommandationColor={message.statutMessageRecommandationColor}
                                    />
                                ))}
                        </Show>
                    </Flex>
                </Stack>
            </SidebarWithHeader>
        </QueryClientProvider>
    );
};
