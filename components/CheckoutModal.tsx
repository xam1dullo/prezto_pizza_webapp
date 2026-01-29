
import React, { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
  isSubmitting: boolean;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [phoneNumber, setPhoneNumber] = useState('+998 ');
  const [isTouched, setIsTouched] = useState(false);

  // Validates a number like +998901234567 (13 digits total)
  const isPhoneNumberValid = phoneNumber.replace(/ /g, '').length === 13;
  const isInvalid = isTouched && !isPhoneNumberValid;

  useEffect(() => {
    // Reset state when modal opens/closes
    if (isOpen) {
      setPhoneNumber('+998 ');
      setIsTouched(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic formatting for Uzbek phone numbers
    let formatted = '+998';
    const numbers = value.replace(/\D/g, '').substring(3); // remove non-digits, except for country code
    
    if (numbers.length > 0) formatted += ' ' + numbers.substring(0, 2);
    if (numbers.length > 2) formatted += ' ' + numbers.substring(2, 5);
    if (numbers.length > 5) formatted += ' ' + numbers.substring(5, 7);
    if (numbers.length > 7) formatted += ' ' + numbers.substring(7, 9);
    
    if (formatted.length <= 17) {
        setPhoneNumber(formatted);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    if (isPhoneNumberValid) {
        onSubmit(phoneNumber);
    }
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md transform transition-all animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-serif text-primary">Buyurtmani tasdiqlash</h2>
            <button onClick={onClose} className="p-2 text-3xl leading-none rounded-full hover:bg-gray-100">&times;</button>
        </div>
        
        <p className="text-gray-600 mb-6">Buyurtmani yakunlash uchun telefon raqamingizni kiriting. Operatorimiz siz bilan bog'lanadi.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-bold text-text mb-2">Telefon raqam</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              onBlur={() => setIsTouched(true)}
              placeholder="+998 90 123 45 67"
              className={`w-full px-4 py-3 bg-white text-text border rounded-lg focus:ring-2 transition-all ${
                isInvalid 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-300 focus:ring-primary/50 focus:border-primary'
              }`}
              required
              autoFocus
            />
            {isInvalid && (
              <p className="text-red-600 text-sm mt-2">Iltimos, to'g'ri telefon raqam kiriting. (Masalan: +998 90 123 45 67)</p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="submit"
              disabled={!isPhoneNumberValid || isSubmitting}
              className="w-full flex justify-center items-center bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting && <LoadingSpinner />}
              {isSubmitting ? 'Yuborilmoqda...' : 'Tasdiqlash'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
       `}</style>
    </div>
  );
};

export default CheckoutModal;