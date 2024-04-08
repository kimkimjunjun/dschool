import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import Search from './pages/search';
import Board from './pages/board';
import { RecoilRoot } from 'recoil';

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:query' element={<Search />} />
              <Route path='/board/:item_idx' element={<Board />} />
            </Routes>
          </BrowserRouter>
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
