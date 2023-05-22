import {
    Button, Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalOverlay, Text
} from "@chakra-ui/react";
import {t} from "i18next";

export const MyModalBody = ({ isOpen, onClose, message, onClickButton1, onClickButton2 ,button1Text, button2Text }) =>{
    return <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>

            <ModalOverlay />

            <ModalContent alignContent="center">
                <ModalCloseButton />

                <Flex flexDirection="column" alignItems="center" pt="10" pb="4">
                    <ModalBody>
                        <Text textAlign={"center"}>
                            {message}
                        </Text>
                    </ModalBody>

                    <ModalFooter gap="5" mt="6">

                        <Flex flexDirection={{base:"column-reverse", md:"row"}}>
                            <Button variant='ghost' onClick={onClickButton1}>{button1Text}</Button>

                            <Button colorScheme='successButton' type="submit" mr={3} onClick={onClickButton2}>
                                {button2Text}
                            </Button>
                        </Flex>

                    </ModalFooter>

                </Flex>

            </ModalContent>

        </Modal>
    </>
}