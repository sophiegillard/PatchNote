import {IconButton, Link} from "@chakra-ui/react";
import React from "react";

export const MobileCircleButton = ({icon, redirectLink, bottomPx, rightPx, onClick, bgGradient}) =>{
    return(
        <Link href={redirectLink}>
            <IconButton
                onClick={onClick}
                aria-label={"Add Article"}
                borderRadius={"full"}
                position='fixed'
                bottom={bottomPx}
                right={rightPx}
                icon={icon}
                bgGradient={bgGradient}
                shadow={'lg'}
                color={"white"}
                variant='solid'
                zIndex={3}
                size='lg'
                fontSize='25px'
                _hover={{
                    boxShadow: 'xl',
                    fontSize:'29px',
                }} >
            </IconButton>
        </Link>
    )
}