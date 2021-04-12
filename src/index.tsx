import * as React from 'react';
import ReactDOM from 'react-dom';

import { Button } from '../packages/button/react';
import { Input } from '../packages/input/react';

import './main.scss';

const App = (): React.ReactElement => {
    return (
        <div className="app theme-scope">
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
                <Input skin="primary" value="primary..." />
                <Input skin="success" value="success..." />
                <Input skin="warning" value="warning..." />
                <Input skin="danger" value="danger..." />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
