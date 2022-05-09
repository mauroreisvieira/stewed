import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Badge } from '@stewed/badge';

const Square = (): React.ReactElement => (
    <span
        style={{
            width: '42px',
            height: '42px',
            borderRadius: '2px',
            background: '#ddd',
        }}
    />
);

const BadgeDocs = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Badge</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Badge</h1>
        <h2>Appearance</h2>
        <div className="demo">
            <Badge count="78" appearance="primary">
                <Square />
            </Badge>
            <Badge count="65" appearance="secondary">
                <Square />
            </Badge>
            <Badge count="1" appearance="info">
                <Square />
            </Badge>
            <Badge count="99" appearance="success">
                <Square />
            </Badge>
            <Badge count="0" appearance="danger">
                <Square />
            </Badge>
            <Badge count="23" appearance="warning">
                <Square />
            </Badge>
        </div>

        <h2>Dot</h2>
        <div className="demo">
            <Badge appearance="primary">
                <Square />
            </Badge>
            <Badge appearance="secondary">
                <Square />
            </Badge>
            <Badge appearance="info">
                <Square />
            </Badge>
            <Badge appearance="success">
                <Square />
            </Badge>
            <Badge appearance="danger">
                <Square />
            </Badge>
            <Badge appearance="warning">
                <Square />
            </Badge>
        </div>
    </>
);

export default BadgeDocs;
