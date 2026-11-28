'use client';

import { useActionState } from 'react';
import {
  createMeeting,
  updateMeeting,
} from '@/lib/actions';
import type { MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

const initialMeetingFormState: MeetingFormState = { message: '' };

const fields = [
  ['date', 'Date', 'date'],
  ['presiding', 'Presiding', 'text'],
  ['conducting', 'Conducting', 'text'],
  ['openingHymnNumber', 'Opening hymn number', 'number'],
  ['openingHymnTitle', 'Opening hymn title', 'text'],
  ['openingPrayer', 'Opening prayer', 'text'],
  ['sacramentHymnNumber', 'Sacrament hymn number', 'number'],
  ['sacramentHymnTitle', 'Sacrament hymn title', 'text'],
  ['closingHymnNumber', 'Closing hymn number', 'number'],
  ['closingHymnTitle', 'Closing hymn title', 'text'],
  ['closingPrayer', 'Closing prayer', 'text'],
] as const;

type MeetingFormProps = {
  meeting?: SacramentMeeting;
};

function getDefaultValue(name: (typeof fields)[number][0], meeting?: SacramentMeeting) {
  if (!meeting) return '';

  const values: Record<(typeof fields)[number][0], string | number> = {
    date: meeting.date,
    presiding: meeting.presiding,
    conducting: meeting.conducting,
    openingHymnNumber: meeting.openingHymn.number,
    openingHymnTitle: meeting.openingHymn.title,
    openingPrayer: meeting.openingPrayer,
    sacramentHymnNumber: meeting.sacramentHymn.number,
    sacramentHymnTitle: meeting.sacramentHymn.title,
    closingHymnNumber: meeting.closingHymn.number,
    closingHymnTitle: meeting.closingHymn.title,
    closingPrayer: meeting.closingPrayer,
  };

  return values[name];
}

export default function MeetingForm({ meeting }: MeetingFormProps) {
  const action = meeting ? updateMeeting.bind(null, meeting.id) : createMeeting;
  const [state, formAction, isPending] = useActionState(action, initialMeetingFormState);
  const error = (name: string) => state.errors?.[name]?.[0];

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-5 rounded-lg border border-[#ded8c9] bg-white p-6 shadow-sm">
      <p role="status" aria-live="polite" className="min-h-6 rounded text-red-800">
        {state.message}
      </p>

      <div>
        <label htmlFor="meetingType" className="font-medium">Meeting type</label>
        <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? 'regular'} aria-describedby="meetingType-error" className="mt-1 w-full rounded border p-2">
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <p id="meetingType-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{error('meetingType')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <div key={name}>
            <label htmlFor={name} className="font-medium">{label}</label>
            <input id={name} name={name} type={type} defaultValue={getDefaultValue(name, meeting)} aria-describedby={`${name}-error`} className="mt-1 w-full rounded border p-2" required />
            <p id={`${name}-error`} aria-live="polite" className="min-h-5 text-sm text-red-700">{error(name)}</p>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="announcements" className="font-medium">Announcements (one per line)</label>
        <textarea id="announcements" name="announcements" defaultValue={meeting?.announcements?.join('\n')} aria-describedby="announcements-error" className="mt-1 w-full rounded border p-2" />
        <p id="announcements-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{error('announcements')}</p>
      </div>
      <div>
        <label htmlFor="wardBusiness" className="font-medium">Ward business (one per line)</label>
        <textarea id="wardBusiness" name="wardBusiness" defaultValue={meeting?.wardBusiness.map((item) => item.description).join('\n')} aria-describedby="wardBusiness-error" className="mt-1 w-full rounded border p-2" />
        <p id="wardBusiness-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{error('wardBusiness')}</p>
      </div>
      <div>
        <label htmlFor="speakers" className="font-medium">Speakers (Name | Topic, one per line)</label>
        <textarea id="speakers" name="speakers" defaultValue={meeting?.speakers.map((speaker) => `${speaker.name} | ${speaker.topic}`).join('\n')} aria-describedby="speakers-error" className="mt-1 w-full rounded border p-2" />
        <p id="speakers-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{error('speakers')}</p>
      </div>
      <div>
        <label className="flex gap-2" htmlFor="stakeBusiness">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" defaultChecked={meeting?.stakeBusiness} aria-describedby="stakeBusiness-error" />
          Stake business
        </label>
        <p id="stakeBusiness-error" aria-live="polite" className="min-h-5 text-sm text-red-700">{error('stakeBusiness')}</p>
      </div>
      <button disabled={isPending} className="rounded bg-[#556b4f] px-4 py-2 font-medium text-white disabled:opacity-60">
        {isPending ? 'Saving...' : meeting ? 'Update meeting' : 'Create meeting'}
      </button>
    </form>
  );
}
