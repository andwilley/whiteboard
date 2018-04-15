import * as React from 'react';
import { IErrors } from '../types/State';

interface IErrorListProps {
    errors: IErrors[];
}

const ErrorList: React.SFC<IErrorListProps> = ({ errors }) => {
    const errorsComps = errors.map(error => {
        return (<li key={error.id} className={`error-level-${error.level}`}>{error.message}</li>);
    });
    return errors.length > 0 ?
        (
            <div style={{border: '1px solid black', marginTop: '20px'}}>
                <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Errors</span>
                <ul>
                    {errorsComps}
                </ul>
            </div>
        ) : null;
};

export default ErrorList;
