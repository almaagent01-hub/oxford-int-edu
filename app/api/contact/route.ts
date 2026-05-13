import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, country, university, qualification, message } =
      await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#f9f8f6;padding:32px;border-radius:12px">
        <div style="background:#0F2557;padding:24px 28px;border-radius:10px;margin-bottom:24px">
          <h2 style="color:#fff;margin:0;font-size:20px">New Enquiry — Oxford International Education Group</h2>
          <p style="color:rgba(255,255,255,.7);margin:6px 0 0;font-size:14px">Received via oxfordinternationaleducationalgroup.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e4e4ee">
          ${[
            ['Full Name', name],
            ['Email', email],
            ['WhatsApp / Phone', phone],
            ['Interested Country', country || '—'],
            ['Preferred University', university || '—'],
            ['Current Qualification', qualification || '—'],
          ]
            .map(
              ([label, value]) => `
            <tr style="border-bottom:1px solid #f0f0f8">
              <td style="padding:12px 18px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#4a4a6a;width:38%;background:#fafafa">${label}</td>
              <td style="padding:12px 18px;font-size:14px;color:#1a1a2a">${value}</td>
            </tr>`
            )
            .join('')}
          <tr>
            <td style="padding:12px 18px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#4a4a6a;background:#fafafa;vertical-align:top">Message</td>
            <td style="padding:12px 18px;font-size:14px;color:#1a1a2a;white-space:pre-wrap">${message || '—'}</td>
          </tr>
        </table>
        <p style="font-size:12px;color:#9d9c97;margin-top:20px;text-align:center">
          Oxford International Education Group · HiLITE Business Park, Kozhikode, Kerala 673014
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Oxford Int'l Edu Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL ?? 'info@oxfordinternationaleducationalgroup.com',
      replyTo: email,
      subject: `New Enquiry: ${name} — ${country || 'General'} — Oxford Int'l Edu`,
      html,
    });

    // Auto-reply to the student
    await transporter.sendMail({
      from: `"Oxford International Education Group" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We've received your enquiry — Oxford Int'l Education Group",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#0F2557;padding:28px;border-radius:12px 12px 0 0">
            <h2 style="color:#fff;margin:0;font-size:22px">Thank you, ${name}!</h2>
            <p style="color:rgba(255,255,255,.75);margin:8px 0 0;font-size:15px">
              We've received your enquiry and will get back to you within 2 working hours.
            </p>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #e4e4ee;border-top:none;border-radius:0 0 12px 12px">
            <p style="color:#1a1a2a;font-size:15px;line-height:1.6">
              While you wait, feel free to WhatsApp us directly for a faster response:
            </p>
            <a href="https://wa.me/919048968415" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;margin-top:8px">
              Chat on WhatsApp
            </a>
            <hr style="border:none;border-top:1px solid #e4e4ee;margin:24px 0"/>
            <p style="color:#4a4a6a;font-size:13px;margin:0">
              <strong>Oxford International Education Group</strong><br/>
              HiLITE Business Park, 2, Poovangal, Kozhikode, Kerala 673014, India<br/>
              🇮🇳 +91 90489 68415 &nbsp;|&nbsp; 🇰🇿 +996 22 357 1108<br/>
              info@oxfordinternationaleducationalgroup.com
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
