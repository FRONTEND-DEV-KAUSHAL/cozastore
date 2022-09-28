import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './container/about/About';
import Auth from './container/auth/Auth';
import Blog from './container/blog/Blog';
import Features from './container/features/Features';
import Home from './container/home/Home';
import Shop from './container/shop/Shop';
import { store } from './redux/Store';
function App() {
  return (
    <Provider store={store}>
    <Header/>
    <Switch>
    <Route path={"/"} exact component={Home}/>
    <Route path={"/shop"} exact component={Shop}/>
    <Route path={"/features"} exact component={Features}/>
    <Route path={"/blog"} exact component={Blog}/>
    <Route path={"/about"} exact component={About}/>
    <Route path={"/auth"} exact component={Auth}/>
    </Switch>
    <Footer/>
    </Provider>
  );
}

export default App;
