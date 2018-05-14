import { RGX_PARTIAL_TIME, RGX_SYMBOLS, RGX_FIND_TR_CODES } from '../util/regEx';
import { EditorState, DraftHandleValue } from 'draft-js';

/**
 * Input Restrictions - disallow specific input values or combinations of values (blocks state update)
 * No message associated with these.
 * This is passed draft editor as handleBeforeInput prop
 */

export type RestrictorFn = (text: string) => boolean;

export const restrictToTimeChars = (text: string) => {
    return RGX_PARTIAL_TIME.test(text);
};

export const restrictToSymbols = (text: string) => {
    return RGX_SYMBOLS.test(text);
};

export const noDuplicateChars = (text: string) => {
    const charCount = new Set(text);
    return Array.from(charCount).join('') === text;
};

export const noDuplicateCodes = (text: string) => {
    /** breaks if global flag isn't set */
    const codes = text.match(RGX_FIND_TR_CODES) || [];
    const uniqueCodes = new Set(codes);
    return codes.length === uniqueCodes.size;
};

const restrictor = (...restrictorFunctions: RestrictorFn[]) =>
                            (chars: string, editorState: EditorState): DraftHandleValue => {
    /**
     * combines all the restrictors
     * @param restrictorFunctions array of restrictors with signature (text: string) => boolean
     * @return function for handleBeforeInput prop with signature:
     *         (chars: string, editorState: EditorState) => DraftHandleValue
     *
     * @param text input string (or is it just the most recently input char??)
     * @param editState yep.
     * @return 'not-handled' if input is ok for all restrictors. 'handled' if one doesn't like it
     * and we need to block it.
     */
    const text = `${editorState.getCurrentContent().getPlainText()}${chars}`;

    if (text === '') {
        return 'not-handled';
    }

    /** use array.every for this. It breaks as soon as one is false. */
    return restrictorFunctions.reduce((inputIs: (DraftHandleValue), restrictorFn) => {
        if (!restrictorFn(text)) {
            inputIs = 'handled';
        }
        return inputIs;
    }, 'not-handled');
};

export default restrictor;
