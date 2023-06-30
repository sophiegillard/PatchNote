import {Button, Center, Flex, Icon, IconButton} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export const PaginationControlButton = ({icon, onClick, disabled, label}) =>{
    return <>

        <IconButton  isDisabled={disabled}
                     onClick={onClick}
                     aria-label={label}
                     isRound
                     variant={"ghost"}
                     icon={icon} />

    </>
}