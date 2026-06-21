const emoji = (...codePoints) => String.fromCodePoint(...codePoints);

const expressionEmojis = [
  emoji(0x1f60a),
  emoji(0x1f970),
  emoji(0x2728),
  emoji(0x1f496),
  emoji(0x1f338),
  emoji(0x1f60c),
];

export const getExpressionEmoji = (sketch, index = 0) => {
  const text = `${sketch?.title || ""} ${sketch?.note || ""} ${sketch?.image || ""}`.toLowerCase();

  if (text.includes("badmosh") || text.includes("angry")) return emoji(0x1f47a);
  if (text.includes("hmmm")) return emoji(0x1f914);
  if (text.includes("special")) return emoji(0x2728);
  if (text.includes("vote")) return emoji(0x1f5f3, 0xfe0f);
  if (text.includes("bindi")) return emoji(0x1f319);
  if (text.includes("temple")) return emoji(0x1f64f);
  if (text.includes("saari") || text.includes("saree")) return emoji(0x1f483);
  if (text.includes("black")) return emoji(0x1f5a4);
  if (text.includes("blink")) return emoji(0x1f609);
  if (text.includes("eyes")) return emoji(0x1f440);

  return expressionEmojis[index % expressionEmojis.length];
};
