import { useState } from 'react';
import Home from './pages/Home';
import Stats from './pages/Stats';

const App = () => {
    const [page, setPage] = useState<number>(0);
    return (
        <>
            {page ? <Stats setPage={setPage} /> : <Home setPage={setPage} />}
        </>
    );
}

export default App
