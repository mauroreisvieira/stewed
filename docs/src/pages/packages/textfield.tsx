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
            <h2>Appearances</h2>
            <Textfield appearance="primary" defaultValue="primary..." />
            <Textfield appearance="success" defaultValue="success..." />
            <Textfield appearance="warning" defaultValue="warning..." />
            <Textfield appearance="danger" defaultValue="danger..." />
        </div>
    </>
);

export default TextfieldDocs;