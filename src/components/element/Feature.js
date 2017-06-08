import React, { Component } from 'react'; 

export default class Feature extends Component {

	showCategory() {
		return this.props.categories.map( (item) => {
			return(
				<div className="col-sm-4 col-xs-12" key={item.cat_id}>
	              <div className="thumbnail" onclick="location.href='single-product.html';">
	                <div className="imageWrapper">
	                  <img src={ item.cat_path } alt="feature-collection-image1"/>
	                  <div className="masking"><a href="/shop" className="btn viewBtn">View Prodocts</a></div>
	                </div>
	                <div className="caption">
	                  <h4>{ item.cat_name }</h4>
	                </div>
	              </div>
	            </div>
			)
		})
	}

	render() {
		return (
		    <section className="mainContent clearfix">
		        <div className="container">
		          <div className="row featuredCollection margin-bottom">
		            <div className="col-xs-12">
		              <div className="page-header">
		                <h4>Featured Collection</h4>
		              </div>
		            </div>

		            { this.showCategory() }

		          </div>
		          <div className="row featuredProducts margin-bottom">
		            <div className="col-xs-12">
		              <div className="page-header">
		                <h4>Featured Products</h4>
		              </div>
		            </div>
		            <div className="col-xs-12">
		              <div className="owl-carousel featuredProductsSlider">

		              	<div className="slide">
		                  <div className="productImage clearfix">
		                    <img src="/assets/img/products/products1.jpg" alt="featured-product-img1"/>
		                    <div className="productMasking">
		                      <ul className="list-inline btn-group" role="group">
		                        <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
		                        <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
		                        <li><a data-toggle="modal" href=".quick-view" className="btn btn-default"><i className="fa fa-eye"></i></a></li>
		                      </ul>
		                    </div>
		                  </div>
		                  <div className="productCaption clearfix">
		                    <a href="single-product.html">
		                      <h5>TAG HEUER CALIBRE 16</h5>
		                    </a>
		                    <h3>฿150,000</h3>
		                  </div>
		                </div>
						<div className="slide">
		                  <div className="productImage clearfix">
		                    <img src="/assets/img/products/products2.jpg" alt="featured-product-img1"/>
		                    <div className="productMasking">
		                      <ul className="list-inline btn-group" role="group">
		                        <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
		                        <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
		                        <li><a data-toggle="modal" href=".quick-view" className="btn btn-default"><i className="fa fa-eye"></i></a></li>
		                      </ul>
		                    </div>
		                  </div>
		                  <div className="productCaption clearfix">
		                    <a href="single-product.html">
		                      <h5>ULTRA BOOST UNCAGED SHOES</h5>
		                    </a>
		                    <h3>฿6649</h3>
		                  </div>
		                </div>
						<div className="slide">
		                  <div className="productImage clearfix">
		                    <img src="/assets/img/products/products3.jpg" alt="featured-product-img1"/>
		                    <div className="productMasking">
		                      <ul className="list-inline btn-group" role="group">
		                        <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
		                        <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
		                        <li><a data-toggle="modal" href=".quick-view" className="btn btn-default"><i className="fa fa-eye"></i></a></li>
		                      </ul>
		                    </div>
		                  </div>
		                  <div className="productCaption clearfix">
		                    <a href="single-product.html">
		                      <h5>ADIDAS SUPERSTAR SHOES</h5>
		                    </a>
		                    <h3>฿3325</h3>
		                  </div>
		                </div>

		              </div>
		            </div>  
		          </div>
		        </div>
		    </section>
		);
	}
}