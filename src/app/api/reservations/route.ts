// app/api/reservations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ReservationInput, Reservation, VALIDATION_RULES, RESTAURANT_HOURS } from '@/constants/index';

// In-memory storage for demo purposes
// In production, replace with actual database
let reservations: Reservation[] = [];
let reservationCounter = 1;

// Utility functions
const generateConfirmationCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return VALIDATION_RULES.PHONE_REGEX.test(cleanPhone);
};

const validateDate = (dateString: string): { isValid: boolean; error?: string } => {
  const reservationDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(reservationDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  
  if (reservationDate < today) {
    return { isValid: false, error: 'Cannot book for past dates' };
  }
  
  if (reservationDate > new Date(Date.now() + VALIDATION_RULES.MAX_ADVANCE_DAYS * 24 * 60 * 60 * 1000)) {
    return { isValid: false, error: `Cannot book more than ${VALIDATION_RULES.MAX_ADVANCE_DAYS} days in advance` };
  }
  
  return { isValid: true };
};

const validateTime = (timeString: string, dateString: string): { isValid: boolean; error?: string } => {
  if (!VALIDATION_RULES.TIME_REGEX.test(timeString)) {
    return { isValid: false, error: 'Invalid time format (use HH:MM)' };
  }
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  
  const reservationDate = new Date(dateString);
  const dayOfWeek = reservationDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const restaurantHours = isWeekend ? RESTAURANT_HOURS.WEEKEND : RESTAURANT_HOURS.WEEKDAY;
  const openTime = restaurantHours.OPEN.hours * 60 + restaurantHours.OPEN.minutes;
  const lastOrderTime = restaurantHours.LAST_ORDER.hours * 60 + restaurantHours.LAST_ORDER.minutes;
  
  if (timeInMinutes < openTime || timeInMinutes > lastOrderTime) {
    const openHour = Math.floor(openTime / 60);
    const openMin = openTime % 60;
    const lastOrderHour = Math.floor(lastOrderTime / 60);
    const lastOrderMin = lastOrderTime % 60;
    
    return {
      isValid: false,
      error: `Restaurant is open ${openHour}:${openMin.toString().padStart(2, '0')} - ${lastOrderHour}:${lastOrderMin.toString().padStart(2, '0')} on ${isWeekend ? 'weekends' : 'weekdays'}`
    };
  }
  
  return { isValid: true };
};

const checkAvailability = (date: string, time: string, partySize: number): { isAvailable: boolean; error?: string } => {
  // Simple availability check - count reservations for the same date/time
  const conflictingReservations = reservations.filter(
    r => r.reservationDate === date && 
         r.reservationTime === time && 
         r.status !== 'cancelled'
  );
  
  const totalPartySize = conflictingReservations.reduce((sum, r) => sum + r.partySize, 0) + partySize;
  
  // Assume restaurant has capacity for 100 people total
  const maxCapacity = 100;
  
  if (totalPartySize > maxCapacity) {
    return { 
      isAvailable: false, 
      error: 'Sorry, we don\'t have enough availability for your party size at this time. Please try a different time slot.' 
    };
  }
  
  return { isAvailable: true };
};

const validateReservationInput = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate customer name
  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    errors.push(`Customer name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long`);
  }
  
  if (data.customerName && data.customerName.length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    errors.push(`Customer name must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`);
  }
  
  // Validate email
  if (!data.customerEmail || typeof data.customerEmail !== 'string') {
    errors.push('Email address is required');
  } else if (!validateEmail(data.customerEmail)) {
    errors.push('Please provide a valid email address');
  }
  
  // Validate phone number
  if (!data.customerPhone || typeof data.customerPhone !== 'string') {
    errors.push('Phone number is required');
  } else if (!validatePhone(data.customerPhone)) {
    errors.push('Please provide a valid phone number');
  }
  
  // Validate date
  if (!data.reservationDate || typeof data.reservationDate !== 'string') {
    errors.push('Reservation date is required');
  } else {
    const dateValidation = validateDate(data.reservationDate);
    if (!dateValidation.isValid) {
      errors.push(dateValidation.error!);
    }
  }
  
  // Validate time
  if (!data.reservationTime || typeof data.reservationTime !== 'string') {
    errors.push('Reservation time is required');
  } else if (data.reservationDate) {
    const timeValidation = validateTime(data.reservationTime, data.reservationDate);
    if (!timeValidation.isValid) {
      errors.push(timeValidation.error!);
    }
  }
  
  // Validate party size
  if (!data.partySize || typeof data.partySize !== 'number') {
    errors.push('Party size is required');
  } else if (data.partySize < VALIDATION_RULES.PARTY_SIZE_MIN || data.partySize > VALIDATION_RULES.PARTY_SIZE_MAX) {
    errors.push(`Party size must be between ${VALIDATION_RULES.PARTY_SIZE_MIN} and ${VALIDATION_RULES.PARTY_SIZE_MAX} people`);
  } else if (data.partySize > VALIDATION_RULES.LARGE_PARTY_THRESHOLD) {
    errors.push('For parties larger than 8, please call us directly at (123) 456-7890');
  }
  
  // Check availability if basic validation passes
  if (errors.length === 0) {
    const availabilityCheck = checkAvailability(data.reservationDate, data.reservationTime, data.partySize);
    if (!availabilityCheck.isAvailable) {
      errors.push(availabilityCheck.error!);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// POST - Create new reservation
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
    const sanitizedData: ReservationInput = {
      customerName: requestData.customerName ? sanitizeInput(requestData.customerName) : '',
      customerEmail: requestData.customerEmail ? sanitizeInput(requestData.customerEmail) : '',
      customerPhone: requestData.customerPhone ? sanitizeInput(requestData.customerPhone) : '',
      reservationDate: requestData.reservationDate ? sanitizeInput(requestData.reservationDate) : '',
      reservationTime: requestData.reservationTime ? sanitizeInput(requestData.reservationTime) : '',
      partySize: parseInt(requestData.partySize),
      specialRequests: requestData.specialRequests ? sanitizeInput(requestData.specialRequests) : ''
    };

    // Validate input
    const validation = validateReservationInput(sanitizedData);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Create new reservation
    const newReservation: Reservation = {
      id: reservationCounter.toString(),
      ...sanitizedData,
      status: 'pending',
      confirmationCode: generateConfirmationCode(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    reservations.push(newReservation);
    reservationCounter++;

    // In production, you would also:
    // 1. Send confirmation email to customer
    // 2. Send notification to restaurant staff
    // 3. Add to calendar system
    // 4. Log the reservation

    return NextResponse.json({
      success: true,
      reservation: {
        id: newReservation.id,
        confirmationCode: newReservation.confirmationCode,
        customerName: newReservation.customerName,
        reservationDate: newReservation.reservationDate,
        reservationTime: newReservation.reservationTime,
        partySize: newReservation.partySize,
        status: newReservation.status
      },
      message: 'Reservation created successfully'
    });

  } catch (error) {
    console.error('Unexpected error in reservation API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Please try again later or contact us directly'
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve reservations (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const phone = searchParams.get('phone');
    const confirmationCode = searchParams.get('confirmationCode');

    let filteredReservations = [...reservations];

    // Filter by date if provided
    if (date) {
      filteredReservations = filteredReservations.filter(r => r.reservationDate === date);
    }

    // Filter by status if provided
    if (status) {
      filteredReservations = filteredReservations.filter(r => r.status === status);
    }

    // Filter by phone (for customer lookup)
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      filteredReservations = filteredReservations.filter(r => 
        r.customerPhone.replace(/[\s\-\(\)]/g, '') === cleanPhone
      );
    }

    // Filter by confirmation code (for customer lookup)
    if (confirmationCode) {
      filteredReservations = filteredReservations.filter(r => 
        r.confirmationCode === confirmationCode.toUpperCase()
      );
    }

    // Sort by reservation date and time
    filteredReservations.sort((a, b) => {
      const dateA = new Date(`${a.reservationDate} ${a.reservationTime}`);
      const dateB = new Date(`${b.reservationDate} ${b.reservationTime}`);
      return dateA.getTime() - dateB.getTime();
    });

    return NextResponse.json({
      success: true,
      reservations: filteredReservations,
      count: filteredReservations.length
    });

  } catch (error) {
    console.error('Error retrieving reservations:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve reservations' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use PATCH for updates.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use /api/reservations/[id] for specific reservation operations.' },
    { status: 405 }
  );
}