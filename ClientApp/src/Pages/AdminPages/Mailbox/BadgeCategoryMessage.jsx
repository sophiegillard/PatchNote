import { Badge } from "@chakra-ui/react";
import React from "react";
import {darkenColor, getContrastRatio, MIN_CONTRAST} from "../../../Utils/colorContrastHandling.js";

export const BadgeCategoryMessage = ({ id, color, text, onClick }) => {
    const contrast = getContrastRatio(color);
    const tooDark = contrast < 0.45;
    return (
        <Badge
            key={id}
            onClick={onClick}
            borderRadius="full"
            fontSize="0.8em"
            bgColor={color}
            color={tooDark ? "white" : "black"}
            fontWeight="bold"
            px={3}
            cursor="pointer"
            maxW="fit-content"
        >
            {text}
        </Badge>
    );
};
