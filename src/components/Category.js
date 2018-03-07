import React from 'react';

function Category(props) {
	const { webLink, category, subCategory } = props;

	return (
		<div>
			<div>webLink: {webLink}</div>
			<div>category: {category}</div>
			<div>subCategory: {subCategory}</div>
		</div>
	);
}

export default Category;
