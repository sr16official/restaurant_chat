// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create transporter with your email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-bottom: 5px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #4f46e5;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from your website contact form on ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to sender
    const replyMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting us - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Thank You for Contacting Us!</h2>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi ${name},</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for reaching out to us! We've received your message about "<strong>${subject}</strong>" and wanted to let you know that we'll get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
            <h3 style="color: #4f46e5; margin-top: 0;">What happens next?</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li>Our team will review your message within 24 hours</li>
              <li>We'll respond via email with next steps or answers to your questions</li>
              <li>For urgent matters, feel free to call us at +1 (555) 123-4567</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            In the meantime, feel free to explore our website or check out our FAQ section for quick answers to common questions.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <h4 style="color: #333; margin-top: 0;">Your Message Summary:</h4>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Best regards,<br>
            <strong>The Support Team</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; text-align: center;">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>If you need immediate assistance, please call us at +1 (555) 123-4567</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(replyMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { error: 'Email configuration error. Please contact support.' },
          { status: 500 }
        );
      }
      if (error.message.includes('Network')) {
        return NextResponse.json(
          { error: 'Network error. Please check your connection and try again.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}