import type { Handler, HandlerEvent } from "@netlify/functions";
import nodemailer from "nodemailer";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

interface SendEmailPayload {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed. Only POST is accepted." }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Missing request body." }),
      };
    }

    const payload: SendEmailPayload = JSON.parse(event.body);
    const { name, email, phone, service, message } = payload;

    if (!name || !email || !phone || !message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: "Visi obligātie lauki (vārds, e-pasts, tālrunis, ziņa) ir jāaizpilda.",
        }),
      };
    }

    const smtpHost = process.env.SMTP_HOST || "server54.areait.lv";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "info@sageonmedia.eu";
    const smtpTo = process.env.SMTP_TO_EMAIL || process.env.SMTP_TO || "info@sageonmedia.eu";
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      console.error("SMTP_PASS environment variable is not set.");
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: "Servera konfigurācijas kļūda: nav iestatīta SMTP_PASS parole.",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true, // Port 465 uses SSL/TLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const safeName = String(name).trim();
    const safeEmail = String(email).trim();
    const safePhone = String(phone).trim();
    const safeService = service ? String(service).trim() : "Nav norādīts";
    const safeMessage = String(message).trim();

    const mailOptions = {
      from: `"Sageon Media Web" <${smtpUser}>`,
      to: smtpTo,
      replyTo: safeEmail,
      subject: `Jauns pieteikums no mājaslapas: ${safeName} (${safeService})`,
      text: `Jauns pieteikums no sageonmedia.eu mājaslapas:

Vārds: ${safeName}
E-pasts: ${safeEmail}
Tālrunis: ${safePhone}
Izvēlētais pakalpojums: ${safeService}

Ziņojums:
${safeMessage}
`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c0e; color: #f4f4f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 24px; border-bottom: 2px solid #BAFC50; }
            .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 1px; }
            .logo span { color: #BAFC50; }
            .badge { display: inline-block; background-color: rgba(186, 252, 80, 0.15); color: #BAFC50; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-top: 8px; }
            .content { padding: 24px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid #27272a; padding-bottom: 12px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a1a1aa; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #ffffff; font-weight: 500; }
            .field-value a { color: #BAFC50; text-decoration: none; }
            .message-box { background-color: #121215; border: 1px solid #27272a; border-radius: 10px; padding: 16px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e4e4e7; }
            .footer { padding: 16px 24px; background-color: #121215; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">SAGEON<span>MEDIA</span></div>
              <div class="badge">Jauns klienta pieteikums</div>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="field-label">Klienta Vārds</div>
                <div class="field-value">${safeName}</div>
              </div>
              <div class="field-group">
                <div class="field-label">E-pasts</div>
                <div class="field-value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Tālrunis</div>
                <div class="field-value"><a href="tel:${safePhone}">${safePhone}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Pakalpojums</div>
                <div class="field-value">${safeService}</div>
              </div>
              <div class="field-group" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                <div class="field-label">Ziņojums</div>
                <div class="message-box">${safeMessage}</div>
              </div>
            </div>
            <div class="footer">
              Šī vēstule tika automātiski nosūtīta no sageonmedia.eu kontaktu formas.<br>
              Atbildot uz šo e-pastu, atbilde tiks nosūtīta tieši klientam: ${safeEmail}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: "Paldies! Jūsu ziņa ir veiksmīgi nosūtīta.",
      }),
    };
  } catch (error: any) {
    console.error("Error sending email in Netlify function:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: error?.message || "Neizdevās nosūtīt e-pastu. Lūdzu, mēģiniet vēlāk.",
      }),
    };
  }
};
