import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './container/about/About';
import Admin from './container/admin/Catagory';
import Auth from './container/auth/Auth';
import Blog from './container/blog/Blog';
import Features from './container/features/Features';
import Home from './container/home/Home';
import Shop from './container/shop/Shop';
import { store } from './redux/Store';
import Privateroute from './route/PrivetRoute';
import Publicroute from './route/PublicRoute';
function App() {
  return (
    <Provider store={store}>
    <Header/>
    <Switch>
    <Publicroute path={"/"} exact component={Home}/>
    <Privateroute path={"/shop"} exact component={Shop}/>
    <Publicroute path={"/features"} exact component={Features}/>
    <Publicroute path={"/blog"} exact component={Blog}/>
    <Publicroute path={"/about"} exact component={About}/>
    <Publicroute path={"/auth"} exact restricted={true} component={Auth}/>
    <Publicroute path={"/admin"} exact restricted={true} component={Admin}/>
    </Switch>
    <Footer/>
    </Provider>
  );
}

export default App;
