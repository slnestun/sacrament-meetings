import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <nav aria-label="Administration navigation" className="mb-8 flex items-center justify-between border-b border-[#c9d2c3] pb-3 text-sm">
        <span className="font-semibold text-[#40523b]">Administration</span>
        <Link href="/meetings" className="text-[#556b4f] hover:text-[#33443b] hover:underline">
          View meetings
        </Link>
      </nav>
      {children}
    </section>
  );
}
