import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Version 01
        </h1>
        <h2>Construct a URL like</h2>
        <p><code>/test/max-0/smax-3000/foo</code></p>
        <p><code>/test/max-0/smax-3000/bar</code></p>
        <p><code>/test/max-0/smax-/bar</code></p>
        <p><code>/test/max-/smax-3000/bar</code></p>

      </main>

    </div>
  )
}
