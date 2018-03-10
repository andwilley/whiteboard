import * as React from 'react';

interface IAddButtonProps {
    onClick: () => any;
}

const AddButton: React.SFC<IAddButtonProps> = ({onClick}) => {
    return (
        <span onClick={onClick}>[+]</span>
    );
};

export default AddButton;
