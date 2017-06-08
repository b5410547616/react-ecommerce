import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Shop from './components/Shop';
import ProductItem from './components/ProductItem';
import Cart from './components/Cart';

import Checkout1 from './components/Checkout1';
import Checkout2 from './components/Checkout2';

import Registration from './components/Registration';

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Allorders from './components/Allorders';
import Wishlist from './components/Wishlist';


const Routes = () => (
		<Router >
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/shop" component={Shop} />
			<Route path="/product/:id" component={ProductItem} />
			<Route path="/cart" component={Cart} />

			<Route path="/checkout-step-1" component={Checkout1} />
			<Route path="/checkout-step-2" component={Checkout2} />

			<Route path="/registration" component={Registration} />

			// <Route path="/dashboard" component={Dashboard} />
			<Route path="/profile" component={Profile} />
			<Route path="/all-orders" component={Allorders} />
			<Route path="/wishlist" component={Wishlist} />
		</Switch>
		</Router>
);

export default Routes;