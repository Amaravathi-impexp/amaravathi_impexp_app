import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'text-red-600',
      iconBg: 'bg-red-100',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      button: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: '',
      iconBg: '',
      button: '',
      iconColor: '#1A3D32',
      iconBgColor: '#f0f7ed',
      buttonColor: '#1A3D32',
      buttonHoverColor: '#2D5A4A',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div 
            className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 ${styles.iconBg}`}
            style={variant === 'info' ? { backgroundColor: styles.iconBgColor } : undefined}
          >
            <AlertTriangle 
              className={`h-6 w-6 ${styles.icon}`} 
              style={variant === 'info' ? { color: styles.iconColor } : undefined}
            />
          </div>

          {/* Title */}
          <h3 className="text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-center text-sm text-gray-600 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors ${styles.button}`}
              style={variant === 'info' ? { backgroundColor: styles.buttonColor } : undefined}
              onMouseEnter={(e) => {
                if (variant === 'info') {
                  e.currentTarget.style.backgroundColor = styles.buttonHoverColor!;
                }
              }}
              onMouseLeave={(e) => {
                if (variant === 'info') {
                  e.currentTarget.style.backgroundColor = styles.buttonColor!;
                }
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}