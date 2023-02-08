#!/usr/bin/env node

import { giveAdvice, giveBadAdvice, giveSmartAdvice } from ".";
import { getSpeechBubble } from "./speechBubble";
import { moomin } from './characters/moomin'
import { badAdvice, smartAdvice } from "./constants";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Argv } from "yargs";

const argv = yargs(hideBin(process.argv))
.option("type", {
   alias: "t",
   describe: "Type of advice: good or bad?"
 })
 .option("character", {
   alias: "c",
   describe: "Who should talk?"
 })
 .demandOption(["type"], "Please specify what kind of advice")
 .help()
 .argv

function say(argv: any) {
   const { type, character = 'moomin' } = argv

   if (type === 'bad') return console.log(moomin.replace('XXXXXXXXXXXXXXXXXXXX', getSpeechBubble(giveBadAdvice(badAdvice))))
   if (type === 'good') return console.log(giveSmartAdvice(smartAdvice))
}

say(argv)
