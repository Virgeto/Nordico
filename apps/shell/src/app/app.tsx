import { Button } from '@nordico/ui';
import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';

const Fishing = React.lazy(() => import('fishing/Module'));
const Eroe = React.lazy(() => import('eroe/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/fishing">Fishing</Link>
        </li>
        <li>
          <Link to="/eroe">Eroe</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/fishing" element={<Fishing />} />
        <Route path="/eroe" element={<Eroe />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
