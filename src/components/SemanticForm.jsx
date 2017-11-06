import React, { Component } from 'react';
import { MenuItem, DropDownMenu, TextField } from 'material-ui';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';
import uuid from 'uuid/v1';
import { string, arrayOf, shape, bool, func } from 'prop-types';

function FieldGroup({
  id, label, help, ...props
}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class SemanticForm extends Component {
  constructor(props) {
    super();
    this.mapCategories = props.categories.reduce((result, category, index) => {
      result[index + 2] = category;
      return result;
    }, {});
    this.state = {
      selectedCategory: 1,
      title: props.post.title,
      body: props.post.body.replace(/\n/g, ''),
      author: props.post.author,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let post = this.props.post;
    if (this.props.isEdit) {
      post.body = this.state.body;
      post.title = this.state.title;
    } else {
      const { category } = this.props;
      if (category.toLowerCase() === 'home') {
      }
      post = {
        id: uuid(),
        title: this.state.title,
        body: this.state.body,
        timestamp: new Date().getTime(),
        voteScore: 1,
        author: this.state.author,
        comments: [],
        deleted: false,
        category: (category.toLowerCase() === 'home') ? this.mapCategories[this.state.selectedCategory]:category,
      };
    }
    if (this.props.isEdit) {
      this.props.onEditSubmit(post);
    } else {
      this.props.onAdd(post);
    }
  };
  getMenuItems = () => {
    const { category, categories } = this.props;
    let list = ['Select category'];
    if (category.toLowerCase() === 'home') {
      list = list.concat(categories);
      const items = list.map((menuItem, index) => {
        if (index === 0) {
          return (
            <MenuItem
              key={menuItem}
              disabled
              value={index + 1}
              primaryText={menuItem}
            />
          );
        }

        return (
          <MenuItem key={menuItem} value={index + 1} primaryText={menuItem} />
        );
      });
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
  handleSelectChange = (event, index, value) => {
    this.setState({ selectedCategory: value });
  };
  handleInputChange = (e, ref) => {
    const { value } = e.target;
    this.setState({ [ref]: value });
  };

  render() {
    /* eslint-disable one-var */
    // const { title, body } = this.props.post;

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
            <div style={{ marginTop: '1em' }}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="Title"
                placeholder="Enter title"
                value={this.state.title}
                onChange={e => this.handleInputChange(e, 'title')}
              />
            </div>
            {/* <TextField
              value={title}
              floatingLabelText="Title"
              style={{ width: '80%' }}
              onChange={e => this.handleInputChange(e, 'title')}
            /> */}
            <br />
            {/* <TextField
              value={body}
              floatingLabelText="Body"
              multiLine
              style={{ width: '80%' }}
              onChange={e => this.handleInputChange(e, 'body')}
              rows={10}
            /> */}
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter body"
                value={this.state.body}
                onChange={e => this.handleInputChange(e, 'body')}
                rows="10"
                cols="130"
              />
            </FormGroup>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Author"
              placeholder="Enter author"
              value={this.state.author}
              onChange={e => this.handleInputChange(e, 'author')}
            />
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
            <div className="container">
              <div
                className="btn-group row justify-content-center"
                role="group"
                aria-label="Basic example"
              >
                <button
                  onClick={this.onSubmit}
                  type="button"
                  className="btn btn-primary p-3"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.props.onModalClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SemanticForm.propTypes = {
  category: string,
  categories: arrayOf(string),
  post: shape({
    title: string,
    body: string,
  }),
  isEdit: bool,
  onEditSubmit: func,
  onAdd: func,
};
SemanticForm.defaultProps = {
  category: 'home',
  categories: [],
  post: { title: '', body: '' },
  isEdit: false,
  onEditSubmit: f => f,
  onAdd: f => f,
};

export default SemanticForm;
