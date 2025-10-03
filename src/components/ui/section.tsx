interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export default function Section ({
  id,
  title,
  subtitle,
  className = '',
  children
}: SectionProps): React.ReactNode {
  return (
    <section id={id} className={`py-16 px-4 ${className}`}>
      <div className='max-w-6xl mx-auto'>
        {(title != null || subtitle != null) && (
          <div className='text-center mb-12'>
            {title != null && (
              <h2 className='text-3xl md:text-4xl font-bold text-blueberry-950 mb-4'>{title}</h2>
            )}
            {subtitle != null && <p className='text-xl opacity-80 max-w-3xl mx-auto'>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
