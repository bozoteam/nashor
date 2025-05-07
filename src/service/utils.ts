const colorCache: Record<string, string> = {};

// Calculate contrast ratio between two colors
export function getContrastRatio(
  foreground: string,
  background: string = "#ffffff"
): number {
  // Convert hex to RGB
  const getRGB = (hex: string): number[] => {
    const hexValue = hex.replace("#", "");
    return [
      parseInt(hexValue.substring(0, 2), 16),
      parseInt(hexValue.substring(2, 4), 16),
      parseInt(hexValue.substring(4, 6), 16),
    ];
  };

  // Calculate luminance
  const getLuminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map((val) => {
      val = val / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const foreRGB = getRGB(foreground);
  const backRGB = getRGB(background);

  const foreL = getLuminance(foreRGB);
  const backL = getLuminance(backRGB);

  // Return contrast ratio
  return (Math.max(foreL, backL) + 0.05) / (Math.min(foreL, backL) + 0.05);
}

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

  const minBrightness = 0.1;
  const maxBrightness = 0.6;
  const brightnessRange = maxBrightness - minBrightness;

  function scaleColor(c: number): number {
    return Math.floor((c / 255) * brightnessRange * 255 + minBrightness * 255);
  }

  r = (r + 256) % 256;
  g = (g + 256) % 256;
  b = (b + 256) % 256;

  let color =
    "#" +
    [scaleColor(r), scaleColor(g), scaleColor(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");

  // Ensure sufficient contrast for accessibility (WCAG AA requires 4.5:1 for normal text)
  const contrastRatio = getContrastRatio(color);

  // If contrast is too low, darken the color
  if (contrastRatio < 4.5) {
    // Make the color darker to increase contrast
    const darkenFactor = 0.3;
    const darkenColor = (hex: number): number => {
      return Math.max(0, Math.floor(hex * (1 - darkenFactor)));
    };

    color =
      "#" +
      [
        darkenColor(scaleColor(r)),
        darkenColor(scaleColor(g)),
        darkenColor(scaleColor(b)),
      ]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
  }

  colorCache[str] = color;
  return color;
}
