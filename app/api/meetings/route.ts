import { getMeetingByDate, getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date');

  if (date) {
    const meeting = await getMeetingByDate(date);
    return Response.json(meeting ? [meeting] : []);
  }

  const meetings = await getMeetings();

  return Response.json(meetings);
}
