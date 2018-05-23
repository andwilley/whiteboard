import * as React from 'react';

interface IDelButtonProps {
    onClick: () => any;
}

const DelButton: React.SFC<IDelButtonProps> = ({children, onClick}) => {
    return (
        <span onClick={onClick}>[- {children}]</span>
    );
};

export default DelButton;
