import emailjs from '@emailjs/browser';

export interface EmailJSTemplateParams extends Record<string, unknown> {
  /** Subject line for the BWise Company Notification template ({{email_subject}}) */
  email_subject: string;
  /** Raw HTML body for the BWise Company Notification template ({{{email_html}}}) */
  email_html: string;
  /** Client email used for Reply-To and Auto-Reply recipient ({{user_email}}) */
  user_email: string;
  /** Client name for Auto-Reply fallback ({{user_name}}) */
  user_name: string;
  /** Form identifier ({{form_type}}) */
  form_type: string;
  /** Plain-text summary fallback ({{reply_summary}}) */
  reply_summary: string;
  /** Subject line for the Client Auto-Reply template ({{user_reply_subject}}) */
  user_reply_subject: string;
  /** Raw HTML body for the Client Auto-Reply template ({{{user_reply_html}}}) */
  user_reply_html: string;
}

export interface SpamProtectionMeta {
  /** Hidden honeypot field value — must be empty for legitimate human users */
  honeypot?: string;
  /** Timestamp (ms) when the form was mounted or opened */
  formOpenedAt?: number;
}

export interface SendEmailResult {
  ok: boolean;
  error?: string;
  isRateLimited?: boolean;
  blockedSilently?: boolean;
}

const COOLDOWN_STORAGE_KEY = 'bwise_last_email_sent_at';
const COOLDOWN_MS = 60 * 1000; // 60-second anti-spam cooldown between submissions
const MIN_FILL_TIME_MS = 1500; // Minimum 1.5s human interaction time

/**
 * Sends form submission emails via EmailJS using the External React HTML Template strategy
 * (1 Company Notification Template + 1 Linked User Auto-Reply Template).
 * Includes multi-layer client-side spam protection to safeguard EmailJS quota.
 */
export const sendFormEmail = async (
  templateParams: EmailJSTemplateParams,
  securityMeta: SpamProtectionMeta = {}
): Promise<SendEmailResult> => {
  // 1. Layer 1: Honeypot Trap (Silent fake-success so bots don't retry or burn EmailJS quota)
  if (securityMeta.honeypot && securityMeta.honeypot.trim().length > 0) {
    console.warn('[BWise Spam Guard] Honeypot triggered. Submission silently dropped.');
    return { ok: true, blockedSilently: true };
  }

  // 2. Layer 2: Minimum Fill-Time Bot Speed Check
  if (
    securityMeta.formOpenedAt &&
    Date.now() - securityMeta.formOpenedAt < MIN_FILL_TIME_MS
  ) {
    console.warn('[BWise Spam Guard] Submission faster than human threshold.');
    return {
      ok: false,
      error: 'Submission was too fast. Please review your details and try again.',
    };
  }

  // 3. Layer 3: 60-Second Rate-Limiting Cooldown
  try {
    const lastSentRaw = sessionStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (lastSentRaw) {
      const elapsed = Date.now() - Number(lastSentRaw);
      if (elapsed < COOLDOWN_MS) {
        const remainingSec = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
        return {
          ok: false,
          isRateLimited: true,
          error: `Please wait ${remainingSec}s before submitting another request.`,
        };
      }
    }
  } catch {
    // Ignore sessionStorage errors in restricted privacy modes
  }

  // 4. Verify EmailJS Environment Variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  const isPlaceholder = (val?: string) =>
    !val ||
    val.trim() === '' ||
    val.startsWith('your_') ||
    val === 'YOUR_SERVICE_ID' ||
    val === 'YOUR_TEMPLATE_ID' ||
    val === 'YOUR_PUBLIC_KEY';

  if (isPlaceholder(serviceId) || isPlaceholder(templateId) || isPlaceholder(publicKey)) {
    return {
      ok: false,
      error:
        'EmailJS is not configured yet. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.',
    };
  }

  // 5. Dispatch via EmailJS
  try {
    await emailjs.send(serviceId!, templateId!, templateParams, {
      publicKey: publicKey!,
    });

    try {
      sessionStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
    } catch {
      // Ignore storage errors
    }

    return { ok: true };
  } catch (err: unknown) {
    console.error('[BWise EmailJS Error]', err);
    const errText =
      typeof err === 'object' && err !== null && 'text' in err
        ? String((err as { text: unknown }).text)
        : err instanceof Error
        ? err.message
        : 'Unable to send email right now. Please try again or email us at hello@bwise.lk.';

    return {
      ok: false,
      error: errText,
    };
  }
};
