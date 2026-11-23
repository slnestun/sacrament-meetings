import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

export const instant = false;

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) notFound();

  const meeting = await getMeetingById(meetingId);
  if (!meeting) notFound();

  return (
    <>
      <h1 className="mb-6 font-serif text-3xl font-bold text-[#33443b]">Edit Meeting</h1>
      <MeetingForm meeting={meeting} />
    </>
  );
}
