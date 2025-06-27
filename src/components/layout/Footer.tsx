'use client';
import { socialMediaLinks, deliveryAppLinks } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import * as LucideIcons from "lucide-react";
import Link from 'next/link';
import { APP_NAME } from '@/constants';

// Icon mapping for social media
const getIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.ExternalLink;
};

export default function Footer() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <LucideIcons.ChefHat className="mr-3 text-amber-500" size={28} />
                  {APP_NAME}
                </h3>
              </div>
              <p className="text-gray-300 text-sm max-w-md mb-6 leading-relaxed">
                Modern European restaurant focusing on fresh, seasonal ingredients 
                and an elegant dining experience. Creating memorable moments with 
                every exquisite dish crafted by our master chefs.
              </p>
              
              {/* Social Media Links */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LucideIcons.Heart className="mr-2 text-red-500" size={18} />
                  Follow Our Journey
                </h4>
                <div className="flex space-x-4">
                  {socialMediaLinks.map((social) => {
                    const IconComponent = getIcon(social.iconName);
                    return (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl border border-gray-600 hover:border-amber-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25"
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <IconComponent 
                          size={20} 
                          className="text-gray-400 group-hover:text-amber-400 transition-colors duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Online Ordering */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <LucideIcons.ShoppingBag className="mr-2 text-green-500" size={18} />
                  Order Online
                </h4>
                <div className="flex flex-wrap gap-3">
                  {deliveryAppLinks.map((app) => (
                    <Link
                      key={app.name}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      {app.name === 'Swiggy' && (
                        <div className="w-5 h-5 mr-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">S</span>
                        </div>
                      )}
                      {app.name === 'Zomato' && (
                        <div className="w-5 h-5 mr-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">Z</span>
                        </div>
                      )}
                      {app.name !== 'Swiggy' && app.name !== 'Zomato' && (
                        <LucideIcons.Truck className="w-5 h-5 mr-3 text-blue-500" />
                      )}
                      <span className="relative z-10">{app.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-24 h-24 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center">
                  <LucideIcons.Navigation className="mr-2 text-amber-500" size={20} />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/" 
                      className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.Home className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                      <span className="relative">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/menu" 
                      className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.BookOpen className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                      <span className="relative">
                        Menu
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/reservations" 
                      className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.Calendar className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                      <span className="relative">
                        Reservations
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.Info className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                      <span className="relative">
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.MessageCircle className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                      <span className="relative">
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link 
                        href="/dashboard" 
                        className="group flex items-center text-gray-300 hover:text-amber-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                      >
                        <LucideIcons.LayoutDashboard className="mr-3 text-amber-500 group-hover:text-amber-400" size={16} />
                        <span className="relative">
                          Dashboard
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Account Links */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center">
                  <LucideIcons.User className="mr-2 text-blue-500" size={20} />
                  {user ? 'My Account' : 'Get Started'}
                </h4>
                <ul className="space-y-3">
                  {user ? (
                    <>
                      <li>
                        <Link 
                          href="/profile" 
                          className="group flex items-center text-gray-300 hover:text-blue-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                        >
                          <LucideIcons.UserCircle className="mr-3 text-blue-500 group-hover:text-blue-400" size={16} />
                          <span className="relative">
                            Profile
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/settings" 
                          className="group flex items-center text-gray-300 hover:text-blue-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                        >
                          <LucideIcons.Settings className="mr-3 text-blue-500 group-hover:text-blue-400" size={16} />
                          <span className="relative">
                            Settings
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                      {!user.emailVerified && (
                        <li>
                          <Link 
                            href="/verify-email" 
                            className="group flex items-center text-yellow-400 hover:text-yellow-300 text-sm transition-all duration-300 transform hover:translate-x-2"
                          >
                            <LucideIcons.AlertCircle className="mr-3 text-yellow-500 group-hover:text-yellow-400" size={16} />
                            <span className="relative">
                              Verify Email
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                            </span>
                          </Link>
                        </li>
                      )}
                    </>
                  ) : (
                    <>
                      <li>
                        <Link 
                          href="/login" 
                          className="group flex items-center text-gray-300 hover:text-green-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                        >
                          <LucideIcons.LogIn className="mr-3 text-green-500 group-hover:text-green-400" size={16} />
                          <span className="relative">
                            Sign In
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/signup" 
                          className="group flex items-center text-gray-300 hover:text-green-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                        >
                          <LucideIcons.UserPlus className="mr-3 text-green-500 group-hover:text-green-400" size={16} />
                          <span className="relative">
                            Sign Up
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link 
                      href="/privacy-policy" 
                      className="group flex items-center text-gray-300 hover:text-purple-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.Shield className="mr-3 text-purple-500 group-hover:text-purple-400" size={16} />
                      <span className="relative">
                        Privacy Policy
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/terms-of-service" 
                      className="group flex items-center text-gray-300 hover:text-purple-400 text-sm transition-all duration-300 transform hover:translate-x-2"
                    >
                      <LucideIcons.FileText className="mr-3 text-purple-500 group-hover:text-purple-400" size={16} />
                      <span className="relative">
                        Terms of Service
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <LucideIcons.Copyright className="text-gray-400" size={16} />
              <p className="text-gray-400 text-sm">
                {currentYear} <span className="text-amber-400 font-medium">{APP_NAME}</span>. All rights reserved.
              </p>
            </div>
            
            {user && (
              <div className="mt-3 md:mt-0">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 px-4 py-2 rounded-full border border-gray-600">
                  <LucideIcons.Sparkles className="text-amber-400" size={14} />
                  <p className="text-gray-300 text-xs">
                    Welcome back, <span className="text-amber-400 font-medium">{user.displayName || user.email?.split('@')[0]}</span>
                    {!user.emailVerified && (
                      <span className="text-yellow-400 ml-2 flex items-center">
                        <LucideIcons.AlertTriangle className="mr-1" size={12} />
                        (Email not verified)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}