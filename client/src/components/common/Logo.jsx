import logo from '../assets/logo.svg' // Adjust relative path if needed

export default function Logo({ size = 34, withWordmark = true, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Replaced SVG with actual logo asset */}
      <img 
        src={logo} 
        alt="Water & Climate Lab Logo" 
        style={{ width: size, height: size }}
        className="object-contain" 
      />

      {withWordmark && (
        <span className="font-display font-semibold leading-tight text-[0.95rem] tracking-tight">
          Water &amp; Climate
          <span className="block text-[0.65rem] font-body font-normal text-slate400 -mt-0.5">
            Lab ·{' '}
            <a
              href="https://en.wikipedia.org/wiki/IIT_Gandhinagar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-all hover:text-slate-200"
            >
              IIT Gandhinagar
            </a>
          </span>
        </span>
      )}
    </div>
  )
}