import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../Components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

    </div>
  )
}

export default Home
