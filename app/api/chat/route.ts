export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

  let corporateResponse = "Thank you for contacting AlphaCloud Solutions. How can I assist with your corporate infrastructure today?";

  if (lastUserMessage.includes('price') || lastUserMessage.includes('pricing') || lastUserMessage.includes('cost')) {
    corporateResponse = "AlphaCloud Solutions pricing: Basic storage packages begin at $49/month. Advanced enterprise architecture assessments require a custom corporate consultation quote.";
  } else if (lastUserMessage.includes('service') || lastUserMessage.includes('migration') || lastUserMessage.includes('deploy')) {
    corporateResponse = "We specialize in seamless cloud migrations and full infrastructure deployments supporting AWS, Azure, and Google Cloud with guaranteed 99.99% uptime.";
  } else if (lastUserMessage.includes('support') || lastUserMessage.includes('help') || lastUserMessage.includes('error') || lastUserMessage.includes('outage')) {
    corporateResponse = "For technical support or service issues, please submit an official service desk ticket or contact our 24/7 on-call engineering helpline at services@alphacloud.tech.";
  } else if (lastUserMessage.includes('status') || lastUserMessage.includes('order') || lastUserMessage.includes('account')) {
    corporateResponse = "New environment provisioning status: Custom cloud instances take roughly 10-15 minutes to automatically spin up following authorization validation.";
  }

  return new Response(corporateResponse, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
