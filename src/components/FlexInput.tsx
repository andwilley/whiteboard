import * as React from 'react';
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import { IUntrackedErrors, UEditables } from '../types/WhiteboardTypes';
import { IErrors, IAircrew } from '../types/State';
import { getHighestErrorLevel } from '../errors';
import { IErrorConfig } from '../containers/FlexInputContainer';
import { ValidatorFn } from '../util/validator';
import { RestrictorFn } from '../util/restrictor';

interface IFlexInputProps {
    placeHolder: string;
    className?: string;
    wrapperClassName?: string;
    name: string;
    value: string;
    pvalue: JSX.Element;
    errorConfig: IErrorConfig;
    element: UEditables;
    entityId: string;
    validatorFns?: ValidatorFn[];
    restrictorFns?: RestrictorFn[];
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
    className = '',
    wrapperClassName = '',
    name,
    value,
    pvalue,
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
    /**
     * set focus once the Editor mounts (this only happens onClick or tabbed from another element).
     * This is hacky. Probably need to use a Class, extend React.Component
     * and the didComponentMount hook instead of timeout.
     */
    if (showEditor && !editorState.getSelection().getHasFocus()) {
        setTimeout(() => {
            const updRef = getRef();
            if (updRef && updRef.current) {
                updRef.current.focus();
            }
        }, 0);
    }
    return (
        <div className={`wb-form-input flexInput${errorClasses}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
        {showEditor ?
        (
            <Editor
                editorState={editorState}
                onChange={onChange}
                ref={ref}
                blockStyleFn={() => className}
                onBlur={onBlur}
                handleBeforeInput={restrictor ? restrictor.textInput : restrictor}
                handlePastedText={restrictor ? restrictor.pasteInput : restrictor}
            />
        ) :
            <p
                tabIndex={0}
                className={`${value.length > 0 ? 'pStyle' : 'pStyleEmpty'}${className ? ` ${className}` : ''}`}
                onClick={onClick}
                onFocus={onClick}
            >
                {pvalue || placeHolder}
            </p>}
        </div>
        );
};

export default FlexInput;
