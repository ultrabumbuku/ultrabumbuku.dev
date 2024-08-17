import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9ぁ-んァ-ン一-龯]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const fileName = `${slug}.md`
    const filePath = path.join(process.cwd(), 'content', 'posts', fileName)

    try {
      const fileContent = `---
title: ${title}
date: ${new Date().toISOString()}
---

${content}`
      
      await fs.promises.writeFile(filePath, fileContent, 'utf-8')
      res.status(200).json({ message: '記事が保存されました', slug })
    } catch (error) {
      console.error('記事の保存中にエラーが発生しました:', error)
      res.status(500).json({ message: '記事の保存に失敗しました' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
