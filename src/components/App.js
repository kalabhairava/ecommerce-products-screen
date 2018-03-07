import React from 'react';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import Product from './Product.js';

const DATA_URL =
	'https://www.wooplr.com/rest/v2/advancedlookup/productsnew/top?count=20&fromCache=true';
const BASE_IMAGE_URL =
	'https://res.wooplr.com/image/upload/f_auto,q_auto,fl_lossy,w_200,c_fill,ar_3:4/';
const BASE_WEBLINK_URL = 'https://www.wooplr.com';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			count: 1,
			loading: true
		};
	}

	render() {
		return (
			<OverlayLoader
				color={'red'} // default is white
				loader="ScaleLoader" // check below for more loaders
				text="Loading... Please wait!"
				active={this.state.loading}
				backgroundColor={'black'} // default is black
				opacity=".4" // default is .9
			>
				<div>
					{this.state.products.map(product => (
						<Product key={product.id} {...product} />
					))}
					<button
						onClick={() => {
							this.setState({ loading: true });

							let count = this.state.count + 1;
							this.fetchData(count).then(newProducts => {
								let products = [...this.state.products, ...newProducts];
								this.setState(() => ({ products, count, loading: false }));
							});
						}}
					>
						Load More
					</button>
				</div>
			</OverlayLoader>
		);
	}

	componentDidMount() {
		this.fetchData(this.state.count).then(products =>
			this.setState(() => ({ products, loading: false }))
		);
	}

	fetchData(page) {
		const fetchUrl = `${DATA_URL}&pageNumber=${page}`;

		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		};

		const body = JSON.stringify({
			newFilters: [],
			sort_by: ['relevance']
		});

		return fetch(fetchUrl, {
			method: 'POST',
			headers,
			body
		})
			.then(response => response.json())
			.then(response =>
				response
					.filter(item => item.id !== -2) // remove the search metadata object from the list of products
					.map(item => item.ecommerceProductJAXB)
					.map(
						// get only the properties you need
						({
							id,
							name,
							description,
							image_pid,
							salesPrice,
							retailPrice,
							discount,
							color,
							size,
							availableSizes,
							stock,
							available,
							category,
							subCategory,
							gender,
							webLink
						}) => ({
							id,
							name,
							description,
							image_pid: image_pid.map(imageUrl =>
								BASE_IMAGE_URL.concat(imageUrl)
							),
							salesPrice,
							retailPrice,
							discount,
							color,
							size,
							availableSizes,
							stock,
							available,
							category,
							subCategory,
							gender,
							webLink: BASE_WEBLINK_URL.concat(webLink)
						})
					)
			);
	}
}

export default App;
