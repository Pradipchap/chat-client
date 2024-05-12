import React, { useRef } from "react";
export default function Modal({
  onclose,
  children,
}: {
  onclose: () => void;
  children: React.ReactNode;
}) {
  const childrenRef = useRef<HTMLDivElement>(null);
  function dismiss(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const x = event.clientX;
    const y = event.clientY;
    if (document.elementsFromPoint(x, y)[0].lastChild === childrenRef.current) {
      document.body.style.overflow = "auto";
      onclose();
    }
  }
  return (
    <div
      className={`top-0 fixed left-0 w-full h-full backdrop-blur-[0.5px] bg-black/60 z-50 flex justify-center items-center`}
      onMouseEnter={() => (document.body.style.overflow = "hidden")}
      onMouseLeave={() => (document.body.style.overflow = "auto")}
      onClick={(event) => dismiss(event)}
    >
      <div ref={childrenRef}>{children}</div>
    </div>
  );
}
