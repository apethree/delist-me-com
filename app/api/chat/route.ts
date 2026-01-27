import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Fallback if no API key is configured (for demo/dev purposes)
  if (!process.env.OPENROUTER_API_KEY) {
    // Artificial delay to simulate network
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // Simple mock response generator
    const lastMessage = messages[messages.length - 1]
    const content = lastMessage.content.toLowerCase()
    
    let responseText = "I can help you remove your personal information from data brokers. Would you like to start a free scan?"
    
    if (content.includes("price") || content.includes("cost") || content.includes("free") || content.includes("plan")) {
      responseText = "We have a free tier that shows you where your data is exposed. Our paid protection starts at $12/month, or save with our annual plan at $89/year."
    } else if (content.includes("spam") || content.includes("text") || content.includes("call")) {
      responseText = "DelistMe removes your phone number from 50+ data brokers, significantly reducing spam calls and texts. Most users see a 90% reduction within the first week!"
    } else if (content.includes("safe") || content.includes("security") || content.includes("data")) {
      responseText = "Yes, we use bank-level 256-bit encryption and never sell your data. We only use it to identify and remove your records from data brokers. Your privacy is our top priority."
    } else if (content.includes("virtual") || content.includes("phone")) {
      responseText = "Our virtual phone feature gives you a separate number for signups and shopping. All spam goes to the virtual number, keeping your personal line clean!"
    } else if (content.includes("delistme") || content.includes("what")) {
      responseText = "DelistMe is an AI-powered privacy service that removes your personal information from data brokers. We stop spam calls, prevent doxxing, and protect your digital privacy automatically."
    } else if (content.includes("check") || content.includes("number")) {
      responseText = "You can check if your number is exposed by signing up for our free scan. We'll show you exactly which data brokers have your information."
    }

    // Stream the mock response
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        const words = responseText.split(" ")
        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "))
          await new Promise((r) => setTimeout(r, 50))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  })

  const result = streamText({
    model: openrouter("openai/gpt-4o"),
    system:
      "You are a helpful, professional sales assistant for DelistMe, a privacy service that removes personal information from data brokers to stop spam and dox attempts. " +
      "Your goal is to explain the value of the service: stopping spam calls, preventing harassment, and securing personal data. " +
      "Be concise, friendly, and reassuring. " +
      "If asked about pricing: Free scan available, Monthly plan is $12, Annual is $89. " +
      "Encourage users to try the free scan.",
    messages,
  })

  return result.toDataStreamResponse()
}
