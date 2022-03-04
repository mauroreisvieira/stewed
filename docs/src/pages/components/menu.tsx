import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Menu } from '@stewed/menu';

const MenuDocs: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed | Menu</title>
        </Head>
        <Link href="/">Home</Link>
        <h1>Menu</h1>
        <h2>Appearance</h2>
        <div className="demo">
            <Menu>
                <Menu.Item>Option 1</Menu.Item>
                <Menu.Item>Option 2</Menu.Item>
                <Menu.Separator />
                <Menu.Item appearance='danger'>Option 2</Menu.Item>
            </Menu>
        </div>

        <h2>States</h2>
        <div className="demo">
            <Menu>
                <Menu.Item selected>Option 1</Menu.Item>
                <Menu.Item selected disabled>Option 2</Menu.Item>
                <Menu.Item disabled>Option 2</Menu.Item>
            </Menu>
        </div>

        <h2>Separator</h2>
        <div className="demo">
            <Menu>
                <Menu.Item>Option 1</Menu.Item>
                <Menu.Item>Option 2</Menu.Item>
                <Menu.Item>Option 3</Menu.Item>
                <Menu.Separator>More Options</Menu.Separator>
                <Menu.Item>Option 4</Menu.Item>
                <Menu.Item>Option 5</Menu.Item>
            </Menu>
        </div>
    </>
);

export default MenuDocs;
