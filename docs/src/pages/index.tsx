import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed</title>
        </Head>
        <h2>Feedback</h2>
        <ul>
            <li>
                <Link href="/components/alert" passHref>
                    Alert
                </Link>
            </li>
            <li>
                <Link href="/components/badge" passHref>
                    Badge
                </Link>
            </li>
        </ul>
        <h2>Forms</h2>
        <ul>
            <li>
                <Link href="/components/button" passHref>
                    Button
                </Link>
            </li>
            <li>
                <Link href="/components/textfield" passHref>
                    Textfield
                </Link>
            </li>
            <li>
                <Link href="/components/radio" passHref>
                    Radio
                </Link>
            </li>
        </ul>
    </>
);

export default Home;
