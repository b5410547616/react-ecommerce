import React, { Component } from 'react';

export default class Pageheader extends Component {

	render() {
		return (
			<section className="lightSection clearfix pageHeader">
		        <div className="container">
		          <div className="row">
		            <div className="col-xs-6">
		              <div className="page-title">
		                <h2>{this.props.title}</h2>
		              </div>
		            </div>
		            <div className="col-xs-6">
		              <ol className="breadcrumb pull-right">
		                <li>
		                  <a href="/">Home</a>
		                </li>
		                <li className="active">{this.props.title}</li>
		              </ol>
		            </div>
		          </div>
		        </div>
		    </section>
		);
	}
}