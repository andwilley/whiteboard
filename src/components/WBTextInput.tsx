import * as React from 'react';
import { IError } from '../types/State';
import validator from '../util/validator';

interface IWBTextInputProps {
    placeHolder: string;
    name: string;
    value: string;
    validators: {
        rule: string;
        display: string;
    }[];
    errors: IError;
    onChange: () => any;
}

const WBTextInput: React.SFC<IWBTextInputProps> = ({ placeHolder, name, value, validators, errors, onChange }) => {
    errorComponents = errors.map(error => (<span key={error.id} class="form-error">{error.message}</span>))
    return (
        <input
            type="text"
            placeholder={placeHolder}
            name={name}
            value={value}
            style={style}
            onChange={onChange}
        />
        {errorComponents}
    );
};

export default WBTextInput;
