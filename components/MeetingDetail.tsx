import type { Hymn, SacramentMeeting, SpeakerItem } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(new Date(`${date}T12:00:00`));
}

function HymnLine({ hymn }: { hymn: Hymn }) {
  return <>{hymn.number > 0 ? `Hymn ${hymn.number}: ` : ''}{hymn.title}</>;
}

function ParticipantLine({ item }: { item: SpeakerItem }) {
  const label = item.type === 'musical-number' ? 'Musical number' : 'Speaker';

  return (
    <li>
      <span className="font-medium">{label}: </span>
      {item.name}
      {item.topic ? ` — ${item.topic}` : ''}
    </li>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const meetingTypeLabel = {
    testimony: 'Testimony Meeting', regular: 'Regular Meeting', stake: 'Stake Meeting', general: 'General Meeting'
  }[meeting.meetingType];

  return (
    <article className="mx-auto max-w-4xl rounded-sm border border-[#ded8c9] bg-[#fdfbf6] p-7 shadow-sm print:border-0 print:p-0 print:shadow-none sm:p-10">
      <header className="border-b border-[#c9d2c3] pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#6b7d60]">{meetingTypeLabel}</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-[#33443b]">Sacrament Meeting Program</h1>
        <p className="mt-2 text-lg text-slate-700">{formatDate(meeting.date)}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-900">Presiding</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-900">Conducting</dt>
            <dd>{meeting.conducting}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-900">Stake business</dt>
            <dd>{meeting.stakeBusiness ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </header>

      {meeting.announcements?.length ? (
        <section className="mt-6" aria-labelledby="announcements-heading">
          <h2 id="announcements-heading" className="text-xl font-semibold">Announcements</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {meeting.announcements.map((announcement) => <li key={announcement}>{announcement}</li>)}
          </ul>
        </section>
      ) : null}

      <section className="mt-6" aria-labelledby="program-heading">
        <h2 id="program-heading" className="text-xl font-semibold">Program</h2>
        <dl className="mt-3 space-y-4">
          <div>
            <dt className="font-medium">Opening hymn</dt>
            <dd><HymnLine hymn={meeting.openingHymn} /></dd>
          </div>
          <div>
            <dt className="font-medium">Opening prayer</dt>
            <dd>{meeting.openingPrayer}</dd>
          </div>
          <div>
            <dt className="font-medium">Ward business</dt>
            <dd>
              {meeting.wardBusiness.length ? (
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {meeting.wardBusiness.map((item) => <li key={item.description}>{item.description}</li>)}
                </ul>
              ) : 'None'}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Sacrament hymn</dt>
            <dd><HymnLine hymn={meeting.sacramentHymn} /></dd>
          </div>
          <div>
            <dt className="font-medium">Speakers and musical numbers</dt>
            <dd>
              {meeting.speakers.length ? (
                <ul className="mt-1 space-y-1">{meeting.speakers.map((item) => <ParticipantLine key={`${item.type}-${item.name}`} item={item} />)}</ul>
              ) : 'Testimony meeting'}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Closing hymn</dt>
            <dd><HymnLine hymn={meeting.closingHymn} /></dd>
          </div>
          <div>
            <dt className="font-medium">Closing prayer</dt>
            <dd>{meeting.closingPrayer}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
