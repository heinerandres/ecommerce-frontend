'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FiltroContextType {
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
  categoria: string;
  setCategoria: React.Dispatch<React.SetStateAction<string>>;
}

const FiltroContext = createContext<FiltroContextType | null>(null);

export const FiltroProvider = ({ children }: { children: ReactNode }) => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  return (
    <FiltroContext.Provider
      value={{
        busqueda,
        setBusqueda,
        categoria,
        setCategoria
      }}
    >
      {children}
    </FiltroContext.Provider>
  );
};

export const useFiltro = () => {
  const context = useContext(FiltroContext);

  if (!context) {
    throw new Error('useFiltro debe usarse dentro de FiltroProvider');
  }

  return context;
};