import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Menu } from '@stewed/menu';

const Home: React.FC = (): React.ReactElement => (
    <>
        <Head>
            <title>Stewed</title>
        </Head>
        <h1>Stewed</h1>
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
            <Menu.Item disabled>
                Progress
            </Menu.Item>
            <Menu.Separator>Navigation</Menu.Separator>
            <Menu.Item>
                <Link href="/components/menu" passHref>
                    Menu
                </Link>
            </Menu.Item>
            <Menu.Item disabled>
                Pagination
            </Menu.Item>
            <Menu.Separator>Forms</Menu.Separator>
            <Menu.Item>
                <Link href="/components/button" passHref>
                    Button
                </Link>
            </Menu.Item>
            <Menu.Item disabled>
                FormControl
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
            <Menu.Item>
                <Link href="/components/checkbox" passHref>
                    Checkbox
                </Link>
            </Menu.Item>
            <Menu.Item disabled>
                Switch
            </Menu.Item>
        </Menu>
    </>
);

export default Home;
