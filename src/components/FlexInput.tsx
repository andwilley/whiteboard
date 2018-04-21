import * as React from 'react';
import ContentEditable from './ContentEditable';
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
    // const textRef = React.createRef<HTMLDivElement>();
    // const valResults = validator(validators, value);
    // const formErrors = [...valResults, ...errors].filter(error => error !== null);
    aircrewRefList.forEach(aircrew => {
        value = value.replace(aircrew.callsign, `<span class="pill">${aircrew.callsign}</span>`);
    });
    return (
        <label htmlFor={name}>
            <ContentEditable
                tagName={'div'}
                html={value}
                onChange={onChange}
                // id={name}
                // className=""
                // contentEditable={true}
                // onInput={() => onChange(textRef.current ? textRef.current.innerHTML : '')}
                // ref={textRef}
            />
        </label>
    );
};

export default FlexInput;
