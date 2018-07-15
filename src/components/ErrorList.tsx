import * as React from 'react';
import { IErrors } from '../types/State';
import IconButton from './IconButton';

interface IErrorListProps {
    errors: IErrors[];
}

const ErrorList: React.SFC<IErrorListProps> = ({ errors }) => {
    const errorsComps = errors.map(error => {
        return (
            <li key={error.id} className={`list-group-item error-level-${error.level} wb-error-list-item`}>
                <IconButton
                    icon="x"
                    size={10}
                    style={{
                        margin: '0 5px 0 -15px',
                    }}
                    svgClass="align-middle"
                    pointer={false}
                />
                {error.message}
            </li>
        );
    });
    return errors.length > 0 ?
        (
            <div>
                <h6 className="sidebar-heading text-muted">Conflicts</h6>
                <ul className="list-group list-group-flush">
                    {errorsComps}
                </ul>
            </div>
        ) : null;
};

export default ErrorList;
