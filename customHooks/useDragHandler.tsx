import { MutableRefObject, useEffect, useState } from "react";

export default function useDragHandler(
  element: MutableRefObject<HTMLDivElement | null>
) {
  const target = element.current;
  const [isDraggable, setIsDraggable] = useState(false);

  function onMouseDown(event: MouseEvent) {
    const target = element.current;
    if (target) {
      const element = event.target as HTMLElement;
      if (target?.contains(element)) setIsDraggable(true);
    }
  }

  function onMouseUp() {
    setIsDraggable(false);
  }
  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, []);

  function dragElement(e: MouseEvent) {
    console.log(isDraggable);
    if (!target || !isDraggable) return;
    e.preventDefault();
    // calculate the new cursor position:
    const top = e.clientY;
    const left = e.clientX;
    // set the element's new position:
    target.style.top = top + "px";
    target.style.left = left + "px";
  }
  useEffect(() => {
    document.addEventListener("mousemove", dragElement);

    return () => document.removeEventListener("mousemove", dragElement);
  }, [isDraggable]);
}
