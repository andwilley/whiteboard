import * as React from 'react';
import { IErrors, IAircrew } from '../types/State';

interface IFlexInputProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: any) => any;
    aircrewRefList: IAircrew[];
    errors: IErrors[];
}

const FlexInput: React.SFC<IFlexInputProps> = ({
    placeHolder,
    name,
    value,
    onChange,
    aircrewRefList,
    errors = [],
}) => {
    // const valResults = validator(validators, value);
    // const formErrors = [...valResults, ...errors].filter(error => error !== null);
    return (
        <label htmlFor={name}>
            <input
                type="text"
                placeholder={placeHolder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default FlexInput;
