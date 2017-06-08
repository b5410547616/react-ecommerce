import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	orderStatus,
	orderInfoCreate,
	orderInfoCancel,
	cartUserUpdate
} from '../actions'

import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

class Checkout1 extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			address: "",
			phone: "",
			city: "",
			country: "",
			zipCode: ""
		}
	}

	componentWillMount() {
		this.props.orderStatus();
	}

	_onChangeText(event) {
		this.setState({
	    	[event.target.name]: event.target.value
	    });
	}

	_onContinue() {
		this.props.orderInfoCreate(this.state);
	}

	_onCancel() {
		this.props.orderInfoCancel();
		this.props.cartUserUpdate(null, 0);
	}

	render() {
		return (
			<div>
				<Header navCart="active" navAccount="dropdown"/>
				<Pageheader title="BILLING & SHIPPING ADDRESS" />

				<section className="mainContent clearfix stepsWrapper">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper clearfix stepsPage">
			                <div className="row progress-wizard" style={{borderBottom: "0"}}>

			                  <div className="col-xs-4 progress-wizard-step complete">
			                    <div className="text-center progress-wizard-stepnum">Billing &amp; Shipping Address</div>
			                    <div className="progress"><div className="progress-bar"></div></div>
			                    <a className="progress-wizard-dot"></a>
			                  </div>

			                  <div className="col-xs-4 progress-wizard-step disabled">
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
			                      <h4>Billing information</h4>
			                    </div>
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Name</label>
			                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Email</label>
			                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Address</label>
			                    <input type="text" className="form-control" name="address" value={this.state.address} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Phone</label>
			                    <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">City</label>
			                    <input type="text" className="form-control" name="city" value={this.state.city} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Country</label>
			                    <input type="text" className="form-control" name="country" value={this.state.country} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  <div className="form-group col-sm-6 col-xs-12">
			                    <label htmlFor="">Zip Code</label>
			                    <input type="text" className="form-control" name="zipCode" value={this.state.zipCode} onChange={this._onChangeText.bind(this)} />
			                  </div>
			                  
			                  <div className="col-xs-12">
			                    <div className="well well-lg clearfix">
			                      <ul className="pager">
			                      	<li className="previous"><a href="#" onClick={() => this._onCancel()}>cancel</a></li>
			                        <li className="next"><a href="#" onClick={() => this._onContinue()}>Continue</a></li>
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
	const { orderInfo, status } = order;
	return {
		orderInfo,
		status
	}
};

export default connect(mapStateToProps, {
	orderInfoCreate, orderInfoCancel, cartUserUpdate, orderStatus
})(Checkout1)