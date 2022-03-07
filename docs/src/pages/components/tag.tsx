import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Tag } from '@stewed/tag';

const TagDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Tag</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Tag</h1>
        <h2>Appearance</h2>
        <div className="demo">
            <Tag appearance="primary">
                Primary
            </Tag>
            <Tag appearance="secondary">
                Secondary
            </Tag>
            <Tag appearance="info">
                Info
            </Tag>
            <Tag appearance="success">
                Success
            </Tag>
            <Tag appearance="danger">
                Danger
            </Tag>
            <Tag appearance="warning">
                Warning
            </Tag>
        </div>
    </>
);

export default TagDocs;
