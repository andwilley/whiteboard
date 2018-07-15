import * as React from 'react';
import { IErrors } from '../types/State';
import IconButton from './IconButton';

interface IErrorListProps {
    errors: IErrors[];
    className?: string;
}

const ErrorList: React.SFC<IErrorListProps> = ({ className = '', errors }) => {
    const errorsComps = errors.map(error => {
        return (
            <p
                key={error.id}
                className={`error-level-${error.level} wb-error-list-item${className ? ` ${className}` : ''}`}
            >
                <IconButton
                    icon="x"
                    size={10}
                    style={{
                        margin: '0 10px 0 0',
                    }}
                    svgClass="align-middle"
                    pointer={false}
                />
                {error.message}
            </p>
        );
    });
    return errors.length > 0 ?
        (
            <div>
                <h6 className="sidebar-heading text-muted mt-2">Conflicts</h6>
                {errorsComps}
            </div>
        ) : null;
};

export default ErrorList;
