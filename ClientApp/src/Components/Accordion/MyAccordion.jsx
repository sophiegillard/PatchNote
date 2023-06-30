import { Accordion, AccordionButton, AccordionIcon, AccordionItem, Box } from "@chakra-ui/react";
import {AccordionPanelArticle} from "@/Components/Accordion/AccordionPanelArticle.jsx";
import React from "react";

export const MyAccordion = ({keyId, label, listItems, matchingIds, refetch}) => {
    return (
        <Accordion key={keyId} allowMultiple allowToggle >
            <AccordionItem bgColor="white">
                <h2 >
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            {label}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanelArticle listArticles={listItems} matchingIds={matchingIds} refetch={refetch} />
            </AccordionItem>
        </Accordion>
    )
};
