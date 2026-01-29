
import React, { useMemo } from 'react';
import { type CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart, onCheckout }) => {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 w-full max-w-md h-full bg-background shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold font-serif text-primary">Sizning buyurtmangiz</h2>
            <button onClick={onClose} className="p-2 text-3xl leading-none rounded-full hover:bg-gray-100">&times;</button>
          </header>
          
          {cartItems.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
              <img src="https://picsum.photos/seed/cart/200/200" alt="Empty cart" className="w-40 h-40 rounded-full mb-4 opacity-50"/>
              <h3 className="text-xl font-semibold text-gray-700">Savatingiz bo'sh</h3>
              <p className="text-gray-500">Boshlash uchun mazali pitsa qo'shing!</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-surface p-2 rounded-lg shadow-sm">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                  <div className="flex-grow">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price.toLocaleString('uz-UZ')} so'm</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 rounded-full font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-gray-200 rounded-full font-bold">+</button>
                  </div>
                  <p className="font-semibold w-24 text-right">{(item.price * item.quantity).toLocaleString('uz-UZ')} so'm</p>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <footer className="p-4 border-t bg-surface">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Jami:</h3>
                  <p className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('uz-UZ')} so'm</p>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg"
              >
                Buyurtma berish
              </button>
               <button 
                  onClick={onClearCart}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
               >
                  <TrashIcon /> Savatni tozalash
               </button>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;