export const SliceText = (content: string, maxCharsPerLine: number = 23, maxLines: number = 2) => {
  let count = 0
  let result = ""
  let lineCount = 0

  for (let i = 0; i < content.length; i++) {
    const char = content[i]

    if (char === "." || char === ",") {
      count += 0.5
    } else {
      count += 1
    }

    result += char

    if (count >= maxCharsPerLine) {
      result += "\n"
      count = 0
      lineCount++

      if (lineCount >= maxLines) {
        return result.trim() + "..."
      }
    }
  }

  return result.trim()
}
