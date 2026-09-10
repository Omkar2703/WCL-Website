export default function PageHeader({ title, description, children }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight max-w-[18ch]">{title}</h1>
      {description && (
        <p className="mt-4 text-slate400 max-w-[62ch] leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  )
}
