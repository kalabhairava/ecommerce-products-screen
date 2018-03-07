import React from 'react';

class Images extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentImgSrc: this.props.images[0]
		};

		this.startImageTransitions = this.startImageTransitions.bind(this);
		this.stopImageTransitions = this.stopImageTransitions.bind(this);
	}

	render() {
		const { name } = this.props;

		return (
			<img
				src={this.state.currentImgSrc}
				alt={name}
				onMouseOver={this.startImageTransitions}
				onMouseOut={this.stopImageTransitions}
			/>
		);
	}

	startImageTransitions() {
		console.log('mouse enter');
		// let i = 0,
		// 	length = this.props.images.length;

		// while (i < length) {
		// 	this.changeImageSource(this.props.images[i]);
		// 	if (++i === length) {
		// 		i = 0;
		// 	}
		// }
	}

	changeImageSource(newSource) {
		console.log(newSource);
		this.setState(() => ({ currentImgSrc: newSource }));
	}

	stopImageTransitions() {
		console.log('mouseleave');
	}
}

export default Images;
