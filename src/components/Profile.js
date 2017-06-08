import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userProfile, userUpdate } from '../actions';

import Header from './element/Header';
import Pageheader from './element/Pageheader';
import Footer from './element/Footer';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			id: 0,
			firstname: "",
			lastname: "",
			email: ""
		}
		this.onHandleChange = this.onHandleChange.bind(this);
	}

	componentWillMount() {
		this.props.userProfile();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.user) {
			this.setState({
				id: nextProps.user.user_id,
				firstname: nextProps.user.user_firstname,
				lastname: nextProps.user.user_lastname,
				email: nextProps.user.user_email
			})
		}
	}

	onHandleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}

	_onSubmitUpdate(e) {
		e.preventDefault();
		const { id, firstname, lastname, email } = this.state;
		this.props.userUpdate({ id, firstname, lastname, email });
	}


	render() {
		return (
			<div>
				<Header navAccount="dropdown active" navProfile="active"/>
				<Pageheader title="PROFILE" />

			    <section className="mainContent clearfix userProfile">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="btn-group" role="group" aria-label="...">
			                <Link to={"/profile"} className="btn btn-default active"><i className="fa fa-user" aria-hidden="true"></i>Profile</Link>
			                <Link to={"/all-orders"} className="btn btn-default"><i className="fa fa-list" aria-hidden="true"></i>All Orders</Link>
			                <Link to={"/wishlist"} className="btn btn-default"><i className="fa fa-gift" aria-hidden="true"></i>Wishlist</Link>
			              </div>
			            </div>
			          </div>
			          <div className="row">
			            <div className="col-xs-12">
			              <div className="innerWrapper profile">
			                <div className="orderBox">
			                  <h4>profile</h4>
			                </div>
			                <div className="row">
			                  <div className="col-md-2 col-sm-3 col-xs-12">
			                    <div className="thumbnail">
			                      <img src="./assets/img/products/profile/profile-image.jpg" alt="profile-image1"/>
			                      <div className="caption">
			                        <a href="#" className="btn btn-primary btn-block" role="button">Change Avatar</a>  
			                      </div>
			                    </div>
			                  </div>
			                  <div className="col-md-10 col-sm-9 col-xs-12">
			                      <form className="form-horizontal" onSubmit={this._onSubmitUpdate.bind(this)}>
			                        <div className="form-group">
			                          <label htmlFor="" className="col-md-2 col-sm-3 control-label">First Name</label>
			                          <div className="col-md-10 col-sm-9">
			                            <input type="text" className="form-control" name="firstname" onChange={this.onHandleChange} value={this.state.firstname}/>
			                          </div>
			                        </div>
			                        <div className="form-group">
			                          <label htmlFor="" className="col-md-2 col-sm-3 control-label">Last Name</label>
			                          <div className="col-md-10 col-sm-9">
			                            <input type="text" className="form-control" name="lastname" onChange={this.onHandleChange} value={this.state.lastname}/>
			                          </div>
			                        </div>
			                        <div className="form-group">
			                          <label htmlFor="" className="col-md-2 col-sm-3 control-label">Email Address</label>
			                          <div className="col-md-10 col-sm-9">
			                            <input type="email" className="form-control" name="email" onChange={this.onHandleChange} value={this.state.email}/>
			                          </div>
			                        </div>
			                        <div className="form-group">
			                          <div className="col-md-offset-10 col-md-2 col-sm-offset-9 col-sm-3">
			                            <button type="submit" className="btn btn-primary btn-block">SAVE INFO</button>
			                          </div>
			                        </div>
			                      </form>
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

const mapStateToProps = ({auth}) => {
	const { isLogin, user } = auth;
	return {
		isLogin,
		user
	};
};

export default connect(mapStateToProps, {
	userProfile, userUpdate
})(Profile);