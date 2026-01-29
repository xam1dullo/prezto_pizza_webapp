
import React from 'react';
import { type MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const AddToCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H4.72l-.21-1.262A1 1 0 003 1z" />
        <path fillRule="evenodd" d="M10 18a2 2 0 100-4 2 2 0 000 4zm-4 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="aspect-square overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4 gap-2">
            <h3 className="text-xl font-bold font-serif text-text">{item.name}</h3>
            <span className="text-lg font-semibold text-primary whitespace-nowrap">{item.price.toLocaleString('uz-UZ')} so'm</span>
        </div>
        <button
          onClick={() => onAddToCart(item)}
          className="mt-auto w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-red-500 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:-translate-y-1"
        >
          <AddToCartIcon />
          Savatga
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
