import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Tag } from '@stewed/tag';

const TagDocs = (): React.ReactElement => (
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

        <h2>Size</h2>
        <div className="demo">
            <Tag appearance="primary" size="sm">
                Small
            </Tag>
            <Tag appearance="primary">
                Default
            </Tag>
                    <Tag appearance="primary" size="lg">
                Large
            </Tag>
        </div>

        <h2>Href</h2>
        <div className="demo">
            <Tag appearance="secondary" href="https://www.google.com" target="_blank">
                Href
            </Tag>
        </div>
    </>
);

export default TagDocs;
