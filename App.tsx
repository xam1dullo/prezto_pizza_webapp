
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import CheckoutModal from './components/CheckoutModal';
import ErrorBoundary from './components/ErrorBoundary';
import { type MenuItem as MenuItemType, type CartItem as CartItemType } from './types';
import { MENU_ITEMS } from './constants';

const ALL_CATEGORIES = 'Barchasi';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  
  const categories = useMemo(() => [ALL_CATEGORIES, ...Object.keys(
    MENU_ITEMS.reduce((acc, item) => {
      acc[item.category] = true;
      return acc;
    }, {} as Record<string, boolean>)
  )], []);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleAddToCart = useCallback((item: MenuItemType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleToggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const handleOpenCheckoutModal = useCallback(() => {
    if (cartItems.length === 0) {
      alert("Savatingiz bo'sh!");
      return;
    }
    setIsCheckoutModalOpen(true);
  }, [cartItems]);

  const handleCloseCheckoutModal = useCallback(() => {
    setIsCheckoutModalOpen(false);
  }, []);

  const generateTelegramQuery = useCallback(() => {
    // Mahsulot nomi = soni formatida query string
    const items = cartItems.map(item => `${encodeURIComponent(item.name)}=${item.quantity}`).join('&');
    return items;
  }, [cartItems]);

  const handleConfirmOrder = useCallback(async () => {
    setIsSubmittingOrder(true);

    try {
      // Telegram bot uchun query yaratish
      const telegramQuery = generateTelegramQuery();
      const telegramBotUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'your_bot_username';
      const telegramUrl = `https://t.me/${telegramBotUsername}?startapp=${encodeURIComponent(telegramQuery)}`;

      console.log('Telegram URL:', telegramUrl);
      console.log('Query data:', telegramQuery);

      // Debug uchun buyurtma ma'lumotlari
      console.log('Telegram Query:', telegramQuery);
      console.log('Decoded Query:', decodeURIComponent(telegramQuery));
      console.log('Items:', cartItems.map(item => `${item.name}: ${item.quantity}ta`));

      // Telegram botga yo'naltirish
      window.open(telegramUrl, '_blank');

      // Buyurtma muvaffaqiyatli amalga oshirildi
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
      handleClearCart();
      alert('Rahmat! Buyurtmangiz Telegram orqali yuborildi. Bot sizga javob beradi.');

    } catch (error) {
      console.error('Buyurtmani yuborishda xatolik:', error);
      alert('Kechirasiz, buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
      setIsSubmittingOrder(false);
    }
  }, [cartItems, handleClearCart, generateTelegramQuery]);


  const totalCartItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const filteredMenuItems = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return MENU_ITEMS;
    }
    return MENU_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <ErrorBoundary>
      <div className="bg-gradient-to-br from-background to-gray-50 min-h-screen font-sans text-text flex flex-col">
        <Header onCartClick={handleToggleCart} cartItemCount={totalCartItems} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-2">Bizning ajoyib menyu</h1>
            <p className="text-lg text-gray-600">Sevgi va eng yaxshi masalliqlar bilan tayyorlangan.</p>
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MenuList menuItems={filteredMenuItems} onAddToCart={handleAddToCart} />
        </main>
        <Cart
          isOpen={isCartOpen}
          onClose={handleToggleCart}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
          onCheckout={handleOpenCheckoutModal}
        />
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={handleCloseCheckoutModal}
          onSubmit={handleConfirmOrder}
          isSubmitting={isSubmittingOrder}
        />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}