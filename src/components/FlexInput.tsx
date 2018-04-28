import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import { IErrors, IAircrew } from '../types/State';

interface IFlexInputProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: EditorState) => void;
    onClick: () => void;
    onBlur: (e: any) => void;
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
    const ref = React.createRef<any>();
    const getRef = () => ref;
    /** set focus once the Editor mounts. */
    if (showEditor && !editorState.getSelection().getHasFocus()) {
        setTimeout(() => {
            const updRef = getRef();
            if (updRef && updRef.current) {
                updRef.current.focus();
            }
        }, 0);
    }
    return showEditor ?
        (
            <Editor
                editorState={editorState}
                onChange={onChange}
                ref={ref}
                // onBlur={onBlur}
            />
        ) :
            <p onClick={onClick}>{value || placeHolder}</p>;
};

export default FlexInput;
