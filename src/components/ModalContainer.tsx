import React, { useEffect } from 'react';
import { colors, borderRadius, glassEffect } from '../styles/tokens';

interface ModalContainerProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Called when the backdrop is tapped. */
  onClose: () => void;
  children: React.ReactNode;
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(5, 5, 15, 0.75)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
};

const panelStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.xl,
  width: 'calc(100% - 48px)',
  maxWidth: '360px',
  padding: '28px 24px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  animation: 'modalSlideIn 0.2s ease',
};

// Inject keyframes once
if (typeof document !== 'undefined') {
  const id = 'modal-keyframes';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(16px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)  scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Stop click from closing when interacting with panel */}
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
