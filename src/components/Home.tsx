import React from 'react';
import { Building2, Car, Home as HomeIcon, Calculator } from 'lucide-react';
import { Link } from './Link';
import { useTotalTaxes } from '../hooks/useTotalTaxes';

export function Home() {
  const { lotTax, vehicleTax, housingTax, total } = useTotalTaxes();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center">
        Bienvenido al Sistema de Liquidación de Impuestos
      </h1>
      
      {/* Tax Summary Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-900">Resumen de Impuestos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-500">Impuesto Lotes</h3>
            <p className="text-lg font-bold text-indigo-600">
              ${lotTax.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-500">Impuesto Vehículos</h3>
            <p className="text-lg font-bold text-indigo-600">
              ${vehicleTax.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-500">Impuesto Viviendas</h3>
            <p className="text-lg font-bold text-indigo-600">
              ${housingTax.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-md">
            <h3 className="text-sm font-medium text-indigo-800">Total Impuestos</h3>
            <p className="text-xl font-bold text-indigo-600">
              ${total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Link href="/lot" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Building2 className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Liquidar Lote</h2>
          <p className="text-gray-600">
            Calcule los impuestos para lotes y terrenos
          </p>
        </Link>
        <Link href="/vehicle" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Car className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Liquidar Vehículo</h2>
          <p className="text-gray-600">
            Calcule los impuestos para vehículos
          </p>
        </Link>
        <Link href="/housing" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <HomeIcon className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Liquidar Vivienda</h2>
          <p className="text-gray-600">
            Calcule los impuestos para viviendas
          </p>
        </Link>
      </div>
    </div>
  );
}