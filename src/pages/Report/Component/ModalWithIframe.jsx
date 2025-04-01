import React, { useState, useEffect } from 'react';

const ModalWithIframe = ({ isOpen, onClose, url }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            setTimeout(() => {
                setShowIframe(true);
            }, 300);
        } else {
            setShowIframe(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setShowIframe(false);
        setTimeout(onClose, 300);
    };

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
        >
            <div
                className={`fixed bottom-0 left-0 right-0 top-16 bg-white rounded-t-lg w-full h-full ${isClosing ? 'animate-slideDown' : 'animate-slideUp'
                    }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="h-full">
                    {showIframe && (
                        <iframe
                            src={url}
                            title="Embedded Page"
                            className="w-full h-full border-none"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalWithIframe;