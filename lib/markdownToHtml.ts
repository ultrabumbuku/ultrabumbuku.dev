import markdownToHtml from 'zenn-markdown-html'
import katex from 'katex'

export default async function convertMarkdownToHtml(markdown: string) {
  // Zenn Markdown HTMLに変換
  let html = await markdownToHtml(markdown, {
    embedOrigin: 'https://embed.zenn.studio',
  })

  // メッセージボックスの処理を修正
  html = html.replace(/<p>:::message(?:\s+(\w+))?(.*?)<\/p>/gs, (match, type, content) => {
    const className = type ? `message-box ${type}` : 'message-box';
    return `<div class="${className}"><div class="message-box-icon"></div><div class="message-box-content">${content.trim()}</div></div>`;
  });

  // 数式の処理
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula, { displayMode: true })
    } catch (error) {
      console.error('KaTeX error:', error)
      return match
    }
  })

  html = html.replace(/\$(.*?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula, { displayMode: false })
    } catch (error) {
      console.error('KaTeX error:', error)
      return match
    }
  })

  return html
}




