
import React from 'react';

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

const PizzaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 8a1 1 0 11-2 0 1 1 0 012 0zm1-3a1 1 0 100-2 1 1 0 000 2zm5 3a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1 1 0 100-2 1 1 0 000 2z"/>
  </svg>
);


const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const Header: React.FC<HeaderProps> = React.memo(({ onCartClick, cartItemCount }) => {
  return (
    <header className="bg-surface/95 backdrop-blur-sm shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <PizzaIcon />
          <span className="text-2xl font-bold font-serif text-primary">Prezto Pizza</span>
        </a>
        <button
          onClick={onCartClick}
          className="relative text-text hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-primary/10"
          aria-label="Open shopping cart"
        >
          <CartIcon />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
