import {Badge, Stack, Text} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";

export const TitleAndContent = ({title, content, badge}) =>{
    return (
    <Stack pr={8}>
        <Text
              textStyle='h6'
              pt={{base:"3", lg:"4"}}
              textTransform={"capitalize"}
              size="sm"
              color={"gray.500"}
            >{title}</Text>

        <Text dangerouslySetInnerHTML={{__html: content}}/>
        <Badge borderRadius="full"
               textTransform="small-caps"
               fontSize='1em'
               maxW="fit-content"
               colorScheme='tercaryPink'>{badge}</Badge>

    </Stack>
  )
}