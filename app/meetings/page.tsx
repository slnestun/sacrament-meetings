'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMeetings() {
      try {
        const response = await fetch('/api/meetings');

        if (!response.ok) {
          throw new Error('Unable to load meetings.');
        }

        const data: SacramentMeeting[] = await response.json();
        setMeetings(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unable to load meetings.');
      } finally {
        setIsLoading(false);
      }
    }

    loadMeetings();
  }, []);

  if (isLoading) {
    return <p role="status">Loading meetings...</p>;
  }

  if (error) {
    return <p role="alert" className="rounded-md bg-red-50 p-4 text-red-800">{error}</p>;
  }

  if (!meetings.length) {
    return <p>No meetings have been scheduled yet.</p>;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-bold text-[#33443b]">Sacrament Meetings</h1>
        <Link href="/meetings/current" className="rounded-md border border-[#83937a] px-4 py-2 text-sm font-medium text-[#40523b] hover:bg-[#e8ede4]">
          View current meeting
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
      </div>
    </>
  );
}
