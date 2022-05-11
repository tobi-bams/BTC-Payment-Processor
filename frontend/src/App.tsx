import { BrowserRouter as Router } from "react-router-dom"
import AllRoutes from './components/layout/AllRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <AllRoutes />
      </div>
    </Router>

  );
}

export default App;
