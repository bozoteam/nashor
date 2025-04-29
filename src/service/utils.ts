const colorCache: Record<string, string> = {};

export function stringToColor(str: string) {
  if (colorCache[str]) {
    return colorCache[str];
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let r = (hash >> 16) & 0xff;
  let g = (hash >> 8) & 0xff;
  let b = hash & 0xff;

  const minBrightness = 0;
  const maxBrightness = 0.7;
  const brightnessRange = maxBrightness - minBrightness;

  function scaleColor(c: number): number {
    return Math.floor((c / 255) * brightnessRange * 255 + minBrightness * 255);
  }

  r = (r + 256) % 256;
  g = (g + 256) % 256;
  b = (b + 256) % 256;

  const color =
    "#" +
    [scaleColor(r), scaleColor(g), scaleColor(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");

  colorCache[str] = color;
  return color;
}
