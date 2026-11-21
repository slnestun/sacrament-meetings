'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-4 text-sm">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className="rounded-md border border-[#83937a] px-4 py-2 font-medium text-[#40523b] hover:bg-[#e8ede4]">
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-slate-200 px-4 py-2 text-slate-500">Previous</span>
      )}
      <span aria-current="page" className="font-medium text-[#33443b]">Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className="rounded-md border border-[#83937a] px-4 py-2 font-medium text-[#40523b] hover:bg-[#e8ede4]">
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-slate-200 px-4 py-2 text-slate-500">Next</span>
      )}
    </nav>
  );
}
