export default function Loading() {
  return (
    <div role="status" className="grid gap-4 sm:grid-cols-2" aria-live="polite">
      <p className="sr-only">Loading meetings</p>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-48 animate-pulse rounded-lg bg-slate-200" />
      ))}
    </div>
  );
}
