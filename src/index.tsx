import * as React from 'react';
import ReactDOM from 'react-dom';

import { Alert } from '../packages/alert/react';
import { Button } from '../packages/button/react';
import { Textfield } from '../packages/textfield/react';

import './main.scss';

const App = (): React.ReactElement => {
    return (
        <div className="app theme-scope">
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
                <Button skin="primary" size="sm">Button small</Button>
                <Button skin="primary">Button default</Button>
                <Button skin="primary" size="lg">Button large</Button>
            </div>

            <h1>Input</h1>
            <div className="demo">
                <Textfield skin="primary" value="primary..." />
                <Textfield skin="success" value="success..." />
                <Textfield skin="warning" value="warning..." />
                <Textfield skin="danger" value="danger..." />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
