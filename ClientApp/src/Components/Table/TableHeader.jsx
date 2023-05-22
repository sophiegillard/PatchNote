import {Th, Thead, Tr} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";
import {handleSort} from "@/services/sorting.js";
import {DynamicSorterButton} from "../Buttons/DynamicSorterButton.jsx";

export const TableHeader = ({sortColumn, setSortColumn, sortDirection, setSortDirection, headerTitles, textColor = "primaryBlue.400"}) =>{

    const ThStyled = ({ children, columnName }) => (
        <Th color={textColor} pt="1.2rem" pr="0"
            onClick={() => handleSort(sortColumn, setSortColumn, sortDirection, setSortDirection, columnName)}
        >
            {children}
        </Th>
    );

    return(
        <Thead>
            <Tr>
                {headerTitles.map((item)=>

                    <ThStyled key={item.id} columnName={item.value}>

                        {t(`${item.name}`)}

                        {item.isSortable === true ?
                            (<DynamicSorterButton sortDirection={sortDirection}
                                                  column={item.value}
                                                  sortColumn={sortColumn}/>)
                            : ""
                        }

                    </ThStyled>
                )}
            </Tr>
        </Thead>
    )
}