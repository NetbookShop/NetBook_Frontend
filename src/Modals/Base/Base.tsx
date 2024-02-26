import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>&times;</span>
              {children}
            </div>
          </div>
        )}
      </>
    );
  };

export default Modal; 