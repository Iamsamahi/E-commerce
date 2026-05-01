import React from 'react';
import { Link } from 'react-router-dom';
import CategoryItem from "../components/CategoryItem.jsx";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/tshirt", name: "T-shirt", imageUrl: "/t-shirts.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.avif" },
];

const HomePage = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>

        {/* Title */}
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400'>
          Explore Our Categories
        </h1>

        {/* Subtitle */}
        <p className='text-center text-xl text-gray-400 mb-16'>
          Discover the latest trends in eco-friendly fashion.
        </p>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category) => (
            <CategoryItem
              key={category.name}
              category={category}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HomePage;