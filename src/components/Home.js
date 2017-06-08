import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import { productFetchCategory, productFetchBanner } from '../actions';

import Header from './element/Header';
import Banner from './element/Banner';
import Footer from './element/Footer';
import Feature from './element/Feature';

class Home extends Component {
	componentWillMount(){
		this.props.productFetchCategory();
		this.props.productFetchBanner();
	}

	// componentWillReceiveProps(nextProps) {
	// 	console.log("nextProps", nextProps);
	// }

	render() {
		return (
			<div>
				<Header navHome="active" navAccount="dropdown" />
				<Banner banners={this.props.banners}/>
				<Feature categories={this.props.categories}/>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({product}) => {
	const { categories, banners } = product;
	return {
		categories, 
		banners
	};
};

export default connect(mapStateToProps, {
	productFetchCategory, productFetchBanner
})(Home);