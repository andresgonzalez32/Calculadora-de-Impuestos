import React, { useState } from 'react';

interface HousingData {
  id: string;
  owner: string;
  value: number;
  area: number;
  builtArea: number;
}

export function HousingForm() {
  const [formData, setFormData] = useState<HousingData>({
    id: '',
    owner: '',
    value: 0,
    area: 0,
    builtArea: 0,
  });
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = (value: number, area: number, builtArea: number): number => {
    const constructionPercentage = (builtArea / area) * 100;
    
    if (area < 1000) {
      return value * 0.005; // 0.5% if area < 1000m²
    } else if (constructionPercentage > 50) {
      return value * 0.02; // 2% if area > 1000m² and construction > 50%
    } else {
      return value * 0.01; // 1% if area > 1000m² and construction ≤ 50%
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedTax = calculateTax(formData.value, formData.area, formData.builtArea);
    setTax(calculatedTax);

    // Dispatch tax calculation event for total sum
    window.dispatchEvent(
      new CustomEvent('taxCalculated', {
        detail: { type: 'housingTax', amount: calculatedTax }
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Liquidar Vivienda</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de Vivienda</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Propietario</label>
          <input
            type="text"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Avalúo</label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Área Total (m²)</label>
          <input
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Metros Cuadrados Construidos</label>
          <input
            type="number"
            value={formData.builtArea}
            onChange={(e) => setFormData({ ...formData, builtArea: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Liquidar Impuestos
        </button>
      </form>
      {tax !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Resultado de la Liquidación</h3>
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            ${tax.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {formData.area < 1000
              ? 'Tasa aplicada: 0.5% (Área < 1000m²)'
              : (formData.builtArea / formData.area) * 100 > 50
              ? 'Tasa aplicada: 2% (Área > 1000m² y construcción > 50%)'
              : 'Tasa aplicada: 1% (Área > 1000m² y construcción ≤ 50%)'}
          </p>
        </div>
      )}
    </div>
  );
}