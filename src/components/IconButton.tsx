import * as React from 'react';
import { icons } from '../whiteboard-constants';
import { UIcons } from '../types/WhiteboardTypes';

interface IIconButtonProps {
    onClick: (...args: any[]) => any;
    icon?: UIcons;
    size?: number;
    fill?: string;
    href?: string;
}

const IconButton: React.SFC<IIconButtonProps> = ({onClick, children, icon, href = '', fill = '', size = 10}) => {
    return (
        <a href={href ? href : '#'}>
            <span onClick={onClick}>
                {icon &&
                    <svg
                        className={`float-right icon ${icon}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox={`0 0 8 8`}
                    >
                        <path d={icons[icon]}/>
                    </svg>
                }
                {children}
            </span>
        </a>
    );
};

export default IconButton;
