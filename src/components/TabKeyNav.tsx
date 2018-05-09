import * as React from 'react';

const TabKeyNav: React.SFC = ({ children }) => {
    return (
        <div style={{border: '1px solid black', marginTop: '20px'}}>
            {children}
        </div>
    );
};

export default TabKeyNav;
