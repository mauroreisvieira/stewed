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
      <Alert skin="primary">Alert primary</Alert>
      <Alert skin="success">Alert success</Alert>
      <Alert skin="warning">Alert warning</Alert>
      <Alert skin="danger">Alert danger</Alert>
    </div>
  </>
);

export default AlertDocs;
