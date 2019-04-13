import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'reactstrap';
import PortfolioInput from '../form/PortfolioInput';
import PortfolioDate from '../form/PortfolioDate';

import moment from 'moment';

const validateInputs = (values) => {
  let errors = {};
  
  Object.entries(values).forEach(([key, value]) => {
    if(!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`;
    }
  })

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if(startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End Date cannot be before start date!!';
  }

  return errors;
}

const PortfolioForm = ({initialValues, onSubmit, error}) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" component={PortfolioInput} label="Title"/>
          <Field type="text" name="company" component={PortfolioInput} label="Company"/>
          <Field type="text" name="location" component={PortfolioInput} label="Location"/>
          <Field type="text" name="position" component={PortfolioInput} label="Position"/>
          <Field type="textarea" name="description" component={PortfolioInput} label="Description"/>
          <Field name="startDate" component={PortfolioDate} label="Start Date" initialDate={initialValues.startDate}/>
          <Field name="endDate" component={PortfolioDate} label="End Date" canBeDisabled={true} initialDate={initialValues.endDate}/>
          {
            error && 
            <Alert color="danger">
              {error}
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