import * as React from 'react';
import { icons } from '../whiteboard-constants';
import { UIcons } from '../types/WhiteboardTypes';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface IIconButtonProps {
    onClick?: (...args: any[]) => any;
    icon?: UIcons;
    size?: number;
    svgClass?: string;
    className?: string;
    pointer?: boolean;
    style?: React.CSSProperties;
    viewBox?: string;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
    hover?: 'only-hover' | 'only-hover-hold-space' | 'always-visible';
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
    dragHandleProps,
}) => {
    const hoverClass = hover === 'only-hover' ?
        ` wb-only-hover-element` :
        hover === 'only-hover-hold-space' ?
            ` wb-only-hover-element-hold-space` :
            ``;
    return (
        <span onClick={onClick} className={`${className}${hoverClass}`} {...dragHandleProps}>
            {icon &&
                <svg
                    className={`icon icon-${icon}${svgClass ? ` ${svgClass}` : ''}
                        ${pointer ? ' wb-pointer' : ''}`}
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
