import * as React from 'react';

interface IDelButtonProps {
    onClick: () => any;
}

const DelButton: React.SFC<IDelButtonProps> = ({onClick}) => {
    return (
        <span onClick={onClick}>[-]</span>
    );
};

export default DelButton;
