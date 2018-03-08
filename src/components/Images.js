import React from 'react';
import Lazyload from 'react-lazyload';

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
      <Lazyload once height={200}>
        <img
          src={this.state.currentImgSrc}
          alt={name}
          onMouseOver={this.startImageTransitions}
          onMouseOut={this.stopImageTransitions}
        />
      </Lazyload>
    );
  }

  startImageTransitions() {
    let i = 1;

    if (this.props.images.length > 1) {
      this.intervalId = setInterval(() => {
        this.changeImageSource(i++);
      }, 1000);
    }
  }

  changeImageSource(i) {
    let index = i % this.props.images.length;
    // console.log('new source', i, index, this.props.images[index]);
    this.setState(() => ({ currentImgSrc: this.props.images[index] }));
  }

  stopImageTransitions() {
    // console.log('mouseleave');
    clearInterval(this.intervalId);
    // this.setState(() => ({ currentImgSrc: this.props.images[0] }));
  }
}

export default Images;
