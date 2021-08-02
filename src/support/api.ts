import { IconSvg } from '@/models/icon_svg'

const API_ROOT = '/api/icons'

/**
 * Get the SVG path and hex color of the given icons from the 2Fac API hosted
 * on Vercel. This is the one and only use of the API.
 *
 * @param {string} iconName - the name of the icon to fetch
 * @return {IconSvg | null} the path and hex of the icon, or null if not found
 */
export const getIcon = async (iconName: string): Promise<IconSvg | null> => {
  const res = await fetch([API_ROOT, iconName].join('/'))
  const data = await res.json()
  if (res.ok) {
    return {
      color: data.color,
      path: data.path,
    } as IconSvg
  }
  return null
}
