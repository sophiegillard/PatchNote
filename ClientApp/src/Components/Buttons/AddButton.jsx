import {Button, Stack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {IoMdAdd} from "react-icons/all.js";
import {t} from "i18next";

export const AddButton = ({isLink = true, redirectLink, onClick}) =>{
    return(
        <Stack direction='row'
               justifyContent='flex-end'
               alignItems={'center'}
        >
                {isLink && <Link to={redirectLink} >
                    <Button leftIcon={<IoMdAdd />}
                            bgGradient='linear(to-r, successButton.600, successButton.400)'
                            shadow={'lg'}
                            color={"white"}
                            variant='solid'
                            width="6rem"
                            m={4}

                            _hover={{
                                bgGradient: 'linear(to-r, successButton.300, successButton.600)',
                                boxShadow: 'xl',
                            }}>
                        {t('main.general.add')}
                    </Button>
            </Link>}

            {!isLink &&
                <Button
                    leftIcon={<IoMdAdd/>}
                    onClick={onClick}
                    bgGradient='linear(to-r, successButton.600, successButton.400)'
                    shadow={'lg'}
                    color={"white"}
                    variant='solid'
                    width="6rem"
                    m={4}

                    _hover={{
                        bgGradient: 'linear(to-r, successButton.300, successButton.600)',
                        boxShadow: 'xl',
                    }}
            >
                {t('main.general.add')}
            </Button>}

        </Stack>
    )
}