import * as React from 'react';

interface IAddButtonProps {
    onClick: () => any;
}

const AddButton: React.SFC<IAddButtonProps> = ({onClick, children}) => {
    return (
        <span onClick={onClick}>[+{children ? ` ${children}` : ''}]</span>
    );
};

export default AddButton;
