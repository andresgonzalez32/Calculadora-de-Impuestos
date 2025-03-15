import React, { useState } from 'react';
import { Home } from './components/Home';
import { LotForm } from './components/LotForm';
import { VehicleForm } from './components/VehicleForm';
import { HousingForm } from './components/HousingForm';
import { LayoutGrid } from 'lucide-react';

type View = 'home' | 'lot' | 'vehicle' | 'housing';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <LayoutGrid className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Sistema de Liquidación</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'home' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => setCurrentView('lot')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'lot' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                Liquidar Lote
              </button>
              <button
                onClick={() => setCurrentView('vehicle')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'vehicle' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                Liquidar Vehículo
              </button>
              <button
                onClick={() => setCurrentView('housing')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'housing' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                }`}
              >
                Liquidar Vivienda
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentView === 'home' && <Home />}
        {currentView === 'lot' && <LotForm />}
        {currentView === 'vehicle' && <VehicleForm />}
        {currentView === 'housing' && <HousingForm />}
      </main>
    </div>
  );
}

export default App;