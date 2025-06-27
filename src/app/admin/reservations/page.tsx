// src/app/admin/reservations/page.tsx
import { Suspense } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/constants/index';
import ReservationsClient from '@/components/ReservationsClient.tsx';
import { HardDriveDownload } from 'lucide-react';

async function getReservations(): Promise<Reservation[]> {
    const reservationsRef = collection(db, "reservations");
    // Note: To use orderBy on multiple fields, you will likely need to create a
    // composite index in your Firestore database. The error message in the console
    // will provide a direct link to create it.
    const q = query(reservationsRef, orderBy('reservationDate', 'desc'), orderBy('reservationTime', 'asc'));
    
    const querySnapshot = await getDocs(q);
    const reservations: Reservation[] = [];
    querySnapshot.forEach((doc) => {
    const data = doc.data();
    reservations.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt && typeof data.createdAt.toDate === 'function'
            ? data.createdAt.toDate().toISOString()
            : '',
        updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function'
            ? data.updatedAt.toDate().toISOString()
            : '',
    } as Reservation);
});
    return reservations;
}

export default async function AdminReservationsPage() {
    const initialReservations = await getReservations();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                Reservation Management
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">View, track, and manage all customer bookings.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                            <HardDriveDownload size={18} />
                            Export Data
                        </button>
                    </div>
                </div>
            </header>
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Suspense fallback={<div className="text-center p-10 font-semibold">Loading reservations...</div>}>
                        <ReservationsClient initialData={initialReservations} />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

// Ensure the page is dynamically rendered to fetch fresh data on each request.
export const revalidate = 0;
