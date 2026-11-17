/**
 * BWise External HTML Email Templates for EmailJS (2-Template Free Tier Strategy)
 *
 * Designed with table-based layouts and inline CSS for Gmail, Outlook, Apple Mail,
 * and mobile email client compatibility. Styled using the official BWise Logo palette
 * (Deep Navy #091426, Signature Honey Gold #F59E0B / #F7A61C, and Hive Cream #FAF8F5).
 */

export interface ConsultationEmailData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  address: string;
  helpMessage?: string;
  helpDetails?: string;
}

export interface InquiryEmailData {
  serviceCategory: string;
  name: string;
  email: string;
  companyName?: string;
  primaryRequirement: string;
  projectDetails: string;
}

/**
 * Prevents user-submitted characters (<, >, &, ", ') from breaking the HTML email layout
 */
export const escapeHtml = (str = ''): string =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Shared BWise Brand Wordmark & Logo Header Block for Email Headers
 * Uses the official BWise dark/light palette (#091426 navy + #F7A61C / #F59E0B honey gold)
 */
const buildBrandLogoMarkup = (): string => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <td valign="middle" style="padding-right:10px;">
        <!-- Stylized Honey-Gold Bee Wing Stripes Emblem matching BWise Logo -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="width:18px; height:7px; background-color:#F7A61C; border-radius:4px 8px 2px 4px;"></td>
          </tr>
          <tr><td style="height:3px;"></td></tr>
          <tr>
            <td style="width:15px; height:5px; background-color:#F59E0B; border-radius:3px;"></td>
          </tr>
          <tr><td style="height:3px;"></td></tr>
          <tr>
            <td style="width:11px; height:4px; background-color:#D97706; border-radius:2px 2px 2px 6px;"></td>
          </tr>
        </table>
      </td>
      <td valign="middle">
        <div style="font-family:'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:24px; font-weight:900; letter-spacing:-0.6px; line-height:1; color:#FFFFFF;">
          B<span style="color:#FFFFFF;">w</span><span style="color:#F7A61C;">i</span>s<span style="color:#F59E0B;">e</span>
        </div>
        <div style="margin-top:3px; font-size:8px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#D1D5DB;">
          DIGITAL MARKETING <span style="color:#F59E0B; font-weight:900;">&amp;</span> SOFTWARE SOLUTIONS
        </div>
      </td>
    </tr>
  </table>
`;

/**
 * ============================================================================
 * TEMPLATE 1: Book a Free Consultation Modal (Company Notification)
 * Matches fields: Full Name, Company Name, Work Email, Phone Number, Address, How Can We Help?
 * ============================================================================
 */
export const buildConsultationEmailHTML = ({
  fullName,
  companyName,
  workEmail,
  phoneNumber,
  address,
  helpMessage,
  helpDetails,
}: ConsultationEmailData): string => {
  const safeName = escapeHtml(fullName);
  const safeCompany = escapeHtml(companyName);
  const safeEmail = escapeHtml(workEmail);
  const safePhone = escapeHtml(phoneNumber);
  const safeAddress = escapeHtml(address || 'Not provided');
  const safeHelp = escapeHtml(helpMessage || helpDetails || 'No additional notes provided.');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1A1612;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:2px solid #FDE68A; border-radius:20px; overflow:hidden; box-shadow:0 12px 32px rgba(26,22,18,0.06);">
          
          <!-- Top Signature Honey-Gold Accent Bar -->
          <tr>
            <td style="height:6px; background:linear-gradient(90deg, #FBBF24, #F59E0B, #D97706); background-color:#F59E0B;"></td>
          </tr>

          <!-- Brand Top Bar (Logo Navy Theme #091426) -->
          <tr>
            <td style="padding:22px 32px; background-color:#091426;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" valign="middle">
                    ${buildBrandLogoMarkup()}
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; padding:5px 13px; background-color:rgba(245,158,11,0.18); border:1px solid #F59E0B; border-radius:999px; color:#FBBF24; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase;">
                      &#10024; Free Consultation
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Warm Honey-Cream Subheader -->
          <tr>
            <td style="padding:24px 32px 20px 32px; background-color:#FFFDF7; border-bottom:1px solid #FDE68A;">
              <h1 style="margin:0 0 6px 0; font-size:22px; font-weight:800; color:#091426;">
                New Consultation Request
              </h1>
              <p style="margin:0; font-size:14px; line-height:1.5; color:#4B5563;">
                <strong style="color:#091426;">${safeName}</strong> from <strong style="color:#B45309;">${safeCompany}</strong> requested a personalised 1-on-1 consultation.
              </p>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; width:36%; font-size:13px; color:#78716C; font-weight:700;">Full Name</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px; color:#1A1612; font-weight:700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:13px; color:#78716C; font-weight:700;">Company Name</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px; color:#1A1612; font-weight:600;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:13px; color:#78716C; font-weight:700;">Work Email</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px;">
                    <a href="mailto:${safeEmail}" style="color:#D97706; text-decoration:none; font-weight:700;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:13px; color:#78716C; font-weight:700;">Phone Number</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px;">
                    <a href="tel:${safePhone}" style="color:#091426; text-decoration:none; font-weight:700;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:11px 0; font-size:13px; color:#78716C; font-weight:700;">Address</td>
                  <td style="padding:11px 0; font-size:14px; color:#1A1612; font-weight:600;">${safeAddress}</td>
                </tr>
              </table>

              <!-- How Can We Help Box -->
              <div style="margin-top:20px; padding:18px; background-color:#FFF8E7; border:1px solid #FDE68A; border-left:4px solid #F59E0B; border-radius:12px;">
                <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.6px; color:#B45309; margin-bottom:6px;">
                  How Can We Help?
                </div>
                <div style="font-size:14px; line-height:1.65; color:#1A1612; white-space:pre-line;">${safeHelp}</div>
              </div>

              <!-- Quick Action Button -->
              <div style="margin-top:26px; text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re:%20Your%20Free%20Consultation%20with%20BWise" style="display:inline-block; padding:13px 30px; background:linear-gradient(90deg, #FBBF24, #F59E0B); background-color:#F59E0B; color:#14111B; font-size:14px; font-weight:800; text-decoration:none; border-radius:999px; box-shadow:0 6px 18px rgba(245,158,11,0.3);">
                  Schedule &amp; Reply to ${safeName} &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px; background-color:#FAF8F5; border-top:1px solid #F4ECE1; text-align:center; font-size:12px; color:#78716C;">
              Sent via <strong style="color:#091426;">BWise</strong> &bull; Consultation Booking Modal &bull; Jaffna, Sri Lanka
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * ============================================================================
 * TEMPLATE 2: Contact / Project Inquiry Section (Company Notification)
 * Matches fields: Service Category, Your Name, Email Address, Company Name, Primary Requirement, Project Details & Goals
 * ============================================================================
 */
export const buildInquiryEmailHTML = ({
  serviceCategory,
  name,
  email,
  companyName,
  primaryRequirement,
  projectDetails,
}: InquiryEmailData): string => {
  const safeCategory = escapeHtml(serviceCategory || 'General Inquiry');
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(companyName || 'Not specified');
  const safeRequirement = escapeHtml(primaryRequirement || 'Not specified');
  const safeDetails = escapeHtml(projectDetails);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1A1612;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:2px solid #FDE68A; border-radius:20px; overflow:hidden; box-shadow:0 12px 32px rgba(26,22,18,0.06);">
          
          <!-- Top Signature Honey-Gold Accent Bar -->
          <tr>
            <td style="height:6px; background:linear-gradient(90deg, #FBBF24, #F59E0B, #D97706); background-color:#F59E0B;"></td>
          </tr>

          <!-- Top Dark Navy + Amber Header (#091426 matching BWise Logo) -->
          <tr>
            <td style="padding:26px 32px; background-color:#091426; color:#FFFFFF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td align="left" valign="middle">
                    ${buildBrandLogoMarkup()}
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; padding:5px 13px; background-color:rgba(245,158,11,0.18); border:1px solid #F59E0B; border-radius:999px; color:#FBBF24; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase;">
                      New Project Inquiry
                    </span>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 6px 0; font-size:22px; font-weight:800; color:#FFFFFF;">
                ${safeCategory}
              </h1>
              <p style="margin:0; font-size:14px; color:#D1D5DB;">
                Submitted by <strong style="color:#FBBF24;">${safeName}</strong> via the BWise Contact Page.
              </p>
            </td>
          </tr>

          <!-- Selected Primary Requirement Banner -->
          <tr>
            <td style="padding:14px 32px; background-color:#FFF8E7; border-bottom:1px solid #FDE68A;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px; color:#92400E; font-weight:800; text-transform:uppercase; letter-spacing:0.5px;">Primary Requirement:</td>
                  <td align="right" style="font-size:13px; color:#091426; font-weight:800;">${safeRequirement}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td style="padding:24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; width:38%; font-size:13px; color:#78716C; font-weight:700;">Client Name</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px; color:#1A1612; font-weight:700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:13px; color:#78716C; font-weight:700;">Email Address</td>
                  <td style="padding:11px 0; border-bottom:1px solid #F4ECE1; font-size:14px;">
                    <a href="mailto:${safeEmail}" style="color:#D97706; text-decoration:none; font-weight:700;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:11px 0; font-size:13px; color:#78716C; font-weight:700;">Company / Business</td>
                  <td style="padding:11px 0; font-size:14px; color:#1A1612; font-weight:600;">${safeCompany}</td>
                </tr>
              </table>

              <!-- Project Details & Goals Box -->
              <div style="margin-top:20px; padding:18px; background-color:#FFFDF7; border:1px solid #FDE68A; border-left:4px solid #F59E0B; border-radius:12px;">
                <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.6px; color:#B45309; margin-bottom:8px;">
                  Project Details &amp; Goals
                </div>
                <div style="font-size:14px; line-height:1.65; color:#1A1612; white-space:pre-line;">${safeDetails}</div>
              </div>

              <!-- Quick Action Button -->
              <div style="margin-top:26px; text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(serviceCategory || 'Project')}%20Inquiry%20-%20BWise" style="display:inline-block; padding:13px 30px; background:linear-gradient(90deg, #FBBF24, #F59E0B); background-color:#F59E0B; color:#14111B; font-size:14px; font-weight:800; text-decoration:none; border-radius:999px; box-shadow:0 6px 18px rgba(245,158,11,0.3);">
                  Reply to ${safeName} &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px; background-color:#FAF8F5; border-top:1px solid #F4ECE1; text-align:center; font-size:12px; color:#78716C;">
              Sent via <strong style="color:#091426;">BWise</strong> &bull; Project Inquiry Form &bull; Jaffna, Sri Lanka
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Shared BWise Client-Facing Auto-Reply Shell (Header + Summary + What Happens Next + Footer)
 */
interface ClientEmailLayoutOptions {
  badgeText: string;
  title: string;
  greetingName: string;
  introText: string;
  summaryRowsHtml: string;
  notesLabel: string;
  notesText: string;
}

const wrapClientEmailLayout = ({
  badgeText,
  title,
  greetingName,
  introText,
  summaryRowsHtml,
  notesLabel,
  notesText,
}: ClientEmailLayoutOptions): string => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FAF8F5; font-family:'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1A1612;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:2px solid #FDE68A; border-radius:20px; overflow:hidden; box-shadow:0 12px 32px rgba(26,22,18,0.06);">
          
          <!-- Top Signature Honey-Gold Accent Bar -->
          <tr>
            <td style="height:6px; background:linear-gradient(90deg, #FBBF24, #F59E0B, #D97706); background-color:#F59E0B;"></td>
          </tr>

          <!-- Brand Header (#091426 Deep Navy from BWise Logo) -->
          <tr>
            <td style="padding:28px 32px; background-color:#091426; text-align:left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    ${buildBrandLogoMarkup()}
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; padding:5px 13px; background-color:rgba(245,158,11,0.16); border:1px solid #F59E0B; border-radius:999px; color:#FBBF24; font-size:11px; font-weight:800; letter-spacing:0.6px; text-transform:uppercase;">
                      ${badgeText}
                    </span>
                  </td>
                </tr>
              </table>

              <h1 style="margin:22px 0 8px 0; font-size:22px; font-weight:800; line-height:1.3; color:#FFFFFF;">
                ${title}
              </h1>
              <p style="margin:0; font-size:14px; line-height:1.6; color:#D1D5DB;">
                Hi <strong style="color:#FFFFFF;">${greetingName}</strong>, ${introText}
              </p>
            </td>
          </tr>

          <!-- Submitted Summary Card -->
          <tr>
            <td style="padding:28px 32px 12px 32px;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.6px; color:#B45309; margin-bottom:12px;">
                Your Submission Summary
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFF8E7; border:1px solid #FDE68A; border-radius:14px; padding:6px 18px;">
                ${summaryRowsHtml}
              </table>

              ${
                notesText
                  ? `
              <div style="margin-top:16px; padding:15px 18px; background-color:#FAF8F5; border:1px solid #F4ECE1; border-left:4px solid #F59E0B; border-radius:10px;">
                <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px; color:#78716C; margin-bottom:5px;">
                  ${notesLabel}
                </div>
                <div style="font-size:13px; line-height:1.6; color:#1A1612; white-space:pre-line;">${notesText}</div>
              </div>`
                  : ''
              }
            </td>
          </tr>

          <!-- What Happens Next Timeline -->
          <tr>
            <td style="padding:16px 32px 28px 32px;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.6px; color:#091426; margin-bottom:14px;">
                What Happens Next
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="34" valign="top" style="padding-bottom:12px;">
                    <span style="display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background-color:#FFF8E7; border:1px solid #F59E0B; border-radius:50%; color:#B45309; font-size:12px; font-weight:800;">1</span>
                  </td>
                  <td style="padding-bottom:12px; font-size:13px; line-height:1.55; color:#4B5563;">
                    <strong style="color:#091426;">Requirement Review:</strong> Our engineering &amp; marketing specialists review your goals and match you with the right lead strategist.
                  </td>
                </tr>
                <tr>
                  <td width="34" valign="top" style="padding-bottom:12px;">
                    <span style="display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background-color:#FFF8E7; border:1px solid #F59E0B; border-radius:50%; color:#B45309; font-size:12px; font-weight:800;">2</span>
                  </td>
                  <td style="padding-bottom:12px; font-size:13px; line-height:1.55; color:#4B5563;">
                    <strong style="color:#091426;">Direct Follow-Up (Within 24 Hours):</strong> We will reach out via email or phone from our Jaffna studio to schedule a convenient time.
                  </td>
                </tr>
                <tr>
                  <td width="34" valign="top">
                    <span style="display:inline-block; width:24px; height:24px; line-height:24px; text-align:center; background-color:#FFF8E7; border:1px solid #F59E0B; border-radius:50%; color:#B45309; font-size:12px; font-weight:800;">3</span>
                  </td>
                  <td style="font-size:13px; line-height:1.55; color:#4B5563;">
                    <strong style="color:#091426;">Tailored Action Plan:</strong> You receive clear scope, timeline, and growth strategy recommendations for your business.
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <div style="margin-top:26px; text-align:center;">
                <a href="https://bwise-two.vercel.app/services" style="display:inline-block; padding:13px 30px; background:linear-gradient(90deg, #FBBF24, #F59E0B); background-color:#F59E0B; color:#14111B; font-size:14px; font-weight:800; text-decoration:none; border-radius:999px; box-shadow:0 6px 18px rgba(245,158,11,0.28);">
                  Explore BWise Solutions &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px; background-color:#FAF8F5; border-top:1px solid #F4ECE1; text-align:center;">
              <p style="margin:0 0 4px 0; font-size:12px; font-weight:700; color:#091426;">
                BWise &bull; Digital Marketing &amp; Software Solutions &bull; Jaffna, Sri Lanka
              </p>
              <p style="margin:0; font-size:11px; color:#78716C;">
                Need to add something urgent? Simply reply directly to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const buildSummaryRow = (label: string, value: string, isLast = false): string => `
  <tr>
    <td style="padding:10px 0; ${isLast ? '' : 'border-bottom:1px solid #FDE68A;'} width:38%; font-size:12px; color:#92400E; font-weight:700;">
      ${label}
    </td>
    <td style="padding:10px 0; ${isLast ? '' : 'border-bottom:1px solid #FDE68A;'} font-size:13px; color:#091426; font-weight:700; text-align:right;">
      ${value}
    </td>
  </tr>`;

/**
 * ============================================================================
 * USER AUTO-REPLY 1: Book a Free Consultation Confirmation
 * ============================================================================
 */
export const buildConsultationAutoReplyHTML = ({
  fullName,
  companyName,
  workEmail,
  phoneNumber,
  address,
  helpMessage,
  helpDetails,
}: ConsultationEmailData): string => {
  const safeName = escapeHtml(fullName);
  const safeCompany = escapeHtml(companyName);
  const safeEmail = escapeHtml(workEmail);
  const safePhone = escapeHtml(phoneNumber);
  const safeAddress = escapeHtml(address);
  const rawHelp = helpMessage || helpDetails || '';
  const safeHelp = rawHelp ? escapeHtml(rawHelp) : '';

  const rows = [
    buildSummaryRow('Company', safeCompany),
    buildSummaryRow('Work Email', safeEmail),
    buildSummaryRow('Phone Number', safePhone, !safeAddress),
    ...(safeAddress ? [buildSummaryRow('Location / Address', safeAddress, true)] : []),
  ].join('');

  return wrapClientEmailLayout({
    badgeText: '&#10003; Request Confirmed',
    title: 'Your Free Consultation is Reserved',
    greetingName: safeName,
    introText: `thank you for booking a free consultation for <strong style="color:#FBBF24;">${safeCompany}</strong>. We have received your details and will reach out shortly to schedule your session.`,
    summaryRowsHtml: rows,
    notesLabel: 'Your Consultation Notes',
    notesText: safeHelp,
  });
};

/**
 * ============================================================================
 * USER AUTO-REPLY 2: Contact / Project Inquiry Confirmation
 * ============================================================================
 */
export const buildInquiryAutoReplyHTML = ({
  serviceCategory,
  name,
  email,
  companyName,
  primaryRequirement,
  projectDetails,
}: InquiryEmailData): string => {
  const safeCategory = escapeHtml(serviceCategory || 'General Inquiry');
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(companyName || '');
  const safeRequirement = escapeHtml(primaryRequirement || 'Custom Solution');
  const safeDetails = escapeHtml(projectDetails);

  const rows = [
    buildSummaryRow('Selected Track', safeCategory),
    buildSummaryRow('Primary Requirement', safeRequirement),
    buildSummaryRow('Contact Email', safeEmail, !safeCompany),
    ...(safeCompany ? [buildSummaryRow('Company / Business', safeCompany, true)] : []),
  ].join('');

  return wrapClientEmailLayout({
    badgeText: '&#10003; Inquiry Received',
    title: 'We Have Received Your Project Inquiry',
    greetingName: safeName,
    introText: `thank you for reaching out to BWise regarding <strong style="color:#FBBF24;">${safeCategory}</strong>. Our team is reviewing your project goals and will get back to you within 24 hours.`,
    summaryRowsHtml: rows,
    notesLabel: 'Your Project Details & Goals',
    notesText: safeDetails,
  });
};
