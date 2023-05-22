import Select from "react-select";
import React from "react";
import {Flex} from "@chakra-ui/react";

export const SelectCommit = ({options, placeholder, onChange, defaultValue, width}) => {
    return <>
        <Flex >
            <Select
                styles={{
                    control: (provided) => ({
                        ...provided,
                        width: "15vw",

                    })
                }}
                options={options}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </Flex>
    </>
}