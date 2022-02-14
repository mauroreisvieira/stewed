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
            <Radio aria-label="A" value="A" name="radio" />
            <Radio aria-label="B" value="B" name="radio" />
        </div>
        <h2>Appearances</h2>
        <div className="demo">
            <Radio />
            <Radio appearance="success" />
            <Radio appearance="warning" />
            <Radio appearance="danger" />
        </div>
        <h2>Sizes</h2>
        <div className="demo">
            <Radio aria-label="A" value="A" name="radio-sizes" size="sm" />
            <Radio aria-label="B" value="B" name="radio-sizes" />
            <Radio aria-label="C" value="C" name="radio-sizes" size="lg" />
        </div>
        <h2>Disabled</h2>
        <div className="demo">
            <Radio aria-label="A" value="A" name="radio-disabled" checked disabled />
        </div>
    </>
);

export default RadioDocs;
