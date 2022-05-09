import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Checkbox } from '@stewed/checkbox';

const CheckboxDocs = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Checkbox</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Checkbox</h1>
        <div className="demo">
            <Checkbox aria-label="A" value="A" name="checkbox" />
            <Checkbox aria-label="B" value="B" name="checkbox" />
        </div>
        <h2>Appearances</h2>
        <div className="demo">
            <Checkbox aria-label="A" value="A" name="appearance" />
            <Checkbox aria-label="B" value="B" name="appearance" appearance="success" />
            <Checkbox aria-label="C" value="C" name="appearance" appearance="warning" />
            <Checkbox aria-label="D" value="D" name="appearance" appearance="danger" />
        </div>
        <h2>Sizes</h2>
        <div className="demo">
            <Checkbox aria-label="A" value="A" name="checkbox-sizes" size="sm" />
            <Checkbox aria-label="B" value="B" name="checkbox-sizes" />
            <Checkbox aria-label="C" value="C" name="checkbox-sizes" size="lg" />
        </div>
        <h2>Disabled</h2>
        <div className="demo">
            <Checkbox aria-label="A" value="A" checked disabled />
        </div>
    </>
);

export default CheckboxDocs;
