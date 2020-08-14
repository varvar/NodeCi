// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class BlogFormReview extends Component {
  state = { file: null };

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div className="card-action">
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  renderAddImageButton() {
    return (
      <div>
        <h5>Add an Image</h5>
        <div className="file-field input-field">
          <div className="btn-floating waves-effect waves-light red">
            <i className="material-icons">image</i>
            <input
              type="file"
              accept="image/*"
              onChange={this.onFileChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();

    const { submitBlog, history, formValues } = this.props;

    submitBlog(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m12">
          <div className="card">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="card-content">
                <h5>Please confirm your entries</h5>
                {this.renderFields()}
                {this.renderAddImageButton()}
              </div>
              {this.renderButtons()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
