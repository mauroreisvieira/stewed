import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Button } from '@stewed/button';

const ButtonDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Button</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Button</h1>
        <h2>Appearance</h2>
        <div className="demo">
            <Button appearance="primary">Button primary</Button>
            <Button appearance="success">Button success</Button>
            <Button appearance="warning">Button warning</Button>
            <Button appearance="danger">Button danger</Button>
        </div>

        <h2>Sizes</h2>
        <div className="demo">
            <Button appearance="primary" size="sm">
                Button small
            </Button>
            <Button appearance="primary">Button default</Button>
            <Button appearance="primary" size="lg">
                Button large
            </Button>
        </div>
    </>
);

export default ButtonDocs;
