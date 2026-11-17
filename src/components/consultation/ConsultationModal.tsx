import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { sendFormEmail } from '../../utils/sendEmail';
import {
  buildConsultationEmailHTML,
  buildConsultationAutoReplyHTML,
} from '../../utils/emailTemplates';
import { ToastNotification, ToastData } from '../ui/ToastNotification';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  address: string;
  helpMessage: string;
}

interface FormErrors {
  fullName?: string;
  companyName?: string;
  workEmail?: string;
  phoneNumber?: string;
  address?: string;
  helpMessage?: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  companyName: '',
  workEmail: '',
  phoneNumber: '',
  address: '',
  helpMessage: '',
};

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const openedAtRef = useRef<number>(Date.now());
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const helpMessageInputRef = useRef<HTMLTextAreaElement>(null);

  // Preserve and restore focus on open/close
  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = Date.now();
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      // Prevent background scrolling while modal is active
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first field after animation starts
      const timer = setTimeout(() => {
        fullNameInputRef.current?.focus();
      }, 100);

      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    } else {
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
      // Reset state on close
      const resetTimer = setTimeout(() => {
        setIsSuccess(false);
        setErrors({});
        setTouched({});
        setHoneypot('');
        setFormData(INITIAL_FORM);
      }, 300);
      return () => clearTimeout(resetTimer);
    }
  }, [isOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Please enter your full name.';
        return undefined;
      case 'companyName':
        if (!value.trim()) return 'Company Name is required.';
        return undefined;
      case 'workEmail':
        if (!value.trim()) return 'Work Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid work email address.';
        }
        return undefined;
      case 'phoneNumber':
        if (!value.trim()) return 'Phone Number is required.';
        if (!/^[\d\s+\-().]{7,20}$/.test(value.trim())) {
          return 'Please enter a valid phone number.';
        }
        return undefined;
      case 'address':
        if (!value.trim()) return 'Address is required.';
        if (value.trim().length < 3) return 'Please enter a valid address.';
        return undefined;
      case 'helpMessage':
        if (!value.trim()) return 'Please let us know how we can help you.';
        if (value.trim().length < 5) return 'Please provide a brief description (at least 5 characters).';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fullNameError = validateField('fullName', formData.fullName);
    const companyError = validateField('companyName', formData.companyName);
    const emailError = validateField('workEmail', formData.workEmail);
    const phoneError = validateField('phoneNumber', formData.phoneNumber);
    const addressError = validateField('address', formData.address);
    const helpMessageError = validateField('helpMessage', formData.helpMessage);

    const newErrors: FormErrors = {
      fullName: fullNameError,
      companyName: companyError,
      workEmail: emailError,
      phoneNumber: phoneError,
      address: addressError,
      helpMessage: helpMessageError,
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      companyName: true,
      workEmail: true,
      phoneNumber: true,
      address: true,
      helpMessage: true,
    });

    // Check if any error exists
    if (fullNameError) {
      fullNameInputRef.current?.focus();
      return;
    }
    if (companyError) {
      companyInputRef.current?.focus();
      return;
    }
    if (emailError) {
      emailInputRef.current?.focus();
      return;
    }
    if (phoneError) {
      phoneInputRef.current?.focus();
      return;
    }
    if (addressError) {
      addressInputRef.current?.focus();
      return;
    }
    if (helpMessageError) {
      helpMessageInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    const payloadData = {
      ...formData,
      helpDetails: formData.helpMessage,
    };

    const result = await sendFormEmail(
      {
        // Company notification template variables
        email_subject: `Free Consultation: ${formData.fullName} (${formData.companyName})`,
        email_html: buildConsultationEmailHTML(payloadData),

        // Shared routing & fallback variables
        form_type: 'Free Consultation',
        user_name: formData.fullName,
        user_email: formData.workEmail,
        reply_summary: `Thank you for booking a free consultation for ${formData.companyName}. Our team will contact you at ${formData.phoneNumber} or via email shortly to confirm your session.`,

        // User auto-reply template variables
        user_reply_subject: 'Consultation Request Confirmed – BWise',
        user_reply_html: buildConsultationAutoReplyHTML(payloadData),
      },
      {
        honeypot,
        formOpenedAt: openedAtRef.current,
      }
    );

    setIsSubmitting(false);

    if (result.ok) {
      setIsSuccess(true);
      setToast({
        id: String(Date.now()),
        type: 'success',
        title: 'Consultation Request Sent!',
        message: `Confirmation sent to ${formData.workEmail}. Our Jaffna studio team will reach out within 24 hours.`,
      });
    } else {
      setToast({
        id: String(Date.now()),
        type: result.isRateLimited ? 'warning' : 'error',
        title: result.isRateLimited ? 'Please Wait Before Retrying' : 'Email Delivery Notice',
        message:
          result.error || 'Could not send request right now. Please try again or email hello@bwise.lk.',
      });
    }
  };

  return (
    <>
      <ToastNotification toast={toast} onDismiss={() => setToast(null)} />
      <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-modal-title"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-[540px] rounded-[28px] sm:rounded-[34px] bg-[#FFFDF9] text-stone-900 shadow-[0_24px_70px_rgba(245,158,11,0.22)] overflow-hidden border-2 border-amber-300/70 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with subtle warm amber gradient & honeycomb corner art */}
            <div className="relative px-6 sm:px-8 pt-7 sm:pt-8 pb-4 shrink-0 bg-gradient-to-b from-[#FFF8E7] via-[#FFFDF9] to-[#FFFDF9] border-b border-amber-200/60 overflow-hidden">
              {/* Decorative Honeycomb Corner Line Art */}
              <div
                className="hidden sm:block absolute -top-10 -right-10 w-44 h-48 opacity-20 pointer-events-none z-0"
                aria-hidden="true"
              >
                <svg viewBox="0 0 200 300" fill="none" stroke="#D97706" strokeWidth="1.5">
                  <polygon points="60,10 100,32 100,78 60,100 20,78 20,32" />
                  <polygon points="140,10 180,32 180,78 140,100 100,78 100,32" />
                  <polygon points="100,78 140,100 140,146 100,168 60,146 60,100" />
                </svg>
              </div>

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close consultation modal"
                className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-amber-950 hover:bg-amber-100/70 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* BWise Honey Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Free Consultation</span>
              </div>

              {/* Main Heading & Subtitle */}
              <h2
                id="consultation-modal-title"
                className="text-2xl sm:text-[30px] font-extrabold text-stone-950 tracking-tight leading-tight"
              >
                {isSuccess ? 'Consultation Booked!' : 'Book a Consultation'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {isSuccess
                  ? 'Your briefing details have been routed to our senior strategy pod.'
                  : "Fill in your details and we'll get back to you to schedule a personalised consultation."}
              </p>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="px-6 sm:px-8 pt-5 pb-8 overflow-y-auto">
              {isSuccess ? (
                /* Success Confirmation State */
                <div className="py-6 sm:py-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-950">
                    Thank You, {formData.fullName.split(' ')[0] || 'Partner'}!
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
                    We have received your briefing for{' '}
                    <strong className="text-stone-950">{formData.companyName || 'your organization'}</strong>.
                    Our technical and growth leads will review your requirements and reach out to{' '}
                    <strong className="text-stone-950">{formData.workEmail}</strong> within 4 business hours.
                  </p>

                  <div className="pt-4 w-full">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-3.5 rounded-2xl sm:rounded-full bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
                  {/* 1. Full Name (Required) */}
                  <div>
                    <label
                      htmlFor="consultation-fullName"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      Full Name <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={fullNameInputRef}
                      type="text"
                      id="consultation-fullName"
                      name="fullName"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={touched.fullName && !!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none ${
                        touched.fullName && errors.fullName
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p id="fullName-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* 2. Company Name (Required) */}
                  <div>
                    <label
                      htmlFor="consultation-companyName"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      Company Name <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={companyInputRef}
                      type="text"
                      id="consultation-companyName"
                      name="companyName"
                      autoComplete="organization"
                      required
                      aria-required="true"
                      aria-invalid={touched.companyName && !!errors.companyName}
                      aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      onBlur={() => handleBlur('companyName')}
                      placeholder="Acme Inc."
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none ${
                        touched.companyName && errors.companyName
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.companyName && errors.companyName && (
                      <p id="companyName-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* 3. Work Email (Required) */}
                  <div>
                    <label
                      htmlFor="consultation-workEmail"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      Work Email <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      id="consultation-workEmail"
                      name="workEmail"
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck="false"
                      required
                      aria-required="true"
                      aria-invalid={touched.workEmail && !!errors.workEmail}
                      aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
                      value={formData.workEmail}
                      onChange={(e) => handleChange('workEmail', e.target.value)}
                      onBlur={() => handleBlur('workEmail')}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none ${
                        touched.workEmail && errors.workEmail
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.workEmail && errors.workEmail && (
                      <p id="workEmail-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.workEmail}
                      </p>
                    )}
                  </div>

                  {/* 4. Phone Number (Required) */}
                  <div>
                    <label
                      htmlFor="consultation-phoneNumber"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      Phone Number <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      id="consultation-phoneNumber"
                      name="phoneNumber"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      aria-required="true"
                      aria-invalid={touched.phoneNumber && !!errors.phoneNumber}
                      aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      onBlur={() => handleBlur('phoneNumber')}
                      placeholder="077 123 4567"
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none ${
                        touched.phoneNumber && errors.phoneNumber
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p id="phoneNumber-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* 5. Address (Required) */}
                  <div>
                    <label
                      htmlFor="consultation-address"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      Address <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={addressInputRef}
                      type="text"
                      id="consultation-address"
                      name="address"
                      autoComplete="street-address"
                      required
                      aria-required="true"
                      aria-invalid={touched.address && !!errors.address}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      onBlur={() => handleBlur('address')}
                      placeholder="Jaffna, Sri Lanka"
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none ${
                        touched.address && errors.address
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.address && errors.address && (
                      <p id="address-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* 6. How Can We Help? (Required - Textarea) */}
                  <div>
                    <label
                      htmlFor="consultation-helpMessage"
                      className="block text-xs sm:text-sm font-bold text-stone-900 mb-1"
                    >
                      How Can We Help? <span className="text-amber-600 font-extrabold" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      ref={helpMessageInputRef}
                      id="consultation-helpMessage"
                      name="helpMessage"
                      rows={3}
                      required
                      aria-required="true"
                      aria-invalid={touched.helpMessage && !!errors.helpMessage}
                      aria-describedby={errors.helpMessage ? 'helpMessage-error' : undefined}
                      value={formData.helpMessage}
                      onChange={(e) => handleChange('helpMessage', e.target.value)}
                      onBlur={() => handleBlur('helpMessage')}
                      placeholder="Tell us about your project goals, timeline, or requirements..."
                      className={`w-full px-4 py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base text-stone-900 placeholder:text-stone-400 transition-all focus:outline-none resize-y ${
                        touched.helpMessage && errors.helpMessage
                          ? 'bg-red-50/40 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15'
                          : 'bg-[#FAF8F5]/90 hover:bg-white border-amber-200/90 hover:border-amber-300 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                      }`}
                    />
                    {touched.helpMessage && errors.helpMessage && (
                      <p id="helpMessage-error" className="text-xs text-red-600 font-medium mt-1">
                        {errors.helpMessage}
                      </p>
                    )}
                  </div>

                  {/* Hidden Spam Protection Honeypot Field (Off-Screen) */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="consultation-website-url">Website</label>
                    <input
                      type="text"
                      id="consultation-website-url"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Submit Request Button — BWise Signature Golden Honey Yellow Gradient */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] disabled:opacity-75 text-[#14111B] font-extrabold text-base shadow-[0_10px_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-[#14111B]" />
                          <span>Sending Consultation Request...</span>
                        </>
                      ) : (
                        <span>Submit Request</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </>
  );
};
