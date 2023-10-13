
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminRouter from './routes/admin'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  

  return (
    
      <div>
        <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRouter/>} />
          </Routes>
        </Router>
      </div>

 
   
  )
}

export default App
