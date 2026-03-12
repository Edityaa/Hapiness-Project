// app/api/send-birthday/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { toEmail, toName, fromName } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Celebra <onboarding@resend.dev>', // use your verified domain in prod
      to: [toEmail],
      subject: `🎂 Happy Birthday, ${toName}!`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0c0d0f;color:#fff;border-radius:24px;">
          <h1 style="color:#6366f1;font-size:32px;margin-bottom:8px;">🎉 Happy Birthday!</h1>
          <p style="color:#94a3b8;font-size:16px;">Hey <strong style="color:#fff">${toName}</strong>,</p>
          <p style="color:#94a3b8;">Wishing you an amazing birthday! The whole team is thinking of you today. 🥳</p>
          <p style="color:#64748b;font-size:12px;margin-top:32px;">Sent via Celebra — with love from ${fromName}</p>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}