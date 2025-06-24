// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are dedicated to providing exceptional service and innovative solutions 
              that help our customers achieve their goals.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Founded with a vision to transform the way businesses operate, our company 
                has been at the forefront of innovation since our inception. We believe in 
                the power of technology to solve complex problems and create meaningful 
                connections.
              </p>
              <p className="mb-4">
                Our journey began when our founders recognized a gap in the market for 
                solutions that are both powerful and user-friendly. Since then, we've 
                grown from a small startup to a trusted partner for businesses worldwide.
              </p>
              <p>
                Today, we continue to push boundaries and set new standards in our industry, 
                always keeping our customers' success at the heart of everything we do.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                To empower businesses with innovative solutions that drive growth, 
                efficiency, and success in an ever-evolving digital landscape.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <span><strong>Innovation:</strong> We constantly seek new ways to improve and evolve</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <span><strong>Quality:</strong> We never compromise on the quality of our products and services</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <span><strong>Customer Focus:</strong> Our customers' success is our success</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-blue-600 mr-2">•</span>
                  <span><strong>Integrity:</strong> We operate with transparency and honesty in all our dealings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
              <p className="text-blue-600 font-medium mb-3">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Visionary leader with 15+ years of experience in technology and business development.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JS</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
              <p className="text-green-600 font-medium mb-3">CTO</p>
              <p className="text-gray-600 text-sm">
                Technical expert leading our engineering team with expertise in scalable systems.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">MJ</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
              <p className="text-purple-600 font-medium mb-3">Head of Design</p>
              <p className="text-gray-600 text-sm">
                Creative director ensuring our products are both beautiful and functional.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}