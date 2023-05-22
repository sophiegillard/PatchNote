import {Box, Center, Flex, Image, Stack, Text} from "@chakra-ui/react";
import {t} from "i18next";
import search from "@/assets/images/search.png";


export const NoResult = ({altImage, data, srcImage = search,
                             text= 'main.general.try_another_search',
                             title="main.general.no_result_found"}) =>{
   

    return(
         // Display no result page if no article is found
        data && data.length === 0 &&
        (<Flex alignItems="center" flexDirection="column" gap={3} height={"max"}>
            <Box boxSize='80px'>
                <Image src={srcImage} alt={altImage}/>
            </Box>
            <Center>
                <Stack spacing={3} align="center" textAlign={"center"}>
                    <Text fontSize='25px'
                    lineHeight={"41px"} letterSpacing={"-1px"}>{t(`${title}`)}</Text>
                    <Text fontSize='lg'>{t(`${text}`)}</Text>
                </Stack>
            </Center>
        </Flex>))
}