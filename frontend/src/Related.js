import React, { Component } from 'react';

class Related extends React.Component  {
    constructor(props){
      super(props)
      var text;
      if(this.props.title=="asdf"){
      this.state={
        name:"problem1 is a problem ~~"
      }
      }
    }

   
    
    render() {
      return (
        <div class="related">
      <h2>Related Tab</h2>
        <div class="video">
            관련영상 <br/>
            <img src={require('./vid.png')} />
            <br/>
        </div>
         <div>
            추천 문제
         </div>
            <div>
                학습 자료
            </div>
      </div>
      
      
      
      
      );
    }
  }
  export default Related;