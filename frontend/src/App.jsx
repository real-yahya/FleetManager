import { useEffect, useState } from 'react';
import VehicleCard from './components/VehicleCard.jsx';
import CreateButton from './components/CreateButton.jsx';

const API = 'http://localhost:5001';

export default function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/v1/vehicles/allVehicles`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected API response');
      setVehicles(data);
      setErrorMsg('');
    } catch (e) {
      console.error(e);
      setVehicles([]);
      setErrorMsg('Could not load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  return (
    <>
     <main className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-10'>
        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl font font-extrabold text-gray-900'>
            Company Cars
          </h1>
          <p className='mt-2 text-gray-600'>
            Live fleet overview — lease, fuel, mileage.
          </p>
          <div className='mt-3 flex justify-end'> 
            <CreateButton className="" onSuccess={fetchVehicles}/>
          </div>
          
        </header>

        {errorMsg && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {errorMsg}
          </div>
          )
        }

        {loading ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <li key={i}>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="mt-3 h-6 w-48 animate-pulse rounded bg-gray-200" />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="h-16 animate-pulse rounded bg-gray-100" />
                    <div className="h-16 animate-pulse rounded bg-gray-100" />
                    <div className="h-16 animate-pulse rounded bg-gray-100" />
                    <div className="h-16 animate-pulse rounded bg-gray-100" />
                  </div>
                  <div className="mt-4 h-4 animate-pulse rounded bg-gray-200" />
                </div>
              </li>
            ))}
          </ul>
          ) : vehicles.length === 0 ?(
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
              No vehicles yet. Create a vehicle to get started.
            </div>
          ): (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map(v => (
              <li key={v._id || v.regNumber}>
                <VehicleCard vehicle={v} onSuccess={fetchVehicles} />
              </li>
            ))}
          </ul>
        )}
      </div>
     </main>
    </>
  );
}