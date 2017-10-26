import React, { Component } from 'react';
import { MenuItem, DropDownMenu, TextField } from 'material-ui';
import uuid from 'uuid/v1';
import { string, arrayOf } from 'prop-types';

class SemanticForm extends Component {
  state = {
    selectedCategory: 1,
    category: '',
    title: '',
    body: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: uuid(),
      title: this.title.value,
      body: this.body.value,
      timestamp: new Date().toString(),
      voteScore: 1,
      author: 'Stan Lee',
      comments: [],
      deleted: false,
      category: this.category.value,
    };
    this.props.onAdd(post);
  };
  getMenuItems = () => {
    const { category, categories } = this.props;
    let list = ['Select category'];
    if (category.toLowerCase() === 'home') {
      list = list.concat(categories);
      const items = list.map((menuItem, index) =>
        <MenuItem key={menuItem} value={index + 1} primaryText={menuItem} />);
      return [...items];
    }
    return (
      <MenuItem
        key={category}
        value={1}
        primaryText={`Category: ${category}`}
      />
    );
  };
    handleSelectChange = (event, index, value) =>
      this.setState({ selectedCategory: value });
    handleInputChange = (e, ref) => {

    };
    render() {
      const styles = {
        container: {
          marginTop: '-1em',
        },
        customWidth: {
          width: 200,
          marginLeft: '-24px',
        },
      };
      return (
        <div style={styles.container}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                hintText="Enter title"
                floatingLabelText="Title"
                style={{ width: '80%' }}
                onChange={e => this.handleInputChange(e, 'title')}
              />
              <br />
              <TextField
                hintText="Enter body"
                floatingLabelText="Body"
                multiLine
                style={{ width: '80%' }}
                onChange={e => this.handleInputChange(e, 'body')}
              />
              <br />
              <DropDownMenu
                disabled={this.props.category !== 'home'}
                value={this.state.selectedCategory}
                className="category-list"
                style={styles.customWidth}
                autoWidth={false}
                onChange={this.handleSelectChange}
              >
                {this.getMenuItems()}
              </DropDownMenu>
            </div>
          </form>
        </div>
      );
    }
}

SemanticForm.propTypes = {
  category: string,
  categories: arrayOf(string),
};
SemanticForm.defaultProps = {
  category: 'home',
  categories: [],
};

export default SemanticForm;
