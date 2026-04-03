"use client";

import { useState } from "react";
import { monthData, monthImageData, categoryIcons, categoryNames, months, CategoryData, MonthKey } from "@/data/monthData";
import * as Icons from "lucide-react";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<'month' | 'category' | 'result'>('month');

  const handleMonthSelect = (month: string) => {
    console.log("Ay seçildi:", month);
    setSelectedMonth(month);
    setCurrentStep('category');
  };

  const handleCategorySelect = (category: string) => {
    console.log("Kategori seçildi:", category);
    setSelectedCategory(category);
    setCurrentStep('result');
  };

  const handleBackToMonth = () => {
    setCurrentStep('month');
    setSelectedMonth("");
    setSelectedCategory("");
  };

  const handleBackToCategory = () => {
    setCurrentStep('category');
    setSelectedCategory("");
  };

  const normalizeMonth = (month: string) => {
    return month.toLowerCase()
      .replace('ş', 's')
      .replace('ç', 'c')
      .replace('ğ', 'g')
      .replace('ı', 'i')
      .replace('ö', 'o')
      .replace('ü', 'u');
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const selectedData = selectedMonth ? monthData[normalizeMonth(selectedMonth) as MonthKey] : null;
  const selectedImageData = selectedMonth ? monthImageData[normalizeMonth(selectedMonth) as MonthKey] : null;

  const renderMonthSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-6">Doğum Ayınızı Seçin</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => handleMonthSelect(month)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-lg font-semibold">{month}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCategorySelection = () => {
    if (!selectedData) return null;
    
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {selectedMonth} Ayı İçin Kategori Seçin
          </h2>
          <p className="text-gray-300 mb-4">
            Hangi kategorideki sonucu görmek istersiniz?
          </p>
          <button
            onClick={handleBackToMonth}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-300"
          >
            Başka Ay Seç
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(categoryNames).map(([key, name]) => {
            const categoryKey = key as keyof CategoryData;
            const iconName = categoryIcons[categoryKey];
            
            return (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl text-left"
              >
                <div className="flex items-center mb-3">
                  <div className="text-purple-400 mr-3">
                    {getIcon(iconName)}
                  </div>
                  <h3 className="font-semibold text-gray-300">
                    {name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!selectedData || !selectedCategory || !selectedImageData) return null;
    
    const categoryKey = selectedCategory as keyof CategoryData;
    const categoryName = categoryNames[categoryKey];
    const categoryValue = selectedData[categoryKey];
    const categoryImage = selectedImageData[categoryKey];
    const iconName = categoryIcons[categoryKey];
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {selectedMonth} Ayı - {categoryName}
          </h2>
          <button
            onClick={handleBackToCategory}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-300"
          >
            Başka Kategori Seç
          </button>
        </div>

        <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="text-center mb-6">
            <div className="text-purple-400 text-6xl mb-4 inline-block">
              {getIcon(iconName)}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{categoryName}</h3>
          </div>
          
          <div className="mb-6">
            <img 
              src={categoryImage} 
              alt={categoryName}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white text-center">
            <p className="text-lg mb-2">
              <span className="font-semibold">Doğum Ayı:</span> {selectedMonth}
            </p>
            <p className="text-3xl font-bold mt-4">
              {categoryValue}
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-4">
              Ekran görüntüsü alarak sonucunuzu paylaşabilirsiniz!
            </p>
            <button
              onClick={handleBackToMonth}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Baştan Başla
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Doğduğun Aya Göre Nesin?
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Doğum ayınızı seçin ve kendinizi keşfedin!
          </p>
        </header>

        {currentStep === 'month' && renderMonthSelection()}
        {currentStep === 'category' && renderCategorySelection()}
        {currentStep === 'result' && renderResult()}
      </div>
    </div>
  );
}
