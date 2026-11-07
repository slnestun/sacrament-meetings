'use client';

import { Suspense, useSyncExternalStore } from 'react';
import NavLinks from './NavLinks';

const subscribe = () => () => {};

function getCurrentDate() {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(new Date());
}

export default function Header() {
  const currentDate = useSyncExternalStore(subscribe, getCurrentDate, () => 'Loading date...');

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#556b4f]">Riverside Ward</p>
          <p className="text-sm text-slate-600">{currentDate || 'Loading date...'}</p>
        </div>
        <Suspense fallback={<div className="h-9 w-64" aria-label="Loading navigation" />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
