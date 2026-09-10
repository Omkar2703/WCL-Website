export default function GlassCard({ children, className = '', glow = false, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`glass rounded-hero ${glow ? 'shadow-glow' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
