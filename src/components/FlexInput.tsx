import * as React from 'react';
import { IErrors } from '../types/State';
import validator from '../util/validator';

interface IFlexInputProps {
    placeHolder: string;
    name: string;
    value: string;
    validators: ((input: string) => IErrors)[];
    errors: IErrors;
    onChange: () => any;
}

const FlexInput: React.SFC<IFlexInputProps> = ({ 
    placeHolder,
    name,
    value,
    onChange,
    validators = [],
    errors = []
}) => {
    const valResults = validator(validators, value);
    const formErrors = [...valResults, ...errors].filter(error => error !== null);
    errorComponents = formErrors.map(error =>
        (
            <span
                key={error.id}
                class={`form-error error-level-${error.level}`}
            >
                {error.message}
            </span>
        )
    );
    return (
        <label htmlFor={placeHolder}>
            <input
                type="text"
                placeholder={placeHolder}
                name={name}
                value={value}
                style={style}
                onChange={onChange}
            />
            {errorComponents}
        </label>
    );
};

export default FlexInput;
