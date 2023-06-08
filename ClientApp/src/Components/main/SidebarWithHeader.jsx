import React from "react";
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
    MenuList,
    Image,
    useMediaQuery,
    Show,
    Heading,
    DrawerOverlay,
    MenuGroup,
    Center,
    Button,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import logo from "../../assets/images/logo_blue.png";
import smallLogo from "../../assets/images/logo_raw.png";
import paperPlane from "../../assets/images/paper-plane.png";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { LanguageMenu } from "@/Components/Menu/LanguageMenu.jsx";
import { useTranslation } from "react-i18next";
import { LinkItemsAdmin, LinkItemsUser } from "@/Datas/linkDatas.js";

export const SidebarWithHeader = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh">
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
            <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box
                ml={{ base: 0, md: 52 }}
                mr={{ base: 0, md: 4 }}
                mb={{ base: 0, md: 5 }}
                mt={{ base: 0, md: 2 }}
                borderRadius="2xl"
                bgColor="white"
                shadow={{ base: "none", md: "sm" }}
                minHeight={"81vh"}
            >
                {children}
            </Box>
        </Box>
    );
};

const SidebarContent = ({ onClose, ...rest }) => {
    const { t } = useTranslation();
    const auth = useAuthUser();

    return (
        <Flex w={{ base: "full", md: 52 }} pos="fixed" h="100vh" pb={{ base: "none", md: "10" }} {...rest}>
            <Flex
                bgColor="white"
                m={{ base: "0", md: "5" }}
                pb="2"
                borderRadius={{ base: "none", md: "2xl" }}
                flexDirection={"column"}
                h="100%"
                flexGrow={"1"}
                shadow={{ base: "none", md: "xl" }}
            >
                <VStack p="4" gap="5">
                    <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} alignSelf="flex-end" />
                    <Box>
                        <Image src={logo} alt="logo" height={{ base: "150px", md: "auto" }} />
                    </Box>
                </VStack>

                <Flex flexDirection={"column"} flexGrow={1} gap="5" pt="10" width={{ base: "full", md: "full" }} px={{ base: "5", md: "0" }}>
                    {auth().typeUtilisateur === 1 &&
                        LinkItemsUser.map((link) => (
                            <NavItem key={link.name} icon={link.icon} link={link.link}>
                                {t(link.name)}
                            </NavItem>
                        ))}
                    {auth().typeUtilisateur === 2 &&
                        LinkItemsAdmin.map((link) => (
                            <NavItem key={link.name} icon={link.icon} link={link.link}>
                                {t(link.name)}
                            </NavItem>
                        ))}
                </Flex>

                {auth().isSubscribed === 0 && auth().typeUtilisateur === 1 && (
                    <Flex
                        alignSelf={"center"}
                        p={2}
                        gap={4}
                        mx="2"
                        maxWidth={{ base: "80%", md: "207px" }}
                        borderRadius={"lg"}
                        flexDirection={"column"}
                        width={{ base: "full", md: "fit-content" }}
                        bgGradient="linear(to-r, #3d84c0, #351052)"
                    >
                        <Image src={paperPlane} position={"absolute"} zIndex={0} opacity={"20%"} height={"160px"} right={90} />

                        <Link href={`https://localhost:7079/user/unsubscribeNewsletter/${auth().utilisateurId}`}>
                            <Text textTransform={"uppercase"} color={"white"} fontWeight={"bold"} textAlign={"center"}>
                                {t("main.general.receive_newsletter")}
                            </Text>
                        </Link>

                        <Button bgColor={"gray.50"} width={"100%"} shadow={"lg"}>
                            {t("main.general.subscribe")}
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

const NavItem = ({ icon, children, link, ...rest }) => {
    return (
        <NavLink
            to={link}
            style={({ isActive, isPending }) => {
                return {
                    fontWeight: isActive ? "600" : "",
                    padding: "15px",
                    marginInline: "8px",
                    color: isActive ? "rgba(51,106,158,1)" : "",
                    borderRadius: "7px",
                    // background: isActive ? "linear-gradient(90deg, rgba(51,106,158,1) 0%, rgba(83,144,203,1) 100%)" : "",
                    // Add styles for hover effect
                    transition: "all 0.2s ease-in-out",
                    ":hover": {
                        background: "linear-gradient(90deg, rgba(83,144,203,1) 0%, rgba(51,106,158,1) 100%)",
                        color: "white",
                    },
                };
            }}
        >
            <Flex align="center" role="group" cursor="pointer" _hover={{ fontWeight: "semibold" }} {...rest}>
                {icon && <Icon mr="4" fontSize="16" as={icon} />}
                {children}
            </Flex>
        </NavLink>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const [isLargerThan60em] = useMediaQuery("(min-width: 48em)");

    const logout = () => {
        signOut();
        navigate("/login");
    };
    return (
        <VStack bgColor={{ base: "white", md: "transparent" }} ml={{ base: 0, md: "190px" }} mr={{ base: 0, md: 4 }}>
            <Flex p={{ base: 4, md: 0 }} alignItems="center" width={"full"} justifyContent={{ base: "space-between", md: "flex-end" }} {...rest}>
                {auth().typeUtilisateur === 2 && !isLargerThan60em && (
                    <Flex
                        borderRadius={"full"}
                        bgGradient="linear(to-b, gray.500, gray.300)"
                        height={"40px"}
                        width="40px"
                        justifyContent={"center"}
                        alignItems="center"
                    >
                        <FiMenu
                            display={{ base: "flex", md: "none" }}
                            onClick={onOpen}
                            aria-label="open menu"
                            cursor={"pointer"}
                            color="white"
                            size="30px"
                        />
                    </Flex>
                )}

                {!isLargerThan60em && (
                    <Box boxSize="s">
                        <Image src={smallLogo} alt="logo" height={"60px"} />
                    </Box>
                )}

                <HStack justifyContent="space-between" width={{ base: "", md: "100%" }} pt={{ base: "0", md: "5" }}>
                    {isLargerThan60em && (
                        <Flex
                            alignItems={"baseline"}
                            gap={{ base: "2", xl: "4" }}
                            bgColor="white"
                            borderRadius={"xl"}
                            w="full"
                            ml="5"
                            px="4"
                            flexDirection={{ base: "column" }}
                            minHeight={{ base: "12", md: "24", lg: "24" }}
                            justifyContent={"center"}
                        >
                            <Heading fontSize={{ base: "27px", xl: "3xl" }} fontWeight="700" letterSpacing="0.1rem" as={"i"}>
                                {t("pages.home.home_title")}
                            </Heading>

                            <Text textTransform="full-size-kana" fontSize={{ base: "13px", lg: "16px", xl: "16px" }}>
                                {t("pages.home.home_subtitle")}
                            </Text>
                        </Flex>
                    )}

                    <Flex alignItems={"center"}>
                        <Menu>
                            <MenuButton
                                px={{ base: "0", md: "4" }}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                                bgColor="white"
                                borderRadius={"xl"}
                                shadow={{ base: "none", md: "sm" }}
                                minHeight={{ base: "12", md: "24", lg: "24" }}
                            >
                                <HStack>
                                    <Avatar size={"sm"} bgGradient="linear(to-b, gray.500, gray.300)" height={"40px"} width="40px" />

                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
                                <Text align="left" fontWeight="bold" fontSize="lg" ml="3" pb="3" pt="3">
                                    {auth().nom} {auth().prenom}
                                </Text>
                                <MenuDivider />

                                <MenuGroup title={t("main.userMenu.actions")}>
                                    <MenuItem> Mon compte</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        {t("main.userMenu.logout")}
                                    </MenuItem>
                                </MenuGroup>

                                <MenuDivider />

                                <LanguageMenu />
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
        </VStack>
    );
};
