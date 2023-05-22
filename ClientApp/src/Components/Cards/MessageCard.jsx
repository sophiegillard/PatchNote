import {Badge, Flex, Stack, Text, Icon} from "@chakra-ui/react";
import React from "react";
import {openModal} from "../../Utils/basicFormFunctions.js";
import {BadgeCategoryMessage} from "../../Pages/AdminPages/Mailbox/BadgeCategoryMessage.jsx";
import {darkenColor, getContrastRatio, MIN_CONTRAST} from "../../Utils/colorContrastHandling.js";

export const MessageCard = ({onClick, activeEmailId, message
                                }) =>{

    const contrast = getContrastRatio(message.statutMessageRecommandationColor);

    return(<>
        <Flex
            key={message.id}
            onClick={onClick}
            justifyContent="space-between"
            cursor="pointer"
            p={4}
            shadow="sm"
            borderLeft = {activeEmailId === message.id ? "4px solid" : "none"}
            borderColor={message.statutMessageRecommandationColor}
            fontWeight={message.isLu === 1? "normal": "bold"}
            _hover={{ shadow:"lg" }}>
            <Flex gap="4" alignItems="start" mb={4}>
                {!message.isLu && (<Icon viewBox='0 0 200 200' color='black' mt="1.5" boxSize={3}>
                    <path
                        fill='currentColor'
                        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                    />
                </Icon>)}
                <Stack pl={message.isLu === 1? "7": "0"}>
                    <Text fontSize="15px"  fontWeight={message.isLu === 1? "600": "bold"}>{message.ecole}</Text>
                    <Text fontSize="14px">{message.sujet}</Text>

                </Stack>
            </Flex>

            <Flex flexDirection="column" gap={2} alignItems="flex-end">
                    <Text fontSize="small">{message.dateCreation}</Text>
                <BadgeCategoryMessage
                    id={message.statutMessageRecommandationId}
                    color={message.statutMessageRecommandationColor}
                    text={message.statutMessageRecommandation}
                />
            </Flex>
        </Flex>

        </>)
}