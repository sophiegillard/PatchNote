import {FiHome} from "react-icons/fi";
import {GoMail, IoNewspaper, MdEditNote} from "react-icons/all.js";

export const LinkItemsAdmin = [
    { name: 'pages.navlinks.home', icon: FiHome, link:'/' },
    { name: 'pages.navlinks.mailbox', icon: GoMail, link:'/messagerie' },
    { name: 'pages.navlinks.patchNote', icon: MdEditNote, link:'/patchNote' },
    { name: 'pages.navlinks.newsletter', icon: IoNewspaper, link:'/newsLetter' },
];

export const LinkItemsUser = [
    { name: 'pages.navlinks.home', icon: FiHome, link:'/' },
    { name: 'pages.navlinks.leaveMessage', icon: GoMail, link:'/contact' },
];