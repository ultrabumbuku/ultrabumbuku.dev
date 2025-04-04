import Layout from '../components/Layout'
import SushiRandomizer from '../components/SushiRandomizer'

export default function MusakuiPage() {
  return (
    <Layout title="無作為抽出寿司">
      <h1>無作為抽出寿司
      </h1>
      <SushiRandomizer />
    </Layout>
  )
}
