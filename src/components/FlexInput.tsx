import * as React from 'react';
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
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
    restrictor: {
        textInput: ((text: string, editorState: EditorState) => DraftHandleValue);
        pasteInput: ((text: string, html: string, editorState: EditorState) => DraftHandleValue);
    } | undefined;
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
    restrictor,
    errors = [],
}) => {
    const ref = React.createRef<any>();
    const getRef = () => ref;
    const thereAreErrors = errors.length > 0 || validationErrors.length > 0 ? true : false;
    const highestErrorLevel = getHighestErrorLevel(errors);
    const highestValErrorLevel = getHighestErrorLevel(validationErrors);
    let errorClasses = '';
    if (thereAreErrors) {
        const errorClass = errors.length > 0 ? ` error${highestErrorLevel}` : '';
        const valErrorClass = validationErrors.length > 0 ? ` valError${highestValErrorLevel}` : '';
        errorClasses = `${errorClass}${valErrorClass}`;
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
        <div className={`flexInput${errorClasses}`}>
        {showEditor ?
        (
            <Editor
                editorState={editorState}
                onChange={onChange}
                ref={ref}
                onBlur={onBlur}
                handleBeforeInput={restrictor ? restrictor.textInput : restrictor}
                handlePastedText={restrictor ? restrictor.pasteInput : restrictor}
            />
        ) :
            <p
                tabIndex={0}
                className={value.length > 0 ? 'pStyle' : 'pStyleEmpty'}
                onClick={onClick}
                onFocus={onClick}
            >
                {value || placeHolder}
            </p>}
        </div>
        );
};

export default FlexInput;
