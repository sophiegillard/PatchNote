import { Badge, Flex, HStack, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BadgeCategoryMessage } from "./BadgeCategoryMessage.jsx";
import { OptionWithColorModal } from "../../../Components/Modals/OptionWithColorModal.jsx";
import { t } from "i18next";
import { openModal } from "../../../Utils/basicFormFunctions.js";
import { darkenColor, getContrastRatio, MIN_CONTRAST } from "../../../Utils/colorContrastHandling.js";

export const MailContent = ({
    id,
    auteur,
    dateCreation,
    sujet,
    statutMessageRecommandation,
    statutMessageRecommandationId,
    statutMessageRecommandationColor,
    message,
    refetechMessages,
}) => {
    const categoryModal = useDisclosure();

    //get badge and border color darker to have a better contrast
    const color = statutMessageRecommandationColor;
    const contrast = getContrastRatio(color);
    const badgeColor = contrast < MIN_CONTRAST ? darkenColor(color, 0.9) : color;

    return (
        <>
            <OptionWithColorModal
                isOpen={categoryModal.isOpen}
                onClose={categoryModal.onClose}
                onOpen={categoryModal.onOpen}
                id={id}
                modale={categoryModal}
                message={t("modales.sendingMessage.alert.message")}
                statutMessageRecommandationId={statutMessageRecommandationId}
                refetechMessages={refetechMessages}
            />

            <Flex key={id} width="100%" flexDirection="column" alignItems="center">
                <VStack borderBottom="solid 2px" borderColor={color} height="fit-content" width="90%" py={4} pb={4}>
                    <HStack justifyContent="space-between" width="100%" py={3}>
                        <Flex flexDirection="column" gap={1}>
                            <Text fontWeight="bold">
                                {t("pages.mailbox.from")} : {auteur}
                            </Text>
                            <Text>{sujet}</Text>
                        </Flex>

                        <Flex justifyContent="flex-end" flexDirection="column" alignItems="flex-end" gap={1}>
                            <Text fontSize="14px">{dateCreation}</Text>
                            <BadgeCategoryMessage
                                id={statutMessageRecommandationId}
                                color={statutMessageRecommandationColor}
                                text={statutMessageRecommandation}
                                onClick={() => openModal(categoryModal)}
                            />
                        </Flex>
                    </HStack>
                </VStack>

                <Stack mx={2} py={5} width="90%" overscrollY={"true"} overflow="scroll">
                    <Text textAlign="left">{message}</Text>
                </Stack>
            </Flex>
        </>
    );
};
