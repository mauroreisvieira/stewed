import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed</title>
        </Head>
        <Link href="/packages/alert" passHref>
            Alert
        </Link>
        <Link href="/packages/button" passHref>
            Button
        </Link>
        <Link href="/packages/textfield" passHref>
            Textfield
        </Link>
    </>
);

export default Home;
