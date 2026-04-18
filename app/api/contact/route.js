import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Rate limiting: simple in-memory map (resets on cold start)
const rateMap = new Map();
const RATE_LIMIT = 3;       // max requests
const RATE_WINDOW = 60_000; // per 60 seconds

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { count: 1, start: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  rateMap.set(ip, { count: entry.count + 1, start: entry.start });
  return true;
}

export async function POST(request) {
  try {
    // ── Rate limit
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    // ── Parse + validate body
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Length guards (anti-spam)
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Input exceeds allowed length.' },
        { status: 400 }
      );
    }

    // ── Send email via Resend (to you)
    const { data, error } = await resend.emails.send({
      from: 'Tanish Portfolio <contact@tanish.website>', 
      to: [process.env.CONTACT_EMAIL || 'tanishrajput9@gmail.com'], 
      replyTo: email,
      subject: `New Inquiry: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAF8; color: #111111; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; padding: 40px 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E8E6E0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }
            .header { background: #111111; padding: 32px; text-align: left; }
            .header-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #C4614A; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px; }
            .header-title { font-size: 20px; font-weight: 700; color: #FAFAF8; margin: 0; }
            .content { padding: 32px; }
            .info-grid { display: table; width: 100%; margin-bottom: 24px; border-bottom: 1px solid #F4F2EE; padding-bottom: 24px; }
            .info-row { display: table-row; }
            .info-cell-label { display: table-cell; width: 100px; padding-bottom: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #A3A3A3; text-transform: uppercase; letter-spacing: 0.1em; }
            .info-cell-value { display: table-cell; padding-bottom: 12px; font-size: 14px; font-weight: 600; color: #111111; }
            .message-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #C4614A; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
            .message-body { font-size: 15px; line-height: 1.7; color: #525252; white-space: pre-wrap; background: #FDFBFA; padding: 24px; border-radius: 12px; border: 1px solid #F3EFED; }
            .footer { padding: 24px 32px; background: #FAFAF8; border-top: 1px solid #E8E6E0; text-align: center; }
            .footer-text { font-size: 11px; color: #A3A3A3; line-height: 1.5; margin: 0; }
            .accent { color: #C4614A; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="header-label">System Notification</div>
                <h1 class="header-title">Incoming Shipment <span class="accent">/</span> Message</h1>
              </div>

              <div class="content">
                <div class="info-grid">
                  <div class="info-row">
                    <div class="info-cell-label">Sender</div>
                    <div class="info-cell-value">${name}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-cell-label">Channel</div>
                    <div class="info-cell-value">${email}</div>
                  </div>
                </div>

                <div class="message-label">Transmission</div>
                <div class="message-body">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              </div>

              <div class="footer">
                <p class="footer-text">
                  Sent from your Portfolio Engine · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST
                </p>
                <p class="footer-text" style="margin-top: 4px;">
                  Reply directly to this email to open a secure line with <span style="color: #111111; font-weight: 600;">${name}</span>.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // ── Also send a confirmation to the sender (from your domain)
    await resend.emails.send({
      from: 'Tanish Rajput <contact@tanish.website>',
      to: [email],
      subject: "Got your message! I'll be in touch.",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, sans-serif; background: #080B12; color: #F0F4FF; margin: 0; padding: 0; }
            .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
            .accent { color: #00D4FF; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Hey ${name}! 👋</h2>
            <p style="color: #9CA3AF; line-height: 1.6;">
              Got your message — I'll get back to you soon (usually within 24 hours).
            </p>
            <p style="color: #9CA3AF; line-height: 1.6;">
              In the meantime, feel free to check out my projects on 
              <a href="https://github.com/tanishra" style="color: #00D4FF;">GitHub</a> or connect on 
              <a href="https://linkedin.com/in/tr26" style="color: #00D4FF;">LinkedIn</a>.
            </p>
            <p style="color: #6B7280; font-size: 13px; margin-top: 32px;">— Tanish Rajput, AI Engineer</p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
