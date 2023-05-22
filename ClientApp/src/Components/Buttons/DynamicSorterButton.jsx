import {Button} from "@chakra-ui/react";
import {BiChevronDown, HiSelector} from "react-icons/all.js";

export const DynamicSorterButton = ({sortDirection, sortColumn, column}) =>{


    return (
        <Button
            p={0} 
            size="xs"
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sortDirection === "true" ? "180" : "0"}deg)`,
            }}
            variant={sortDirection ? "light" : "transparent"}
            color={sortDirection ? "primary" : "gray"}
        >
            {sortColumn === column ? (
                <BiChevronDown size={18} />
            ) : (
                <HiSelector size={18} />
            )}
        </Button>
    );
}