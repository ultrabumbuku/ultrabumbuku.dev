import Layout from '../components/Layout'
import KasugaGenerator from '../components/KasugaGenerator'

export default function KasugaPage() {
  return (
    <Layout title="春日学類ジェネレータ">
      <h1>Random Kasuga Generator</h1>
      <KasugaGenerator />
    </Layout>
  )
}