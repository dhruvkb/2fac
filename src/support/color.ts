export const rgbFromHex = (hex: string): [number, number, number] => {
  const rgbChannels = hex.substring(1).match(/.{1,2}/g)
  if (Array.isArray(rgbChannels)) {
    const [r = 0, g = 0, b = 0] = rgbChannels.map((channel) => parseInt(channel, 16))
    return [r, g, b]
  }
  return [0, 0, 0]
}

export const linearizedChannel = (channel: number): number => {
  if (channel < 0.04045) {
    return channel / 12.92
  }
  return ((channel + 0.055) / 1.055) ** 2.4
}

export const perceivedLuminance = (rgbChannels: [number, number, number]): number => {
  const weights = [0.2126, 0.7152, 0.0722]
  return rgbChannels.reduce((acc, channel, index) => {
    const reduced = channel / 255
    return acc + linearizedChannel(reduced) * weights[index]
  }, 0)
}
