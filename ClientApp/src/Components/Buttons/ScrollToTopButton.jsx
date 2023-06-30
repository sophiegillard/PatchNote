import { Box, Button, Center, Circle, Icon, Show } from "@chakra-ui/react";
import { BsArrowUpCircle, MdKeyboardArrowUp } from "react-icons/all.js";
import React from "react";

export const ScrollToTopButton = ({ isVisible, scrollBehavior }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Circle
            onClick={scrollToTop}
            position="fixed"
            bottom={{ base: "80px", lg: "25px" }}
            right={{ base: "20px", lg: "45px" }}
            zIndex={3}
            bgColor="gray.300"
            cursor="pointer"
        >
            <Center>
                <Icon as={MdKeyboardArrowUp} boxSize={12} />
            </Center>
        </Circle>
    );
};
