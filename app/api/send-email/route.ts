import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  network?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, network, phone } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Le nom et l\'email sont requis' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter
    await transporter.verify();

    // Welcome email HTML template for the user
    const welcomeEmailHTML = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue sur MonHubimmo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .banner {
            background: linear-gradient(135deg, #007BFF, #0056b3);
            text-align: center;
            padding: 30px 20px;
            color: white;
        }
        .banner img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .banner h1 {
            margin: 0;
            font-size: 24px;
        }
        .banner p {
            font-size: 16px;
            margin-top: 5px;
        }
        .content {
            padding: 25px;
        }
        .content h2 {
            color: #007BFF;
            font-size: 20px;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #007BFF;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 15px;
        }
        .footer {
            background-color: #f0f0f0;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <!-- Banner -->
        <div class="banner">
            <img src="https://www.monhubimmo.com/logo.png" alt="MonHubimmo Logo">
            <h1>Bienvenue sur MonHubimmo</h1>
            <p>Votre accès prioritaire est confirmé</p>
        </div>
        <!-- Content -->
        <div class="content">
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Merci de vous être inscrit sur <strong>MonHubimmo</strong>, la 1ère plateforme collaborative dédiée aux mandataires immobiliers.</p>
            <p><strong>Le développement est en cours</strong> et la sortie officielle est prévue très bientôt.<br>
            En tant qu'inscrit <strong>parmi les premiers</strong>, vous profitez automatiquement de <strong>3 mois offerts</strong> dès l'ouverture de la plateforme.</p>
            <p><strong>Vos coordonnées sont enregistrées</strong> – vous recevrez un e-mail dès le lancement officiel pour activer votre compte et découvrir toutes les fonctionnalités :</p>
            <ul>
                <li>Partage de biens et de recherches</li>
                <li>Mise en relation entre agents, tous réseaux confondus</li>
                <li>Alertes et mises à jour en temps réel</li>
            </ul>
            <blockquote><em>Dans l'immobilier, chaque contact compte… et chaque opportunité se saisit ensemble.</em></blockquote>
            <!-- Social + Partage -->
            <p><strong>Suivez-nous sur Instagram</strong> → <a href="https://instagram.com/monhubimmo" target="_blank">@monhubimmo</a><br>
            <strong>Partagez cette page</strong> : plus on est connectés, plus on vend ensemble.</p>
            <!-- CTA -->
            <a href="https://monhubimmo.com/" class="cta-button">Visiter MonHubimmo</a>
        </div>
        <!-- Footer -->
        <div class="footer">
            L'équipe MonHubimmo<br>
            <a href="https://monhubimmo.com/" style="color:#007BFF;">www.monhubimmo.com</a>
        </div>
    </div>
    </body>
    </html>
    `;

    // Notification email content for admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0077b6;">Nouvelle demande de contact</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Réseau/Agence:</strong> ${network || 'Non fourni'}</p>
          <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        </div>
        <p style="margin-top: 20px; color: #666;">
          Message envoyé depuis le formulaire de contact du site web.
        </p>
      </div>
    `;

    // Welcome email options for the user
    const welcomeMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Bienvenue sur MonHubimmo - Votre accès prioritaire est confirmé',
      html: welcomeEmailHTML,
      text: `Bonjour ${name},

Merci de vous être inscrit sur MonHubimmo, la 1ère plateforme collaborative dédiée aux mandataires immobiliers.

Le développement est en cours et la sortie officielle est prévue très bientôt.
En tant qu'inscrit parmi les premiers, vous profitez automatiquement de 3 mois offerts dès l'ouverture de la plateforme.

Vos coordonnées sont enregistrées – vous recevrez un e-mail dès le lancement officiel pour activer votre compte et découvrir toutes les fonctionnalités :

- Partage de biens et de recherches
- Mise en relation entre agents, tous réseaux confondus
- Alertes et mises à jour en temps réel

Dans l'immobilier, chaque contact compte… et chaque opportunité se saisit ensemble.

Suivez-nous sur Instagram → @monhubimmo
Partagez cette page : plus on est connectés, plus on vend ensemble.

Visitez MonHubimmo : https://monhubimmo.com/

L'équipe MonHubimmo
www.monhubimmo.com`,
    };

    // Admin notification email options
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Nouvelle inscription de ${name}`,
      html: adminEmailContent,
      text: `Nouvelle inscription:
      Nom: ${name}
      Email: ${email}
      Réseau/Agence: ${network || 'Non fourni'}
      Téléphone: ${phone || 'Non fourni'}`,
    };

    // Send welcome email to user
    await transporter.sendMail(welcomeMailOptions);
    
    // Send notification email to admin
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ 
      message: 'Inscription réussie et email de bienvenue envoyé' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
