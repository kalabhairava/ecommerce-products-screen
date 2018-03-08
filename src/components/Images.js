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
    let i = 0;
    this.intervalId = setInterval(() => {
      this.changeImageSource(i++);
    }, 1500);
  }

  changeImageSource(i) {
    let index = i % this.props.images.length;
    console.log('new source', i, index, this.props.images[index]);
    this.setState(() => ({ currentImgSrc: this.props.images[index] }));
  }

  stopImageTransitions() {
    console.log('mouseleave');
    clearInterval(this.intervalId);
  }
}

export default Images;
