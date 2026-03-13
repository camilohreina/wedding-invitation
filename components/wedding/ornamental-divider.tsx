export function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <svg
        viewBox="0 0 200 30"
        className="h-6 w-40 text-primary/30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15" />
        <path d="M0,15 Q25,25 50,15 T100,15 T150,15 T200,15" />
        <circle cx="100" cy="15" r="3" fill="currentColor" />
        <circle cx="80" cy="15" r="1.5" fill="currentColor" />
        <circle cx="120" cy="15" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}
