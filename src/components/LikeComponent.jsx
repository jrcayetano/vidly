import React, { Component } from 'react';
class LikeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isActive: false
    }
  }
  render() { 
    let likeIcon = this.isActive ? 'fa fa-heart' : 'fa-heart-0';
    return (  
      <i className={likeIcon} aria-hidden="true" onClick={() => this.setState({isActive: !this.state.isActive})}></i>
    );
  }
}
 
export default LikeComponent;