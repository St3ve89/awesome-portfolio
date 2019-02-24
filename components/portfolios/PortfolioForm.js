import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PortfolioInput from '../form/PortfolioInput';
import PortfolioDate from '../form/PortfolioDate';


const validateInputs = (values) => {
  let errors = {};


  Object.entries(values).forEach(([key, value]) => {
    if(!values[key]) {
      errors[key] = `Field ${key} is required!`
    }
  })

  return errors;
}

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
}

const PortfolioForm = (props) => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" component={PortfolioInput} label="Title"/>
          <Field type="text" name="company" component={PortfolioInput} label="Company"/>
          <Field type="text" name="location" component={PortfolioInput} label="Location"/>
          <Field type="text" name="position" component={PortfolioInput} label="Position"/>
          <Field type="textarea" name="description" component={PortfolioInput} label="Description"/>
          <Field name="startDate" component={PortfolioDate} label="Start Date"/>
          <Field name="endDate" component={PortfolioDate} label="End Date"/>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioForm;