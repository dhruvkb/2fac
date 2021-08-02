import type { VercelRequest, VercelResponse } from '@vercel/node'

import simpleIcons from 'simple-icons'

const logic = async (slug: string, res: VercelResponse): Promise<void> => {
  const icon = simpleIcons.Get(slug)
  if (icon) {
    res.status(200).json({
      path: icon.path,
      color: `#${icon.hex.toLocaleLowerCase()}`,
    })
  } else {
    res.status(404).json({
      message: 'Not found',
    })
  }
}

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let { slug: slugQuery = 'simpleicons' } = req.query
  if (Array.isArray(slugQuery)) {
    slugQuery = slugQuery[0]
  }

  const slug = slugQuery

  await logic(slug, res)
}
