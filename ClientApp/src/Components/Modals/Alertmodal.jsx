import {
    Button,
    Center,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { t } from "i18next";
import warning from "../../assets/images/warning.png";

export const AlertModal = ({ isOpen, onOpen, onClose, imageSrc, imageAlt, title, message, handleSubmit }) => {
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />

                <ModalContent alignContent="center">
                    <ModalCloseButton />

                    <Flex flexDirection="column" alignItems="center" pt="10" pb="4">
                        <Image src={imageSrc ? imageSrc : warning} alt={imageAlt ? imageAlt : "warning icon"} boxSize="100px" />
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <Text>{message}</Text>
                        </ModalBody>

                        <ModalFooter gap="5" mt="6">
                            <Button variant="ghost" onClick={onClose}>
                                Annuler
                            </Button>
                            <Button colorScheme="red" mr={3} onClick={handleSubmit}>
                                {t("main.general.delete")}
                            </Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
};
