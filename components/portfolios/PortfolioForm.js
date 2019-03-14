import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortfolioInput from '../form/PortfolioInput';
import PortfolioDate from '../form/PortfolioDate';


const validateInputs = (values) => {
  let errors = {};


  Object.entries(values).forEach(([key, value]) => {
    if(!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`;
    }
  })

  const startDate = values.startDate;
  const endDate = values.endDate;

  if(startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannot be before start date!!';
  }

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
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" component={PortfolioInput} label="Title"/>
          <Field type="text" name="company" component={PortfolioInput} label="Company"/>
          <Field type="text" name="location" component={PortfolioInput} label="Location"/>
          <Field type="text" name="position" component={PortfolioInput} label="Position"/>
          <Field type="textarea" name="description" component={PortfolioInput} label="Description"/>
          <Field name="startDate" component={PortfolioDate} label="Start Date"/>
          <Field name="endDate" component={PortfolioDate} label="End Date" canBeDisabled={true}/>
          {
            props.error && 
            <Alert color="danger">
              {props.error}
            </Alert>
          }
          <Button color="success" size='lg' type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioForm;