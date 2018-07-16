import * as React from 'react';
import { icons } from '../whiteboard-constants';
import { UIcons } from '../types/WhiteboardTypes';

interface IIconButtonProps {
    onClick?: (...args: any[]) => any;
    icon?: UIcons;
    size?: number;
    svgClass?: string;
    className?: string;
    pointer?: boolean;
    style?: React.CSSProperties;
    viewBox?: string;
    hover?: 'only-hover' | 'always-visible';
}

const IconButton: React.SFC<IIconButtonProps> = ({
    onClick = () => undefined,
    children,
    icon,
    size = 10,
    style = {},
    svgClass = '',
    className = '',
    pointer = true,
    viewBox = '0 0 8 8',
    hover = 'always-visible',
}) => {
    return (
        <span onClick={onClick} className={`${className}`}>
            {icon &&
                <svg
                    className={`icon icon-${icon}${svgClass ? ` ${svgClass}` : ''}
                        ${pointer ? ' wb-pointer' : ''}${hover === 'only-hover' ? ` wb-only-hover-element` : ''}`}
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
