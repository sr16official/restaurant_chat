'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { ReservationInput, generateTimeSlots, VALIDATION_RULES, APP_NAME, contactInfo } from '@/constants/index';

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  reservationDate?: string;
  reservationTime?: string;
  partySize?: string;
  general?: string;
}

export default function ReservationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReservationInput>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    reservationDate: '',
    reservationTime: '',
    partySize: 2,
    specialRequests: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Generate time slots when date changes
  useEffect(() => {
    if (formData.reservationDate) {
      const selectedDate = new Date(formData.reservationDate);
      const slots = generateTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
      
      // Reset time selection if current time is not available
      if (formData.reservationTime && !slots.includes(formData.reservationTime)) {
        setFormData(prev => ({ ...prev, reservationTime: '' }));
      }
    }
  }, [formData.reservationDate]);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + VALIDATION_RULES.MAX_ADVANCE_DAYS * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.customerName.trim() || formData.customerName.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
      newErrors.customerName = `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long`;
    }

    // Validate email
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else {
      const cleanPhone = formData.customerPhone.replace(/[\s\-\(\)]/g, '');
      if (!VALIDATION_RULES.PHONE_REGEX.test(cleanPhone)) {
        newErrors.customerPhone = 'Please enter a valid phone number';
      }
    }

    // Validate date
    if (!formData.reservationDate) {
      newErrors.reservationDate = 'Please select a date';
    }

    // Validate time
    if (!formData.reservationTime) {
      newErrors.reservationTime = 'Please select a time';
    }

    // Validate party size
    if (formData.partySize < VALIDATION_RULES.PARTY_SIZE_MIN || formData.partySize > VALIDATION_RULES.PARTY_SIZE_MAX) {
      newErrors.partySize = `Party size must be between ${VALIDATION_RULES.PARTY_SIZE_MIN} and ${VALIDATION_RULES.PARTY_SIZE_MAX}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          setErrors({ general: data.details.join(', ') });
        } else {
          setErrors({ general: data.error || 'Failed to create reservation' });
        }
        return;
      }

      // Success
      setConfirmationCode(data.reservation.confirmationCode);
      setShowSuccess(true);

    } catch (error) {
      console.error('Error submitting reservation:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReservationInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for choosing {APP_NAME}. Your reservation has been successfully created.
          </p>
          
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Confirmation Code</p>
            <p className="text-2xl font-bold text-green-600">{confirmationCode}</p>
          </div>

          <div className="text-left space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{formData.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(formData.reservationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{formData.reservationTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Party Size:</span>
              <span className="font-medium">{formData.partySize} {formData.partySize === 1 ? 'person' : 'people'}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <p>A confirmation email has been sent to {formData.customerEmail}</p>
            <p className="mt-2">Please arrive 15 minutes before your reservation time.</p>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Make a Reservation</h1>
          <p className="text-gray-600 text-center mt-2">Reserve your table at {APP_NAME}</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{errors.general}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
              
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.customerName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.customerEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.customerPhone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Reservation Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    id="reservationDate"
                    min={today}
                    max={maxDate}
                    value={formData.reservationDate}
                    onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.reservationDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.reservationDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.reservationDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time *
                  </label>
                  <select
                    id="reservationTime"
                    value={formData.reservationTime}
                    onChange={(e) => handleInputChange('reservationTime', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.reservationTime ? 'border-red-300' : 'border-gray-300'
                    }`}
                    disabled={!formData.reservationDate}
                  >
                    <option value="">Select time</option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.reservationTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.reservationTime}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    Party Size *
                  </label>
                  <select
                    id="partySize"
                    value={formData.partySize}
                    onChange={(e) => handleInputChange('partySize', parseInt(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.partySize ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {Array.from({ length: VALIDATION_RULES.LARGE_PARTY_THRESHOLD }, (_, i) => i + 1).map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                  {errors.partySize && (
                    <p className="text-red-500 text-sm mt-1">{errors.partySize}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                rows={3}
                value={formData.specialRequests || ''}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requests, dietary restrictions, or notes..."
              />
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Reservations are held for 15 minutes past the reserved time</li>
                <li>• For parties larger than 8, please call us at {contactInfo.phone}</li>
                <li>• Cancellations must be made at least 2 hours in advance</li>
                <li>• You will receive a confirmation email shortly</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              {isSubmitting ? 'Creating Reservation...' : 'Confirm Reservation'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Need help? Call us at <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">{contactInfo.phone}</a></p>
          <p>or email us at <a href={`mailto:${contactInfo.reservationEmail}`} className="text-blue-600 hover:underline">{contactInfo.reservationEmail}</a></p>
        </div>
      </div>
    </div>
  );
}