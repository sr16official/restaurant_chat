// app/menu/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { foodItems, APP_NAME } from '@/constants/index';
import { Utensils, Sparkles, ChefHat } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: '✨' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'pasta', name: 'Pasta', icon: '🍝' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
    { id: 'curry', name: 'Curry', icon: '🍛' },
    { id: 'kebabs', name: 'Kebabs', icon: '🥙' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => 
        item.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glassmorphism Header */}
      <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <ChefHat className="h-16 w-16 text-white drop-shadow-2xl" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4 drop-shadow-2xl">
              {APP_NAME}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Experience culinary artistry where tradition meets innovation
            </p>
          </div>
        </div>
      </div>

      {/* Modern Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-110 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50'
                  : 'bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 border border-white/20'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              {selectedCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
              )}
            </button>
          ))}
        </div>

        {/* Advanced Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                {item.images.length > 0 && (
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-food.jpg';
                    }}
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-2xl">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                  {item.name}
                </h3>

                <p className="text-white/80 leading-relaxed text-base font-light">
                  {item.description}
                </p>

                {/* Decorative Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <Utensils className="h-24 w-24 text-white/40 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No culinary delights found
            </h3>
            <p className="text-white/60 text-lg">
              Explore a different category to discover amazing flavors
            </p>
          </div>
        )}
      </div>

      {/* Futuristic CTA Section */}
      <div className="relative mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 py-20">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-8">
            Culinary Excellence
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Where every dish is a masterpiece, crafted with passion and served with pride
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <ChefHat className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}