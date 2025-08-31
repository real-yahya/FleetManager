// seedVehicles.js (ESM)
import mongoose from 'mongoose';
import { CONNECTION_URL } from './config/env.js';

import Vehicle from './models/Vehicle.model.js'; // adjust path if needed

const uri = process.env.MONGODB_URI || process.env.CONNECTION_URL;
const d = (s) => new Date(s);


const vehicles = [
  {
    regNumber: 'AB12 CDE',
    make: 'Toyota',
    model: 'Corolla',
    leaseCompany: 'ZenLease',
    leaseEndDate: d('2026-05-01'),
    location: 'leicester-hq',
    lastValet: d('2025-08-20'),
    mileage: 42000,
    fuel: 65,
    powertrain: 'petrol',
    gearbox: 'automatic',
  },
  {
    regNumber: 'YX19 ZZZ',
    make: 'Volkswagen',
    model: 'Golf',
    leaseCompany: 'FleetCore',
    leaseEndDate: d('2026-01-15'),
    location: 'unit-a',
    lastValet: d('2025-08-10'),
    mileage: 58800,
    fuel: 34,
    powertrain: 'diesel',
    gearbox: 'manual',
  },
  {
    regNumber: 'EV21 AAA',
    make: 'Tesla',
    model: 'Model 3',
    leaseCompany: 'GreenDrive',
    leaseEndDate: d('2027-02-10'),
    location: 'leicester-hq',
    lastValet: d('2025-08-05'),
    mileage: 19800,
    fuel: 82,
    powertrain: 'electric',
    gearbox: 'unknown', // single-speed EV represented as 'unknown'
  },
  {
    regNumber: 'HK70 HYB',
    make: 'Toyota',
    model: 'Prius',
    leaseCompany: 'ZenLease',
    leaseEndDate: d('2026-11-30'),
    location: 'unit-b',
    lastValet: d('2025-07-29'),
    mileage: 35500,
    fuel: 48,
    powertrain: 'hybrid',
    gearbox: 'automatic',
  },
  {
    regNumber: 'MH22 ABC',
    make: 'Hyundai',
    model: 'Ioniq Hybrid',
    leaseCompany: 'LeasePlus',
    leaseEndDate: d('2027-06-30'),
    location: 'leicester-hq',
    lastValet: d('2025-08-15'),
    mileage: 27650,
    fuel: 57,
    powertrain: 'hybrid',
    gearbox: 'automatic',
  },
  {
    regNumber: 'MD68 DCT',
    make: 'Honda',
    model: 'Civic',
    leaseCompany: 'FleetCore',
    leaseEndDate: d('2026-03-20'),
    location: 'unit-a',
    lastValet: d('2025-08-17'),
    mileage: 61230,
    fuel: 22,
    powertrain: 'petrol',
    gearbox: 'automatic',
  },
  {
    regNumber: 'CV14 CVT',
    make: 'Nissan',
    model: 'Qashqai',
    leaseCompany: 'LeasePlus',
    leaseEndDate: d('2025-12-05'),
    location: 'unit-b',
    lastValet: d('2025-08-11'),
    mileage: 78910,
    fuel: 40,
    powertrain: 'diesel',
    gearbox: 'automatic',
  },
  {
    regNumber: 'DL15 MAN',
    make: 'Ford',
    model: 'Focus',
    leaseCompany: 'ZenLease',
    leaseEndDate: d('2026-09-18'),
    location: 'leicester-hq',
    lastValet: d('2025-08-02'),
    mileage: 50320,
    fuel: 73,
    powertrain: 'petrol',
    gearbox: 'manual',
  },
  {
    regNumber: 'HN69 LPG',
    make: 'Vauxhall',
    model: 'Astra',
    leaseCompany: 'FleetCore',
    leaseEndDate: d('2026-08-01'),
    location: 'unit-a',
    lastValet: d('2025-08-08'),
    mileage: 64050,
    fuel: 51,
    powertrain: 'unknown',
    gearbox: 'manual',
  },
  {
    regNumber: 'HG20 H2O',
    make: 'Hyundai',
    model: 'Kona Electric',
    leaseCompany: 'GreenDrive',
    leaseEndDate: d('2027-01-20'),
    location: 'unit-b',
    lastValet: d('2025-08-12'),
    mileage: 15800,
    fuel: 90,
    powertrain: 'electric',
    gearbox: 'unknown',
  },
];

async function main() {
  if (!uri) {
    console.error('❌ Missing MONGODB_URI or CONNECTION_URL in .env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('✅ Connected');

  const { deletedCount } = await Vehicle.deleteMany({});
  console.log(`Deleted ${deletedCount} vehicles`);


  try {
    const result = await Vehicle.insertMany(vehicles, { ordered: false });
    console.log(`✅ Inserted ${result.length} vehicles`);
  } catch (err) {
    if (err?.writeErrors) {
      const inserted = vehicles.length - err.writeErrors.length;
      console.warn(`⚠️ Inserted ${inserted}; ${err.writeErrors.length} failed (likely duplicates)`);
    } else {
      console.error(err);
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
