import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

function errorResponse(error: string, status: number) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? import.meta.env;

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return errorResponse("server_misconfigured", 500);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("invalid_request", 400);
  }

  const tipo    = ((formData.get("tipo")    as string | null) ?? "").trim();
  const nombre  = ((formData.get("nombre")  as string | null) ?? "").trim();
  const correo  = ((formData.get("correo")  as string | null) ?? "").trim();
  const detalle = ((formData.get("detalle") as string | null) ?? "").trim();
  const imagen  = formData.get("imagen") as File | null;

  if (!nombre || !correo || !detalle) return errorResponse("missing_fields", 400);

  const lines = [
    `Tipo: ${tipo}`,
    `Nombre: ${nombre}`,
    `Correo: ${correo}`,
    ``,
    `Detalle:`,
    detalle,
  ];
  if (imagen && imagen.size > 0) lines.push(``, `Imagen: ${imagen.name}`);
  const text = lines.join("\n");

  const attachments: { filename: string; content: number[] }[] = [];
  if (imagen && imagen.size > 0) {
    const buf = await imagen.arrayBuffer();
    attachments.push({ filename: imagen.name, content: Array.from(new Uint8Array(buf)) });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["info@ivantovar.org"],
    subject: `Nuevo contacto: ${tipo} – ${nombre}`,
    text,
    attachments,
  });

  if (error) return errorResponse("email_error", 502);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
