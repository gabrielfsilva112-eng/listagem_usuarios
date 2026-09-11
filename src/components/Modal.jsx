function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(evento) => evento.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Fechar">
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;