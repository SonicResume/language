// English Grade 1 Braille (Unicode Braille Patterns)
// Supports:
// - A-Z
// - Capital letters
// - Numbers 0-9
// - Common punctuation
// - Spaces

const brailleMap: Record<string, string> = {
  // Letters
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

  k: "⠅",
  l: "⠇",
  m: "⠍",
  n: "⠝",
  o: "⠕",
  p: "⠏",
  q: "⠟",
  r: "⠗",
  s: "⠎",
  t: "⠞",

  u: "⠥",
  v: "⠧",
  w: "⠺",
  x: "⠭",
  y: "⠽",
  z: "⠵",

  // Punctuation
  ",": "⠂",
  ";": "⠆",
  ":": "⠒",
  ".": "⠲",
  "!": "⠖",
  "?": "⠦",
  "'": "⠄",
  "-": "⠤",
  "(": "⠷",
  ")": "⠾",
  "/": "⠌",
  "\"": "⠐⠂",

  // Common symbols
  "*": "⠔",
  "@": "⠈⠁",
  "#": "⠼",
  "$": "⠈⠎",
  "%": "⠨⠴",
  "&": "⠈⠯",
};

// Capital indicator
const capitalSign = "⠠";

// Number sign
const numberSign = "⠼";

// Braille number equivalents
const numberMap: Record<string, string> = {
  "1": "⠁",
  "2": "⠃",
  "3": "⠉",
  "4": "⠙",
  "5": "⠑",
  "6": "⠋",
  "7": "⠛",
  "8": "⠓",
  "9": "⠊",
  "0": "⠚",
};

export function toBraille(text: string): string {
  let result = "";
  let inNumber = false;

  for (const char of text) {
    // Space
    if (char === " ") {
      result += " ";
      inNumber = false;
      continue;
    }

    // Number
    if (/[0-9]/.test(char)) {
      if (!inNumber) {
        result += numberSign;
        inNumber = true;
      }

      result += numberMap[char];
      continue;
    }

    // Leaving a number sequence
    inNumber = false;

    // Capital letter
    if (/[A-Z]/.test(char)) {
      const lowerChar = char.toLowerCase();

      if (brailleMap[lowerChar]) {
        result += capitalSign + brailleMap[lowerChar];
      }

      continue;
    }

    // Lowercase letter or punctuation
    if (brailleMap[char]) {
      result += brailleMap[char];
    } else {
      // Preserve unknown characters as a space
      result += " ";
    }
  }

  return result;
}
