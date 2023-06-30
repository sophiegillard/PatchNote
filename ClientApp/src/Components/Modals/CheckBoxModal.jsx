import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Text, VStack
} from "@chakra-ui/react";
import {t} from "i18next";
import React from "react";
import {MyAccordion} from "@/Components/Accordion/MyAccordion";


export const CheckBoxModal = ({ isOpen, onClose, label = "titreFR" , listItems, refetch, key }) => {


    return (
        <>
            <Modal key={key}
                   onClose={onClose} isOpen={isOpen}
                   isCentered
                   scrollBehavior="inside">

                <ModalOverlay />

                    <ModalContent alignContent="center"
                                  w="100%"
                                  spacing={2}
                                  bg="primaryBlue.5">

                        <ModalHeader>
                            <VStack >
                                <ModalCloseButton />
                                <Text pt={3}
                                      lineHeight="150%"
                                      w="100%"
                                      ml={6}>{t('pages.newsletter.newsletter_articles_select')}</Text>
                            </VStack>
                        </ModalHeader>

                        <ModalBody>
                                {listItems.map((item) => {
                                    return (
                                        <MyAccordion
                                            label={item.label}
                                            keyId={item.id}
                                            listItems={item.listArticles}
                                            refetch={refetch}/>
                                    )
                                })}
                        </ModalBody>


                        <ModalFooter gap="5" mt="6">

                        </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}