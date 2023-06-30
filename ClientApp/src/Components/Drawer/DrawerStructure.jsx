import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Flex,
    Show, Spacer,
    useDisclosure
} from "@chakra-ui/react";
import {MobileCircleButton} from "@/Components/Buttons/MobileCircleButton.jsx";
import {FiFilter, FiTrash2} from "react-icons/all.js";
import {useTranslation} from "react-i18next";

export const DrawerStructure = ({children}) =>{
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const openDrawer = () =>{onOpen()}
    return<>
        {/*Mobile button shown only on mobile version*/}
        <Show below="lg">
            <MobileCircleButton icon={<FiFilter/>}
                                onClick={()=>openDrawer()}
                                bottomPx={"80px"}
                                rightPx={"25px"}
                                bgGradient={'linear(to-r, secondaryPurple.600, secondaryPurple.400)'}/>
        </Show>

        <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
            <DrawerOverlay />

            <DrawerContent>
                <DrawerCloseButton />

                <DrawerHeader
                    bgColor="primaryBlue.5"
                    bgGradient='linear(to-r, gradientColorsTransparent.newFeatureStart, gradientColorsTransparent.newFeatureEnd)'
                    shadow="sm">{t('main.general.filter')}</DrawerHeader>
                <DrawerBody>
                    <Flex flexDir={"column"} gap={4}>
                        {children}
                    </Flex>
                </DrawerBody>
                <DrawerFooter   bgColor="primaryBlue.5"
                                bgGradient='linear(to-r, gradientColorsTransparent.newFeatureStart, gradientColorsTransparent.newFeatureEnd)'
                                shadow="md">
                    <Flex grow={1}>
                        <Button bgColor="white" shadow="sm">
                            <FiTrash2 fontSize="1.3em"/>
                        </Button>

                        <Spacer />

                        <Button width='80%'
                                colorScheme='primaryBlue'
                                shadow="sm"
                               >
                            {t('main.general.search')}
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    </>
}