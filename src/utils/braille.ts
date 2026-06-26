const brailleMap: Record<string, string> = {
  a: "⠁",
  b: "⠃",
  c: "⠉",
  d: "⠙",
  e: "⠑",
  f: "⠋",
  g: "⠛",
  h: "⠓",
  i: "⠊",
  j: "⠚",
};

export function toBraille(text: string) {
  return text
    .toLowerCase()
    .split("")
    .map((char) => brailleMap[char] || " ")
    .join("");
}