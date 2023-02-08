const LINE_LENGTH = 44

export function getSpeechBubble (sentence: string): string {
  const sentenceLength = sentence.length
  const lines = Math.ceil(sentenceLength / LINE_LENGTH)
  const linesOutput = []
  if (lines > 1) {
    for (let i = 0; i < lines; i++) {
      const currentLine = sentence.substring(i * LINE_LENGTH, (i + 1) * LINE_LENGTH)
      linesOutput.push(currentLine)
    }
  } else if (lines === 1) {
    linesOutput.push(sentence)
  }

  return `
    ${' '.repeat(24)} ${'_'.repeat(LINE_LENGTH + 2)}
    ${' '.repeat(24)}|${' '.repeat(LINE_LENGTH + 2)}|
${linesOutput.map(line => {
      return `${' '.repeat(28)}|${' '.repeat((LINE_LENGTH - line.length) / 2)} ${line.length % 2 ? `${line} ` : line }${' '.repeat((LINE_LENGTH - line.length) / 2)} |`
    }).join('\n')}
    ${' '.repeat(24)}|${'_'.repeat(4)}${' '.repeat(4)}${'_'.repeat(LINE_LENGTH - 6)}|`
}