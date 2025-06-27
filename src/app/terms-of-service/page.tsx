// app/terms-of-service/page.tsx
import { FileText, AlertTriangle, CreditCard, Clock, Shield, Phone, Mail } from 'lucide-react';
import { APP_NAME, contactInfo } from '@/constants/index';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Terms and conditions for dining and services at {APP_NAME}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Last Updated */}
          <div className="bg-green-50 px-8 py-4 border-b">
            <p className="text-sm text-green-800">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-600" />
                Agreement to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to {APP_NAME}. These Terms of Service ("Terms") govern your use of our restaurant services, 
                website, and facilities. By dining with us, making reservations, or using our services, you agree 
                to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Reservation Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6 text-green-600" />
                Reservation Policy
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Making Reservations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Reservations can be made up to 90 days in advance</li>
                    <li>All reservations are subject to availability</li>
                    <li>We reserve the right to confirm reservations via phone or email</li>
                    <li>Large parties (8+ people) require direct phone confirmation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Reservation Confirmations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Reservations are held for 15 minutes past the reserved time</li>
                    <li>Late arrivals may result in table reassignment or cancellation</li>
                    <li>No-shows may be subject to a cancellation fee</li>
                    <li>We may contact you to confirm your reservation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Cancellations and Changes</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Cancellations must be made at least 2 hours in advance</li>
                    <li>Same-day cancellations may incur a fee</li>
                    <li>Changes to party size or time are subject to availability</li>
                    <li>We reserve the right to cancel reservations due to unforeseen circumstances</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-green-600" />
                Payment Terms
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Accepted Payment Methods</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Major credit cards (Visa, MasterCard, American Express)</li>
                    <li>Debit cards</li>
                    <li>Cash payments</li>
                    <li>Digital payment methods (Apple Pay, Google Pay)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing and Charges</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>All prices are subject to change without notice</li>
                    <li>Applicable taxes will be added to your bill</li>
                    <li>Gratuity is not included but is appreciated</li>
                    <li>Large parties may be subject to automatic gratuity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Deposits and Prepayments</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Large parties may require a deposit to secure reservation</li>
                    <li>Deposits are refundable with proper notice</li>
                    <li>Prepaid events are subject to specific terms and conditions</li>
                    <li>All deposits and prepayments are processed securely</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* House Rules */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                House Rules and Conduct
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Dress Code</h3>
                  <p className="text-gray-700 ml-4">
                    We maintain a smart casual dress code. We reserve the right to refuse service to guests 
                    who do not meet our dress standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Behavior Standards</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Respectful behavior towards staff and other guests is required</li>
                    <li>Disruptive or inappropriate behavior may result in removal</li>
                    <li>We reserve the right to refuse service to any guest</li>
                    <li>Photography and videography should be respectful of other diners</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Accommodations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Please inform us of dietary restrictions when making reservations</li>
                    <li>We accommodate special needs with advance notice</li>
                    <li>Service animals are welcome</li>
                    <li>Accessibility accommodations are available upon request</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Food Safety and Allergies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-green-600" />
                Food Safety and Allergies
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-medium">
                  <AlertTriangle className="inline h-4 w-4 mr-2" />
                  Important Allergy Information
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Our kitchen handles nuts, dairy, gluten, and other common allergens</li>
                <li>Cross-contamination may occur despite our best efforts</li>
                <li>Please inform your server of any allergies or dietary restrictions</li>
                <li>We cannot guarantee allergen-free preparation</li>
                <li>Guests with severe allergies dine at their own risk</li>
                <li>We follow all local health department guidelines</li>
              </ul>
            </section>

            {/* Liability and Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability and Disclaimers</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-700 ml-4">
                    {APP_NAME} is not liable for any personal injury, property damage, or loss that may occur 
                    on our premises, except as required by law. Our liability is limited to the amount paid for services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Property</h3>
                  <p className="text-gray-700 ml-4">
                    We are not responsible for lost, stolen, or damaged personal property. Please keep your 
                    belongings secure and with you at all times.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by 
                our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>We collect information necessary to provide our services</li>
                <li>Your information is protected and not sold to third parties</li>
                <li>We may use your information for marketing with your consent</li>
                <li>You can opt out of marketing communications at any time</li>
              </ul>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. Changes will be posted on our website 
                and take effect immediately upon posting. Your continued use of our services constitutes 
                acceptance of any modifications.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of the jurisdiction in which our restaurant operates. 
                Any disputes will be resolved in the appropriate local courts.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Phone className="h-6 w-6 text-green-600" />
                Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-4 w-4 text-gray-500 mt-0.5">📍</div>
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t pt-6">
              <p className="text-sm text-gray-600 text-center">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}