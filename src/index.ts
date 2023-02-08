import { badAdvice, smartAdvice } from "./constants"

type SmartAdvice = typeof smartAdvice[number]
type BadAdvice = typeof badAdvice[number]

function randomIndex (numberOfAdvices: number): number{
  return Math.floor(Math.random() * numberOfAdvices)
}

export function giveAdvice(): string  {
  return 'Stop worrying and go for a swim'
}

export function giveSmartAdvice(advice: typeof smartAdvice): SmartAdvice {
  return advice[randomIndex(advice.length)]
}

export function giveBadAdvice(advice: []): BadAdvice {
  return advice[randomIndex(advice.length)]
}
