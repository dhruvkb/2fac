// Replacement utilities for Lodash

export const capitalize = (text: string) => {
  if (!text) return ''
  const [first, ...rest] = text
  return `${first.toLocaleUpperCase()}${rest.join('').toLocaleLowerCase()}`
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (func: Function, delay = 1000) => {
  let id: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(id)
    id = setTimeout(() => func(...args), delay)
    return id
  }
}
