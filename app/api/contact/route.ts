import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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

    // Envoyer l'email
    const data = await resend.emails.send({
      from: 'Contact Portfolio <onboarding@resend.dev>', // Email par défaut de Resend (tu pourras le changer avec ton domaine)
      to: 'dbmanhs@outlook.fr', // ← REMPLACE PAR TON EMAIL !
      replyTo: email, // L'email du visiteur pour que tu puisses répondre
      subject: `Nouveau message de ${name} via le portfolio`,
      html: `
        <div style="font-family: BlenderProBook; max-width: 600px; margin: 0 auto;">
          <h2 style="color: rgba(23, 169, 206, 0.86); text-transform: uppercase;">Nouveau message depuis ton portfolio</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Nom :</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email :</strong> ${email}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message :</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de contact de ton portfolio.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Email envoyé avec succès', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}