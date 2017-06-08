import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

export default class Allorders extends Component {
	render() {
		return (
			<div>
				<Header navAccount="dropdown active" navOrders="active"/>	
				<Pageheader title="ALL ORDERS" />

				<section className="mainContent clearfix userProfile">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="btn-group" role="group" aria-label="...">
			                <Link to={"/profile"} className="btn btn-default"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link>
			                <Link to={"/all-orders"} className="btn btn-default active"><i className="fa fa-list" aria-hidden="true"></i>All Orders</Link>
			                <Link to={"/wishlist"} className="btn btn-default"><i className="fa fa-gift" aria-hidden="true"></i>Wishlist</Link>
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper">
			                <div className="orderBox">
			                  <h4>All Orders</h4>
			                  <div className="table-responsive">
			                    <table className="table">
			                      <thead>
			                        <tr>
			                          <th>Order ID</th>
			                          <th>Date</th>
			                          <th>Items</th>
			                          <th>Total Price</th>
			                          <th>Status</th>
			                          <th></th>
			                        </tr>
			                      </thead>
			                      <tbody>
			                        <tr>
			                          <td>#451231</td>
			                          <td>Mar 25, 2016</td>
			                          <td>2</td>
			                          <td>$99.00</td>
			                          <td><span className="label label-primary">Processing</span></td>
			                          <td><a href="#" className="btn btn-default">View</a></td>
			                        </tr>
			                        <tr>
			                          <td>#451231</td>
			                          <td>Mar 25, 2016</td>
			                          <td>3</td>
			                          <td>$150.00</td>
			                          <td><span className="label label-success">Completed</span></td>
			                          <td><a href="#" className="btn btn-default">View</a></td>
			                        </tr>
			                        <tr>
			                          <td>#451231</td>
			                          <td>Mar 25, 2016</td>
			                          <td>3</td>
			                          <td>$150.00</td>
			                          <td><span className="label label-danger">Canceled</span></td>
			                          <td><a href="#" className="btn btn-default">View</a></td>
			                        </tr>
			                        <tr>
			                          <td>#451231</td>
			                          <td>Mar 25, 2016</td>
			                          <td>2</td>
			                          <td>$99.00</td>
			                          <td><span className="label label-info">On Hold</span></td>
			                          <td><a href="#" className="btn btn-default">View</a></td>
			                        </tr>
			                        <tr>
			                          <td>#451231</td>
			                          <td>Mar 25, 2016</td>
			                          <td>3</td>
			                          <td>$150.00</td>
			                          <td><span className="label label-warning">Pending</span></td>
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

				<Footer/>
			</div>
		);
	}
}