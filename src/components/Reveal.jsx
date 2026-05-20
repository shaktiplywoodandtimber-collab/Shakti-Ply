import { motion } from 'framer-motion'

const transition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1],
}

export default function Reveal({ children, className = '', delay = 0, y = 32 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  )
}