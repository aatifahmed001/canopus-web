import React from 'react';
import { connect } from 'react-redux';
import { RenderLocaleLabel } from '../components';
import { LocaleKeys } from '../constants';
import { LocalStorage } from '../utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const PageView = ({ page }) => {
  var viewStyles = {
    gridcolumn: '2/3',
    gridrow: '2/3',
    border: '1px solid black'
  }
  return (
    <article style={viewStyles}>
    <h1>Article</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore commodi ratione pariatur eius et ullam odio temporibus corrupti autem atque quaerat soluta saepe, ex dolorum laboriosam dolore minus repudiandae. Iste! Odit velit amet quisquam ut
      placeat quia tempore molestiae consectetur ab facilis eius necessitatibus veniam autem, veritatis magnam magni ea tempora et. Perferendis molestiae cum saepe voluptas tenetur aperiam optio! Corporis officia consectetur ipsa explicabo ipsum debitis.
      Voluptate excepturi aspernatur ipsa recusandae aliquam tempore officiis ullam quis, enim eveniet magnam amet unde temporibus veniam, culpa reiciendis aliquid corrupti! Quaerat, magni.</p>
    <div class="flex-wrapper">
      <span class="image">test</span>
      <span class="image">test</span>
      <span class="image">test</span>
    </div>
  </article>
  )
}

const mapStateToProps = (state) => state.userReducer;

export default connect(mapStateToProps)(PageView)