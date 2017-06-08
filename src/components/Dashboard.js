import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<Header />
				<Pageheader title="ACCOUNT DASHBOARD" />

			    <section className="mainContent clearfix userProfile">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="btn-group" role="group" aria-label="...">
			                <Link to={"/dashboard"} className="btn btn-default active"><i className="fa fa-th" aria-hidden="true"></i>Account Dashboard</Link>
			                <Link to={"/profile"} className="btn btn-default"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link>
			                <Link to={"/all-orders"} className="btn btn-default"><i className="fa fa-list" aria-hidden="true"></i>All Orders</Link>
			                <Link to={"/wishlist"} className="btn btn-default"><i className="fa fa-gift" aria-hidden="true"></i>Wishlist</Link>
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper">
			                <div className="alert alert-warning alert-dismissible" role="alert">
			                  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			                  <strong>Warning!</strong> You have one unpaid order. 
			                </div>
			                <h3>Wellcome <span>Adam Smith</span></h3>
			                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			                <ul className="list-inline">
			                  <li><a href="#" className="btn btn-default btn-lg"><i className="fa fa-user" aria-hidden="true"></i>Profile</a></li>
			                  <li><a href="#" className="btn btn-default btn-lg"><i className="fa fa-map-marker" aria-hidden="true"></i>My Address</a></li>
			                  <li><a href="#" className="btn btn-default btn-lg"><i className="fa fa-list" aria-hidden="true"></i>All Orders</a></li>
			                  <li><a href="#" className="btn btn-default btn-lg"><i className="fa fa-gift" aria-hidden="true"></i>Wishlist</a></li>
			                  <li><a href="#" className="btn btn-default btn-lg"><i className="fa fa-plus-circle" aria-hidden="true"></i>New Address</a></li>
			                </ul>
			                <div className="orderBox">
			                  <h4>Unpaid Orders</h4>
			                  <div className="table-responsive">
			                    <table className="table">
			                      <thead>
			                        <tr>
			                          <th>Order ID</th>
			                          <th>Date</th>
			                          <th>Items</th>
			                          <th>Total Price</th>
			                          <th></th>
			                        </tr>
			                      </thead>
			                      <tbody>
			                        <tr>
			                          <td>#252125</td>
			                          <td>Mar 25, 2016</td>
			                          <td>2</td>
			                          <td>$ 99.00</td>
			                          <td><a href="#" className="btn btn-default">Pay now</a></td>
			                        </tr>
			                      </tbody>
			                    </table>
			                  </div>
			                </div>
			                <div className="orderBox">
			                  <h4>Pending Warranty Claims</h4>
			                  <div className="table-responsive">
			                    <table className="table">
			                      <thead>
			                        <tr>
			                          <th>Order ID</th>
			                          <th>Date</th>
			                          <th>Product Code</th>
			                          <th>Product Name</th>
			                          <th></th>
			                        </tr>
			                      </thead>
			                      <tbody>
			                        <tr>
			                          <td>#252125</td>
			                          <td>Mar 25, 2016</td>
			                          <td>Z - 45263</td>
			                          <td>Lorem ipsum doler</td>
			                          <td><a href="#" className="btn btn-default">View</a></td>
			                        </tr>
			                      </tbody>
			                    </table>
			                  </div>
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