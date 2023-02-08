#!/usr/bin/env node

import { giveAdvice, giveBadAdvice, giveSmartAdvice } from ".";
import { smartAdvice } from "./constants";
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

// function say(argv: any) {
//    // console.log(giveSmartAdvice(smartAdvice))
//    console.log(argv)
// }

// say(argv)

console.log(argv)