import {SidebarWithHeader} from "@/Components/main/SidebarWithHeader.jsx";
import {
    ButtonGroup, Container, Flex, Menu, MenuButton, MenuItem, MenuList,
    Table, Tbody, Td, Tr, useMediaQuery, useDisclosure, Center, Show, HStack, Text, Box,
} from "@chakra-ui/react";
import {AddButton} from "@/Components/Buttons/AddButton.jsx";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {TableHeader} from "@/Components/Table/TableHeader.jsx";
import {useAllNewsletterQuery} from "@/services/newsletter/getNewsletters.js";
import {FiMoreVertical, IoMdAdd} from "react-icons/all.js";
import {tableHeadContentNewsletters} from "../../../Datas/tableHeadContent.js";
import {ActionModal} from "@/Components/Modals/ActionModal";
import {closeModal, openModal} from "@/Utils/basicFormFunctions.js";
import {createNewsletter} from "@/services/newsletter/createNewsletter.js";
import {deleteNewsletterById} from "@/services/newsletter/deleteNewsletter.js";
import {PageHeader} from "@/Components/main/PageHeader.jsx";
import {TabButton} from "@/Components/Buttons/TabButton.jsx";
import {Pagination} from "@/Components/Pagination/Pagination.jsx";
import {CrudActionMenu} from "@/Components/Menu/CrudActionMenu.jsx";
import {MobileCircleButton} from "@/Components/Buttons/MobileCircleButton.jsx";
import {useTranslation} from "react-i18next";

export const NewsletterHandler = () => {
    const { t } = useTranslation();
    const [stateNewsletter, setStateNewsletter] = useState("all");
    const [sortColumn, setSortColumn] = useState("DatePublication");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState();
    const [isLargerThanXl] = useMediaQuery("(min-width: 80rem)");



    const { data : newsletterQuery } = useAllNewsletterQuery(currentPage, stateNewsletter, sortColumn, sortDirection);


    const newsletters = newsletterQuery && newsletterQuery.newsletter.newsletterData;
    const pagination = newsletterQuery && newsletterQuery.pagination;


    const confirmationModal = useDisclosure();

    //Handling create newsletter - redirect link is in createNewsletter.js
    const queryClient = useQueryClient();
    const {mutate: createNewsletterId} = useMutation(createNewsletter, {
        onSuccess: (data) => {
            console.log("created", data)
            closeModal(confirmationModal)
            queryClient.invalidateQueries('newsletters')
        },
    });

    //Handling delete newsletter
    const { mutate : deleteNewsletter } = useMutation(
        deleteNewsletterById,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('newsletters');
            },
            onError: (error) => {
                console.log(error);
            },
        },
    );

    function handleDelete(id) {
        deleteNewsletter(id);
    }

    return(
        <SidebarWithHeader>

            <ActionModal
                onConfirm={() => createNewsletterId()}
                isOpen={confirmationModal.isOpen}
                onClose={confirmationModal.onClose}
                message={t('pages.newsletter.newsletter_creation_question')}/>

            <Container minW="100%" p="0" bgColor={"white"}>

              {/*  Heading title and action buttons*/}
                <PageHeader title={t('pages.newsletter.newsletter_title')}>
                    <Show above="lg">
                        <AddButton isLink={false} onClick={()=> openModal(confirmationModal)}/>
                    </Show>
                </PageHeader>



                <div className="responsiveTable" >

                    <Flex colorscheme="primaryBlue" bgColor="primaryBlue.10" width="100%" gap={3} p={3} overflow={"hidden"} overflowX={"scroll"}>
                        <TabButton
                            text={t('filters.filters_state.list.all')}
                            isActive={stateNewsletter === "all"}
                            onClick={()=>setStateNewsletter("all")}
                        />
                        <TabButton
                            text={t('filters.filters_state.list.published')}
                            isActive={stateNewsletter === "published"}
                            onClick={()=>setStateNewsletter("published")}
                        />
                        <TabButton
                            text={t('filters.filters_state.list.scheduled')}
                            isActive={stateNewsletter === "scheduled"}
                            onClick={()=>setStateNewsletter("scheduled")}
                        />
                        <TabButton
                            text={t('filters.filters_state.list.draft')}
                            isActive={stateNewsletter === "draft"}
                            onClick={()=>setStateNewsletter("draft")}
                        />

                    </Flex>
                                    <Table colorscheme="SuppBlue" pe={0} bgColor={"white"}>
                                        <Show above={"xl"}>
                                            <TableHeader headerTitles={tableHeadContentNewsletters}
                                                          setSortColumn={setSortColumn}
                                                          setSortDirection={setSortDirection}
                                                          sortColumn={sortColumn}
                                                          sortDirection={sortDirection}
                                            />
                                        </Show>

                                        {newsletters && newsletters.map((newsletter) => (
                                            <Tbody key={newsletter.id} px={3}>
                                                <Tr key={newsletter.id}
                                                    my={3}
                                                    minW={{base: "100%", lg: "100%"}}
                                                    maxW={{base: "55%", md: "none"}}
                                                    bgColor={{base: "white", md: "white"}}>

                                                    <Show below='xl'>
                                                        <Flex flexDirection="column">
                                                            <Td
                                                                fontWeight="bold"
                                                                borderTopRadius={{base:"", lg:"xl"}}>
                                                                <HStack justifyContent="space-between">
                                                                    <Flex flexDirection="column" gap="2">
                                                                        <Text textTransform="uppercase" letterSpacing="0.1rem">
                                                                            {newsletter.id} | {newsletter.titreFR}
                                                                        </Text>
                                                                        <Text fontWeight="light">
                                                                            Date de publication : {newsletter.datePublication}
                                                                        </Text>
                                                                        <Text fontWeight="light">
                                                                            Nbr d'articles : {newsletter.datePublication}
                                                                        </Text>
                                                                    </Flex>

                                                                    <CrudActionMenu item={newsletter}
                                                                                     linkname={'newsletter'}
                                                                                     handleDelete={()=>handleDelete(newsletter.id)} />
                                                                </HStack>
                                                            </Td>
                                                        </Flex>
                                                    </Show>

                                                    <Show above='xl'>
                                                        <Td >
                                                            {newsletter.id}
                                                        </Td>

                                                        <Td>{newsletter.titreFR}</Td>

                                                        <Td>{newsletter.datePublication}</Td>

                                                        <Td>{newsletter.dateModification}</Td>

                                                        <Td textAlign="center">{newsletter.articles.length}</Td>

                                                    {/*Action buttons*/}
                                                    <Td p={0} textAlign={{base:"center", xl : "center"}}>
                                                            <CrudActionMenu item={newsletter}
                                                                           linkname={'newsletter'}
                                                                           showArchiveButtonCondition
                                                                           handleDelete={()=>handleDelete(newsletter.id)} />

                                                    </Td>
                                                    </Show>

                                                </Tr>
                                            </Tbody>
                                        ))}

                                    </Table>
                    <Center >
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagination={pagination}
                        />
                    </Center>
                </div>

                {/* Floating buttons*/}
                <Box>
                    <Show below='lg'>
                        <MobileCircleButton
                            icon={<IoMdAdd/>}
                            onClick={()=> openModal(confirmationModal)}
                            bottomPx={"20px"}
                            rightPx={"20px"}
                            bgGradient={'linear(to-r, successButton.600, successButton.400)'}/>

                    </Show>
                </Box>
            </Container>

        </SidebarWithHeader>
    )}
