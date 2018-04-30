import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import { IUntrackedErrors } from '../types/WhiteboardTypes';
import { IErrors, IAircrew } from '../types/State';
import { getHighestErrorLevel } from '../errors';

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
    validationErrors: IUntrackedErrors[];
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
    validationErrors,
    errors = [],
}) => {
    const ref = React.createRef<any>();
    const getRef = () => ref;
    const thereAreErrors = errors.length > 0 || validationErrors.length > 0 ? true : false;
    const highestErrorLevel = getHighestErrorLevel(errors);
    const highestValErrorLevel = getHighestErrorLevel(validationErrors);
    let errorClasses = '';
    if (thereAreErrors) {
        const errorClass = errors.length > 0 ? `error${highestErrorLevel}` : '';
        const valErrorClass = validationErrors.length > 0 && showEditor ? `valError${highestValErrorLevel}` : '';
        errorClasses = `${errorClass} ${valErrorClass}`;
    }
    /** set focus once the Editor mounts (this only happens onClick or tabbed from another element). */
    if (showEditor && !editorState.getSelection().getHasFocus()) {
        setTimeout(() => {
            const updRef = getRef();
            if (updRef && updRef.current) {
                updRef.current.focus();
            }
        }, 0);
    }
    return (
        <div className={`flexInput ${errorClasses}`}>
        {showEditor ?
        (
            <Editor
                editorState={editorState}
                onChange={onChange}
                ref={ref}
                onBlur={onBlur}
            />
        ) :
            <p className={value.length > 0 ? 'pStyle' : 'pStyleEmpty'} onClick={onClick}>{value || placeHolder}</p>}
        </div>
        );
};

export default FlexInput;
