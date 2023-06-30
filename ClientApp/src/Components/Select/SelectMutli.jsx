import Select, { components } from 'react-select';

export const MultiSelect = ({defaultValue, options, ...props}) =>{
    const allOptions = { label: "Select All", value: "*" };

    const defaultAll = options.map(option => option.value);

    return <>

        <Select
            {...props}
            defaultValue={defaultValue === "*" ? defaultAll : defaultValue}
            isMulti
            name="colors"
            options={[allOptions, ...options]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={selected => {
                console.log(selected)
            }}
        />

    </>
}

// The component to be replaced
export const Control = ({ children, ...props }) => (
    // component to be rendered
    <components.Control {...props}>
        {children}
    </components.Control>
);

export const OptionCheckbox = (isSelected, label, ...props) =>{
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => null}
                />{" "}
                <label>{label}</label>
            </components.Option>
        </div>
    );
};