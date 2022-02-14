import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Radio } from '@stewed/radio';

const RadioDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Radio</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Radio</h1>
        <div className="demo">
            <Radio name="radio" />
            <Radio name="radio" />
        </div>
        <h2>Sizes</h2>
        <div className="demo">
            <Radio name="radio-sizes" />
            <Radio name="radio-sizes" size="lg" />
        </div>
        <h2>Disabled</h2>
        <div className="demo">
            <Radio name="radio-disabled" checked disabled />
        </div>
    </>
);

export default RadioDocs;
