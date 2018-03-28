import * as React from 'react';
import { IErrors, IAircrew } from '../types/State';

interface IFlexInputProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: any) => any;
    aircrewRefList: IAircrew[];
    schedErrors?: IErrors[];
}

const FlexInput: React.SFC<IFlexInputProps> = ({
    placeHolder,
    name,
    value,
    onChange,
    aircrewRefList,
    schedErrors = [],
}) => {
    // const valResults = validator(validators, value);
    // const formErrors = [...valResults, ...errors].filter(error => error !== null);
    const errorComponents = schedErrors.map(error =>
        (
            <span
                key={error.id}
                className={`form-error error-level-${error.level}`}
            >
                {error.message}
            </span>
        )
    );
    return (
        <label htmlFor={name}>
            <input
                type="text"
                placeholder={placeHolder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errorComponents}
        </label>
    );
};

export default FlexInput;
