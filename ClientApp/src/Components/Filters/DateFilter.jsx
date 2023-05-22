import {Box, Heading, Wrap} from "@chakra-ui/react";
import React from "react";
import {t} from "i18next";
import {FilterOptionButton} from "../Buttons/FilterOptionButton.jsx";

export const DateFilter = ({ 
                            sectionTitle, sectionList, 
                            children, activeDatePublication, 
                            setActiveDatePublication, setStartDatePublication, 
                            setEndDatePublication}) =>{
    return(

        <Box p={5}>

            <Heading fontSize='lg' letterSpacing="2px" textTransform="uppercase" fontWeight="normal">{sectionTitle}</Heading>

            <Wrap gap="1" pt="4" pb="4">
            {sectionList.map((item) => (
                <FilterOptionButton key={item.id}
                                    buttonId={item.id}
                                    buttonTitle={t(item.name)}
                                    isActive={item.name === activeDatePublication}
                                    onClick={() => {
                                  setActiveDatePublication(item.name);
                                  if (item.name === 'filters.filters_date.list.today') {
                                      const today= new Date().toISOString().slice(0, 10)
                                      setStartDatePublication(today);
                                      setEndDatePublication(today);
                                  } else if(item.name === 'filters.filters_date.list.yesterday'){
                                      const today = (new Date());
                                      today.setDate(today.getDate() - 1);
                                      const yesterday = today.toISOString().slice(0, 10);
                                      setStartDatePublication(yesterday);
                                      setEndDatePublication(yesterday);
                                  } else if(item.name === 'filters.filters_date.list.last_week'){
                                      const firstDayLastWeek = new Date();
                                      firstDayLastWeek.setDate(firstDayLastWeek.getDate() - 7);
                                      setStartDatePublication(firstDayLastWeek.toISOString().slice(0, 10));
                                      setEndDatePublication(new Date().toISOString().slice(0, 10));
                                  }
                              }}

                />
            ))}
            </Wrap>

            {children}

        </Box>
    )}
