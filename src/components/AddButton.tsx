import * as React from 'react';

interface IAddButtonProps {
    onClick: (...args: any[]) => any;
}

const AddButton: React.SFC<IAddButtonProps> = ({onClick, children}) => {
    return (
        <span onClick={onClick}>[+{children ? ` ${children}` : ''}]</span>
    );
};

export default AddButton;
