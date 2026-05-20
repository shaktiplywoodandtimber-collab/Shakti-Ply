import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

const spring = {
  stiffness: 180,
  damping: 18,
  mass: 0.6,
}

export default function TiltCard({ children, className = '' }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const smoothRotateX = useSpring(rotateX, spring)
  const smoothRotateY = useSpring(rotateY, spring)

  const highlight = useMotionTemplate`
    radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(249, 178, 92, 0.22), transparent 38%)
  `

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    rotateX.set((0.5 - y) * 16)
    rotateY.set((x - 0.5) * 18)
    mouseX.set(x * 100)
    mouseY.set(y * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(50)
    mouseY.set(50)
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{ background: highlight }}
      />
      <div className="relative h-full" style={{ transform: 'translateZ(18px)' }}>
        {children}
      </div>
    </motion.div>
  )
}