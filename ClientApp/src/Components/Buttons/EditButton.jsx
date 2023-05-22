import {Button, Icon, Image, Stack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {IoMdAdd} from "react-icons/all.js";
import {t} from "i18next";
import editIconWhite from "../../assets/images/edit_white.png";

export const EditButton = ({isLink = true, redirectLink, onClick}) =>{
    return(
        <Stack direction='row'
               justifyContent='flex-end'
               alignItems={'center'}
               spacing={4} py={2} px={2}>
            {isLink && <Link to={redirectLink} >
                <Button color={"white"}
                        variant='solid'
                        bgGradient='linear(to-r, yellowGradient.start, yellowGradient.end)'
                        _hover={{
                            bgGradient: 'linear(to-r, yellowGradient.end, yellowGradient.start)',
                            boxShadow: 'xl',
                        }}
                >
                    {t('main.general.edit')}
                    <Image src={editIconWhite} height={"15px"} pl={3}/>
                </Button>
            </Link>}

            {!isLink && <Button leftIcon={<IoMdAdd/>}
                                colorScheme='successButton'
                                variant='solid'
                                onClick={onClick}
            >
                {t('main.general.add')}
            </Button>}

        </Stack>
    )
}