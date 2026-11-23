import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export default async function MeetingsPage(props: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query ?? '';
  const requestedPage = Number(searchParams.page);
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const totalPages = await getMeetingsTotalPages(query);

  if (totalPages > 0 && currentPage > totalPages) {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', String(totalPages));
    redirect(`/meetings?${params.toString()}`);
  }

  const meetings = await getMeetings(query, currentPage);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-bold text-[#33443b]">Sacrament Meetings</h1>
        <div className="flex flex-wrap gap-3">
          <Link href="/meetings/new" className="rounded-md bg-[#556b4f] px-4 py-2 text-sm font-medium text-white hover:bg-[#40523b]">
            Create meeting
          </Link>
          <Link href="/meetings/current" className="rounded-md border border-[#83937a] px-4 py-2 text-sm font-medium text-[#40523b] hover:bg-[#e8ede4]">
            View current meeting
          </Link>
        </div>
      </div>

      <MeetingSearch />

      {meetings.length ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <p className="mt-6">No meetings match your search.</p>
      )}
    </>
  );
}
