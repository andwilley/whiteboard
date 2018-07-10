import * as React from 'react';
import { icons } from '../whiteboard-constants';
import { UIcons } from '../types/WhiteboardTypes';

interface IIconButtonProps {
    onClick?: (...args: any[]) => any;
    icon?: UIcons;
    size?: number;
    svgClass?: string;
    pointer?: boolean;
    style?: React.CSSProperties;
    viewBox?: string;
}

const IconButton: React.SFC<IIconButtonProps> = ({
    onClick = () => undefined,
    children,
    icon,
    size = 10,
    style = {},
    svgClass = '',
    pointer = true,
    viewBox = '0 0 8 8',
}) => {
    return (
        <span onClick={onClick}>
            {icon &&
                <svg
                    className={`icon icon-${icon}${svgClass ? ` ${svgClass}` : ''}${pointer ? ' wb-pointer' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox={viewBox}
                    style={style}
                >
                    <path d={icons[icon]}/>
                </svg>
            }
            {children}
        </span>
    );
};

export default IconButton;
