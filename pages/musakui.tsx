import Layout from '../components/Layout'
import RandomSushiGame from '../components/RandomSushiGame'

export default function MusakuiPage() {
  return (
    <Layout title="無作為抽出寿司">
      <section>
        <h1 className="text-3xl font-bold mb-6">無作為抽出寿司</h1>
        <p className="mb-4">スシローのメニューからランダムに寿司を選び、みんなで楽しむゲームです。</p>
        <RandomSushiGame />
      </section>
    </Layout>
  )
}
