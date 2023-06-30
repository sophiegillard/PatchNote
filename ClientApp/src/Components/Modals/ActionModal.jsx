import {
    Button, Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalOverlay, Text
} from "@chakra-ui/react";
import {t} from "i18next";



export const ActionModal = ({ isOpen, onClose, message, onConfirm }) => {

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>

                <ModalOverlay />

                <ModalContent alignContent="center">
                    <ModalCloseButton />

                    <Flex flexDirection="column" alignItems="center" pt="10" pb="4">
                        <ModalBody>
                            <Text>
                                {message}
                            </Text>
                        </ModalBody>

                        <ModalFooter gap="5" mt="6">

                            <Button variant='ghost' onClick={onClose}>{t('main.general.cancel')}</Button>

                            <Button colorScheme='successButton' mr={3} onClick={onConfirm}>
                                {t('main.general.confirm')}
                            </Button>
                        </ModalFooter>

                    </Flex>

                </ModalContent>

            </Modal>
        </>
    )
}