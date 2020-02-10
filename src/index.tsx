import React from 'react';
import ReactDOM from 'react-dom';
import '@patternfly/patternfly/utilities/Spacing/spacing.css';
import '@patternfly/react-core/dist/styles/base.css';
import { App } from './app/App';
import './styles/application/app.css';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
