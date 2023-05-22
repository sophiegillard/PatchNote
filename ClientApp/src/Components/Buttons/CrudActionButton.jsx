import {Box, Image, Text, Tooltip, HStack, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import eyeIcon from "../../assets/images/eye.png";

export const CrudActionButton = ({isLink = true, link, srcIcon, ariaLabel, onClick, label, text}) =>{
    return<>
        <Tooltip label={label} placement='top' openDelay={200}>
            {isLink ? (

                    <Link to={link} >
                        <HStack onClick={onClick} width="200px">
                            <Box    aria-label={ariaLabel}

                                    mr={2} >

                                <Image src={srcIcon} alt="Icon"
                                       boxSize='30px'/>
                            </Box>
                            <Text>{text}</Text>
                        </HStack>
                    </Link>
                ) :
                (
                    <HStack>
                        <Box flex="1" aria-label={ariaLabel}
                             mr={2} onClick={onClick}>

                            <Image src={srcImage} alt="Icon"
                                   boxSize='30px'/>
                        </Box>
                    </HStack>
                )}
        </Tooltip>
    </>
}
