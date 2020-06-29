import React from 'react';
import { connect } from 'react-redux';

const TitleBar = ({children}) => {
    var titleBarStyle = {
      gridcolumn: 1/3,
      gridrow: 1/2,
      backgroundcolor: '#96D1C7'
    };
    
    return (
      <header style={titleBarStyle}>
        TTTTTTTTTTTTTTTTTTT
      </header>
    )
  }

  const mapStateToProps = (state) => state.userReducer;
export default connect(mapStateToProps)(TitleBar)
  