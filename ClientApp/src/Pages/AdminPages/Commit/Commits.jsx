import {SidebarWithHeader} from "@/Components/main/SidebarWithHeader.jsx";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useAllCommitsDetailsQuery} from "@/services/commits/getCommits.js";
import {PageHeader} from "@/Components/main/PageHeader.jsx";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    HStack, Icon,
    Input,
    Show,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Tr
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {SelectCommit} from "@/Pages/AdminPages/Commit/SelectCommit.jsx";
import {TableHeader} from "@/Components/Table/TableHeader.jsx";
import {tableHeadContentCommits} from "@/Datas/tableHeadContent.js";
import { useAllRepoAuthorsQuery} from "@/services/commits/getAuthor.js";
import {githubBranches} from "@/Datas/commitDatas.js";
import {FiTrash2, IoMdAdd, MdSettings} from "react-icons/all.js";
import {Pagination} from "@/Components/Pagination/Pagination.jsx";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {ScrollToTopButton} from "@/Components/Buttons/ScrollToTopButton.jsx";
import {DrawerStructure} from "@/Components/Drawer/DrawerStructure.jsx";
import Select from "react-select";



export const Commits = () => {
    const { t } = useTranslation();
    const [scrollBehavior] = useState('inside')
    const [isVisible, setIsVisible] = useState(false);


    const [branchSha, setBranchSha] = React.useState('18ff458cecec3573a5e99ae0a1440ea86bcba05c')
    const [page, setPage] = useState("1")
    const [since, setSince] = useState('')
    const [until, setUntil] = useState('')
    const [author, setAuthor] = useState('')


    const { data : authors, isLoading : isAuthorLoading } = useAllRepoAuthorsQuery()
    const { data : commits, isLoading : isCommitLoading, refetch} = useAllCommitsDetailsQuery(branchSha, page, since, until, author);
    const totalPageNumber = commits && commits[0]

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);


    if (isAuthorLoading) {
        return (
            <div className="loading-spinner">
                <Spinner size="xl" />
            </div>
        );
    }


    function resetFilters() {
        setBranchSha('18ff458cecec3573a5e99ae0a1440ea86bcba05c')
        setSince('')
        setUntil('')
        setAuthor('')
    }

    return (
        <SidebarWithHeader>
            <Container minW="100%" p="0" bgColor={"commitColors.purpleBg"}>

                {/*  Heading title and action buttons*/}
                <PageHeader title={t('pages.commit.commit_title')}
                            bgColor={'linear(to-r, commitColors.purpleLight, commitColors.purpleDark)'} >
                    <Flex justifyContent={"end"} alignItems={"center"} gap={2} >
                        <Show above={"lg"}>
                            <SelectCommit
                                options={githubBranches}
                                placeholder={t('pages.commit.commit_branch')}
                                width={"15vw"}
                                defaultValue={{ value: "master", label: "Master" }}
                                onChange={(selectedOption)=> {
                                    setBranchSha(selectedOption.value)
                                    setTimeout(() => {
                                        refetch();
                                    }, 100);
                                }}
                            />
                            <SelectCommit
                                options={[ { value: "", label: "Tout" }  ,...authors.map(author => ({ value: author.authorLogin, label: author.authorName }))]}
                                placeholder={t('pages.commit.commit_author')}
                                width={"15vw"}
                                onChange={(selectedOption)=> {
                                    setAuthor(selectedOption.value)
                                    setTimeout(() => {
                                        refetch();
                                    }, 100);
                                }}
                            />
                            <Input type="date"
                                   width={"27%"}
                                   onChange={(event)=> {
                                       setSince(`${event.target.value}T00:00:00Z`)
                                       setTimeout(() => {
                                           refetch();
                                       },100);
                                   }}/>

                            <Input type="date"
                                   width={"27%"}
                                   onChange={(event)=> {
                                       setUntil(`${event.target.value}T00:00:00Z`)
                                       setTimeout(() => {
                                           refetch();
                                       },100);
                                   }}/>
                        </Show>

                        {/*  Reset filters button*/}
                        {(author !== '' || until !== '' || since !== '') &&
                        <Button bgColor="commitColors.purpleDarkTransparent"
                                shadow="sm"
                                _hover={{bgColor: "commitColors.purpleDarkTransparentHover"}}
                                onClick={()=> {
                                resetFilters()
                                setTimeout(() => {
                                    refetch();
                                },100);
                        }}>
                            <FiTrash2 color={"white"} fontSize="1.3em"/>
                        </Button>
                        }

                    </Flex>

                </PageHeader>

                <Table >
                    <Show above={"xl"}>
                        <TableHeader textColor={"commitColors.purpleLight"}
                            headerTitles={tableHeadContentCommits}
                        />
                    </Show>
                    <Tbody px={3}>

                    {commits && commits.map((commit) => (
                            <Tr key={commit.commitNumber}
                                my={3}
                                minW={{base: "100%", lg: "100%"}}
                                maxW={{base: "55%", md: "none"}}
                                bgColor={{base: "white", md: "white"}}
                                _hover={{fontWeight : "600"}} >


                                <Show below='xl'>
                                    <Link to={commit.url}>
                                        <Flex pt={4} flexDirection={"row"} alignItems={"center"} ml={4} >
                                            <Icon as={TriangleDownIcon}
                                                  transform={"rotate(90deg)"}
                                                  mr={-1}
                                                  color={"commitColors.purpleLightCardTransparent"}/>
                                            <Td
                                                bgGradient={"linear(to-r, commitColors.purpleLightCard, commitColors.purpleDarkCard)"}
                                                p={3}  mr={3} flexGrow={1}
                                                fontWeight="bold"
                                                color={"white"}
                                                borderRadius={{base:"xl", lg:"xl"}}>
                                                <HStack justifyContent="space-between">
                                                    <Flex flexDirection="column" gap="2">
                                                        <Text textTransform="uppercase" letterSpacing="0.1rem" fontWeight="600">
                                                            {commit.author}
                                                                <span style={{color : "#2A037AB2", fontWeight : "700"}}> | </span>
                                                            {commit.commitNumber}
                                                                <span style={{color : "#2A037AB2", fontWeight : "700"}}> | </span>
                                                            {commit.date}
                                                        </Text>
                                                        <Text fontWeight="light" as='i'>
                                                            {commit.message}
                                                        </Text>
                                                    </Flex>
                                                </HStack>
                                            </Td>
                                        </Flex>
                                    </Link>
                                </Show>

                                <Show above='xl'>
                                    <Td>
                                        {commit.author}
                                    </Td>

                                    <Td color={"commitColors.purpleLight"} fontWeight={"600"} >
                                        <Link to={commit.url} target="_blank">
                                            {commit.commitNumber}
                                        </Link>
                                    </Td>

                                    <Td>{commit.message}</Td>

                                    <Td>{commit.date}</Td>
                                </Show>

                            </Tr>
                    ))}
                    </Tbody>
                </Table>

                <Center>
                    <Pagination currentPage={page}
                                pagination={totalPageNumber}
                                setCurrentPage={setPage}
                                refetch={refetch}
                    />
                </Center>

                <Box>
                    {isVisible && (
                        <ScrollToTopButton isVisible={isVisible} scrollBehavior={scrollBehavior} />
                    )}
                    <DrawerStructure>
                        <Select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                })
                            }}
                            options={githubBranches}
                            placeholder={t('pages.commit.commit_branch')}
                            onChange={(selectedOption)=> {
                                setBranchSha(selectedOption.value)
                                setTimeout(() => {
                                    refetch();
                                }, 100);
                            }}
                            defaultValue={{ value: "master", label: "Master" }}
                        />


                        <Select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                })
                            }}
                            options={[ { value: "", label: "Tout" }  ,...authors.map(author => ({ value: author.authorLogin, label: author.authorName }))]}
                            placeholder={t('pages.commit.commit_author')}
                            onChange={(selectedOption)=> {
                                setAuthor(selectedOption.value)
                                setTimeout(() => {
                                    refetch();
                                }, 100);
                            }}
                        />

                        <Text>{t('filters.filters_date.list.from')}</Text>
                        <Input type="date"
                               onChange={(event)=> {
                                   setSince(`${event.target.value}T00:00:00Z`)
                                   setTimeout(() => {
                                       refetch();
                                   },100);
                               }}/>

                        <Text>{t('filters.filters_date.list.to')}</Text>
                        <Input type="date"
                               onChange={(event)=> {
                                   setUntil(`${event.target.value}T00:00:00Z`)
                                   setTimeout(() => {
                                       refetch();
                                   },100);
                               }}/>
                    </DrawerStructure>
                </Box>
            </Container>
        </SidebarWithHeader>
    )}

