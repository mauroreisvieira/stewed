import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Alert } from '@stewed/alert';

const AlertDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Alert</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Alert</h1>
        <h2>Base</h2>
        <div className="demo">
            <Alert title="Message goes here">
                The descriptipn should be straight to the point, informative and try to don’t go past the two lines of text.
            </Alert>
        </div>
        <h2>Skin</h2>
        <div className="demo">
            <Alert appearance="primary">Alert primary</Alert>
            <Alert appearance="success">Alert success</Alert>
            <Alert appearance="warning">Alert warning</Alert>
            <Alert appearance="danger">Alert danger</Alert>
        </div>
    </>
);

export default AlertDocs;
