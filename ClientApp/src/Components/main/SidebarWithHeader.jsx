import React from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Image, useMediaQuery, Heading, Center, MenuGroup, Button
} from '@chakra-ui/react';
import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi';
import logo from '../../assets/images/logo_small_light_blue.png';
import smallLogo from '../../assets/images/logo_small_light_blue.png';
import paperPlane from '../../assets/images/paper-plane.png';
import {useAuthUser, useSignOut} from "react-auth-kit";
import {
    FaRegUserCircle,
} from "react-icons/all.js";
import {NavLink, useNavigate} from "react-router-dom";
import {t} from "i18next";
import {LanguageMenu} from "@/Components/Menu/LanguageMenu.jsx";
import {useTranslation} from "react-i18next";
import {LinkItemsAdmin, LinkItemsUser} from "@/Datas/linkDatas.js";



export const SidebarWithHeader = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p={{ base: 0, lg: 4 }}>
                {children}
            </Box>
        </Box>
    );
}



const SidebarContent = ({ onClose, ...rest }) => {
    const { t } = useTranslation();
    const auth = useAuthUser();

    return (
        <Flex
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>

            <Flex alignItems="center"  justifyContent="space-between" width={{base: 'full', md: "fit-content" }}
                  px={6} py={1.5}  mx={10} pb={10}>
                <Box >
                    <Image src={logo} alt='logo' height={"60px"}/>
                </Box>
                <CloseButton display={{ base: 'flex', md: 'none'}} onClick={onClose} />
            </Flex>

            <Flex flexDirection={"column"} flexGrow={2} width={{base: 'full', md: "full" }}>
                {auth().typeUtilisateur <= 8 && auth().typeUtilisateur >= 6 && (
                    LinkItemsUser.map((link) => (
                            <NavItem key={link.name} icon={link.icon} link={link.link}>
                                {t(link.name)}
                            </NavItem>
                        ))
                )}
                {auth().typeUtilisateur === 9 && (
                    LinkItemsAdmin.map((link) => (
                            <NavItem key={link.name} icon={link.icon} link={link.link}>
                                {t(link.name)}
                            </NavItem>
                        ))
                )}
            </Flex>

            {auth().isSubscribed === 0 && auth().typeUtilisateur !== 9 &&

            <Flex alignSelf={"center"} p={3} gap={4} mx="4" maxWidth={{base:'80%', md:"207px"}}
                  borderRadius={"lg"} position={"absolute"} bottom={5}
                  flexDirection={"column"}
                  width={{base: 'full', md: "fit-content" }}
                  bgGradient='linear(to-r, #3d84c0, #351052)'>

                    <Image src={paperPlane} position={"absolute"} zIndex={0} opacity={"20%"} height={"160px"} right={90} />

                    <Link href={`https://localhost:7079/user/unsubscribeNewsletter/${auth().utilisateurId}`}>
                        <Text textTransform={"uppercase"}
                              color={"white"}
                              fontWeight={"bold"}
                              textAlign={"center"}

                        >{t('main.general.receive_newsletter')}</Text>
                    </Link>

                <Button bgColor={"gray.50"} width={"100%"} shadow={"lg"}>{t('main.general.subscribe')}</Button>

            </Flex>}
        </Flex>
    );
};

const NavItem = ({ icon, children, link, ...rest }) => {
    return (
        <NavLink
                to={link}
                style={({ isActive, isPending }) => {
                    return {
                        fontWeight: isActive? "600" : "",
                        padding : "20px",
                        marginInline : "20px",
                        color:isActive? "white" : "",
                        borderRadius : "20px",
                        background: isActive? "linear-gradient(90deg, rgba(51,106,158,1) 0%, rgba(83,144,203,1) 100%)" : "",
                        // Add styles for hover effect
                        transition: "all 0.2s ease-in-out",
                        ":hover": {
                            background:"linear-gradient(90deg, rgba(83,144,203,1) 0%, rgba(51,106,158,1) 100%)",
                            color: "white",
                        },
                    };
                }}>
            <Flex
                align="center"
                role="group"
                cursor="pointer"
                _hover={{fontWeight: "semibold"}}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const [isLargerThan60em] = useMediaQuery('(min-width: 48em)')

    const logout = () =>{
        signOut();
        navigate("/login");
    }
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bgGradient={useColorModeValue('linear(to-b, primaryBlue.5, whiteApSchool)', 'linear(to-r, primaryBlue.600, primaryBlue.300)')}

            /*bg={useColorModeValue('white', 'gray.900')}*/

            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            {auth().typeUtilisateur > 6 && <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />}

            {!isLargerThan60em && <Box boxSize='s'>
                <Image src={smallLogo} alt='logo' height={"50px"}/>
            </Box>}

            <HStack spacing={{ base: '0', md: '6' }} justifyContent="space-between" width={{ base: '', md: '100%' }}>

                {isLargerThan60em &&
                    <Flex alignItems={"baseline"} gap={4}>
                    <Heading
                        pb="0" ml={6}
                        fontSize="5xl"
                        fontWeight="800"
                        letterSpacing="0.1rem"
                        fontFamily="Kalam, cursive"
                        as={"i"}>{t('main.general.title')}
                    </Heading>
{/*
                    <Text textTransform="full-size-kana">Retrouvez ici toutes les informations relatives à APSCHOOL</Text>
*/}
                    </Flex>}


                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            pr={4}
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack >
                                <Avatar
                                    size={'sm'}
                                    bgGradient='linear(to-b, gray.500, gray.300)'
                                />

                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <Text align="left" fontWeight='bold' fontSize='lg' ml="3" pb="3" pt="3">
                               {auth().nom} {auth().prenom}
                            </Text>
                            <MenuDivider />

                            <MenuGroup title={t('main.userMenu.actions')}>
                                <MenuItem as={Link} href="https://plateforme.apschool.be">{t('main.userMenu.back_apschool')}</MenuItem>
                                <MenuItem onClick={()=>{logout()}}>{t('main.userMenu.logout')}</MenuItem>
                            </MenuGroup>

                            <MenuDivider />

                            <LanguageMenu />

                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
