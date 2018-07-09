import * as React from 'react';
import { icons } from '../whiteboard-constants';
import { UIcons } from '../types/WhiteboardTypes';

interface IIconButtonProps {
    onClick: (...args: any[]) => any;
    icon?: UIcons;
    size?: number;
    href?: string;
    svgClass?: string;
    style?: React.CSSProperties;
}

const IconButton: React.SFC<IIconButtonProps> = ({
    onClick,
    children,
    icon,
    href = '',
    size = 10,
    style = {},
    svgClass = '',
}) => {
    return (
        <a href={href ? href : '#'}>
            <span onClick={onClick}>
                {icon &&
                    <svg
                        className={`icon icon-${icon}${svgClass ? ` ${svgClass}` : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width={size}
                        height={size}
                        viewBox={`0 0 8 8`}
                        style={style}
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
