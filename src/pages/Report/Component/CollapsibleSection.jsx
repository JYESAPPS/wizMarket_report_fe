import React, { useEffect, useRef, useState } from 'react';

const CollapsibleSection = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const base = process.env.PUBLIC_URL || '';

  const iconSrc = `${base}/assets/component/${isOpen ? 'up' : 'down'}.png`;


  useEffect(() => {
    if (contentRef.current) {
      const h = contentRef.current.scrollHeight;
      setContentHeight(h);
    }
  }, [children, isOpen]);

  return (
    <section className="px-4 py-2">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3"
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="text-base font-semibold text-black">{title}</span>
        <img src={iconSrc} alt={isOpen ? '접기' : '펼치기'} className="block" />
      </button>
      <div className="h-px w-full bg-gray-200"></div>
      <div
        className="mt-3 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0.5 }}
      >
        <div ref={contentRef} className="space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CollapsibleSection;
