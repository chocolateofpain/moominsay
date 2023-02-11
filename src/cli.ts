#!/usr/bin/env node

import { getSpeechBubble } from "./speechBubble";
import { moomin } from './characters/moomin'
import { badAdvice, smartAdvice } from "./constants";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { moominJump } from "./characters/moomin-jump"
import { moominMama } from "./characters/moomin-mama";
import { moominPappaSmall } from "./characters/moomin-pappa-small";

interface Arguments {
  [x: string]: unknown
  type: string | undefined
  character: keyof Character
  _:(string | number) []
}

const Character = {
  moomin: moomin,
  moominJump: moominJump,
  moominMama: moominMama,
  moominPappaSmall: moominPappaSmall
} as const

type Character = typeof Character

const argv = yargs(hideBin(process.argv))
.option("type", {
   alias: "t",
   type: 'string',
   describe: "Type of advice: good or bad?"
 })
 .option("character", {
   alias: "c",
   choices: ['moomin', 'moominJump', 'moominMama', 'moominPappaSmall'] as const,
   describe: "Who should talk?"
 })
 .demandOption(["character"], "Please specify what kind of character")
 .help()
 .parseSync()

const { type, character, _ } = argv
const selectedCharacter = Character[character]

function randomIndex (numberOfAdvices: number): number{
  return Math.floor(Math.random() * numberOfAdvices)
}

function getText ({ advice, type } : { advice: ((string | number)[] | typeof smartAdvice | typeof badAdvice), type?: string  } ): string {
  if (!type && !advice.length) return 'Something\'s wrong!'
  
  if (!type) return advice.join(' ')
  
  return advice[randomIndex(advice.length)] as string
}

function createAsciiWithText ({type, _}:  Pick<Arguments, "type" | "_">): string {
  const textArray = type && !_?.length ? type === 'good' ? smartAdvice : badAdvice : _!
  const text = getText({ advice: textArray, type })

  return selectedCharacter.replace('XXXXXXXXXXXXXXXXXXXX', getSpeechBubble(text))
}


function say() {
  return console.log(createAsciiWithText({ type, _}))
}

say()

