import { Chat } from "@/components/chat";

export default function Page() {
  // Hardcode the chatbot interface to connect directly to our server route
  return <Chat modelId="local-commercial-bot" />;
}
