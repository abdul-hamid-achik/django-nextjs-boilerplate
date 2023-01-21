import Head from 'next/head';
import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Django and Next.js Project Template</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="mx-auto sm:max-w-xl flex items-center justify-center flex-col">
                <h1 className="text-3xl font-medium text-gray-900">Django and Next.js Project Template</h1>
                {session?.user && (
                    <p className="text-gray-700">Welcome {session?.user?.email}</p>
                )}
                <p className="text-gray-700 my-4">
                    The project is structured with two separate directories for the frontend and backend.
                    The backend, which is built using Django REST framework, is located in the `./backend` directory,
                    where you can find the api, settings, shared, urls, and wsgi files.
                    The frontend, which is built using Next.js, is located in the `./frontend` directory,
                    where you can find the pages, styles, and server files.
                </p>
                <p className="text-gray-700 my-4">
                    This template is designed to make it easy to quickly bootstrap a full stack application following modern practices.
                    It includes features such as authentication with next-auth.js and Django REST framework simplejwt,
                    Docker-compose for easy setup and deployment, automatic API documentation generation, and more.
                </p>
                <a href="https://github.com/sicksid/django-nextjs-project-template" className="inline-block py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    View on GitHub
                </a>
            </div>
        </div>
    )
}
