import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
	userProfile, 
	logoutUser, 
	cartUserFetch 
} from '../../actions';

/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
String.prototype.trunc = String.prototype.trunc ||
	function(n){
		return (this.length > n) ? this.substr(0, n-1) + '...' : this;
};

class Header extends Component {
	constructor() {
		super();
		this.state = {
			totalPrice: 0
		}
	}

	componentWillMount(){
		this.props.userProfile();
		this.props.cartUserFetch();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.cart) {
			let totalPrice = 0;
			nextProps.cart.map((product) =>{
				totalPrice += (product.prod_price*product.cart_no);
				return 0;
			});
			this.setState({totalPrice});
		}
	}

	onLogout() {
		this.props.logoutUser();
	}

	render() {
		let auth, logout;
		let name;
		if (this.props.user != null){
			name = this.props.user.user_firstname + " " + this.props.user.user_lastname;
		}

		if(name){
			auth = <li><span><a>{name}</a></span></li>;
			logout = <li><a href="/" onClick={this.onLogout.bind(this)}>Logout</a></li>;
		} else {
			auth = <li className="account-login"><span><Link to={"/registration"}>Login</Link><small>or</small><Link to={"/registration"}>Create an account</Link></span></li>;
		}

		return (
			<div className="header clearfix">
		        <div className="topBar">
		          <div className="container">
		            <div className="row">
		              <div className="col-md-6 hidden-sm hidden-xs">
		                <ul className="list-inline">
		                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
		                  <li><a href="#"><i className="fa fa-facebook"></i></a></li>
		                  <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
		                  <li><a href="#"><i className="fa fa-vimeo"></i></a></li>
		                  <li><a href="#"><i className="fa fa-tumblr"></i></a></li>
		                </ul>
		              </div>
		              <div className="col-md-6 col-xs-12">
		                <ul className="list-inline pull-right top-right">
		                  {auth}
		                  <li className="searchBox">
		                    <a href="#"><i className="fa fa-search"></i></a>
		                    <ul className="dropdown-menu dropdown-menu-right">
		                      <li>
		                        <span className="input-group">
		                          <input type="text" className="form-control" placeholder="Search…" aria-describedby="basic-addon2" />
		                          <button type="submit" className="input-group-addon">Submit</button>
		                        </span>
		                      </li>
		                    </ul>
		                  </li>

		                  <li className="dropdown cart-dropdown">
		                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-shopping-cart"></i>฿{this.state.totalPrice}</a>
		                    <ul className="dropdown-menu dropdown-menu-right">
		                      <li>Item(s) in your cart</li>

		                      {
		                      	(this.props.cart) ? this.props.cart.map((product) => {
		                      		return (
		                      			<li key={product.cart_id}>
					                        <a href={"/product/"+product.prod_id}>
					                          <div className="media">
					                            <img style={{width: '60px'}} className="media-left media-object" src={product.gal_path} alt="cart-Image1" />
					                            <div className="media-body">
					                              <h5 className="media-heading">{product.prod_name.trunc(20)}<br/>
					                              <span>{product.cart_no + " X ฿" +product.prod_price}</span></h5>
					                            </div>
					                          </div>
					                        </a>
					                    </li>
		                      		);
		                      	}) : ''
		                      }

		                      
		                      


		                      <li>
		                        <div className="btn-group" role="group" aria-label="...">
		                          <button onClick={() => window.location="/cart"} type="button" className="btn btn-default" >Shopping Cart</button>
		                          <button type="button" className="btn btn-default" >Checkout</button>
		                        </div>
		                      </li>
		                    </ul>
		                  </li>

		                </ul>
		              </div>
		            </div>
		          </div>    
		        </div>

		        <nav className="navbar navbar-main navbar-default" role="navigation">
		          <div className="container">
		            <div className="navbar-header">
		              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
		                <span className="sr-only">Toggle navigation</span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		              </button>
		              <a className="navbar-brand" href="/" ><img src="/assets/img/logo.png" alt="logo"/></a>
		            </div>
		        
		            <div className="collapse navbar-collapse navbar-ex1-collapse">            
		              <ul className="nav navbar-nav navbar-right">
		                <li className={this.props.navHome}>
		                  <a href="/" className="dropdown-toggle">Home</a>
		                </li>
		                <li className={this.props.navShop}>
		                  <a href={"/shop"} className="dropdown-toggle">Shop</a>
		                </li>
		                <li className={this.props.navCart}>
		                  <a href={"/Cart"} className="dropdown-toggle">Cart</a>
		                </li>
		                {
		                	(this.props.isLogin) ? (<li className={this.props.navAccount}>
			                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account</a>
			                  <ul className="dropdown-menu dropdown-menu-right">
			                    <li className={this.props.navProfile}><Link to={"/profile"} >Profile</Link></li>
			                    <li className={this.props.navOrders}><Link to={"/all-orders"}>All Orders</Link></li>
			                    <li className={this.props.navWishlist}><Link to={"/wishlist"}>Wishlist</Link></li>
			                	{logout}
			                  </ul>
			                </li>) : ''
		                }
		                

		              </ul>
		            </div>
		          </div>
		        </nav>

		    </div>
		);
	}
}


const mapStateToProps = ({auth, product}) => {
	const { isLogin, user } = auth;
	const { cart } = product;
	return {
		isLogin,
		user,
		cart
	};
};

export default connect(mapStateToProps, {
	userProfile, logoutUser, cartUserFetch
})(Header);