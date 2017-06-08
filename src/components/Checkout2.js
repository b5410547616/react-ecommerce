import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	orderInfoFetch,
	orderTotalPriceFetch,
	cartUserUpdate
} from '../actions'

import Header from './element/Header';
import Pageheader from './element/Pageheader';
import PaypalBtn from './element/PaypalBtn';
import Footer from './element/Footer';

class Checkout2 extends Component {

	componentWillMount() {
		this.props.orderInfoFetch();
		this.props.orderTotalPriceFetch();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.totalPrice) {
			console.log("nextProps ", nextProps.totalPrice);
		}
	}

	onPaypalCancel() {
		alert('Paypal Payment Unsuccess');
	}

	onPaypalSuccess() {
		alert('Paypal Payment Success');
		this.props.cartUserUpdate(null, 2);
	}

	render() {
		return (
			<div>
				<Header navCart="active" navAccount="dropdown"/>
				<Pageheader title="PAYMENT" />

				<section className="mainContent clearfix stepsWrapper">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper clearfix stepsPage">
			                <div className="row progress-wizard" style={{borderBottom: "0"}}>

			                  <div className="col-xs-4 progress-wizard-step complete fullBar">
			                    <div className="text-center progress-wizard-stepnum">Billing &amp; Shipping Address</div>
			                    <div className="progress"><div className="progress-bar"></div></div>
			                    <a className="progress-wizard-dot"></a>
			                  </div>

			                  <div className="col-xs-4 progress-wizard-step active">
			                    <div className="text-center progress-wizard-stepnum">Payment Method</div>
			                    <div className="progress"><div className="progress-bar"></div></div>
			                    <a className="progress-wizard-dot"></a>
			                  </div>

			                  <div className="col-xs-4 progress-wizard-step disabled">
			                    <div className="text-center progress-wizard-stepnum">Review</div>
			                    <div className="progress"><div className="progress-bar"></div></div>
			                    <a className="progress-wizard-dot"></a>
			                  </div>
			                </div>
			                
			                <form action="" className="row" method="POST" role="form">
			                  <div className="col-xs-12">
			                    <div className="page-header">
			                      <h4>Payment Information</h4>
			                    </div>
			                  </div>

			                  <div className="col-xs-12">
			                  	<PaypalBtn totalPrice={this.props.totalPrice} paypalsuccess={() => this.onPaypalSuccess()} paypalcancel={() => this.onPaypalCancel()}/>
			                  </div>

			                  <div className="col-xs-12">
			                    <div className="well well-lg clearfix">
			                      <ul className="pager">
			                      <li className="previous"><Link to={"/checkout-step-1"}>back</Link></li>
			                        <li className="next"><a href="checkout-step-4.html">Continue</a></li>
			                      </ul>
			                    </div>
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

const mapStateToProps = ({order}) => {
	const { orderInfo, totalPrice } = order;
	return {
		orderInfo,
		totalPrice
	}
};

export default connect(mapStateToProps, {
	orderInfoFetch,
	orderTotalPriceFetch,
	cartUserUpdate
})(Checkout2);