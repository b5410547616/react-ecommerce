import React, { Component } from 'react'; 
// import { Link } from 'react-router-dom';
import $ from 'jquery';
import { connect } from 'react-redux';

import { 
	loginUserCheck,
	productFetchById, 
	galleryFetchById, 
	productFetchQuantity,
	// productFetchByCatId,
	cartUserCreate,
} from '../actions';

import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

const styles = {
	selectStyle: {
		width: '150px',
	    height: '40px',
	    border: '1px solid #d0d0d0',
	    fontSize: '18px',
	    paddingLeft: '12px',
	    color: '#9c9c9c',
	    float: 'left',
    	position: 'relative',
    	fontFamily: 'MyriadProSemibold',
	}
};

class ProductItem extends Component {

	constructor() {
		super();
		this.state = {
			prod_id: 0,
			prod_catid: 0,
			prod_name: "",
			prod_price: "",
			prod_description: "",
			prod_path: [],
			quantity: [],
			isSize: true,
			isLimit: true,
		}
	}

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.productFetchById(id);
		this.props.galleryFetchById(id);
		this.props.productFetchQuantity(id);
	}

	// Set new props to this state
	componentWillReceiveProps(nextProps) {
		if(nextProps.productItem) {
			this.setState({
				prod_id: nextProps.productItem[0].prod_id,
				prod_catid: nextProps.productItem[0].prod_catid,
				prod_name: nextProps.productItem[0].prod_name,
				prod_price: nextProps.productItem[0].prod_price,
				prod_description: nextProps.productItem[0].prod_description,
			});
		}
		if(nextProps.gallery) {
			let paths = [];
    		nextProps.gallery.map((img) => {
        		paths.push(img.gal_path);
        		return 0;
        	})
        	this.setState({prod_path: paths});
		}
		if(nextProps.quantity) {
			let quan = [];
			let isSize = true;
			let isLimit = true;
    		nextProps.quantity.map((tmp) => {
    			// Check quantity limit 
    			if(tmp.quan_status === 0) {
    				isLimit = false;
    			} else {
    				isLimit = true;
    			}

    			if(tmp.quan_no !== 0) {
    				if(tmp.quan_size === '0'){
    					isSize = false;
	        			quan.push({
	        				id: tmp.quan_id,
	        				size: 0,
	        				no: tmp.quan_no
	        			});
	    			} else {
	    				isSize = true;
	        			quan.push({
	        				id: tmp.quan_id,
	        				size: tmp.quan_size,
	        				no: tmp.quan_no
	        			});
	    			}

    			}


    			return 0;
        	})
        	this.setState({isSize, isLimit, quantity: quan});
		}
	}

	// componentDidMount() {
	// 	this.props.productFetchByCatId(this.state.prod_catid, 4);
	// 	console.log(this.props.productList);
	// }

	// Handle differentiate between product with or without size
	showSize() {
		let size;
		let qty;
		if(this.state.isSize) {
			size = '<select><option default>Size (UK)</option>';
			this.state.quantity.map((value) => {
				size += '<option key="'+ value.size + '" value="'+value.id+'">'+ value.size + '</option>';
				return 0;
			});
			size += '</select>';
			$('#size').html(size);
			$('#size select').css(styles.selectStyle);
			
		} else {
			size = '';
			qty = '<select><option default>Qty</option>';
			this.state.quantity.map((value) => {
				qty += '<option key="'+ value.no + '" value="'+value.id+'">'+ value.no + '</option>';
				return 0;
			});
			qty += '</select>';
			$('#qty').html(qty);
			$('#qty select').css(styles.selectStyle);
			$('#size').remove();
		}

		// Show quantity when size selected
		const _this = this;
		$( "#size select" ).change(function() {
			let size_no = $("#size select option:selected").text();
		  	qty = '<select><option default>Qty</option>';
			_this.state.quantity.map((value) => {
				if(size_no === value.size) {
					let i;
					if(_this.state.isLimit) {
						for (i = 1; i <= value.no; i++) {
							qty += '<option key="'+ i + '" value="'+value.id+'">'+ i + '</option>';
						}
					} else {
						for (i = 1; i <= 10; i++) {
							qty += '<option key="'+ i + '" value="'+value.id+'">'+ i + '</option>';
						}
					}
				}
				return 0;
			});
			qty += '</select>';
			$('#qty').html(qty);
			$('#qty select').css(styles.selectStyle);
		});
		
	}

	_onSubmitCart(e) {
		e.preventDefault();
		const quan_id = $('#qty select').val();
		const cart_no = $('#qty select option:selected').text();
		const { prod_id } = this.state;
		console.log(prod_id, quan_id, cart_no);
		if(this.props.isLogin) {
			if(cart_no !== "Qty" && typeof cart_no !== 'undefined') {
				this.props.cartUserCreate({ prod_id, quan_id, cart_no });
				// alert("Product is added to Cart");
			} else {
				alert("Please select size and quantity");
			}
		} else {
			alert("Please Login");
		} 
		
	}

	render() {
		return (
			<div>
				<Header navProductItem="active" navAccount="dropdown"/>
				<Pageheader title={this.state.prod_name} />
				

				<section className="mainContent clearfix">
			        <div className="container">
			          <div className="row singleProduct">
			            <div className="col-xs-12">
			              <div className="media">
			                <div className="media-left productSlider">
			                  <div id="carousel" className="carousel slide" data-ride="carousel">
			                    <div className="carousel-inner">

			                      <div className="item active" data-thumb="0">
			                        <img src={this.state.prod_path[0]} alt="item1"/>
			                      </div>
			                      <div className="item" data-thumb="1">
			                        <img src={this.state.prod_path[1]}  alt="item2"/>
			                      </div>

			                    </div>
			                  </div> 
			                  <div className="clearfix">
			                    <div id="thumbcarousel" className="carousel slide" data-interval="false">
			                      <div className="carousel-inner">
			                          <div data-target="#carousel" data-slide-to="0" className="thumb"><img src={this.state.prod_path[0]} alt="carousel1"/></div>
			                          <div data-target="#carousel" data-slide-to="1" className="thumb"><img src={this.state.prod_path[1]} alt="carousel2"/></div>
			                      </div>
			                      <a className="left carousel-control" href="#thumbcarousel" role="button" data-slide="prev">
			                        <span className="glyphicon glyphicon-chevron-left"></span>
			                      </a>
			                      <a className="right carousel-control" href="#thumbcarousel" role="button" data-slide="next">
			                        <span className="glyphicon glyphicon-chevron-right"></span>
			                      </a>
			                    </div>
			                  </div>
			                </div>
			                <div className="media-body">
			                  <ul className="list-inline">
			                    <li><a href="/shop"><i className="fa fa-reply" aria-hidden="true"></i>Continue Shopping</a></li>
			                    <li><a href="#"><i className="fa fa-plus" aria-hidden="true"></i>Share This</a></li>
			                  </ul>
			                  <h2>{this.state.prod_name}</h2>
			                  <h3>฿{this.state.prod_price}</h3>
			                  <p>{this.state.prod_description}</p>

			                  
           					  {this.showSize()}
           					  <span id="size" className="quick-drop">
           					  </span>
			                    

			                  <span id="qty" className="quick-drop resizeWidth">
			                  </span>
			                  <div className="btn-area">
			                    <a href="#" onClick={this._onSubmitCart.bind(this)} className="btn btn-primary btn-block">Add to cart <i className="fa fa-angle-right" aria-hidden="true"></i></a> 
			                  </div>
			                  
			                </div>
			              </div>
			            </div>
			          </div>




			          <div className="row productsContent">
			            <div className="col-xs-12">
			              <div className="page-header">
			                <h4>Related Products</h4>
			              </div>
			            </div>


			            <div className="col-md-3 col-sm-6 col-xs-12">
			              <div className="productBox">
			                <div className="productImage clearfix">
			                  <img src="/assets/img/products/products-01.jpg" alt="products-img"/>
			                  <div className="productMasking">
			                    <ul className="list-inline btn-group" role="group">
			                      <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
			                      <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
			                      <li><a className="btn btn-default" data-toggle="modal" href=".quick-view" ><i className="fa fa-eye"></i></a></li>
			                    </ul>
			                  </div>
			                </div>
			                <div className="productCaption clearfix">
			                 <h5>Nike Sportswear</h5>
			                 <h3>$199</h3>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 col-sm-6 col-xs-12">
			              <div className="productBox">
			                <div className="productImage clearfix">
			                  <img src="/assets/img/products/products-02.jpg" alt="products-img"/>
			                  <div className="productMasking">
			                    <ul className="list-inline btn-group" role="group">
			                      <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
			                      <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
			                      <li><a className="btn btn-default" data-toggle="modal" href=".quick-view" ><i className="fa fa-eye"></i></a></li>
			                    </ul>
			                  </div>
			                </div>
			                <div className="productCaption clearfix">
			                 <h5>Dip Dyed Sweater</h5>
			                 <h3>$249</h3>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 col-sm-6 col-xs-12">
			              <div className="productBox">
			                <div className="productImage clearfix">
			                  <img src="/assets/img/products/products-03.jpg" alt="products-img"/>
			                  <div className="productMasking">
			                    <ul className="list-inline btn-group" role="group">
			                      <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
			                      <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
			                      <li><a className="btn btn-default" data-toggle="modal" href=".quick-view" ><i className="fa fa-eye"></i></a></li>
			                    </ul>
			                  </div>
			                </div>
			                <div className="productCaption clearfix">
			                 <h5>Scarf Ring Corner</h5>
			                 <h3>$179</h3>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 col-sm-6 col-xs-12">
			              <div className="productBox">
			                <div className="productImage clearfix">
			                  <img src="/assets/img/products/products-04.jpg" alt="products-img"/>
			                  <div className="productMasking">
			                    <ul className="list-inline btn-group" role="group">
			                      <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
			                      <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
			                      <li><a className="btn btn-default" data-toggle="modal" href=".quick-view" ><i className="fa fa-eye"></i></a></li>
			                    </ul>
			                  </div>
			                </div>
			                <div className="productCaption clearfix">
			                 <h5>Sun Buddies</h5>
			                 <h3>$149</h3>
			                </div>
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

const mapStateToProps = ({product, auth}) => {
	const { productItem, gallery, quantity, productList } = product;
	const { isLogin } = auth;
	return {
		isLogin,
		productItem, 
		gallery,
		quantity,
		productList
	};
};

export default connect(mapStateToProps, {
	loginUserCheck,
	productFetchById, 
	galleryFetchById, 
	productFetchQuantity,
	// productFetchByCatId,
	cartUserCreate
})(ProductItem);