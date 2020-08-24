import { useRef, useState } from 'react';

export const useDraggable = ({ left, top, onHandleDragEnd, onHandleDragStart }) => {
    const [position, updatePosition] = useState({ left: left, top: top });
    const offset = useRef({});

    const handleDragStart = event => {
        onHandleDragStart();
        offset.current.x = event.clientX - event.target.offsetLeft;
        offset.current.y = event.clientY - event.target.offsetTop;
    };

    const handleDragEnd = event => {
        const nextPosition = {
            left: event.clientX - offset.current.x,
            top: event.clientY - offset.current.y
        };

        updatePosition(nextPosition);
        onHandleDragEnd(nextPosition);
    };

    return [position, handleDragStart, handleDragEnd];
};

export const useEditable = ({ initialText, onHandleBlur }) => {
    const [text, updateText] = useState(initialText);

    const handleChange = event => updateText(event.target.value);
    const handleBlur = () => {
        if (text !== initialText) {
            onHandleBlur({ text });
        }
    };

    return [text, handleChange, handleBlur];
}