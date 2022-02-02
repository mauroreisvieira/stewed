import * as React from 'react';
import { AppProps } from 'next/app';

import '../styles/main.scss';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
    <Component {...pageProps} />
);

export default App;
