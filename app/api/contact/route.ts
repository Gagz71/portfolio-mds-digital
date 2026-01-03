import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 Route API contact appelée');
    
    const body = await request.json();
    const { name, email, message } = body;

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation des longueurs
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Le nom est trop long (max 100 caractères)' },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: 'L\'email est trop long' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Le message est trop long (max 5000 caractères)' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    console.log('📧 Configuration transporteur Nodemailer...');

    // Configuration du transporteur SMTP OVH
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465', // true pour 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('📨 Envoi de l\'email...');

    // Envoi de l'email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Expéditeur
      to: process.env.EMAIL_TO, // Destinataire
      replyTo: email, // Email du visiteur pour répondre
      subject: `Nouveau message de ${name} via le portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ffd2; text-transform: uppercase;">Nouveau message depuis ton portfolio</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nom :</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email :</strong> ${email}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message :</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de contact de mds-digital.fr
          </p>
        </div>
      `,
    });

    console.log('✅ Email envoyé avec succès');

    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}