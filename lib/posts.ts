"use strict";

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    // Ensure date is a string
    const date = matterResult.data.date instanceof Date 
      ? matterResult.data.date.toISOString() 
      : matterResult.data.date || null

    return {
      id,
      ...(matterResult.data as { title: string }),
      date
    }
  })
  
  return allPostsData.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? 1 : -1;
  });
}


export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    throw new Error('Post not found')
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Ensure date is a string
  const date = matterResult.data.date instanceof Date 
    ? matterResult.data.date.toISOString() 
    : matterResult.data.date

  // Combine the data with the id and contentHtml
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { title: string }),
    date
  }
}


