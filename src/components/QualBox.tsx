import * as React from 'react';

interface IQualBoxProps {
    qualsList: string[];
    onToggleQual: (qual: string, selected: boolean) => (e: any) => void;
    filters: string[];
    className?: string;
}

const QualBox: React.SFC<IQualBoxProps> = ({ qualsList, onToggleQual, filters, className }) => {
    const qualCheckboxList = qualsList.map( (qual: string) => (
        <span
            className={`text-light wb-pointer badge badge-pill${filters.indexOf(qual) > -1 ?
                ' wb-badge-selected' : ''}`}
            onClick={onToggleQual(qual, filters.indexOf(qual) > -1)}
            key={qual}
        >
        {qual}
        </span>
    ));
    return (
        <div className={className}>
            {qualCheckboxList}
        </div>
    );
};

export default QualBox;
