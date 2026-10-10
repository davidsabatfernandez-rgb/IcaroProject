import { handleContact } from "@/lib/contact-delivery";

export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleContact(request, {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
  });
}
