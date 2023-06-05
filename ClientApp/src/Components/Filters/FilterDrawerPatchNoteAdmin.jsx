import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    Show,
    Spacer,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiFilter, FiTrash2 } from "react-icons/all.js";
import { useQuery, useQueryClient } from "react-query";
import { DateFilter } from "./DateFilter.jsx";
import { useAllCategoriesQuery } from "@/services/queries/getAllCategories.js";
import { FilterDrawerSectionImproved } from "./FilterDrawerSectionImproved.jsx";
import { useAllModulesQuery } from "@/services/queries/getAllModules.js";
import { DividerWithText } from "../Other/DividerWithText.jsx";
import { MobileCircleButton } from "@/Components/Buttons/MobileCircleButton.jsx";
import { SortingDrawerSection } from "@/Components/Filters/SortingDrawerSection.jsx";
import { SetFilterButton } from "@/Components/Buttons/SetFilterButton.jsx";
import { sortList, publicationDates } from "@/Datas/filterDatas.js";
import { useTranslation } from "react-i18next";
import { useAuthUser } from "react-auth-kit";
import { PrimaryActionButton } from "@/Components/Buttons/PrimaryActionButton.jsx";

export const FilterDrawerPatchNoteAdmin = ({
    activeDatePublication,
    setActiveDatePublication,
    setStartDatePublication,
    setEndDatePublication,
    activeCategorieIdFilter,
    setActiveCategorieIdFilter,
    activeModuleIdFilter,
    setActiveModuleIdFilter,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    startDatePublication,
    endDatePublication,
    search,
    isMobileAndPatchNote,
}) => {
    const { t } = useTranslation();
    const [size, setSize] = useState("sm");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const queryClient = useQueryClient();

    const auth = useAuthUser();
    const userId = auth().utilisateurId;

    const { data: listAllCategories } = useAllCategoriesQuery();
    const { data: listModules } = useAllModulesQuery();

    const resetFilters = () => {
        setActiveDatePublication("");
        setActiveCategorieIdFilter("");
        setActiveModuleIdFilter("");
        setStartDatePublication("");
        setEndDatePublication("");
    };
    const handleClick = () => {
        onOpen();
    };

    return (
        <>
            {/*Creating different buttons for desktop and mobile to open the drawer*/}
            {/* desktop version */}
            <Show above="lg">
                <SetFilterButton onClick={() => handleClick()} />
            </Show>

            {/* mobile version */}
            <Show below="lg">
                <MobileCircleButton
                    icon={<FiFilter />}
                    onClick={() => handleClick()}
                    bottomPx={"20px"}
                    rightPx={"20px"}
                    bgGradient={"linear(to-r, secondaryPurple.600, secondaryPurple.400)"}
                />
            </Show>

            <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerHeader
                        bgColor="primaryBlue.5"
                        bgGradient="linear(to-r, gradientColorsTransparent.newFeatureStart, gradientColorsTransparent.newFeatureEnd)"
                        shadow="sm"
                    >
                        {t("main.general.filter")}
                    </DrawerHeader>

                    <DrawerBody>
                        {/* FOR MOBILE VERSION Allow user to sort by column as column headers are not displayed */}
                        {isMobileAndPatchNote && (
                            <Show below="xl">
                                <SortingDrawerSection
                                    sectionTitle={t("filters.filters_sort.title")}
                                    sectionList={sortList}
                                    activeFilter={activeCategorieIdFilter}
                                    setActiveFilter={setActiveCategorieIdFilter}
                                    sortColumn={sortColumn}
                                    setSortColumn={setSortColumn}
                                    sortDirection={sortDirection}
                                    setSortDirection={setSortDirection}
                                />
                                <Divider orientation="horizontal" borderColor={"primaryBlue"} />
                            </Show>
                        )}

                        <DateFilter
                            sectionTitle={t("filters.filters_date.title")}
                            sectionList={publicationDates}
                            activeDatePublication={activeDatePublication}
                            setActiveDatePublication={setActiveDatePublication}
                            setStartDatePublication={setStartDatePublication}
                            setEndDatePublication={setEndDatePublication}
                        >
                            <DividerWithText text={t("main.general.or")} />

                            <Flex direction="column">
                                <Stack>
                                    <Text>{t("filters.filters_date.list.from")}</Text>
                                    <Input
                                        placeholder={t("filters.filters_date.list.chose_date")}
                                        size="md"
                                        type="date"
                                        onChange={(event) => setStartDatePublication(event.target.value)}
                                    />
                                </Stack>

                                <Stack>
                                    <Text>{t("filters.filters_date.list.to")}</Text>
                                    <Input
                                        placeholder={t("filters.filters_date.list.chose_date")}
                                        size="md"
                                        type="date"
                                        onChange={(event) => setEndDatePublication(event.target.value)}
                                    />
                                </Stack>
                            </Flex>
                        </DateFilter>

                        <Divider orientation="horizontal" borderColor={"primaryBlue"} />

                        <FilterDrawerSectionImproved
                            sectionTitle={t("filters.filters_category.title")}
                            sectionList={listAllCategories}
                            activeFilter={activeCategorieIdFilter}
                            setActiveFilter={setActiveCategorieIdFilter}
                        />

                        <Divider orientation="horizontal" borderColor={"primaryBlue"} />

                        <FilterDrawerSectionImproved
                            sectionTitle={t("filters.filters_modules.title")}
                            sectionList={listModules}
                            activeFilter={activeModuleIdFilter}
                            setActiveFilter={setActiveModuleIdFilter}
                        />
                    </DrawerBody>
                    <DrawerFooter
                        bgColor="primaryBlue.5"
                        bgGradient="linear(to-r, gradientColorsTransparent.newFeatureStart, gradientColorsTransparent.newFeatureEnd)"
                        shadow="md"
                    >
                        <Flex grow={1}>
                            {/* Poubelle button */}
                            <Button
                                bgColor="white"
                                shadow="sm"
                                onClick={() => {
                                    resetFilters();
                                    setTimeout(() => {
                                        queryClient.fetchQuery([
                                            "articleLoadMore",
                                            activeCategorieIdFilter,
                                            activeModuleIdFilter,
                                            startDatePublication,
                                            endDatePublication,
                                            search,
                                            userId,
                                        ]);
                                    }, 100);
                                }}
                            >
                                <FiTrash2 fontSize="1.3em" />
                            </Button>

                            <Spacer />

                            {/* Search button */}
                            <PrimaryActionButton
                                text={t("main.general.search")}
                                onClick={() => {
                                    setTimeout(() => {
                                        queryClient.fetchQuery([
                                            "articleLoadMore",
                                            activeCategorieIdFilter,
                                            activeModuleIdFilter,
                                            startDatePublication,
                                            endDatePublication,
                                            search,
                                            userId,
                                        ]);
                                    }, 100);
                                    onClose();
                                }}
                            />
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
