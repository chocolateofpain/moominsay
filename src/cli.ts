#!/usr/bin/env node

const {stdin} = process;
import { Buffer } from 'node:buffer';

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

function createAsciiWithText ({type, text }: { type?: Arguments["type"], text: (string|number)[] }): string {
  const textArray = type && !text?.length ? type === 'good' ? smartAdvice : badAdvice : text!
  const finalText = getText({ advice: textArray, type })

  return selectedCharacter.replace('XXXXXXXXXXXXXXXXXXXX', getSpeechBubble(finalText))
}

async function getStdin  () {
  const result = [];
  let length = 0;

  for await (const chunk of stdin) {
    result.push(chunk);
    length += chunk.length;
  }

  return Buffer.concat(result, length).toString()
}

async function  say() {

  const userInput = await getStdin();

  if (userInput) console.log(createAsciiWithText({ text: [userInput] }))
  
  return console.log(createAsciiWithText({ type, text: _}))
}

say()

