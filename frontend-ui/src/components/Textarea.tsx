import React, {FC} from 'react';

interface pageProps {
    label?: string,
    name: string,
    value?: string,
    type?: string,
    placeholder?: string,
    inputProps?: any,
    labelProps?: any,

    onChange(): any,
}


const Textarea: FC<pageProps> = ({
                                  label,
                                  name,
                                  value,
                                  onChange,
                                  type = 'text',
                                  placeholder,
                                  inputProps,
                                  labelProps,
                              }) => {
    return (
        <div className="mb-4">
            {label && <label {...inputProps} htmlFor={name} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>}
            <textarea
                className="block w-full border-0 hover:border-0 focus:border-0 rounded px-2 py-2"
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...inputProps}
            />
        </div>
    );
};

export default Textarea;
