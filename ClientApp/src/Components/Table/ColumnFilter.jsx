import React, { useState } from "react";
import {
    Input,
    Menu,
    IconButton,
    MenuButton,
    MenuList,
    VStack,
    HStack,
} from "@chakra-ui/react";

import {BsCheckLg, IoClose, TbFilter} from "react-icons/all.js";

export const ColumnFilter = ({ column }) => {
    const [state, setState] = useState(null);
    if (!column.getCanFilter()) {
        return null;
    }

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

    const change = (value) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    const renderFilterElement = () => {
        const FilterComponent = column.columnDef?.meta.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <Input
                    borderRadius="md"
                    size="sm"
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return (
            <FilterComponent
                value={state?.value}
                onChange={(e) => change(e.target.value)}
            />
        );
    };

    return (
        <Menu isOpen={!!state} onClose={close}>
            <MenuButton
                onClick={open}
                as={IconButton}
                aria-label="Options"
                icon={<TbFilter size="16" />}
                variant="ghost"
                size="xs"
            />
            <MenuList p="2">
                {!!state && (
                    <VStack align="flex-start">
                        {renderFilterElement()}
                        <HStack spacing="1">
                            <IconButton
                                aria-label="Clear"
                                size="sm"
                                colorScheme="red"
                                onClick={clear}
                            >
                                <IoClose size={18} />
                            </IconButton>
                            <IconButton
                                aria-label="Save"
                                size="sm"
                                onClick={save}
                                colorScheme="green"
                            >
                                <BsCheckLg size={18} />
                            </IconButton>
                        </HStack>
                    </VStack>
                )}
            </MenuList>
        </Menu>
    );
};