import { Icon } from '@phosphor-icons/react'

export interface Card {
  id: string
  icon: Icon
  matchId: number
}

export interface GameStats {
  moves: number
  time: number
  bestMoves: number | null
  bestTime: number | null
}
