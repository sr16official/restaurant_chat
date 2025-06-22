// app/api/restaurant-question/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GroqService } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { question, context } = await request.json();
    
    if (!question || !context) {
      return NextResponse.json({ error: 'Question and context are required' }, { status: 400 });
    }

    const groqService = new GroqService();
    const answer = await groqService.answerRestaurantQuestion(question, context);
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error in restaurant question API:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}

