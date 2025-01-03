"use client";

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

interface DraggableWidgetProps {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  children: React.ReactNode;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  initialPosition,
  initialSize,
  children,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    const savedPosition = localStorage.getItem(`widget-${id}-position`);
    const savedSize = localStorage.getItem(`widget-${id}-size`);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
    if (savedSize) {
      setSize(JSON.parse(savedSize));
    }
  }, [id]);

  const onDragStop = (e: any, d: any) => {
    const newPosition = { x: d.x, y: d.y };
    setPosition(newPosition);
    localStorage.setItem(`widget-${id}-position`, JSON.stringify(newPosition));
  };

  const onResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    const newSize = { width: ref.offsetWidth, height: ref.offsetHeight };
    setSize(newSize);
    setPosition(position);
    localStorage.setItem(`widget-${id}-size`, JSON.stringify(newSize));
    localStorage.setItem(`widget-${id}-position`, JSON.stringify(position));
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      bounds="parent"
      dragGrid={[20, 20]}
      resizeGrid={[20, 20]}
      dragHandleClassName="drag-handle"
    >
      {children}
    </Rnd>
  );
};

export default DraggableWidget;
