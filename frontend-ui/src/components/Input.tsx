import React, {FC} from 'react';
import {useFormContext} from "react-hook-form";

interface pageProps {
    label?: string,
    name: string,
    value?: string,
    type?: string,
    inputProps?: any,
    labelProps?: any,
    rules?: {},
    placeholder?: string,
}


const Input: FC<pageProps> = ({
                                  label,
                                  name,
                                  value,
                                  type = 'text',
                                  placeholder,
                                  inputProps,
                                  labelProps,
                                  rules,
                              }) => {

    const { register, formState: {errors} } = useFormContext();
    return (
        <div className="mb-4">
            {label && <label {...labelProps} htmlFor={name} className="block text-gray-700 font-bold mb-2">
                {label}
            </label>}
            <input
                className="block w-full border-0 hover:border-0 focus:border-0 rounded px-2 py-2"
                id={name}
                {...register(name, rules)}
                type={type}
                placeholder={placeholder}
                value={value}
                {...inputProps}
            />
            <p className="text-rose-600 text-lg">{errors[name]?.message}</p>
        </div>
    );
};

export default Input;
