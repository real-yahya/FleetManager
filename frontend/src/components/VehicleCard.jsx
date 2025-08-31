import React from 'react';

// const regPretty = (s) => {
//   if (!s) return '—';
//   const compact = String(s).replace(/[^A-Za-z0-9]/g, '').toUpperCase();
//   return /^[A-Z]{2}\d{2}[A-Z]{3}$/.test(compact) ? `${compact.slice(0,2)}${compact.slice(2,4)} ${compact.slice(4)}` : s.toUpperCase();
// }

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, Number(n) || 0));
const daysUntil = (d) => (d ? Math.ceil((new Date(d) - new Date()) / 86400000) : null);
const miles = (n) => (n == null ? '—' : `${Math.round(n).toLocaleString()} mi`);
const fmtDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return Number.isNaN(dt) ? '—' : dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
};

const Stat = ({ label, value }) => (
  <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
    <div className="text-gray-500">{label}</div>
    <div className="font-semibold text-gray-900">{value}</div>
  </div>
);

const badgePowertrain = {
  electric: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  hybrid:   'bg-lime-50 text-lime-700 border-lime-200',
  diesel:   'bg-slate-50 text-slate-700 border-slate-200',
  petrol:   'bg-orange-50 text-orange-700 border-orange-200',
  unknown:  'bg-gray-50 text-gray-700 border-gray-200',
}

const badgeGearbox = {
  automatic: 'bg-sky-50 text-sky-700 border-sky-200',
  manual:    'bg-indigo-50 text-indigo-700 border-indigo-200',
  unknown:   'bg-gray-50 text-gray-700 border-gray-200',
};

const leasePill = (days) => (
  days == null ? 'bg-gray-100 text-gray-700'
  : days <= 30 ? 'bg-red-100 text-red-700'
  : days <= 90 ? 'bg-amber-100 text-amber-700'
               : 'bg-emerald-100 text-emerald-700'
);



const VehicleCard = ({vehicle}) => {

  const {
    regNumber, make, model, leaseCompany, leaseEndDate,
    location, lastValet, mileage, fuel, powertrain, gearbox
  } = vehicle || {};

  const fuelPct = clamp(fuel);
  const dueIn = daysUntil(leaseEndDate);
  const ptClass = badgePowertrain[powertrain] || badgePowertrain.unknown;
  const gbClass = badgeGearbox[gearbox] || badgeGearbox.unknown;

  return (
    <div className='rounded-2xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='inline-flex items-center gap-2'>
            <span className='inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold tracking-wide text-gray-800'>
              {regNumber}
            </span>
            {location && <span className='text-sm text-gray-500'>• {location}</span>}
          </div>
          <h2 className='mt-2 text-xl font-bold text-gray-900'>
            {make|| '-'} {model || '-'}
          </h2>
          <div className='mt-1 flex flex-wrap items-center gap-2'>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${ptClass}`}>
              {powertrain ?? 'unknown'}
            </span>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${gbClass}`}>
              {gearbox ?? 'unknown'}
            </span>
            {leaseCompany && (
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                {leaseCompany}
              </span>
            )}
          </div>
        </div>

        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${leasePill(dueIn)}`}>
          {dueIn == null ? 'No lease date' : dueIn >= 0 ? `${dueIn} days left` : `${Math.abs(dueIn)} days overdue`}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <Stat label="Mileage"     value={miles(mileage)} />
        <Stat label="Lease End"   value={fmtDate(leaseEndDate)} />
        <Stat label="Last Valet"  value={fmtDate(lastValet)} />
        <Stat label="Location"    value={location || '—'} />
      </div>

      <div className='mt-4'>
        <div className='mb-1 flex items-center justify-between text-xs text-gray-600'>
            <span>Fuel</span><span>{fuelPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={fuelPct}>
          <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${fuelPct}%` }} />
        </div>
      </div>

    </div>
  )
}

export default VehicleCard