#!/usr/bin/env node

import { giveBadAdvice, giveSmartAdvice } from ".";
import { getSpeechBubble } from "./speechBubble";
import { moomin } from './characters/moomin'
import { badAdvice, smartAdvice } from "./constants";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { moominJump } from "./characters/moomin-jump"
import { moominMama } from "./characters/moomin-mama";

interface Arguments {
  [x: string]: unknown
  type: string
  character: keyof Character
}

const Character = {
  moomin: moomin,
  moominJump: moominJump,
  moominMama: moominMama
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
   choices: ['moomin', 'moominJump', 'moominMama'] as const,
   describe: "Who should talk?"
 })
 .demandOption(["type", "character"], "Please specify what kind of advice")
 .help()
 .parseSync()


function say({ type, character = 'moomin'}: Arguments) {
  if (type === 'bad') return console.log(Character[character].replace('XXXXXXXXXXXXXXXXXXXX', getSpeechBubble(giveBadAdvice(badAdvice))))
  if (type === 'good') return console.log(Character[character].replace('XXXXXXXXXXXXXXXXXXXX', getSpeechBubble(giveSmartAdvice(smartAdvice))))
}

say(argv)

