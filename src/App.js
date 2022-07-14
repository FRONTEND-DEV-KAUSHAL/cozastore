import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './container/home/Home';
function App() {
  return (
    <>
    <Switch>
    <Header/>
    <Home/>
    <Footer/>
    <Route path={"/"} exc/>
    </Switch>
    </>
  );
}

export default App;
