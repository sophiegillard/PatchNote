import {Box, Button, Heading, HStack, Wrap} from "@chakra-ui/react";
import React from "react";
import {FilterOptionButton} from "../Buttons/FilterOptionButton.jsx";
import {t} from "i18next";
import Select from "react-select";


export const SortingDrawerSection = ({sectionTitle,
                                        sectionList,
                                        sortColumn,
                                        setSortColumn,
                                        sortDirection,
                                        setSortDirection}) =>{

    const sortDirections = [
        { label: t(`main.sorting.ascendingOrder`), value: "true" },
        { label: t(`main.sorting.descendingOrder`), value: "false" },
    ];

    console.log("SortDireciton in sorting file " + sortDirection);
    return(
    <Box p={5} >

        <Heading fontSize='lg' letterSpacing="2px" textTransform="uppercase" fontWeight="normal">
            {sectionTitle}
        </Heading>


        <Select options={sortDirections}
                placeholder={t(`main.sorting.sortOrder`)}
                onChange={selected => {
                    console.log(selected.value)
                    setSortDirection(selected.value)
                }}
        />

        <Wrap gap="1" pt="4" pb="4" >

            {sectionList.map((item) => (
                <FilterOptionButton key={item.id}
                                    buttonId={item.id}
                                    buttonTitle={t(`${item.title}`)}
                                    isActive={item.id === sortColumn}
                                    onClick={() => {
                                  setSortColumn(item.id);
                              }}
                />
            ))}
        </Wrap>

    </Box>
    )}
