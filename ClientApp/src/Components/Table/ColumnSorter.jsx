import { IconButton } from "@chakra-ui/react";
import {FiChevronDown} from "react-icons/fi";
import {HiSelector} from "react-icons/all.js";

export const ColumnSorter = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }
    const sorted = column.getIsSorted();

    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? (
                <FiChevronDown size={18} />
            ) : (
                <HiSelector size={18} />
            )}
        </IconButton>
    );
};