import * as React from "react";
import Head from 'next/head'
import Link from "next/link";

import { Button } from "@stewed/button";

const ButtonDocs: React.FC = (): React.ReactElement => (
  <>
    <Head>
      <title>Stewed | Button</title>
    </Head>
    <Link href="/">Home</Link>
    <h1>Button</h1>
    <div className="demo">
      <Button skin="primary">Button primary</Button>
      <Button skin="success">Button success</Button>
      <Button skin="warning">Button warning</Button>
      <Button skin="danger">Button danger</Button>
    </div>

    <div className="demo">
      <Button skin="primary" size="sm">
        Button small
      </Button>
      <Button skin="primary">Button default</Button>
      <Button skin="primary" size="lg">
        Button large
      </Button>
    </div>
  </>
);

export default ButtonDocs;
