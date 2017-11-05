require('normalize.css/normalize.css');
import 'styles/index.scss';
import request from 'lib/fetch';
import React from 'react';
import Title from './title';
import List from './list';
import Cup from './cup';

const TOKEN = '8C107BD0CADD409AB5CE76B89714A475'
const DEFAULT_QUERY = {date: '2016-12-27', schoolGuid: 'F7127394-40A3-4934-9D8E-BDA27BA0AC78'}

const PAGE_SIZE = 10
const PARAM = {
   token: TOKEN,
   personType: 1,
   pageSize: PAGE_SIZE
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yestdayList: [],
      dayList: [],
      weekList: [],
      mounth: []
    }
    this.query = this.initQueryBody() || DEFAULT_QUERY
    PARAM.date = this.query.date
    PARAM.schoolGuid = this.query.schoolGuid
  }
  componentWillMount() {
    this.fetchDay();
    this.fetchWeek();
    this.fetchMouth();
    this.fetchYestday();
  }
  initRankData(list) {
    if (Array.isArray(list) && list.length) {
      return list.map(d => ({
        name: d.UserName,
        step: d.Steps,
        rank: Number(d.Ranks)
      }))
    }
    return [];
  }
  initQueryBody = () => {
    const searchs = window.location.search.replace('?', '').split('&')
    let body = {}
    searchs.forEach(d => {
      const query = d.split('=')
      body[query[0]] = query[1]
    })
    return body
  }
  fetchYestday() {
    // const url = `${HOST}`
    const params = Object.assign({pageSize: 3},PARAM)
    request('/steps/day', params).then(res => {
      if (res.Code == 0) {
        this.setState({yestdayList: this.initRankData(res.List)})
      }
    })
  }
  fetchDay() {
    // const url = `${HOST}`
    const params = Object.assign({},PARAM);
    request('/steps/day', params).then(res => {
      if (res.Code == 0) {
        this.setState({dayList: this.initRankData(res.List)})
      }
    })
  }
  fetchWeek() {
    // const url = `${HOST}`;
    const params = Object.assign({},PARAM)
    request('/steps/week', params).then(res => {
      if (res.Code == 0) {
        this.setState({weekList: this.initRankData(res.List)})
      }
    })
  }
  fetchMouth() {
    // const url = `${HOST}`;
    const params = Object.assign({},PARAM)
    request('/steps/month', params).then(res => {
      if (res.Code == 0) {
        this.setState({monthList: this.initRankData(res.List)})
      }
    })
  }
  render() {
    const {yestdayList, dayList, weekList, monthList } = this.state;
    return (
      <div className="sr-containter">
        <div className="sr-containter-left">
          <Title title="昨日排名" />
          <Cup dataSource={yestdayList} />
        </div>
        <div className="sr-containter-right">
           <Title title="教师日排名" />
           <List dataSource={dayList}  />
        </div>
        <div className="sr-containter-right">
           <Title title="教师周排名" />
           <List dataSource={weekList}  />
        </div>
        <div className="sr-containter-right">
           <Title title="教师月排名" />
           <List dataSource={monthList}  />
        </div>
      </div>
    );
  }
}

export default AppComponent;
