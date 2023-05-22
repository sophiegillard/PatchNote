import {Box, Button, Heading, HStack, Wrap} from "@chakra-ui/react";
import React from "react";
import {t} from "i18next";
import {FilterOptionButton} from "../Buttons/FilterOptionButton.jsx";

export const FilterDrawerSection = ({sectionTitle, sectionList, children, activeFilter, setActiveFilter}) =>{
    return(
    <Box p={5} >

        <Heading fontSize='xl'>{sectionTitle}</Heading>

        <Wrap gap="1" pt="4" pb="4" >
        {sectionList.map((item) => (
            <FilterOptionButton key={item.id}
                                buttonId={item.id}
                                buttonTitle={t(item.name)}
                                isActive={item.name === activeFilter}
                                onClick={() => {setActiveFilter(item.name === activeFilter ? "" : item.name)}}
            />
        ))}
        </Wrap>

        {children}

    </Box>
    )}
