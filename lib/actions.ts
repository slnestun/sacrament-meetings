'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addMeeting, deleteMeeting as removeMeeting, updateMeeting as saveMeeting } from './meetings-db';
import type { SacramentMeeting } from './types';

export type MeetingFormState = { message: string; errors?: Record<string, string[]> };

const MeetingFormSchema = z.object({
  date: z.string().date('Choose a valid meeting date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().trim().min(1, 'Presiding leader is required.'),
  conducting: z.string().trim().min(1, 'Conducting leader is required.'),
  openingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce.number().int().positive('Enter a hymn number.'),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
  announcements: z.string(), wardBusiness: z.string(), speakers: z.string(), stakeBusiness: z.boolean(),
});

function lines(value: string) { return value.split('\n').map((item) => item.trim()).filter(Boolean); }
function toMeeting(data: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
  const speakers = lines(data.speakers).map((line) => { const [name, topic = ''] = line.split('|').map((part) => part.trim()); return { name, topic, type: 'speaker' as const }; });
  return { date: data.date, meetingType: data.meetingType, presiding: data.presiding, conducting: data.conducting, announcements: lines(data.announcements), openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle }, openingPrayer: data.openingPrayer, wardBusiness: lines(data.wardBusiness).map((description) => ({ description })), stakeBusiness: data.stakeBusiness, sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle }, speakers, closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle }, closingPrayer: data.closingPrayer };
}

export async function createMeeting(_prevState: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse({ ...Object.fromEntries(formData), stakeBusiness: formData.get('stakeBusiness') === 'on' });
  if (!parsed.success) return { message: 'Please correct the highlighted fields.', errors: z.flattenError(parsed.error).fieldErrors };
  const data = parsed.data;
  const meeting = toMeeting(data);
  try { await addMeeting(meeting); } catch (error) { console.error(error); throw new Error('Unable to save the meeting. Please try again.'); }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, _prevState: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse({ ...Object.fromEntries(formData), stakeBusiness: formData.get('stakeBusiness') === 'on' });
  if (!parsed.success) return { message: 'Please correct the highlighted fields.', errors: z.flattenError(parsed.error).fieldErrors };
  try { await saveMeeting(id, toMeeting(parsed.data)); } catch (error) { console.error(error); throw new Error('Unable to update the meeting. Please try again.'); }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  try { await removeMeeting(id); } catch (error) { console.error(error); throw new Error('Unable to delete the meeting. Please try again.'); }
  revalidatePath('/meetings');
  redirect('/meetings');
}
