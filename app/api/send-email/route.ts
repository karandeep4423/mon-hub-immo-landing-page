import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '../../../lib/mongodb';
import FormSubmission from '../../../lib/models/FormSubmission';

// CORS headers for cross-domain requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

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
        { status: 400, headers: corsHeaders }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save form submission to MongoDB
    const formSubmission = new FormSubmission({
      name,
      email,
      network,
      phone,
      ipAddress,
      userAgent,
      submittedAt: new Date()
    });

    await formSubmission.save();

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
            background: #00b4d8;
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
            background-color: #00b4d8;
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
            <h1>Bienvenue chez MonHubimmo</h1>
            <p>Votre inscription est confirmée</p>
        </div>
        <!-- Content -->
        <div class="content">
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Merci pour votre inscription à <strong>MonHubimmo</strong>, la première plateforme collaborative dédiée aux professionnels de l'immobilier.</p>
            
            <p><strong>Le développement est en cours et la sortie officielle arrive très bientôt.</strong> 🎉</p>
            
            <p>👉 <strong>En tant qu'inscrit parmi les premiers, vous bénéficierez automatiquement de 3 mois offerts dès l'ouverture.</strong></p>
            
            <p><strong>Dès le lancement, vous pourrez profiter de toutes les fonctionnalités :</strong></p>
            <ul>
                <li>✔️ Partage simple de biens et de recherches</li>
                <li>✔️ Mise en relation entre agents, tous réseaux confondus</li>
                <li>✔️ Alertes et mises à jour en temps réel</li>
            </ul>
            
            <p><strong>Vos coordonnées sont bien enregistrées</strong> : vous recevrez un e-mail dès l'ouverture officielle pour activer votre compte.</p>
            
            <blockquote><em>Dans l'immobilier, chaque contact compte… et chaque opportunité se construit ensemble.</em></blockquote>
            
            <!-- Social + Partage -->
            <p>En attendant, retrouvez-nous sur Instagram → <a href="https://instagram.com/monhubimmo" target="_blank">@monhubimmo</a></p>
            <p>📢 <strong>Partagez cette page</strong> : plus on est connectés, plus on vend ensemble.</p>
            
            <!-- CTA Button -->
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
      from:`"monhubimmo" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Bienvenue chez MonHubimmo 🚀',
      html: welcomeEmailHTML,
      text: `Bonjour ${name},

Merci pour votre inscription à MonHubimmo, la première plateforme collaborative dédiée aux professionnels de l'immobilier.

Le développement est en cours et la sortie officielle arrive très bientôt. 🎉

👉 En tant qu'inscrit parmi les premiers, vous bénéficierez automatiquement de 3 mois offerts dès l'ouverture.

Dès le lancement, vous pourrez profiter de toutes les fonctionnalités :

✔️ Partage simple de biens et de recherches
✔️ Mise en relation entre agents, tous réseaux confondus
✔️ Alertes et mises à jour en temps réel

Vos coordonnées sont bien enregistrées : vous recevrez un e-mail dès l'ouverture officielle pour activer votre compte.

Dans l'immobilier, chaque contact compte… et chaque opportunité se construit ensemble.

En attendant, retrouvez-nous sur Instagram → @monhubimmo

📢 Partagez cette page : plus on est connectés, plus on vend ensemble.

À très bientôt,
L'équipe MonHubimmo`,
    };

    // Admin notification email options
    const adminMailOptions = {
      from:`"monhubimmo" <${process.env.SMTP_USER}>`,
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
      message: 'Inscription réussie et email de bienvenue envoyé',
      submissionId: formSubmission._id
    }, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500, headers: corsHeaders }
    );
  }
}
