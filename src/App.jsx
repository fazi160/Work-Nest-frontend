
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminRouter from './routes/admin'
// import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerRoutes from './routes/Customer';
import UserRoutes from './routes/User';
import UserHomePage from './pages/User/UserHomePage';

function App() {
  

  return (
    
    
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<UserHomePage/>}/>
            <Route path='/admin/*' element={<AdminRouter/>} />
            <Route path='/customer/*' element={<CustomerRoutes/>}/>
            <Route path='/user/*' element={<UserRoutes/>}/>
            

            
          </Routes>
        </Router>
      </div>
      

 
   
  )
}

export default App
