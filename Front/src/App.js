import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Shop } from './pages/Shop';
import { ShopCategory } from './pages/ShopCategory';
import { Products } from './pages/Products';
import { LoginSignup } from './pages/LoginSignup';
import { Sell } from './pages/Sell';
import { Footer } from './components/Footer/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path="/Hospital" element={<ShopCategory  category="Hospital"/>}/>
          <Route path="/College" element={<ShopCategory category="College"/>}/>
          <Route path="/School" element={<ShopCategory  category="School"/>}/>
          <Route path="/product" element={<Products/>}>
            <Route path=':productId' element={<Products/>}/>
          </Route>
          <Route path='/sell' element={<Sell/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
