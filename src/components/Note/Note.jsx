import React, { memo } from 'react';
import TextArea from '../TextArea/TextArea';
import { useDraggable, useEditable } from './hooks';

import './styles.css';

const NoteComponent = props => {
    const [text, handleChange, handleBlur] = useEditable({
        initialText: props.text,
        onHandleBlur: value => props.updateNote(props.id, value)
    });
    const [position, handleDragStart, handleDragEnd] = useDraggable({
        left: props.left,
        top: props.top,
        onHandleDragEnd: position => props.updateNote(props.id, position),
        onHandleDragStart: () => props.onHandleDragStart(props.id)
    });
    const style = {
        ...position,
        width: props.width,
        height: props.height
    };

    return (<div
        className="note"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={style}
        draggable
    >
        <TextArea
            className="note_text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </div>)
};

export default memo(NoteComponent);