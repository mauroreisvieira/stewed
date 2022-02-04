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
            <Textfield appearance="primary" value="primary..." />
            <Textfield appearance="success" value="success..." />
            <Textfield appearance="warning" value="warning..." />
            <Textfield appearance="danger" value="danger..." />
        </div>
    </>
);

export default TextfieldDocs;
