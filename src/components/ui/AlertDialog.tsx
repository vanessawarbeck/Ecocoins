import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Button } from "./button";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  type?: "info" | "warning" | "success" | "confirm";
  confirmText?: string;
  cancelText?: string;
}

export function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = "info",
  confirmText = "OK",
  cancelText = "Abbrechen",
}: AlertDialogProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-amber-500" />;
      case "success":
        return <CheckCircle className="w-12 h-12 text-emerald-500" />;
      case "confirm":
        return <AlertTriangle className="w-12 h-12 text-rose-500" />;
      default:
        return <Info className="w-12 h-12 text-blue-500" />;
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-amber-100";
      case "success":
        return "bg-emerald-100";
      case "confirm":
        return "bg-rose-100";
      default:
        return "bg-blue-100";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 pb-4">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`${getIconBgColor()} rounded-full p-4 mb-4`}>
                    {getIcon()}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl text-gray-900 mb-2">
                    {title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 flex gap-3">
                {type === "confirm" || onConfirm ? (
                  <>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1"
                    >
                      {cancelText}
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      className={`flex-1 text-white ${
                        type === "confirm"
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {confirmText}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onClose}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {confirmText}
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
