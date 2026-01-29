
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-5 py-2.5 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-primary text-white shadow-lg transform scale-105'
              : 'bg-surface text-text hover:bg-gray-100 hover:shadow-md'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
