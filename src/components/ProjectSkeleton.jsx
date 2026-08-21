function ProjectSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]"
      aria-hidden="true"
    >
      <div className="aspect-[4/5] w-full bg-[var(--border)]" />
      <div className="space-y-3 border-t border-[var(--border)] px-5 py-4">
        <div className="h-2 w-16 rounded-full bg-[var(--border)]" />
        <div className="h-4 w-3/4 rounded-full bg-[var(--border)]" />
        <div className="h-3 w-1/2 rounded-full bg-[var(--border)]" />
      </div>
    </div>
  );
}

export default ProjectSkeleton;
