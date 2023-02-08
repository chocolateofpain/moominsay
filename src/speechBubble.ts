export function getSpeechBubble (sentence: string): string {
  const sentenceLength = sentence.length
  return `
    ${' '.repeat(24)} ${'_'.repeat(sentenceLength + 2)}
    ${' '.repeat(24)}|${' '.repeat(sentenceLength + 2)}|
    ${' '.repeat(24)}| ${sentence} |
    ${' '.repeat(24)}|${'_'.repeat(4)}${' '.repeat(4)}${'_'.repeat(sentenceLength - 6)}|`
}