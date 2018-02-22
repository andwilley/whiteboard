import * as React from 'react';

const AddButton = ({onClick}: any) => {
    return (
        <span onClick={onClick}>[+]</span>
    );
};

export default AddButton;