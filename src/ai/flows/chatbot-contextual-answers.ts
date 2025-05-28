// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview A chatbot that answers questions about the restaurant based on a defined set of data.
 *
 * - answerRestaurantQuestion - A function that answers questions about the restaurant.
 * - AnswerRestaurantQuestionInput - The input type for the answerRestaurantQuestion function.
 * - AnswerRestaurantQuestionOutput - The return type for the answerRestaurantQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerRestaurantQuestionInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  context: z.string().describe('The context to use when answering the question.'),
});
export type AnswerRestaurantQuestionInput = z.infer<
  typeof AnswerRestaurantQuestionInputSchema
>;

const AnswerRestaurantQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerRestaurantQuestionOutput = z.infer<
  typeof AnswerRestaurantQuestionOutputSchema
>;

export async function answerRestaurantQuestion(
  input: AnswerRestaurantQuestionInput
): Promise<AnswerRestaurantQuestionOutput> {
  return answerRestaurantQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerRestaurantQuestionPrompt',
  input: {schema: AnswerRestaurantQuestionInputSchema},
  output: {schema: AnswerRestaurantQuestionOutputSchema},
  prompt: `You are a chatbot for a restaurant. Use the following context to answer the question. If the question cannot be answered using the context, say so.

Context: {{{context}}}

Question: {{{question}}}

Answer:`,
});

const answerRestaurantQuestionFlow = ai.defineFlow(
  {
    name: 'answerRestaurantQuestionFlow',
    inputSchema: AnswerRestaurantQuestionInputSchema,
    outputSchema: AnswerRestaurantQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
