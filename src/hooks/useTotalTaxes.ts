import { useState, useEffect } from 'react';

interface TaxState {
  lotTax: number;
  vehicleTax: number;
  housingTax: number;
  total: number;
}

export function useTotalTaxes() {
  const [taxes, setTaxes] = useState<TaxState>({
    lotTax: 0,
    vehicleTax: 0,
    housingTax: 0,
    total: 0,
  });

  useEffect(() => {
    const handleTaxUpdate = (event: CustomEvent<{ type: string; amount: number }>) => {
      const { type, amount } = event.detail;
      
      setTaxes(prev => {
        const newTaxes = {
          ...prev,
          [type]: amount
        };
        
        return {
          ...newTaxes,
          total: newTaxes.lotTax + newTaxes.vehicleTax + newTaxes.housingTax
        };
      });
    };

    window.addEventListener('taxCalculated' as any, handleTaxUpdate);
    return () => window.removeEventListener('taxCalculated' as any, handleTaxUpdate);
  }, []);

  return taxes;
}