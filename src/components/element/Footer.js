import React, { Component } from 'react'; 

export default class Footer extends Component {
	render() {
		return (
			<div>
		    <div className="footer clearfix">
		        <div className="container">
		          <div className="row">
		            <div className="col-sm-2 col-xs-12">
		              <div className="footerLink">
		                <h5>Accessories</h5>
		                <ul className="list-unstyled">
		                  <li><a href="#">Body care </a></li>
		                  <li><a href="#">Chambray </a></li>
		                  <li><a href="#">Floral </a></li>
		                  <li><a href="#">Rejuvination </a></li>
		                  <li><a href="#">Shaving </a></li>
		                  <li><a href="#">Toilette </a></li>
		                </ul>
		              </div>
		            </div>
		            <div className="col-sm-2 col-xs-12">
		              <div className="footerLink">
		                <h5>BRANDS</h5>
		                <ul className="list-unstyled">
		                  <li><a href="#">Barbour </a></li>
		                  <li><a href="#">Brioni </a></li>
		                  <li><a href="#">Oliver Spencer</a></li>
		                  <li><a href="#">Belstaff</a></li>
		                </ul>
		              </div>
		            </div>
		            <div className="col-sm-2 col-xs-12">
		              <div className="footerLink">
		                <h5>Accessories</h5>
		                <ul className="list-unstyled">
		                  <li><a href="#">Body care </a></li>
		                  <li><a href="#">Chambray </a></li>
		                  <li><a href="#">Floral </a></li>
		                  <li><a href="#">Rejuvination </a></li>
		                  <li><a href="#">Shaving </a></li>
		                  <li><a href="#">Toilette </a></li>
		                </ul>
		              </div>
		            </div>
		            <div className="col-sm-2 col-xs-12">
		              <div className="footerLink">
		                <h5>Get in Touch</h5>
		                <ul className="list-unstyled">
		                  <li>Call us at (555)-555-5555</li>
		                  <li><a href="mailto:support@iamabdus.com">support@iamabdus.com</a></li>
		                </ul>
		              </div>
		            </div>
		            <div className="col-sm-4 col-xs-12">
		              <div className="newsletter clearfix">
		                <h4>Newsletter</h4>
		                <h3>Sign up now</h3>
		                <p>Enter your email address and get notified about new products. We hate spam!</p>
		                <div className="input-group">
		                  <input type="text" className="form-control" placeholder="your email address" aria-describedby="basic-addon2"/>
		                  <a href="#" className="input-group-addon" id="basic-addon2">go <i className="glyphicon glyphicon-chevron-right"></i></a>
		                </div>
		              </div>  
		            </div>
		          </div>
		        </div>
		    </div>

		    <div className="copyRight clearfix">
		        <div className="container">
		          <div className="row">
		            <div className="col-sm-7 col-xs-12">
		              <p>&copy; 2016 Copyright Bigbag Store Bootstrap Template by <a target="_blank" href="http://www.iamabdus.com/">Abdus</a>.</p>
		            </div>
		            <div className="col-sm-5 col-xs-12">
		              <ul className="list-inline">
		                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
		                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
		                <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
		                <li><a href="#"><i className="fa fa-vimeo"></i></a></li>
		                <li><a href="#"><i className="fa fa-tumblr"></i></a></li>
		              </ul>  
		            </div>
		          </div>
		        </div>
		    </div>
		    </div>
		);
	}
}