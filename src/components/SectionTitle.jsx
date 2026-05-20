export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-mist sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-stone-300/85 sm:text-lg">{description}</p>
    </div>
  )
}