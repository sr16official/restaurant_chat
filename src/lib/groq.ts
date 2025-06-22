// lib/groq.ts
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class GroqService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY is not set in environment variables');
    }
  }

  async generateResponse(messages: GroqMessage[], model: string = 'deepseek-r1-distill-llama-70b'): Promise<string> {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Groq API error: ${response.status} - ${errorData}`);
      }

      const data: GroqResponse = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error calling Groq API:', error);
      throw error;
    }
  }

  async answerRestaurantQuestion(question: string, context: string): Promise<string> {
  const systemPrompt = `
You are a helpful assistant for a restaurant. Only provide final, user-facing answers — do not include any internal reasoning or thinking steps like <think> or explanations. Be concise, friendly, and stick to the provided context.
Use the following context to answer the customer's question.
Be friendly, professional, and informative. If the question is not related to the restaurant or cannot be answered with the provided context, politely redirect the customer to ask about the restaurant or suggest they contact the restaurant directly.

Restaurant Context:
${context}

Keep responses concise but informative (2-3 sentences maximum unless more detail is needed). Do not hallucinate. If the answer is not in the context, ask the user to call the contact number for more details.
`;

  const messages: GroqMessage[] = [
    { role: 'system', content: systemPrompt.trim() },
    { role: 'user', content: question.trim() }
  ];

  try {
    const rawResponse = await this.generateResponse(messages);

    // Clean and trim the model's response
    const cleanedResponse = rawResponse
      .replace(/<think>[\s\S]*?<\/think>/gi, '') // Remove any <think>...</think> blocks
      .replace(/\n{2,}/g, '\n') // Collapse multiple newlines
      .trim(); // Final trim

    return cleanedResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm sorry, I'm having trouble answering your question right now. Please contact us directly at (123) 456-7890 for assistance.";
  }
}



  async generateBookingConfirmation(
    customerName: string,
    phoneNumber: string,
    date: string,
    time: string,
    partySize: number,
    context: string
  ): Promise<{ confirmationMessage: string; bookingDetails: string; bookingId: string }> {
    const bookingId = `BK${Date.now().toString().slice(-6)}`;
    
    const messages: GroqMessage[] = [
      {
        role: 'system',
        content: `You are a restaurant booking assistant. Generate a friendly confirmation message for bookings.

Restaurant Context:
${context}

Include:
1. A warm confirmation that the booking is received
2. Summary of the booking details
3. A note that they should call if they need to make changes
4. Express enthusiasm about their visit

Keep the message professional but warm and welcoming (3-4 sentences).`
      },
      {
        role: 'user',
        content: `Generate a booking confirmation for:
Customer: ${customerName}
Phone: ${phoneNumber}
Date: ${date}
Time: ${time}
Party Size: ${partySize}`
      }
    ];

    try {
      const confirmationMessage = await this.generateResponse(messages);
      const bookingDetails = `Booking ID: ${bookingId} | ${customerName} | ${date} at ${time} | Party of ${partySize} | Phone: ${phoneNumber}`;
      
      return {
        confirmationMessage,
        bookingDetails,
        bookingId,
      };
    } catch (error) {
      return {
        confirmationMessage: `Thank you ${customerName}! Your booking for ${partySize} people on ${date} at ${time} has been received. We'll confirm availability and get back to you soon. Please call us at (123) 456-7890 if you have any questions.`,
        bookingDetails: `Booking ID: ${bookingId} | ${customerName} | ${date} at ${time} | Party of ${partySize} | Phone: ${phoneNumber}`,
        bookingId,
      };
    }
  }
}