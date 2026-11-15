'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const { id } = use(params);
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMeeting() {
      try {
        const response = await fetch(`/api/meetings/${encodeURIComponent(id)}`);

        if (response.status === 404) {
          setError('This meeting could not be found.');
          return;
        }

        if (!response.ok) {
          throw new Error('Unable to load this meeting.');
        }

        const data: SacramentMeeting = await response.json();
        setMeeting(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unable to load this meeting.');
      } finally {
        setIsLoading(false);
      }
    }

    loadMeeting();
  }, [id]);

  if (isLoading) {
    return <p role="status">Loading meeting...</p>;
  }

  if (error || !meeting) {
    return <p role="alert" className="rounded-md bg-red-50 p-4 text-red-800">{error ?? 'This meeting could not be found.'}</p>;
  }

  return (
    <div>
      <div className="print-hidden mx-auto mb-4 flex max-w-4xl items-center justify-between px-1">
        <Link href="/meetings" className="text-sm font-medium text-[#556b4f] hover:text-[#40523b] hover:underline">
          ← Back to meetings
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-[#556b4f] px-4 py-2 text-sm font-medium text-white hover:bg-[#40523b] focus:outline-none focus:ring-2 focus:ring-[#556b4f] focus:ring-offset-2"
        >
          Print program
        </button>
      </div>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
