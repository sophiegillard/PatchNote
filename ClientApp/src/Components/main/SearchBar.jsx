import React from "react";
import {Input, Flex, InputLeftElement, InputGroup} from "@chakra-ui/react";
import {t} from "i18next";
import {BiSearch} from "react-icons/all.js";


export const SearchBar = ({onChange, bgColor, onEnter}) => {



    return (<>
            <Flex flexDirection="row" alignItems="center" flexGrow={1}>

                <InputGroup variant='filled'>

                    <InputLeftElement
                        pointerEvents='none'
                        children={<BiSearch color='gray.300' />}
                    />

                    <Input type="search"
                           placeholder={t('main.general.search_placeholder')}
                           onChange={onChange}
                           onKeyDown={onEnter}
                           border={"2px"} borderColor={"gray.300"}
                           _placeholder={{ opacity: 1, color: 'gray.500' }}
                           borderRadius="full"
                           bgColor={bgColor}/>

                </InputGroup>

            </Flex>
        </>
    );
};
