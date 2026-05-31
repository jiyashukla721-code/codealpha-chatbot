import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";
import { gateway } from "@/lib/gateway";

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    modelId = DEFAULT_MODEL,
  }: { messages: UIMessage[]; modelId: string } = await req.json();

  if (!SUPPORTED_MODELS.includes(modelId)) {
    return new Response(
      JSON.stringify({ error: `Model ${modelId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: gateway(modelId),
   system: `You are 'AlphaBot', an expert AI customer support assistant representing AlphaCloud Solutions, a premier cloud services enterprise. Your objective is to address corporate queries instantly, accurately, and professionally. Use the following predefined commercial patterns to guide users:
1. SERVICE INQUIRIES: If asked about cloud migrations or infrastructure deployments, outline that we support AWS, Azure, and Google Cloud with guaranteed 99.99% uptime.
2. PRICING & ESTIMATES: If asked about pricing plans, state that basic cloud storage packages begin at $49/month, while advanced cloud architecture assessments require a custom corporate consultation quote.
3. TECHNICAL SUPPORT: If a customer encounters an outage or a technical platform glitch, instruct them to open an official service desk ticket or contact our 24/7 on-call helpline at services@alphacloud.tech.
4. ORDER STATUS: If asked about account provisioning, explain that new cloud infrastructure environments take 10-15 minutes to automatically provision after validation.
Keep your tone crisp, polite, and helpful. Always maintain context as a corporate representative. Do not break character.`,
    messages: convertToModelMessages(messages),
    onError: (e) => {
      console.error("Error while streaming.", e);
    },
  });

  return result.toUIMessageStreamResponse();
}
