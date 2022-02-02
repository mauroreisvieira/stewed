import * as React from "react";
import { Alert } from "@stewed/alert";
import { Button } from "@stewed/button";
import { Textfield } from "@stewed/textfield";
import Head from 'next/head'

const Home: React.FC = (): React.ReactElement => (
  <>
    <Head>
      <title>Stewed</title>
    </Head>
    <h1>Alert</h1>
    <div className="demo">
      <Alert skin="primary">Alert primary</Alert>
      <Alert skin="success">Alert success</Alert>
      <Alert skin="warning">Alert warning</Alert>
      <Alert skin="danger">Alert danger</Alert>
    </div>

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

    <h1>Textfield</h1>
    <div className="demo">
      <Textfield skin="primary" value="primary..." />
      <Textfield skin="success" value="success..." />
      <Textfield skin="warning" value="warning..." />
      <Textfield skin="danger" value="danger..." />
    </div>
  </>
);

export default Home;
