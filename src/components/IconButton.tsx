import * as React from 'react';
import { IconNames } from '../types/iconTypes';

interface IIconButtonProps {
    onClick: (...args: any[]) => any;
    icon?: IconNames;
    size?: number;
}

const IconButton: React.SFC<IIconButtonProps> = ({onClick, children, icon}) => {
    const iconClass = icon ? ` icon ${icon}` : '';
    return (
        <a href="#">
            <span onClick={onClick} className={`add-del-button float-right${iconClass}`}>
                {icon &&
                    <img src={`/images/icons/svg/${icon}.svg`} alt={icon} />
                }
                {children}
            </span>
        </a>
    );
};

export default IconButton;
