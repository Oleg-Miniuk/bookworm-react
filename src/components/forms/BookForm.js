import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Segment, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends React.Component {
  state = {
    data: {
      goodreadsId: '',
      title: '',
      authors: '',
      cover: '',
      pages: 0
    },
    covers: [],
    index: 0,
    loading: false,
    errors: {}
  };

  static getDerivedStateFromProps(nextProps) {
    const {
      book: { goodreadsId, title, authors, covers, pages }
    } = nextProps;
    return {
      data: { goodreadsId, title, authors, cover: covers[0], pages },
      covers
    };
  }

  onChange = e => {
    if (e) {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      this.setState(prevData => ({
        data: { ...prevData.data, [fieldName]: fieldValue }
      }));
    }
  };

  onChangeNumber = e =>
    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    }));

  onSubmit = e => {
    e.preventDefault();
    const { data = {} } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState(prevState => ({
      index: newIndex,
      data: { ...prevState.data, cover: covers[newIndex] }
    }));
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Can't be blank";
    if (!data.authors) errors.authors = "Can't be blank";
    if (!data.pages) errors.pages = "Can't be blank";
    return errors;
  };

  render() {
    const { errors = {}, data = {}, loading = false } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book Authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Pages</label>
                  <input
                    disabled={data.pages === undefined}
                    type="text"
                    id="pages"
                    name="pages"
                    value={data.pages !== undefined ? data.pages : 'Loading...'}
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Another cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number
  }).isRequired
};

export default BookForm;
