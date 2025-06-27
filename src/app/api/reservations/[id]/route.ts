// src/app/api/reservations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// PATCH - Update reservation status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing reservation ID or status' }, { status: 400 });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status provided' }, { status: 400 });
    }

    const reservationRef = doc(db, 'reservations', id);
    const docSnap = await getDoc(reservationRef);

    if (!docSnap.exists()) {
        return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    await updateDoc(reservationRef, {
      status: status,
      updatedAt: Timestamp.now()
    });

    return NextResponse.json({ success: true, message: `Reservation ${id} updated to ${status}` });

  } catch (error) {
    console.error(`Error updating reservation ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
