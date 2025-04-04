import Layout from '../components/Layout';

const MutualLinksPage: React.FC = () => {
  return (
    <Layout title="Mutual Links">
      <section id="links">
        <h2>Mutual Links</h2>
        <ul>
          <li><a href="https://raspi0124.dev" target="_blank" rel="noopener noreferrer">raspi0124</a></li>
          <li><a href="https://www.eniehack.net/~eniehack/" target="_blank" rel="noopener noreferrer">Eniehack</a></li>
          <li><a href="https://iorin.io" target="_blank" rel="noopener noreferrer">iorin.io</a></li>
          <li><a href="https://it4pstudio.com" target="_blank" rel="noopoer noreferrer">it4p</a></li>
        </ul>
      </section>
    </Layout>
  );
};

export default MutualLinksPage;
