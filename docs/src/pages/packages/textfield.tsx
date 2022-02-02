import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Textfield } from '@stewed/textfield';

const TextfieldDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Textfield</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Textfield</h1>
        <div className="demo">
            <h2>Skins</h2>
            <Textfield skin="primary" value="primary..." />
            <Textfield skin="success" value="success..." />
            <Textfield skin="warning" value="warning..." />
            <Textfield skin="danger" value="danger..." />
        </div>
    </>
);

export default TextfieldDocs;
