import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {FiMoreVertical} from "react-icons/all.js";
import {CrudActionButton} from "@/Components/Buttons/CrudActionButton.jsx";
import eyeIcon from "@/assets/images/eye.png";
import {t} from "i18next";
import editIcon from "@/assets/images/edit.png";
import deleteIcon from "@/assets/images/delete.png";
import React from "react";

export const CrudActionMenu = ({   item,
                                   handleDelete,
                                   children,
                                   linkname}) =>{
    return(
        <Menu>

            <MenuButton
                aria-label='Options'
                variant='outline'>
                <FiMoreVertical size="1.5rem"/>
            </MenuButton>

            <MenuList >
                <MenuItem>
                    <CrudActionButton
                        link={`/${linkname}/${item.id}`}
                        srcIcon={eyeIcon}
                        label='Show'
                        text={t('main.general.show')}
                    />
                </MenuItem>
                <MenuItem >
                    <CrudActionButton
                        link={`/${linkname}/update/${item.id}`}
                        srcIcon={editIcon}
                        label='Edit'
                        text={t('main.general.edit')}
                    />
                </MenuItem>
                <MenuItem >
                    <CrudActionButton onClick={handleDelete}
                                      srcIcon={deleteIcon}
                                      label='Delete'
                                      text={t('main.general.delete')}/>
                </MenuItem>
              
              {children}
            </MenuList>
        </Menu>
    )
}