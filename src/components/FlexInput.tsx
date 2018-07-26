import * as React from 'react';
import { Editor, EditorState, DraftHandleValue } from 'draft-js';
import { IUntrackedErrors } from '../types/WhiteboardTypes';
import { IErrors } from '../types/State';
import { getHighestErrorLevel } from '../errors';

export interface IFlexInputProps {
    onChange: (editorState: EditorState) => void;
    onClick: () => void;
    onBlur: (e: any) => void;
    placeHolder: string;
    className: string | undefined;
    wrapperClassName: string | undefined;
    errors: IErrors[] | undefined;
    editorState: EditorState | undefined;
    showEditor: boolean;
    restrictor: {
        textInput: ((text: string, editorState: EditorState) => DraftHandleValue);
        pasteInput: ((text: string, html: string, editorState: EditorState) => DraftHandleValue);
    } | undefined;
    validationErrors: IUntrackedErrors[] | undefined;
    pvalue: JSX.Element | null;
}

class FlexInput extends React.PureComponent<IFlexInputProps> {
    // componentWillReceiveProps(nextProps: any) {
    //     Object.keys(nextProps)
    //       .filter(key => {
    //         return nextProps[key] !== this.props[key];
    //       })
    //       .map(key => {
    //         console.log(
    //           'changed property:',
    //           key,
    //           'from',
    //           this.props[key],
    //           'to',
    //           nextProps[key]
    //         );
    //       });
    //   }
    render() {
        const {
            onChange,
            onClick,
            onBlur,
            placeHolder,
            className = '',
            wrapperClassName = '',
            pvalue,
            editorState,
            showEditor,
            validationErrors = [],
            restrictor,
            errors = [],
        } = this.props;
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
         * and the componentDidMount hook instead of timeout.
         */
        if (showEditor && editorState && !editorState.getSelection().getHasFocus()) {
            setTimeout(() => {
                const updRef = getRef();
                if (updRef && updRef.current) {
                    updRef.current.focus();
                }
            }, 0);
        }
        return (
            <div className={`wb-form-input flexInput${errorClasses}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
            {showEditor && editorState ?
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
                    className={`${pvalue ? 'pStyle' : 'pStyleEmpty'}${className ? ` ${className}` : ''}`}
                    onClick={onClick}
                    onFocus={onClick}
                >
                    {pvalue || placeHolder}
                </p>}
            </div>
        );
    }
}

export default FlexInput;
