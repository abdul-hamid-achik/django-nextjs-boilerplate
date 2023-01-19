import Head from 'next/head'

export default function Home() {
    return (<div>
        <Head>
            <title>Project Template</title>
            <meta name="description"
                  content="Project Template built with django and next.js"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className="grid grid-cols-3 gap-4">
            <h1 className="col-span-3 text-4xl font-bold">Project Template</h1>
        </main>
    </div>)
}

