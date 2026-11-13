import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(new Date(`${date}T12:00:00`));
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const meetingTypeLabel = {
    testimony: 'Testimony Meeting', regular: 'Regular Meeting', stake: 'Stake Meeting', general: 'General Meeting'
  }[meeting.meetingType];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#6b7d60]">{meetingTypeLabel}</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">{formatDate(meeting.date)}</h2>
      <dl className="mt-4 space-y-1 text-sm text-slate-700">
        <div>
          <dt className="inline font-medium">Presiding: </dt>
          <dd className="inline">{meeting.presiding}</dd>
        </div>
        <div>
          <dt className="inline font-medium">Conducting: </dt>
          <dd className="inline">{meeting.conducting}</dd>
        </div>
      </dl>
      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-flex rounded-md bg-[#556b4f] px-4 py-2 text-sm font-medium text-white hover:bg-[#40523b] focus:outline-none focus:ring-2 focus:ring-[#556b4f] focus:ring-offset-2"
      >
        View program
      </Link>
    </article>
  );
}
