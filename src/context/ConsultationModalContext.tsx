import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConsultationModal } from '../components/consultation/ConsultationModal';

interface ConsultationModalContextType {
  isConsultationOpen: boolean;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export const ConsultationModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultationModal = useCallback(() => {
    setIsConsultationOpen(true);
  }, []);

  const closeConsultationModal = useCallback(() => {
    setIsConsultationOpen(false);
  }, []);

  return (
    <ConsultationModalContext.Provider
      value={{
        isConsultationOpen,
        openConsultationModal,
        closeConsultationModal,
      }}
    >
      {children}
      <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultationModal} />
    </ConsultationModalContext.Provider>
  );
};

export const useConsultationModal = (): ConsultationModalContextType => {
  const context = useContext(ConsultationModalContext);
  if (!context) {
    throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  }
  return context;
};
