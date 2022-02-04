import * as React from "react";
import Head from 'next/head'
import Link from "next/link";

import { Alert } from "@stewed/alert";

const AlertDocs: React.FC = (): React.ReactElement => (
  <>
    <Head>
      <title>Stewed | Alert</title>
    </Head>
    <Link href="/">Home</Link>
    <h1>Alert</h1>
    <div className="demo">
      <Alert appearance="primary">Alert primary</Alert>
      <Alert appearance="success">Alert success</Alert>
      <Alert appearance="warning">Alert warning</Alert>
      <Alert appearance="danger">Alert danger</Alert>
    </div>
  </>
);

export default AlertDocs;
