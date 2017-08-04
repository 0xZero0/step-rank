require('normalize.css/normalize.css');
import 'styles/index.scss';
import fetchAjax from 'lib/fetch';
import React from 'react';
import Title from './title';
import List from './list';

const data = [
    {name: '赵勇',step: 3000, rank: 1},
    {name: '赵勇',step: 2600, rank: 2},
    {name: '赵勇',step: 2100, rank: 3},
    {name: '赵勇',step: 1800, rank: 4},
    {name: '赵勇',step: 1000, rank: 5},
    {name: '赵勇',step: 800, rank: 6},
    {name: '赵勇',step: 600, rank: 7},
    {name: '赵勇',step: 1000, rank: 8},
    {name: '赵勇',step: 1000, rank: 9}
    ];
class AppComponent extends React.Component {
  componentWillMount() {
    // const url = 'http://schoolinkapi.ezooo.cn:81/API/Steps/GetStepRanksByDay.ashx';
    // const url = 'http://schoolinkapi.ezooo.cn:81/API/Steps/GetStepRanksByDay.ashx?token=8C107BD0CADD409AB5CE76B89714A475&personType=1&schoolGuid=F7127394-40A3-4934-9D8E-BDA27BA0AC78&date=2016-12-27&pageSize=10'
   const url = 'http://localhost:3000/steps/day'
    const params = {
      token: '8C107BD0CADD409AB5CE76B89714A475',
      personType: 1,
      schoolGuid: 'F7127394-40A3-4934-9D8E-BDA27BA0AC78',
      date: '2016-12-27',
      pageSize: 10
    }
    fetchAjax(url, params).then(res => {
      console.log(res,'00000000000000000');
    })
  }
  render() {
    return (
      <div className="sr-containter">
        <div className="sr-containter-left">
          <Title title="昨日排名" />
          <div className="cup-box">
            <div className="top">
              <div className="cup cup-gold">
                <div className="frist">
                  <span>贾永宁</span>
                  <span>27862步</span>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-left">
                <div className="cup cup-silver">
                   <div>
                    <span>王喜东</span>
                    <span>27862步</span>
                   </div>                
                </div>
              </div>
              <div className="bottom-right">
                <div className="cup cup-copper">
                  <div>
                    <span>王喜东</span>
                    <span>27862步</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sr-containter-right">
           <Title title="教师日排名" />
           <List dataSource={data}  />
        </div>
        <div className="sr-containter-right">
           <Title title="教师周排名" />
           <List dataSource={data}  />
        </div>
        <div className="sr-containter-right">
           <Title title="教师月排名" />
           <List dataSource={data}  />
        </div>
      </div>
    );
  }
}

export default AppComponent;
