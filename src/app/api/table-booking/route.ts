// app/api/table-booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GroqService } from '@/lib/groq';

// Input validation interface
export interface ChatbotTableBookingInput {
  customerName: string;
  phoneNumber: string;
  date: string;
  time: string;
  partySize: number;
  context: string;
}

// Validation functions
const validateInput = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate customer name
  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim().length < 2) {
    errors.push('Customer name must be at least 2 characters long');
  }

  // Validate phone number (basic format check)
  if (!data.phoneNumber || typeof data.phoneNumber !== 'string') {
    errors.push('Phone number is required');
  } else {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Please provide a valid phone number');
    }
  }

  // Validate date
  if (!data.date || typeof data.date !== 'string') {
    errors.push('Date is required');
  } else {
    const bookingDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(bookingDate.getTime())) {
      errors.push('Invalid date format');
    } else if (bookingDate < today) {
      errors.push('Cannot book for past dates');
    } else if (bookingDate > new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)) {
      errors.push('Cannot book more than 90 days in advance');
    }
  }

  // Validate time
  if (!data.time || typeof data.time !== 'string') {
    errors.push('Time is required');
  } else {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.time)) {
      errors.push('Invalid time format (use HH:MM)');
    } else {
      // Check if time is within restaurant hours
      const [hours, minutes] = data.time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      
      // Restaurant hours: 12:00-22:00 Mon-Fri, 11:00-23:00 Sat-Sun
      const bookingDate = new Date(data.date);
      const dayOfWeek = bookingDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      const openTime = isWeekend ? 11 * 60 : 12 * 60; // 11:00 AM or 12:00 PM
      const closeTime = isWeekend ? 23 * 60 : 22 * 60; // 11:00 PM or 10:00 PM
      const lastOrder = closeTime - 30; // 30 minutes before closing
      
      if (timeInMinutes < openTime || timeInMinutes > lastOrder) {
        const openHour = Math.floor(openTime / 60);
        const lastOrderHour = Math.floor(lastOrder / 60);
        const lastOrderMin = lastOrder % 60;
        errors.push(`Restaurant is open ${openHour}:00 - ${lastOrderHour}:${lastOrderMin.toString().padStart(2, '0')} on ${isWeekend ? 'weekends' : 'weekdays'}`);
      }
    }
  }

  // Validate party size
  if (!data.partySize || typeof data.partySize !== 'number') {
    errors.push('Party size is required');
  } else if (data.partySize < 1 || data.partySize > 20) {
    errors.push('Party size must be between 1 and 20 people');
  } else if (data.partySize > 8) {
    errors.push('For parties larger than 8, please call us directly at (123) 456-7890');
  }

  // Validate context
  if (!data.context || typeof data.context !== 'string') {
    errors.push('Booking context is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Extract and sanitize data
    const sanitizedData = {
      customerName: requestData.customerName ? sanitizeInput(requestData.customerName) : '',
      phoneNumber: requestData.phoneNumber ? sanitizeInput(requestData.phoneNumber) : '',
      date: requestData.date ? sanitizeInput(requestData.date) : '',
      time: requestData.time ? sanitizeInput(requestData.time) : '',
      partySize: parseInt(requestData.partySize),
      context: requestData.context ? sanitizeInput(requestData.context) : ''
    };

    // Validate input
    const validation = validateInput(sanitizedData);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Check if GroqService is available
    let groqService;
    try {
      groqService = new GroqService();
    } catch (serviceError) {
      console.error('GroqService initialization failed:', serviceError);
      return NextResponse.json(
        { error: 'Booking service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Generate booking confirmation
    try {
      const result = await groqService.generateBookingConfirmation(
        sanitizedData.customerName,
        sanitizedData.phoneNumber,
        sanitizedData.date,
        sanitizedData.time,
        sanitizedData.partySize,
        sanitizedData.context
      );

      // Ensure result has expected structure
      if (!result) {
        throw new Error('No result from booking service');
      }

      return NextResponse.json({
        success: true,
        booking: result,
        message: 'Booking processed successfully'
      });

    } catch (groqError) {
      console.error('Groq service error:', groqError);
      return NextResponse.json(
        { 
          error: 'Failed to generate booking confirmation',
          message: 'Please try again or call us at (123) 456-7890'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Unexpected error in table booking API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Please try again later or contact us directly'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}