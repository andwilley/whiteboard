import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import { IErrors, IAircrew } from '../types/State';

interface IFlexInputProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: EditorState) => void;
    onClick: () => void;
    onBlur: () => void;
    aircrewRefList: IAircrew[];
    errors: IErrors[];
    editorState: EditorState;
    showEditor: boolean;
}

const FlexInput: React.SFC<IFlexInputProps> = ({
    placeHolder,
    name,
    value,
    onChange,
    onClick,
    onBlur,
    aircrewRefList,
    editorState,
    showEditor,
    errors = [],
}) => {
    // const decorators = aircrewRefList.map(aircrew => {
    //     return {
    //         strategy: nameStrategy(aircrew.id),
    //         component: nameSpan(aircrew.callsign),
    //     };
    // });
    // const compositeDecorators = new CompositeDecorator(decorators);
    return showEditor ? <Editor editorState={editorState} onChange={onChange} onBlur={onBlur} placeholder="test" /> :
            <p onClick={onClick}>{editorState.getCurrentContent().getPlainText()}</p>;
};

// const FlexInput: React.SFC<IFlexInputProps> = ({
//     placeHolder,
//     name,
//     value,
//     onChange,
//     aircrewRefList,
//     errors = [],
// }) => {
//     // const textRef = React.createRef<HTMLDivElement>();
//     // const valResults = validator(validators, value);
//     // const formErrors = [...valResults, ...errors].filter(error => error !== null);
//     return (
//         <label htmlFor={name}>
//         <ContentEditable
//             tagName={'div'}
//             html={value}
//             onChange={onChange}
//             // id={name}
//             // className=""
//             // contentEditable={true}
//             // onInput={() => onChange(textRef.current ? textRef.current.innerHTML : '')}
//             // ref={textRef}
//         />
//         </label>
//     );
// };

export default FlexInput;
