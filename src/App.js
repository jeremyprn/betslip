import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MatchSelection from "./components/MatchSelection/MatchSelection";
import MatchDetails from './components/MatchDetails/MatchDetails';

export default function App() {
  return (
    <BrowserRouter className='App'>
      <Routes>
        <Route path="*" element={<Navigate to="/matchs" replace />} />
        <Route index path="/matchs" element={<MatchSelection />}/>
        <Route path="/match/:id" element={<MatchDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

