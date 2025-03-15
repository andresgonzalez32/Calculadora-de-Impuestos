import React, { useState } from 'react';

interface VehicleData {
  id: string;
  owner: string;
  value: number;
  model: string;
  fuelType: string;
}

export function VehicleForm() {
  const [formData, setFormData] = useState<VehicleData>({
    id: '',
    owner: '',
    value: 0,
    model: '',
    fuelType: '',
  });
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = (value: number, model: string, fuelType: string): number => {
    const modelYear = parseInt(model, 10);
    const isHighEmission = (fuelType === 'gasolina' || fuelType === 'diesel') && modelYear > 2015;
    const isEcoFriendly = fuelType === 'electrico' || fuelType === 'hibrido';
    
    // 3% if model > 2015 and fuel type is gasoline or diesel
    // 1% if hybrid or electric
    const rate = isHighEmission ? 0.03 : (isEcoFriendly ? 0.01 : 0.02);
    return value * rate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedTax = calculateTax(formData.value, formData.model, formData.fuelType);
    setTax(calculatedTax);

    // Dispatch tax calculation event for total sum
    window.dispatchEvent(
      new CustomEvent('taxCalculated', {
        detail: { type: 'vehicleTax', amount: calculatedTax }
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Liquidar Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Vehículo</label>
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
          <label className="block text-sm font-medium text-gray-700">Avalúo Comercial</label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo (Año)</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            pattern="\d{4}"
            title="Ingrese un año válido (YYYY)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Combustión</label>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione tipo de combustión</option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diesel</option>
            <option value="electrico">Eléctrico</option>
            <option value="hibrido">Híbrido</option>
          </select>
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
            {formData.fuelType === 'electrico' || formData.fuelType === 'hibrido'
              ? 'Tasa aplicada: 1% (Vehículo ecológico)'
              : parseInt(formData.model) > 2015
              ? 'Tasa aplicada: 3% (Modelo > 2015 y combustión tradicional)'
              : 'Tasa aplicada: 2% (Modelo ≤ 2015)'}
          </p>
        </div>
      )}
    </div>
  );
}