import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import { loginUser, registerUser } from '../actions';

import Header from './element/Header';
import Footer from './element/Footer';

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			repassword: "",
			login_email: "",
			login_password: ""
		}
	}

	onHandleChange(event) {
		this.setState({
	    	[event.target.name]: event.target.value
	    });
	}

	_onSubmitLogin(e) {
		e.preventDefault();
	    // console.log(this.state.login_email);
	    const { login_email, login_password } = this.state;
		this.props.loginUser({ login_email, login_password });
	}

	_onSubmitRegister(e) {
		e.preventDefault();
		const { firstname, lastname, email, password, repassword } = this.state;
		this.props.registerUser({ firstname, lastname, email, password, repassword });
	}

	render() {
		console.log('errorRegis', this.props.errorRegis);
		return (
			<div>
				<Header navAccount="dropdown"/>

			    <section className="lightSection clearfix pageHeader">
			        <div className="container">
			          <div className="row">
			            <div className="col-xs-6">
			              <div className="page-title">
			                <h2>sign up</h2>
			              </div>
			            </div>
			            <div className="col-xs-6">
			              <ol className="breadcrumb pull-right">
			                <li>
			                  <a href="index.html">Home</a>
			                </li>
			                <li className="active">sign up</li>
			              </ol>
			            </div>
			          </div>
			        </div>
			      </section>
			      
			      <section className="mainContent clearfix signUp">
			        <div className="container">
			          <div className="row">
			            <div className="col-sm-6 col-xs-12">
			              <div className="panel panel-default">
			                <div className="panel-heading"><h3>create an account</h3></div>
			                <div className="panel-body">
			                  <form onSubmit={this._onSubmitRegister.bind(this)}>
			                    <div className="form-group">
			                      <label htmlFor="">First Name</label>
			                      <input type="text" className="form-control" name="firstname" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <div className="form-group">
			                      <label htmlFor="">Last Name</label>
			                      <input type="text" className="form-control" name="lastname" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <div className="form-group">
			                      <label htmlFor="">Enter Email</label>
			                      <input type="email" className="form-control" name="email" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <div className="form-group">
			                      <label htmlFor="">Password</label>
			                      <input type="password" className="form-control" name="password" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <div className="form-group">
			                      <label htmlFor="">Re-enter Password</label>
			                      <input type="password" className="form-control" name="repassword" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
			                    <span style={{color: 'red'}}>{this.props.errorRegis}</span>
			                  </form>
			                </div>
			              </div>
			            </div>
			            <div className="col-sm-6 col-xs-12">
			              <div className="panel panel-default">
			                <div className="panel-heading"><h3>already registered?</h3></div>
			                <div className="panel-body">
			                  <form onSubmit={this._onSubmitLogin.bind(this)}>
			                    <div className="form-group">
			                      <label htmlFor="">Enter Email</label>
			                      <input type="email" className="form-control" name="login_email" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <div className="form-group">
			                      <label htmlFor="">Password</label>
			                      <input type="password" className="form-control" name="login_password" onChange={(event) => this.onHandleChange(event)} required/>
			                    </div>
			                    <button type="submit" className="btn btn-primary btn-block">log in</button>
			                    <span style={{color: 'red'}}>{this.props.errorLogin}</span>
			                  </form>  
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

const mapStateToProps = ({ auth }) => {
	const { email, password, errorLogin, errorRegis } = auth;
	console.log("ee", errorLogin);
	return {
		email,
		password,
		errorLogin,
		errorRegis
	};
};

export default connect(mapStateToProps, { loginUser, registerUser })(Registration);
