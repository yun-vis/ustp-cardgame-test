import { motion } from 'framer-motion'
import { Card as CardType } from '@/lib/types'

interface MemoryCardProps {
  card: CardType
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled: boolean
}

export function MemoryCard({ card, isFlipped, isMatched, onClick, disabled }: MemoryCardProps) {
  const IconComponent = card.icon

  return (
    <motion.div
      className="relative aspect-square cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled && !isFlipped ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isFlipped ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center bg-primary rounded-lg shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg" />
        </div>

        <motion.div
          className={`absolute inset-0 flex items-center justify-center rounded-lg shadow-lg ${
            isMatched ? 'bg-secondary' : 'bg-card'
          }`}
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
          animate={isMatched ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <IconComponent
            className={isMatched ? 'text-secondary-foreground' : 'text-card-foreground'}
            size={48}
            weight="duotone"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
