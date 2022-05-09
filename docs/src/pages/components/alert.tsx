import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Alert } from '@stewed/alert';

const AlertDocs = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Alert</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Alert</h1>
        <h2>Appearance</h2>
        <div className="demo">
            <Alert appearance="info" title="Message goes here">
                The descriptipn should be straight to the point, informative and try to don’t go past the two lines of text.
            </Alert>
            <Alert appearance="success" title="Message goes here">
                The descriptipn should be straight to the point, informative and try to don’t go past the two lines of text.
            </Alert>
            <Alert appearance="warning" title="Message goes here">
                The descriptipn should be straight to the point, informative and try to don’t go past the two lines of text.
            </Alert>
            <Alert appearance="danger" title="Message goes here">
                The descriptipn should be straight to the point, informative and try to don’t go past the two lines of text.
            </Alert>
        </div>
    </>
);

export default AlertDocs;
