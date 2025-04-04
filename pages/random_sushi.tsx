import Layout from '../components/Layout'
import SushiRandomizer from '../components/SushiRandomizer'

export default function RandomSushiPage() {
  return (
    <Layout title="無作為抽出寿司">
      <h1>無作為抽出寿司
      </h1>
      <SushiRandomizer />
    </Layout>
  )
}
