import React, { useState, Fragment } from 'react';
import { Formik } from 'formik';
import { Button, Row, Col, Icon } from 'antd';
import * as Yup from 'yup';
import { LineProgress } from '..';
import BuyTicketFormStep from './BuyTicketFormStep';
import styles from './BuyTicketForm.module.scss';

const BuyTicketForm = () => {
  const initialValues = {
    performance: null,
    session: null,
    first_name: '',
    last_name: '',
    birthday: null,
    email: '',
    acceptRules: false,
    payment: {
      type: null,
      card: {
        number: '',
        valid_thru: '',
        name: '',
      },
    },
  };

  const [stepData, setStepData] = useState({
    step: 2,
    stepsCount: 2,
  });

  const Step1Schema = Yup.object().shape({
    performance: Yup.string()
      .required('Выберите событие')
      .nullable(),
    session: Yup.string()
      .required('Выберите время')
      .nullable(),
  });

  const Step2Schema = Yup.object().shape({
    first_name: Yup.string().required('Заполните имя'),
    last_name: Yup.string().required('Заполните фамилию'),
    email: Yup.string()
      .email('Заполните правильный емейл')
      .required('Заполните емейл'),
    birthday: Yup.string()
      .required('Заполните дату рождения')
      .nullable(),
    payment: Yup.object().shape({
      type: Yup.string()
        .required('Выберите способ оплаты')
        .nullable(),
    }),
    acceptRules: Yup.boolean().oneOf(
      [true],
      'Для совершения покупки необходимо принять правила',
    ),
  });

  const Step3Schema = Yup.object().shape({
    payment: Yup.object().shape({
      number: Yup.string().required('Заполните номер карты'),
      valid_thru: Yup.string().required('Заполните срок действия карты'),
      name: Yup.string().required('Заполните имя, фамилию владельца карты'),
    }),
  });

  const schemaArray = [Step1Schema, Step2Schema, Step3Schema];

  return (
    <div>
      <LineProgress stepData={stepData} />
      <Formik
        enableReinitialize
        validationSchema={schemaArray[stepData.step - 1]}
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          validateForm,
          setTouched,
          isValid,
          setFieldValue,
          setErrors,
          submitForm,
          setSubmitting,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <BuyTicketFormStep
              stepData={stepData}
              setStepData={setStepData}
              formikProps={{
                values,
                errors,
                handleChange,
                handleBlur,
                touched,
                setFieldValue,
                isValid,
                setSubmitting,
              }}
            />
            <Row
              type="flex"
              justify="space-between"
              style={{ marginTop: '30px' }}
            >
              <Col>
                {stepData.step > 1 && (
                  <Button
                    onClick={() => {
                      setStepData({ ...stepData, step: stepData.step - 1 });
                      setTouched({});
                      setErrors({});
                      setSubmitting(false);
                    }}
                  >
                    <Icon type="left" />
                    Назад
                  </Button>
                )}
              </Col>
              <Col>
                {stepData.stepsCount !== stepData.step ? (
                  <Button
                    disabled={stepData.stepsCount === stepData.step}
                    onClick={() => {
                      submitForm().then(() => {
                        if (isValid) {
                          setStepData({
                            ...stepData,
                            step: stepData.step + 1,
                          });

                          validateForm();
                          setTouched({});
                          setErrors({});
                          setSubmitting(false);
                        }
                      });
                    }}
                  >
                    Следующий шаг
                    <Icon type="right" />
                  </Button>
                ) : (
                  <Fragment>
                    <Button type="primary" disabled={isSubmitting}>
                      submit
                    </Button>
                    <Button type="danger" ghost disabled={isSubmitting}>
                      bad submit
                    </Button>
                  </Fragment>
                )}
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BuyTicketForm;
