import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { wishUserFetch, wishUserRemove } from '../actions';

import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

class Wishlist extends Component {
	constructor() {
		super();
		this.state = {
			products: []
		};
	}

	componentWillMount() {
		this.props.wishUserFetch();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.wishlist) {
			let products = [];
			nextProps.wishlist.map((wish) => {
				products.push({
					wish_id: wish.wish_id,
					prod_id: wish.prod_id,
					name: wish.prod_name,
					price: wish.prod_price,
					path: wish.gal_path
				})
				return 0;
			})
			this.setState({products});
		}
	}

	onRemoveWishlist(wish_id) {
		this.props.wishUserRemove(wish_id)
	}

	render() {
		console.log(this.state.products)
		return (
			<div>
				<Header navAccount="dropdown active" navWishlist="active"/>	
				<Pageheader title="WISHLIST" />

				<section className="mainContent clearfix userProfile">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="btn-group" role="group" aria-label="...">
			                <Link to={"/profile"} className="btn btn-default"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link>
			                <Link to={"/all-orders"} className="btn btn-default"><i className="fa fa-list" aria-hidden="true"></i>All Orders</Link>
			                <Link to={"/wishlist"} className="btn btn-default active"><i className="fa fa-gift" aria-hidden="true"></i>Wishlist</Link>
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper">
			                <div className="orderBox myAddress wishList">
			                  <h4>Wishlist</h4>
			                  <div className="table-responsive">
			                    <table className="table">
			                      <thead>
			                        <tr>
			                          <th></th>
			                          <th>Product Name</th>
			                          <th>Unit Price</th>
			                          <th></th>
			                        </tr>
			                      </thead>
			                      <tbody>

			                      	{
			                      		this.state.products.map((product) => {
			                      			return (
			                      			<tr key={product.prod_id}>
					                          <td className="col-md-2 col-sm-3">
					                            <button onClick={() => this.onRemoveWishlist(product.wish_id)} type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					                            <span className="cartImage"><img src={product.path} alt={"image"+product.prod_id} style={{width: '64px'}}/></span>
					                          </td>
					                          <td>{product.name}</td>
					                          <td>฿ {product.price}</td>
					                          <td>
					                            <a className="btn btn-default" href={"/product/"+product.prod_id}>View Product</a>
					                          </td>
			                        		</tr>)
			                      		})
			                      	}
			                        

			                      </tbody>
			                    </table>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			    </section>

				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = ({product}) => {
	const { wishlist } = product;
	return {
		wishlist
	}
};

export default connect(mapStateToProps, {
	wishUserFetch, wishUserRemove
})(Wishlist);