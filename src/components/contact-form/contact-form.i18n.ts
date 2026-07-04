import type { Locale } from "@/lib/i18n";

const contactFormTranslations = {
  es: {
    heading: "Contáctanos para:",
    tabs: {
      conservacion: "Conservación",
      certificar: "Certificar",
      preguntas: "Preguntas",
    },
    fields: {
      nombre: "Nombre",
      correo: "Correo electrónico",
      detalle: "Detalle su situación",
      subirImagen: "Subir imagen",
    },
    submit: "Enviar",
    ui: {
      sending: "Enviando...",
      success: "¡Mensaje enviado! Te contactaremos pronto.",
      error: "Error al enviar. Por favor intenta de nuevo.",
      filePrefix: "Archivo: ",
    },
  },
  en: {
    heading: "Contact us for:",
    tabs: {
      conservacion: "Conservation",
      certificar: "Certification",
      preguntas: "Questions",
    },
    fields: {
      nombre: "Name",
      correo: "Email address",
      detalle: "Describe your situation",
      subirImagen: "Upload image",
    },
    submit: "Send",
    ui: {
      sending: "Sending...",
      success: "Message sent! We will get back to you soon.",
      error: "Failed to send. Please try again.",
      filePrefix: "File: ",
    },
  },
  fr: {
    heading: "Contactez-nous pour :",
    tabs: {
      conservacion: "Conservation",
      certificar: "Certification",
      preguntas: "Questions",
    },
    fields: {
      nombre: "Nom",
      correo: "Adresse e-mail",
      detalle: "Décrivez votre situation",
      subirImagen: "Télécharger une image",
    },
    submit: "Envoyer",
    ui: {
      sending: "Envoi en cours...",
      success: "Message envoyé ! Nous vous contacterons bientôt.",
      error: "Échec de l'envoi. Veuillez réessayer.",
      filePrefix: "Fichier : ",
    },
  },
} satisfies Record<Locale, unknown>;

export function useContactFormTranslations(lang: Locale) {
  return contactFormTranslations[lang];
}
