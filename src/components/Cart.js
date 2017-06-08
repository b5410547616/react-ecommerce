import React, { Component } from 'react'; 
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
	cartUserFetch, cartUserRemove, cartUserUpdate
} from '../actions';

import Header from './element/Header';
import Footer from './element/Footer';

class Cart extends Component {
	constructor() {
		super();
		this.state = {
			carts: [],
			overStock: [],
			totalPrice: 0
		};
	}

	componentWillMount() {
		this.props.cartUserFetch();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.cart) {
			let carts = [];
			let overStock = [];
			let totalPrice = 0;
			nextProps.cart.map((product) =>{
				carts.push(product);
				if(product.quan_status === 1 && product.cart_no > product.quan_no) {
					overStock.push({
						cart_id: product.cart_id,
						prod_name: product.prod_name,
						quan_size: product.quan_size,
						quan_no: product.quan_no
					});
				}
				totalPrice += (product.prod_price*product.cart_no);
				return 0;
			});
			this.setState({totalPrice, overStock, carts});
		}
	}

	onUpdateCart(e) {
		e.preventDefault();
		this.props.cartUserFetch();
	}

	onRemoveCart(cart_id) {
		this.props.cartUserRemove(cart_id);
	}

	onCheckout() {
		let msg = "";
		if(this.state.carts.length > 0) {
			this.state.overStock.map((cart) => {
				msg += ""+cart.prod_name +" "+cart.quan_size+"UK only left "+ cart.quan_no +" in stock.\n"
				return 0;
			});
			msg += "Click OK to continue..."
			if(confirm(msg)) {
				let carts_item = [];
				let checkQuan = false;
				let cart_no = 0;
				this.state.carts.map((cart) => {
					checkQuan = false;
					this.state.overStock.map((over) =>{
						if(cart.cart_id === over.cart_id) {
							checkQuan = true;
						}
						return 0;
					})

					if(checkQuan) {
						cart_no = cart.quan_no;
					} else {
						cart_no = cart.cart_no;
					}

					carts_item.push({
						cart_id: cart.cart_id,
						cart_no: cart_no,
						quan_id: cart.quan_id
					})
					return 0;
				})
				this.props.cartUserUpdate(carts_item, 1);
			} else {

			}
		} else {
			alert("Please add cart.");
		}
	}

	render() {
		return (
			<div>
				<Header navCart="active" navAccount="dropdown"/>

				<section className="lightSection clearfix pageHeaderImage">
			        <div className="container">
			          <div className="tableBlock">
			            <div className="row tableInner">
			              <div className="col-xs-12">
			                <div className="page-title">
			                  <h2>cart</h2>
			                  <ol className="breadcrumb">
			                    <li>
			                      <a href="/">Home</a>
			                    </li>
			                    <li className="active">cart</li>
			                  </ol>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			    </section>

			    <section className="mainContent clearfix cartListWrapper">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="cartListInner">
			                <form action="#">
			                  <div className="table-responsive">
			                    <table className="table">
			                      <thead>
			                        <tr>
			                          <th></th>
			                          <th>Product Name</th>
			                          <th>Price</th>
			                          <th>Quantity</th>
			                          <th>Sub Total</th>
			                        </tr>
			                      </thead>
			                      <tbody>
			                      
			                      	{
			                      		(this.props.cart) ? this.props.cart.map((product) => (
			                      			<tr key={product.cart_id}>
					                          <td className="col-xs-2">
					                            <button onClick={() => this.onRemoveCart(product.cart_id)} type="button" className="close" data-dismiss="alert" aria-label="Close">
					                            	<span aria-hidden="true">&times;</span>
					                            </button>
					                            <span className="cartImage"><img src={product.gal_path} alt={"image"+product.prod_id} style={{width: '65px'}}/></span>
					                          </td>
					                          <td className="col-xs-4">{product.prod_name} <br/><span style={{color: 'green'}}>{product.quan_size+" UK"}</span></td>
					                          <td className="col-xs-2">฿ {product.prod_price}</td>
					                          <td className="col-xs-2">{product.cart_no}</td>
					                          <td className="col-xs-2">฿ {product.prod_price*product.cart_no}</td>
					                        </tr>
			                      		)) : ''
			                      	}
			                        
			                      </tbody>
			                    </table>
			                  </div>
			                  <div className="updateArea">
			                    <div className="input-group">
			                      <input type="text" className="form-control" placeholder="I have a discount coupon" aria-describedby="basic-addon2"/>
			                      <a href="#" className="btn input-group-addon" id="basic-addon2">apply coupon</a>
			                    </div>
			                    {/*<a className="btn" onClick={this.onUpdateCart.bind(this)} >update cart</a>*/}
			                  </div>
			                  <div className="row totalAmountArea">
			                    <div className="col-sm-4 col-sm-offset-8 col-xs-12">
			                      <ul className="list-unstyled">
			                        <li>Sub Total <span>฿ {this.state.totalPrice}</span></li>
			                        <li>Shipping <span>฿ 100</span></li>
			                        <li>Grand Total <span className="grandTotal">฿ {this.state.totalPrice+100}</span></li>
			                      </ul>
			                    </div>
			                  </div>
			                  <div className="checkBtnArea">
			                    <a href="#" className="btn btn-primary btn-block" onClick={() => this.onCheckout()}>checkout<i className="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
			                  </div>
			                </form>
			              </div>
			            </div>
			          </div>
			        </div>
			    </section>

				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({ product }) => {
	const { cart } = product;
	return {
		cart
	};
};

export default connect(mapStateToProps, {
	cartUserFetch, cartUserRemove, cartUserUpdate
})(Cart);