import Link from 'next/link';

export default function MeetingsLayout({ children }: LayoutProps<'/meetings'>) {
  return (
    <section>
      <nav aria-label="Meetings navigation" className="print-hidden mb-8 flex items-center justify-between border-b border-[#c9d2c3] pb-3 text-sm">
        <span className="font-semibold text-[#40523b]">Meetings</span>
        <div className="flex items-center gap-5">
          <Link href="/meetings" className="text-[#556b4f] hover:text-[#33443b] hover:underline">
            All meetings
          </Link>
          <Link href="/meetings/current" className="text-[#556b4f] hover:text-[#33443b] hover:underline">
            Current meeting
          </Link>
        </div>
      </nav>
      {children}
    </section>
  );
}
