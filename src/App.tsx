import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowClockwise, Trophy } from '@phosphor-icons/react'
import { Card as CardComponent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MemoryCard } from '@/components/MemoryCard'
import { Card } from '@/lib/types'
import { createDeck, formatTime } from '@/lib/gameUtils'
import { toast } from 'sonner'

function App() {
  const [cards, setCards] = useState<Card[]>(createDeck())
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [matchedCards, setMatchedCards] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const [bestMoves, setBestMoves] = useKV<number | null>('best-moves', null)
  const [bestTime, setBestTime] = useKV<number | null>('best-time', null)

  useEffect(() => {
    let interval: number | undefined

    if (isPlaying && !gameWon) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, gameWon])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true)
      setIsPlaying(false)

      const isNewBestMoves = bestMoves === null || bestMoves === undefined || moves < bestMoves
      const isNewBestTime = bestTime === null || bestTime === undefined || time < bestTime

      if (isNewBestMoves) {
        setBestMoves(moves)
      }
      if (isNewBestTime) {
        setBestTime(time)
      }

      if (isNewBestMoves || isNewBestTime) {
        toast.success('New personal best! 🎉')
      } else {
        toast.success('You won! 🎊')
      }
    }
  }, [matchedCards, cards.length, moves, time, bestMoves, bestTime, setBestMoves, setBestTime])

  const handleCardClick = (cardId: string) => {
    if (disabled || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return
    }

    if (!isPlaying) {
      setIsPlaying(true)
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setDisabled(true)
      setMoves((prev) => prev + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstId)
      const secondCard = cards.find((c) => c.id === secondId)

      if (firstCard && secondCard && firstCard.matchId === secondCard.matchId) {
        setMatchedCards((prev) => [...prev, firstId, secondId])
        setFlippedCards([])
        setDisabled(false)
      } else {
        setTimeout(() => {
          setFlippedCards([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  const handleRestart = () => {
    setCards(createDeck())
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setTime(0)
    setIsPlaying(false)
    setDisabled(false)
    setGameWon(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Memory Match
        </motion.h1>

        <CardComponent className="p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-semibold">Moves:</span>
              <Badge variant="secondary" className="text-base md:text-lg px-3 py-1">
                {moves}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-semibold">Time:</span>
              <Badge variant="secondary" className="text-base md:text-lg px-3 py-1">
                {formatTime(time)}
              </Badge>
            </div>

            {typeof bestMoves === 'number' && (
              <div className="flex items-center gap-2">
                <Trophy className="text-accent" size={20} weight="duotone" />
                <span className="text-sm">Best: {bestMoves} moves</span>
              </div>
            )}

            {typeof bestTime === 'number' && (
              <div className="flex items-center gap-2">
                <Trophy className="text-accent" size={20} weight="duotone" />
                <span className="text-sm">Best: {formatTime(bestTime)}</span>
              </div>
            )}

            <Button
              onClick={handleRestart}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              <ArrowClockwise size={16} weight="bold" className="mr-2" />
              Restart
            </Button>
          </div>
        </CardComponent>

        <motion.div
          className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card.id)}
              isMatched={matchedCards.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
              disabled={disabled}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {gameWon && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <CardComponent className="p-6 bg-accent/20 border-accent">
                <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
                <p className="text-muted-foreground mb-4">
                  You completed the game in {moves} moves and {formatTime(time)}!
                </p>
                <Button onClick={handleRestart} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <ArrowClockwise size={20} weight="bold" className="mr-2" />
                  Play Again
                </Button>
              </CardComponent>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App