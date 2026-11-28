import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold text-[#33443b]">Meeting not found</h1>
      <p className="mt-3">This meeting does not exist or may have been deleted.</p>
      <Link href="/meetings" className="mt-5 inline-block rounded-md bg-[#556b4f] px-4 py-2 font-medium text-white">
        Return to meetings
      </Link>
    </section>
  );
}
