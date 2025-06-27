// src/app/api/telegram-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/constants/index';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation to ensure it's a Telegram message
    if (!body.message || !body.message.chat || !body.message.text) {
      return NextResponse.json({ status: 'ok' });
    }

    const chatId = body.message.chat.id;
    const text = body.message.text.trim();
    
    // Security check: Only respond to the configured owner's chat
    if (chatId.toString() !== process.env.TELEGRAM_CHAT_ID) {
        console.warn(`Unauthorized request from chat ID: ${chatId}`);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let responseText = 'Sorry, I don\'t understand that command. Try /help for available commands.';

    // Command: /today
    if (text === '/today') {
      const today = new Date().toISOString().split('T')[0];
      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef, 
        where('reservationDate', '==', today), 
        where('status', 'in', ['pending', 'confirmed']),
        orderBy('reservationTime')
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        responseText = `No reservations for today (${today}).`;
      } else {
        responseText = `*Today's Reservations (${today}):*\n\n`;
        querySnapshot.forEach(doc => {
          const res = doc.data() as Reservation;
          responseText += `*${res.reservationTime}* - ${res.customerName} (${res.partySize} ppl) - *${res.status}*\n`;
        });
      }
    }

    // Command: /week
    if (text === '/week') {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday
      
      const startDateString = startOfWeek.toISOString().split('T')[0];
      const endDateString = endOfWeek.toISOString().split('T')[0];
      
      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef,
        where('reservationDate', '>=', startDateString),
        where('reservationDate', '<=', endDateString),
        where('status', 'in', ['pending', 'confirmed']),
        orderBy('reservationDate'),
        orderBy('reservationTime')
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        responseText = `No reservations for this week (${startDateString} to ${endDateString}).`;
      } else {
        responseText = `*This Week's Reservations (${startDateString} to ${endDateString}):*\n\n`;
        
        // Group reservations by date
        const reservationsByDate: { [key: string]: any[] } = {};
        querySnapshot.forEach(doc => {
          const res = doc.data() as Reservation;
          if (!reservationsByDate[res.reservationDate]) {
            reservationsByDate[res.reservationDate] = [];
          }
          reservationsByDate[res.reservationDate].push(res);
        });
        
        // Format output by date
        Object.keys(reservationsByDate).sort().forEach(date => {
          const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
          responseText += `*${dayName}, ${date}:*\n`;
          
          reservationsByDate[date].forEach(res => {
            responseText += `  • ${res.reservationTime} - ${res.customerName} (${res.partySize} ppl) - ${res.status}\n`;
          });
          responseText += '\n';
        });
      }
    }

    // Command: /tomorrow
    if (text === '/tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];
      
      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef, 
        where('reservationDate', '==', tomorrowString), 
        where('status', 'in', ['pending', 'confirmed']),
        orderBy('reservationTime')
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        responseText = `No reservations for tomorrow (${tomorrowString}).`;
      } else {
        responseText = `*Tomorrow's Reservations (${tomorrowString}):*\n\n`;
        querySnapshot.forEach(doc => {
          const res = doc.data() as Reservation;
          responseText += `*${res.reservationTime}* - ${res.customerName} (${res.partySize} ppl) - *${res.status}*\n`;
        });
      }
    }

    // Command: /next7days
    if (text === '/next7days') {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      const todayString = today.toISOString().split('T')[0];
      const nextWeekString = nextWeek.toISOString().split('T')[0];
      
      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef,
        where('reservationDate', '>=', todayString),
        where('reservationDate', '<=', nextWeekString),
        where('status', 'in', ['pending', 'confirmed']),
        orderBy('reservationDate'),
        orderBy('reservationTime')
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        responseText = `No reservations for the next 7 days (${todayString} to ${nextWeekString}).`;
      } else {
        responseText = `*Next 7 Days Reservations (${todayString} to ${nextWeekString}):*\n\n`;
        
        // Group reservations by date
        const reservationsByDate: { [key: string]: any[] } = {};
        querySnapshot.forEach(doc => {
          const res = doc.data() as Reservation;
          if (!reservationsByDate[res.reservationDate]) {
            reservationsByDate[res.reservationDate] = [];
          }
          reservationsByDate[res.reservationDate].push(res);
        });
        
        // Format output by date
        Object.keys(reservationsByDate).sort().forEach(date => {
          const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
          const isToday = date === todayString;
          const isTomorrow = date === new Date(today.getTime() + 24*60*60*1000).toISOString().split('T')[0];
          
          let dateLabel = `${dayName}, ${date}`;
          if (isToday) dateLabel += ' (Today)';
          if (isTomorrow) dateLabel += ' (Tomorrow)';
          
          responseText += `*${dateLabel}:*\n`;
          
          reservationsByDate[date].forEach(res => {
            responseText += `  • ${res.reservationTime} - ${res.customerName} (${res.partySize} ppl) - ${res.status}\n`;
          });
          responseText += '\n';
        });
      }
    }

    // Command: /check [confirmation_code]
    if (text.startsWith('/check')) {
        const code = text.split(' ')[1];
        if (!code) {
            responseText = 'Please provide a confirmation code. Usage: `/check [code]`';
        } else {
            const reservationsRef = collection(db, "reservations");
            const q = query(reservationsRef, where("confirmationCode", "==", code.toUpperCase()));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                responseText = `No reservation found with code: \`${code}\``;
            } else {
                const res = querySnapshot.docs[0].data() as Reservation;
                responseText = `*Reservation Found!* ✅
----------------------
*Code:* ${res.confirmationCode}
*Name:* ${res.customerName}
*Date:* ${res.reservationDate}
*Time:* ${res.reservationTime}
*Party:* ${res.partySize}
*Status:* ${res.status}`;
            }
        }
    }

    // Command: /help
    if (text === '/help') {
      responseText = `*Available Commands:* 🤖

📅 *Date Commands:*
/today - Show today's reservations
/tomorrow - Show tomorrow's reservations
/week - Show this week's reservations (Sun-Sat)
/next7days - Show next 7 days reservations

🔍 *Search Commands:*
/check [code] - Check reservation by confirmation code

ℹ️ *Other Commands:*
/help - Show this help message

*Example:* \`/check ABC123\``;
    }

    await sendTelegramMessage(responseText);
    
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    try {
      await sendTelegramMessage('Sorry, there was an error processing your request.');
    } catch (sendError) {
      console.error('Failed to send error message:', sendError);
    }
  }

  return NextResponse.json({ status: 'ok' });
}

// GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Telegram webhook endpoint is working',
    timestamp: new Date().toISOString(),
    env: {
      hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
      hasChatId: !!process.env.TELEGRAM_CHAT_ID,
    }
  });
}