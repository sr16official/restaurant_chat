
// chatbot-table-booking.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for handling table bookings through a chatbot.
 *
 * - chatbotTableBooking - A function that handles the table booking process.
 * - ChatbotTableBookingInput - The input type for the chatbotTableBooking function.
 * - ChatbotTableBookingOutput - The return type for the chatbotTableBooking function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotTableBookingInputSchema = z.object({
  customerName: z.string().describe('The name of the customer making the booking.'),
  phoneNumber: z.string().describe('The phone number of the customer.'),
  date: z.string().describe('The date for the table booking (YYYY-MM-DD).'),
  time: z.string().describe('The time for the table booking (HH:MM in 24-hour format).'),
  partySize: z.number().describe('The number of people in the party.'),
  context: z.string().optional().describe('Optional context for the chatbot to use.'),
});
export type ChatbotTableBookingInput = z.infer<typeof ChatbotTableBookingInputSchema>;

const ChatbotTableBookingOutputSchema = z.object({
  confirmationMessage: z.string().describe('A confirmation message for the customer.'),
  bookingDetails: z.string().describe('A summary of the booking details.'),
});
export type ChatbotTableBookingOutput = z.infer<typeof ChatbotTableBookingOutputSchema>;

async function sendConfirmationEmail(email: string, bookingDetails: string): Promise<void> {
  // TODO: Implement email sending logic here using a service like SendGrid or Nodemailer.
  // This is a placeholder implementation.
  console.log(`Sending confirmation email to ${email} with details: ${bookingDetails}`);
  return Promise.resolve();
}

const bookTable = ai.defineTool(
  { // First argument: Configuration object
    name: 'bookTable',
    description: 'Books a table at the restaurant and sends a confirmation email to the customer.',
    inputSchema: z.object({
      customerName: z.string().describe('The name of the customer making the booking.'),
      phoneNumber: z.string().describe('The phone number of the customer.'),
      date: z.string().describe('The date for the table booking (YYYY-MM-DD).'),
      time: z.string().describe('The time for the table booking (HH:MM in 24-hour format).'),
      partySize: z.number().describe('The number of people in the party.'),
    }),
    outputSchema: z.object({
      confirmationMessage: z.string().describe('A confirmation message for the customer.'),
      bookingDetails: z.string().describe('A summary of the booking details.'),
    }) // End of outputSchema property value
  }, // End of the first argument (configuration object), comma separates from second argument
  async (input) => { // Second argument: Handler function
    // Simulate booking the table and generating booking details.
    const bookingDetails = `Table booked for ${input.customerName} on ${input.date} at ${input.time} for ${input.partySize} people.`;
    const confirmationMessage = `Your table has been booked. ${bookingDetails}`;

    // In a real application, you would save the booking details to a database here.

    // Simulate sending a confirmation email.
    // TODO: Consider using the actual customer's email if collected, or enhancing this.
    await sendConfirmationEmail('customer@example.com', bookingDetails);

    return {
      confirmationMessage: confirmationMessage,
      bookingDetails: bookingDetails,
    };
  } // End of the second argument (handler function)
);

const chatbotTableBookingPrompt = ai.definePrompt({
  name: 'chatbotTableBookingPrompt',
  input: {schema: ChatbotTableBookingInputSchema},
  output: {schema: ChatbotTableBookingOutputSchema},
  tools: [bookTable],
  prompt: `You are a restaurant chatbot. Your task is to book tables for customers.

  {{#if context}}
  Use the following context to answer customer queries:
  {{context}}
  {{/if}}

  The customer's name is {{{customerName}}}, their phone number is {{{phoneNumber}}},
  the requested date is {{{date}}}, the time is {{{time}}}, and the party size is {{{partySize}}}.

  Use the 'bookTable' tool to book the table and send a confirmation email to the customer.
  Return a confirmation message and booking details.
`,
});

const chatbotTableBookingFlow = ai.defineFlow(
  {
    name: 'chatbotTableBookingFlow',
    inputSchema: ChatbotTableBookingInputSchema,
    outputSchema: ChatbotTableBookingOutputSchema,
  },
  async input => {
    const {output} = await chatbotTableBookingPrompt(input);
    return output!;
  }
);

export async function chatbotTableBooking(input: ChatbotTableBookingInput): Promise<ChatbotTableBookingOutput> {
  return chatbotTableBookingFlow(input);
}

export type { ChatbotTableBookingInput, ChatbotTableBookingOutput };
