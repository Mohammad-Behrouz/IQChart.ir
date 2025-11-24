import React from 'react';

const TailwindTest = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
      <h1 className="text-white text-3xl font-bold mb-4 text-center">
        Tailwind CSS Test
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg mb-4">
          اگر این متن با استایل‌های Tailwind نمایش داده می‌شود، یعنی Tailwind به درستی نصب شده است!
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
            دکمه اصلی
          </button>
          <button className="bg-accent text-white px-6 py-2 rounded-lg hover:opacity-80 transition-opacity">
            دکمه ثانویه
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
