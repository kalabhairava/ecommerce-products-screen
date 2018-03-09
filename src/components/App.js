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
			filteredProducts: [],
			count: 1,
			loading: true,
			hasError: false,
			columns: 3,
			filters: {
				gender: '',
				size: '',
				color: ''
			}
		};

		this.fetchData = this.fetchData.bind(this);
		this.updateProducts = this.updateProducts.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	// updateColor = event =>
	// 	this.setState({
	// 		filters: { ...this.state.filters, color: event.target.value }
	// 	});

	updateGender = gender => {
		console.log('update gender called');
		let filteredProducts = this.filterByGender(this.state.products, gender);
		this.setState({
			filters: { ...this.state.filters, gender },
			filteredProducts
		});
	};

	updateSize = size => {
		let filteredProducts = this.filterBySize(this.state.products, size);

		this.setState(() => ({
			filters: { ...this.state.filters, size },
			filteredProducts
		}));
	};

	render() {
		return (
			<OverlayLoader
				color={'black'}
				loader="ScaleLoader"
				text="Loading more products... Please wait!"
				active={this.state.loading}
				backgroundColor={'black'}
				opacity=".3"
			>
				<div className="page-title">Buy on my Wooplr Store!</div>
				<div className="filter-bar">
					<div id="sizeFilter" className="button-group">
						<button
							className={this.state.filters.size === 'S' ? 'active' : ''}
							onClick={() => this.updateSize('S')}
						>
							S
						</button>
						<button
							className={this.state.filters.size === 'M' ? 'active' : ''}
							onClick={() => this.updateSize('M')}
						>
							M
						</button>
						<button
							className={this.state.filters.size === 'L' ? 'active' : ''}
							onClick={() => this.updateSize('L')}
						>
							L
						</button>
						<button
							className={this.state.filters.size === 'XL' ? 'active' : ''}
							onClick={() => this.updateSize('XL')}
						>
							XL
						</button>
						<button
							className={this.state.filters.size === 'XXL' ? 'active' : ''}
							onClick={() => this.updateSize('XXL')}
						>
							XXL
						</button>
					</div>
					{/*
          <div id="colorFilter" className="color">
            <label htmlFor="color">Color: </label>
            <input
              name="color"
              className="color__input"
              type="text"
              value={this.state.filters.color}
              onChange={this.updateColor}
            />
          </div>*/}
					<div id="genderFilter" className="gender-selector">
						<button
							onClick={() => this.updateGender('male')}
							className={this.state.filters.gender === 'male' ? 'active' : ''}
						>
							Male
						</button>
						<button
							onClick={() => this.updateGender('female')}
							className={this.state.filters.gender === 'female' ? 'active' : ''}
						>
							Female
						</button>
					</div>
					<div id="layoutOptions" className="layout-selector">
						<button
							onClick={() => this.setState({ columns: 3 })}
							className={this.state.columns === 3 ? 'active' : ''}
						>
							3 Columns
						</button>
						<button
							onClick={() => this.setState({ columns: 5 })}
							className={this.state.columns === 5 ? 'active' : ''}
						>
							5 Columns
						</button>
					</div>
				</div>

				<div className="row no-negative-margin">
					{this.state.hasError ? (
						<div className="error">
							<p>
								Unexpected error while fetching data. Please try again later
							</p>
							<p>
								Note to developer: No response or response is an empty array
							</p>
						</div>
					) : (
						<div />
					)}
					{this.state.filteredProducts.map(product => (
						<Product
							key={product.id}
							{...product}
							columns={this.state.columns}
						/>
					))}
				</div>
			</OverlayLoader>
		);
	}

	componentDidMount() {
		this.fetchData(this.state.count).then((products = []) => {
			let hasError = products.length === 0;

			this.setState(() => ({
				products,
				filteredProducts: products,
				loading: false,
				hasError
			}));
		});

		window.addEventListener('scroll', this.handleScroll);
		this.documentObj = document.documentElement;
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
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

	updateProducts() {
		this.setState({ loading: true });

		let count = this.state.count + 1;
		this.fetchData(count).then(newProducts => {
			let products = [...this.state.products, ...newProducts];
			let filteredProducts = this.filterProducts(products, this.state.filters);
			this.setState(() => ({
				products,
				filteredProducts,
				count,
				loading: false
			}));
		});
	}

	handleScroll() {
		var offset = this.documentObj.scrollTop + window.innerHeight;
		var height = this.documentObj.offsetHeight;

		if (offset >= height) {
			this.updateProducts();
		}
	}

	filterProducts(products, filter) {
		console.log('filterproducts', products, filter);
		let filteredProducts = this.filterBySize(products, filter.size);
		filteredProducts = this.filterByGender(filteredProducts, filter.gender);
		return filteredProducts;
	}

	filterBySize(products, size) {
		console.log('filterbysize', products, size);
		return size
			? products.filter(product => product.availableSizes.includes(size))
			: products;
	}

	filterByGender(products, gender) {
		return gender
			? products.filter(product => product.gender === gender)
			: products;
	}
}

export default App;
