import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Menu } from '@stewed/menu';

const Home: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed</title>
        </Head>
        <Menu>
            <Menu.Separator>Feedback</Menu.Separator>
            <Menu.Item>
                <Link href="/components/alert" passHref>
                    Alert
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/components/badge" passHref>
                    Badge
                </Link>
            </Menu.Item>
            <Menu.Separator>Navigation</Menu.Separator>
            <Menu.Item>
                <Link href="/components/menu" passHref>
                    Menu
                </Link>
            </Menu.Item>
            <Menu.Separator>Forms</Menu.Separator>
            <Menu.Item>
                <Link href="/components/button" passHref>
                    Button
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/components/textfield" passHref>
                    Textfield
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/components/radio" passHref>
                    Radio
                </Link>
            </Menu.Item>
        </Menu>
    </>
);

export default Home;
