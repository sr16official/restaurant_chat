// src/components/admin/ReservationsClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Reservation } from '@/constants/index';
import { Calendar, Users, Clock, Filter, X, Check, MoreVertical, Edit } from 'lucide-react';

type Status = Reservation['status'];

const statusConfig: Record<Status, { label: string, color: string }> = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800 border-green-300' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-300' },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'no-show': { label: 'No Show', color: 'bg-gray-100 text-gray-800 border-gray-300' },
};

export default function ReservationsClient({ initialData }: { initialData: Reservation[] }) {
    const [reservations, setReservations] = useState<Reservation[]>(initialData);
    const [filterDate, setFilterDate] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<Status | ''>('');
    const [loading, setLoading] = useState<boolean>(false);

    const filteredReservations = useMemo(() => {
        return reservations.filter(res => {
            const dateMatch = filterDate ? res.reservationDate === filterDate : true;
            const statusMatch = filterStatus ? res.status === filterStatus : true;
            return dateMatch && statusMatch;
        });
    }, [reservations, filterDate, filterStatus]);

    const handleStatusChange = async (id: string, newStatus: Status) => {
        // Optimistically update the UI
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));

        try {
            const response = await fetch(`/api/reservations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            // You can add a success toast notification here
        } catch (error) {
            console.error(error);
            // Revert UI on failure
            setReservations(initialData); 
            // You can add an error toast notification here
        }
    };
    
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center gap-4">
                <h3 className="text-lg font-semibold mr-4">Filters</h3>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as Status | '')}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Statuses</option>
                        {Object.keys(statusConfig).map(s => <option key={s} value={s}>{statusConfig[s as Status].label}</option>)}
                    </select>
                </div>
                <button
                    onClick={() => { setFilterDate(''); setFilterStatus(''); }}
                    className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                    <X size={16} /> Clear
                </button>
                 <button
                    onClick={() => setFilterDate(today)}
                    className="ml-auto bg-white border border-gray-300 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
                >
                    Today's Bookings
                </button>
            </div>

            {/* Reservations Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReservations.length > 0 ? filteredReservations.map((res) => (
                            <tr key={res.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{res.customerName}</div>
                                    <div className="text-sm text-gray-500">{res.customerEmail}</div>
                                    <div className="text-sm text-gray-500">{res.customerPhone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-900"><Calendar size={14} className="mr-2 text-gray-400" /> {new Date(res.reservationDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                                    <div className="flex items-center text-sm text-gray-500"><Clock size={14} className="mr-2 text-gray-400" /> {res.reservationTime}</div>
                                    <div className="flex items-center text-sm text-gray-500"><Users size={14} className="mr-2 text-gray-400" /> {res.partySize} person(s)</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={res.status}
                                        onChange={(e) => handleStatusChange(res.id, e.target.value as Status)}
                                        className={`py-1 px-2 border rounded-full text-sm font-semibold ${statusConfig[res.status].color}`}
                                    >
                                        {Object.keys(statusConfig).map(s => <option key={s} value={s}>{statusConfig[s as Status].label}</option>)}
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900"><MoreVertical size={20} /></button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    No reservations found for the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
