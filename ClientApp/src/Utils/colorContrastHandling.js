export const MIN_CONTRAST = 4.5; // Minimum contrast ratio between text and background

export const getContrastRatio = (hexColor) => {
    // Calculate the relative luminance of the color
    const r = parseInt(hexColor.substring(1, 3), 16) / 255;
    const g = parseInt(hexColor.substring(3, 5), 16) / 255;
    const b = parseInt(hexColor.substring(5, 7), 16) / 255;
    const l = (r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4) * 0.2126 +
        (g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4) * 0.7152 +
        (b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4) * 0.0722;
    // Calculate the relative luminance of white
    const white = { r: 1, g: 1, b: 1 };
    const lw = (white.r <= 0.03928 ? white.r / 12.92 : ((white.r + 0.055) / 1.055) ** 2.4) * 0.2126 +
        (white.g <= 0.03928 ? white.g / 12.92 : ((white.g + 0.055) / 1.055) ** 2.4) * 0.7152 +
        (white.b <= 0.03928 ? white.b / 12.92 : ((white.b + 0.055) / 1.055) ** 2.4) * 0.0722;
    // Calculate the contrast ratio between the color and white
    const contrast = (l + 0.05) / (lw + 0.05);
    return contrast;
};

export const darkenColor = (hexColor, factor) => {
    const rgbColor = hexColor.substring(1).match(/.{2}/g).map((hex) => parseInt(hex, 16));
    const r = Math.round(rgbColor[0] * factor);
    const g = Math.round(rgbColor[1] * factor);
    const b = Math.round(rgbColor[2] * factor);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};