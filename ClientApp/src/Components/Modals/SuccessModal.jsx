import {
    Button, Center, Flex, Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";


export const SuccessModal = ({ isOpen, onOpen, onClose, imageSrc, imageAlt, title, message }) => {

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>

                <ModalOverlay />

                <ModalContent alignContent="center">
                    <ModalCloseButton />

                    <Flex flexDirection="column" alignItems="center" pt="10" pb="10">
                    <Image src={imageSrc} alt={imageAlt}
                           boxSize='100px'/>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <Text>
                            {message}
                        </Text>
                    </ModalBody>

                    </Flex>

                </ModalContent>

            </Modal>
        </>
    )
}