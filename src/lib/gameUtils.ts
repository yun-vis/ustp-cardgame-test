import {
  Heart,
  Star,
  Moon,
  Sun,
  Cloud,
  Lightning,
  Fire,
  Drop,
} from '@phosphor-icons/react'
import { Card } from './types'

const ICONS = [Heart, Star, Moon, Sun, Cloud, Lightning, Fire, Drop]

export function createDeck(): Card[] {
  const deck: Card[] = []
  
  ICONS.forEach((icon, index) => {
    deck.push(
      { id: `${index}-a`, icon, matchId: index },
      { id: `${index}-b`, icon, matchId: index }
    )
  })
  
  return shuffleDeck(deck)
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
