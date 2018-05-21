import * as React from 'react';

interface SnivListProps {
    snivs: string[];
    onSubmitClick: () => null;
}

const SnivList: React.SFC<SnivListProps> = ({snivs, onSubmitClick}) => {
    const snivList = snivs.map(sniv => (<div key={sniv}>{sniv}</div>));
    return (
        <div>
            {snivList}
        </div>
    );
};

export default SnivList;
