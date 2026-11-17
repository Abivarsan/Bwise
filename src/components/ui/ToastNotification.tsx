import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}

interface ToastNotificationProps {
  toast: ToastData | null;
  onDismiss: () => void;
  durationMs?: number;
}

/**
 * Branded BWise Floating Toast Notification
 * Matches the BWise logo navy (#091426), warm honey-cream (#FFFDF7), and golden amber (#F59E0B) UI theme.
 */
export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toast,
  onDismiss,
  durationMs = 5500,
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [toast, onDismiss, durationMs]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          className="fixed top-5 right-4 sm:right-6 z-[110] w-[calc(100vw-2rem)] max-w-md pointer-events-auto"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border-2 p-4 shadow-[0_20px_50px_rgba(9,20,38,0.18)] backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#FFFDF7]/98 border-amber-400 text-[#091426]'
                : toast.type === 'warning'
                ? 'bg-[#FFFBEB]/98 border-amber-500 text-[#091426]'
                : 'bg-[#FEF2F2]/98 border-red-400 text-stone-900'
            }`}
          >
            {/* Top Brand Accent Strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                toast.type === 'success'
                  ? 'bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706]'
                  : toast.type === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
            />

            <div className="flex items-start gap-3.5 pt-0.5">
              {/* Status Icon Badge */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  toast.type === 'success'
                    ? 'bg-[#091426] text-amber-400 shadow-xs'
                    : toast.type === 'warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                {toast.type === 'error' && <XCircle className="w-5 h-5" />}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-sm font-extrabold tracking-tight text-[#091426]">
                  {toast.title}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Close notification"
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
