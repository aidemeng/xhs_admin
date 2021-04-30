import React from 'react';
import { render } from 'react-dom';
import {Element} from 'react-scroll'



export default class Section extends React.Component {
 
  render() {
    return (
      <div>
          <Element 
            className="element"  
            style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            backgroundColor: '#ededed',
            fontSize: 45,
            borderTop: '1px solid #000',
            paddingTop: '55px',
            paddingLeft: '10px',
          }}>
              <Element style={{
                marginBottom: '200px'
              }}>
                first element inside container
              </Element>
              <Element style={{
                marginBottom: '200px'
              }}>
                second element inside container
              </Element>
          </Element>
          <style jsx>{`
          .element {
            height: 1000px;
            background-color: #ededed;
            font-size: 45px;
            border-top: 1px solid #000;
            padding-top: 55px;
            padding-left: 10px;
          }
        `}</style>
      </div>
    );
  }
};