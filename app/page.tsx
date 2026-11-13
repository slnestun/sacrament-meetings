import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#ded8c9] bg-[#f8f5ef] shadow-sm">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7d60]">Riverside Ward</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-[#33443b] sm:text-5xl">Sacrament Meeting Agenda</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#5c625b]">
            Review each Sunday’s program, find the current meeting, and prepare a clear copy to share.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/meetings/current" className="rounded-md bg-[#556b4f] px-5 py-3 font-medium text-white transition-colors hover:bg-[#40523b] focus:outline-none focus:ring-2 focus:ring-[#556b4f] focus:ring-offset-2">
              View current program
            </Link>
            <Link href="/meetings" className="rounded-md border border-[#83937a] px-5 py-3 font-medium text-[#40523b] transition-colors hover:bg-[#e8ede4] focus:outline-none focus:ring-2 focus:ring-[#556b4f] focus:ring-offset-2">
              View all meetings
            </Link>
          </div>
        </div>
        <div className="relative min-h-72 lg:min-h-full">
          <Image
            src="/sacrament-program-hero.png"
            alt="Meeting program resting on a chapel pew"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid gap-5 border-t border-[#ded8c9] bg-[#f1eee6] px-7 py-7 text-[#4e584d] sm:grid-cols-3 sm:px-12">
        <p><span className="font-semibold text-[#33443b]">Prepare</span><br />Organize each Sunday’s meeting order.</p>
        <p><span className="font-semibold text-[#33443b]">Review</span><br />Access current and previous programs.</p>
        <p><span className="font-semibold text-[#33443b]">Print</span><br />Create a clear, readable program copy.</p>
      </div>
    </section>
  );
}
