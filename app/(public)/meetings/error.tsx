'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold text-[#33443b]">Unable to load meetings</h1>
      <p className="mt-3">Please try again, or return to the meetings list.</p>
      <div className="mt-5 flex gap-3">
        <button type="button" onClick={reset} className="rounded-md bg-[#556b4f] px-4 py-2 font-medium text-white">Try again</button>
        <Link href="/meetings" className="rounded-md border border-[#556b4f] px-4 py-2 font-medium text-[#40523b]">Meetings</Link>
      </div>
    </section>
  );
}
