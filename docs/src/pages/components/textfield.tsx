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
        <h2>Appearances</h2>
        <div className="demo">
            <Textfield defaultValue="primary..." />
            <Textfield appearance="success" defaultValue="success..." />
            <Textfield appearance="warning" defaultValue="warning..." />
            <Textfield appearance="danger" defaultValue="danger..." />
        </div>
        <h2>Disabled</h2>
        <div className="demo">
            <Textfield defaultValue="primary..." disabled />
            <Textfield appearance="success" defaultValue="success..." disabled />
            <Textfield appearance="warning" defaultValue="warning..." disabled />
            <Textfield appearance="danger" defaultValue="danger..." disabled />
        </div>
    </>
);

export default TextfieldDocs;
