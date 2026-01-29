
import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    onSubmit();
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

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📱</div>
          <p className="text-gray-600 mb-2">Buyurtmangizni Telegram orqali yubormoqchimisiz?</p>
          <p className="text-sm text-gray-500">Bot sizga buyurtma tafsilotlarini yuboradi va telefon raqamingizni so'raydi.</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex justify-center items-center bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting && <LoadingSpinner />}
            {isSubmitting ? 'Telegramga yo\'naltirilmoqda...' : '✅ Telegramga yuborish'}
          </button>
        </div>
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