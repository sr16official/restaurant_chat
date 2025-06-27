// src/app/api/telegram-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/constants/index';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation to ensure it's a Telegram message
    if (!body.message || !body.message.chat || !body.message.text) {
      return NextResponse.json({ status: 'ok' }); // Not a message we handle
    }

    const chatId = body.message.chat.id;
    const text = body.message.text.trim();
    
    // Security check: Only respond to the configured owner's chat
    if (chatId.toString() !== process.env.TELEGRAM_CHAT_ID) {
        console.warn(`Unauthorized request from chat ID: ${chatId}`);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let responseText = 'Sorry, I don\'t understand that command.';

    // Command: /today
    if (text === '/today') {
      const today = new Date().toISOString().split('T')[0];
      const reservationsRef = collection(db, 'reservations');
      const q = query(reservationsRef, where('reservationDate', '==', today), where('status', 'in', ['pending', 'confirmed']));
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        responseText = 'No reservations for today.';
      } else {
        responseText = '*Today\'s Reservations:*\n\n';
        querySnapshot.forEach(doc => {
          const res = doc.data() as Reservation;
          responseText += `*${res.reservationTime}* - ${res.customerName} (${res.partySize} ppl) - *${res.status}*\n`;
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
                responseText = `
                    *Reservation Found!* ✅
                    ----------------------
                    *Code:* ${res.confirmationCode}
                    *Name:* ${res.customerName}
                    *Date:* ${res.reservationDate}
                    *Time:* ${res.reservationTime}
                    *Party:* ${res.partySize}
                    *Status:* ${res.status}
                `;
            }
        }
    }

    await sendTelegramMessage(responseText);
    
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
  }

  // Always return a 200 OK to Telegram to acknowledge receipt
  return NextResponse.json({ status: 'ok' });
}
