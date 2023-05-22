import {Box, Button, Heading, HStack, Wrap} from "@chakra-ui/react";
import React from "react";
import {FilterOptionButton} from "../Buttons/FilterOptionButton.jsx";

export const FilterDrawerSectionImproved = ({sectionTitle, sectionList, children, activeFilter, setActiveFilter}) =>{
    return(
    <Box p={5} >

        <Heading fontSize='lg' letterSpacing="2px" textTransform="uppercase" fontWeight="normal">{sectionTitle}</Heading>

        <Wrap gap="1" pt="4" pb="4" >
        {sectionList.map((item) => (
            <FilterOptionButton key={`fitlerButton_${item.id}`}
                                buttonId={item.id}
                                buttonTitle={item.title}
                                isActive={item.id === activeFilter}
                                onClick={() => {
                              setActiveFilter(item.id === activeFilter ? "" : item.id);
                          }}
            />
        ))}
        </Wrap>

        {children}

    </Box>
    )}
