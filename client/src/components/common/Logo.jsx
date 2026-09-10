// Placeholder logomark -- the brief mentions an existing lab logo file that
// may be uploaded later. Drop the real asset into src/assets/logo.svg and
// swap the <svg> below for an <img src={logo} /> when it arrives.
export default function Logo({ size = 34, withWordmark = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 3C20 3 8 17.5 8 25.5C8 32.4 13.4 37 20 37C26.6 37 32 32.4 32 25.5C32 17.5 20 3 20 3Z"
          fill="url(#logo-grad)"
        />
        <path
          d="M11 27C13 30 16.5 32 20 30.5C23.5 29 26 25 29 26.5"
          stroke="#0A1420"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="logo-grad" x1="8" y1="3" x2="32" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5EEAD4" />
            <stop offset="1" stopColor="#F2A93B" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark && (
        <span className="font-display font-semibold leading-tight text-[0.95rem] tracking-tight">
          Water &amp; Climate
          <span className="block text-[0.65rem] font-body font-normal text-slate400 -mt-0.5">Lab · IIT Gandhinagar</span>
        </span>
      )}
    </div>
  )
}
