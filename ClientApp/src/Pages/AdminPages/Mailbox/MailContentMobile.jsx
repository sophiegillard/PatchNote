import {
    Badge,
    Flex,
    HStack,
    Stack,
    Text,
    VStack,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent, DrawerCloseButton
} from "@chakra-ui/react";
import React from "react";
import {BadgeCategoryMessage} from "./BadgeCategoryMessage.jsx";
import {OptionWithColorModal} from "../../../Components/Modals/OptionWithColorModal.jsx";
import {t} from "i18next";
import {openModal} from "../../../Utils/basicFormFunctions.js";
import {darkenColor, getContrastRatio, MIN_CONTRAST} from "../../../Utils/colorContrastHandling.js";

export const MailContentMobile = ({id, ecole, auteur, dateCreation, sujet,
                                statutMessageRecommandation, statutMessageRecommandationId,
                                statutMessageRecommandationColor, message, isOpen, onClose}) =>{
    const categoryModal = useDisclosure();
    const contrast = getContrastRatio(statutMessageRecommandationColor);
    const borderColor = contrast < MIN_CONTRAST ? darkenColor(statutMessageRecommandationColor, 0.8) : statutMessageRecommandationColor;

    return <>
        <OptionWithColorModal  isOpen={categoryModal.isOpen}
                               onClose={categoryModal.onClose}
                               onOpen={categoryModal.onOpen}
                               id={id}
                               modale={categoryModal}
                               message={t('modales.sendingMessage.alert.message')}
                               statutMessageRecommandationId={statutMessageRecommandationId}/>

        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size="full"
        >
            <DrawerOverlay />
            <DrawerContent  bgColor="#f3f3f5">
                <DrawerCloseButton />

                <Flex key={id} width="100%" flexDirection="column" alignItems="center" pt={10}>



                    <VStack borderBottom="solid 2px"
                            borderColor={borderColor}
                            height="fit-content"
                            alignItems="flex-start"
                            width="90%"
                            py={4} pb={4} >

                        <Flex justifyContent="space-between"
                              flexDirection="row"
                              alignItems="flex-end"
                              gap={1}
                              width="100%"
                              pb={3}>
                            <BadgeCategoryMessage
                                id={statutMessageRecommandationId}
                                color={statutMessageRecommandationColor}
                                text={statutMessageRecommandation}
                                onClick={()=>openModal(categoryModal)}
                            />
                            <Text fontSize="15px">{dateCreation}</Text>
                        </Flex>


                            <Flex flexDirection="column">
                                <Text fontSize="smaller">{t('pages.mailbox.from')} : </Text>
                                <Text fontWeight="bold" pb={3}>{ecole} | {auteur}</Text>

                                <Text fontSize="smaller">{t('pages.mailbox.subject')} : </Text>
                                <Text fontWeight="bold" >{sujet}</Text>
                            </Flex>








                    </VStack>

                    <Stack mx={2} py={5} width="90%">
                        <Text textAlign="left">{message}</Text>
                    </Stack>

        </Flex>

            </DrawerContent>
        </Drawer>

    </>
}