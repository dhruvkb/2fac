import type { VercelRequest, VercelResponse } from '@vercel/node'

const logic = (name: string, res: VercelResponse): void => {
  res.status(200).json({
    message: `Hello, ${name}!`,
  })
}

export default (req: VercelRequest, res: VercelResponse): void => {
  let { nameQuery = 'World' } = req.query
  if (Array.isArray(nameQuery)) {
    nameQuery = nameQuery.join(' & ')
  }

  const name = nameQuery

  logic(name, res)
}
