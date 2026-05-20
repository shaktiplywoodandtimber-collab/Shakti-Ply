import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    let frameId
    const duration = 1400
    const start = performance.now()

    const update = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.round(progress * value))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update)
      }
    }

    frameId = window.requestAnimationFrame(update)

    return () => window.cancelAnimationFrame(frameId)
  }, [isInView, value])

  return (
    <div ref={ref} className="glass-panel rounded-[28px] p-6">
      <div className="font-display text-4xl font-semibold text-amber-100 sm:text-5xl">
        {count}
        <span className="text-2xl text-amber-300/80">{suffix}</span>
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.24em] text-stone-400">{label}</p>
    </div>
  )
}