import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    console.log("🔵 Route API contact appelée");

    const body = await request.json();
    const { name, email, message } = body;

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation des longueurs
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Le nom est trop long (max 100 caractères)" },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "L'email est trop long" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Le message est trop long (max 5000 caractères)" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    console.log("📧 Configuration transporteur Nodemailer...");

    // Configuration du transporteur SMTP OVH
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // true pour 465, false pour 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("📨 Envoi de l'email...");

    // Envoi de l'email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Expéditeur
      to: process.env.EMAIL_TO, // Destinataire
      replyTo: email, // Email du visiteur pour répondre
      subject: `Nouveau message de ${name} via le portfolio`,
      html: `
       <div style="font-family: blenderProBook, monospace; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 2px solid #00ffd2; box-shadow: 0 0 30px rgba(0, 255, 210, 0.2); border-radius: 4px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #001a14 0%, #000810 100%); padding: 25px 30px; border-bottom: 2px solid #00ffd2;">
        <h2 style="color: #00ffd2; text-transform: uppercase; margin: 0; font-size: 22px; letter-spacing: 3px; text-shadow: 0 0 15px rgba(0, 255, 210, 0.6);">
          NOUVEAU MESSAGE
        </h2>
      </div>
      
      <!-- Contact Info -->
      <div style="padding: 30px; background: #0d0d0d;">
        <div style="background: rgba(0, 255, 210, 0.08); border-left: 4px solid #00ffd2; padding: 20px; margin-bottom: 25px;">
          <p style="margin: 0 0 12px 0; color: #fff; font-size: 15px;">
            <span style="color: #00ffd2; opacity: 0.8; font-size: 12px; letter-spacing: 1px;">NOM</span><br/>
            <strong style="font-size: 16px;">${name}</strong>
          </p>
          <p style="margin: 0; color: #fff; font-size: 15px;">
            <span style="color: #00ffd2; opacity: 0.8; font-size: 12px; letter-spacing: 1px;">EMAIL</span><br/>
            <strong><a href="mailto:${email}" style="color: #00ffd2; text-decoration: none; font-size: 16px;">${email}</a></strong>
          </p>
        </div>
        
        <!-- Message -->
        <div style="background: #1a1a1a; border: 1px solid rgba(0, 255, 210, 0.3); padding: 25px; border-radius: 4px;">
          <h3 style="margin: 0 0 18px 0; color: #00ffd2; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.9;">
            MESSAGE
          </h3>
          <p style="color: #e0e0e0; line-height: 1.7; margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #080808; padding: 20px; border-top: 1px solid rgba(0, 255, 210, 0.3); text-align: center;">
        <p style="color: rgba(0, 255, 210, 0.6); font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">
          ⬢ mds-digital.fr ⬢
        </p>
      </div>
      
    </div>
      `,
    });

    console.log("✅ Email envoyé avec succès");

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
