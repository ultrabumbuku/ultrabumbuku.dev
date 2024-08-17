import { useState } from 'react'
import styles from '../styles/KasugaGenerator.module.css'

const wordList1 = ['知識', '情報', '図書館']
const wordList2 = ['情報', 'メディア', '創成']
const nakaguro = '・'

const KasugaGenerator: React.FC = () => {
  const [result, setResult] = useState('')
  const [maxWords, setMaxWords] = useState(10)

  const generateCombination = (maxWords: number) => {
    const combinedList = [...wordList1, ...wordList2]
    const chosenWords = []
    const numWords = Math.floor(Math.random() * maxWords) + 1

    for (let i = 0; i < numWords; i++) {
      const word = combinedList[Math.floor(Math.random() * combinedList.length)]
      chosenWords.push(word)
    }

    chosenWords.sort(() => Math.random() - 0.5)

    const result = []
    for (const word of chosenWords) {
      result.push(word)
      if (Math.random() > 0.5) {
        result.push(nakaguro)
      }
    }

    let finalResult = result.join('')
    while (finalResult.endsWith(nakaguro)) {
      finalResult = finalResult.slice(0, -1)
    }

    if (!finalResult.includes('学類')) {
      finalResult += '学類'
    }

    return finalResult
  }

  const handleGenerate = () => {
    const newResult = generateCombination(maxWords)
    setResult(newResult)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `私は「${result}」に在籍しています。\n\nhttps://ultrabumbuku.dev/kasuga`
  )}`

  return (
    <section className={styles.generatorSection}>
      <div className={styles.generatorControls}>
        <label htmlFor="maxWordsInput">単語数の上限を入力してください :</label>
        <input
          type="number"
          id="maxWordsInput"
          value={maxWords}
          onChange={(e) => setMaxWords(Number(e.target.value))}
          min="1"
          max="50"
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>
      {result && <p className={styles.result}>{result}</p>}
      {result && (
        <a className={styles.tweetButton} href={tweetUrl} target="_blank" rel="noopener noreferrer">
          ツイートする
        </a>
      )}
    </section>
  )
}

export default KasugaGenerator