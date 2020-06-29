import React from "react";
import {
        WidthProvider,
        Responsive
      } from "react-grid-layout";

import Card from './card'
import Config from '../services/config';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
    this.state = { width: window.innerWidth, height: window.innerHeight };
    this.state.dashletConfig = new Config().dashLetConfig();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {

    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onDrop = elemParams => {
    alert(`Element parameters: ${JSON.stringify(elemParams)}`);
  };

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 9, sm: 9, xs: 6, xxs: 3 }}
          rowHeight={(this.state.height - 80) / 3}
          onLayoutChange = {function() {}}
          layouts={this.state.layouts}
          onDrop={this.onDrop}
          measureBeforeMount={false}
          useCSSTransforms={false}
          compactType={'vertical'}
          preventCollision={false}
          draggableHandle= '.drag-handle'
        >
          <div key="profile" data-grid={{ w: 3, h: 1, x: 0, y: 0, minW: 2, minH: 1, static: false }}>
            --------Profile----------
              </div>
              <div key="timeline" data-grid={{ w: 3, h: 2, x: 0, y: 1, minW: 2, minH: 1, static: true }}>
            --------Timeline----------
              </div>
          {this.state.dashletConfig.map(function (dash, index) {
            return <div key={'dashlet_' + index + '_' + dash.name}
              data-grid={{ w: 3, h: 1, x: ((index%3)+1)*3, y: Math.floor(index/3),  minW: 3, minH: 1, static: false }}>
              <Card key={'dashlet_' + index + '_' + dash.name} item={dash}></Card>
            </div>
          })}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const getCards = () => {
  return [
    {
      title: 'Allergies',
      icon: '',
      apiUrl: '',
    }
  ]
}


function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}