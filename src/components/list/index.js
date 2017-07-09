import React, { Component } from 'react';
import './styles.scss';
class List extends Component {
  constructor(props) {
    super(props)
  }
  setRank = (rank) => {
    switch(rank) {
      case 1:
      return (<i role='gold' />);
      case 2:
      return (<i role='silver' />);
      case 3:
      return (<i role='copper' />);
      default:
      return rank;
    }
  }
  renderList = () => {
    const { dataSource } = this.props;
    if (Array.isArray(dataSource) && dataSource.length > 0) {
      return dataSource.map((d,i) => (
        <li className="sr-list-item" key={i}>
          <div>{d.name}</div>
          <div>{d.step}步</div>
          <div>{this.setRank(d.rank)}</div>
        </li>
      ))
    }
    return null;
  }
  render() {
    return (
      <div className="sr-list">
        <ul>
          <li className="sr-list-item" key={-1}>
            <div>姓名</div>
            <div>步数</div>
            <div>排名</div>
          </li>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

export default List;