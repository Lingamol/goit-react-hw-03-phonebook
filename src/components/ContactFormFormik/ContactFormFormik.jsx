import PropTypes from 'prop-types';
import { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  FormContact,
  FormInputLabel,
  FormInput,
  FormBtn,
  FormErrorMessage,
} from './ContactFormFormik.styled';

class ContactFormFormik extends Component {
  //   state = {
  //     name: '',
  //     number: '',
  //   };
  //   //   nameInpuId = shortid.generate();
  //   numberInputId = shortid.generate();
  //   handleInputChange = event => {
  //     const { name, value } = event.currentTarget;
  //     this.setState({
  //       [name]: value,
  //     });
  //   };
  //   handleSubmit = event => {
  //     event.preventDefault();
  //     // console.log('name:', this.state.name);
  //     // console.log('number:', this.state.number);
  //     this.props.onSubmit(this.state);
  //     this.reset();
  //   };
  //   reset = () => {
  //     this.setState({ name: '', number: '' });
  //   };
  initialValues = { name: '', number: '' };

  handleOnSubmit = (values, { resetForm }) => {
    // console.log('values', values);
    // console.log('actions', actions);
    this.props.onSubmit(values);
    resetForm();
  };

  schema = yup.object().shape({
    name: yup
      .string()
      .max(20)
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    number: yup
      .string()
      .max(10)
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required(),
  });

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.schema}
        onSubmit={this.handleOnSubmit}
      >
        <FormContact>
          <FormInputLabel htmlFor={this.nameInpuId}>
            Name
            <FormInput type="text" name="name" placeholder="Enter name" />
            <ErrorMessage name="name" component={FormErrorMessage} />
          </FormInputLabel>
          <FormInputLabel htmlFor={this.numberInputId}>
            Number
            <FormInput
              type="tel"
              name="number"
              placeholder="Enter phone number"
            />
            <ErrorMessage name="number" component={FormErrorMessage} />
          </FormInputLabel>
          <FormBtn type="submit">Add contact</FormBtn>
        </FormContact>
      </Formik>
    );
  }
}
export default ContactFormFormik;
ContactFormFormik.propTypes = { onSubmit: PropTypes.func.isRequired };
