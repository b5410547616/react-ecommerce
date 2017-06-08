import React, { Component } from 'react'; 
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { productFetch, wishUserCreate } from '../actions';

import Header from './element/Header';
import Footer from './element/Footer';

class Shop extends Component {
	componentWillMount() {
		this.props.productFetch();
	}

	showProduct() {
		if(this.props.productList) {
			return this.props.productList.map((product) => {
				return (
					<div className="col-sm-4 col-xs-12" key={product.prod_id}>
		              <div className="productBox">
		                <div className="productImage clearfix">
		                  <img src={product.gal_path} alt="products-img1"/>
		                  <div className="productMasking">
		                    <ul className="list-inline btn-group" role="group">
		                      <li><a onClick={() => this.onSubmitWishlist(product.prod_id)} data-toggle="modal" href="#" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
		                      <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
		                      <li><a className="btn btn-default" data-toggle="modal" href=".quick-view" ><i className="fa fa-eye"></i></a></li>
		                    </ul>
		                  </div>
		                </div>
		                <div className="productCaption clearfix">
		                  <a href={"/product/"+product.prod_id}>
		                    <h5>{product.prod_name}</h5>
		                  </a>
		                  <h3>฿{product.prod_price}</h3>
		                </div>
		              </div>
		            </div>
				);
			});
		}
	}


	onSubmitWishlist(prod_id) {
		if(this.props.isLogin) {
			this.props.wishUserCreate(prod_id);
		} else {
			alert("Please Login");
		}
	}

	render() {
		return (
			<div>
				<Header navShop="active" navAccount="dropdown"/>

				<section className="mainContent clearfix productsContent">
			        <div className="container">
			          <div className="row">

			            {this.showProduct()}

			          </div>
			        </div>
			    </section>

				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({product, auth}) => {
	const { productList } = product;
	const { isLogin } = auth;
	return {
		isLogin,
		productList
	};
};

export default connect(mapStateToProps, {
	productFetch, wishUserCreate
})(Shop);