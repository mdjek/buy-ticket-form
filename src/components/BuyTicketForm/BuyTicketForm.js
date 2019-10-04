import React, { useState, Fragment, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, Row, Col, Icon } from 'antd';
import * as Yup from 'yup';
import BuyProgress from '../BuyProgress/BuyProgress';
import BuyTicketFormStep from './BuyTicketFormStep';
import styles from './BuyTicketForm.module.scss';

const btnStepText = ['Перейти к покупке билета', 'Заполнить данные карты'];

const BuyTicketForm = () => {
  const initialValues = {
    performance: null,
    performanceTitle: '',
    session: null,
    first_name: '',
    last_name: '',
    birthday: null,
    email: '',
    acceptRules: false,
    payment: {
      type: 'card',
      card: {
        number: '',
        valid_thru: '',
        name: '',
      },
    },
  };

  const defaultStepData = {
    step: 1,
    stepsCount: 3,
  };

  const getInitialStepData = () => {
    const localStepData = JSON.parse(localStorage.getItem('buyTicketStepData'));
    return { ...defaultStepData, ...localStepData };
  };

  const [stepData, setStepData] = useState(getInitialStepData());
  const [isInitialValid, setInitialValid] = useState(false);

  const getLocalInitialValues = () => {
    const buyTicketFormData = JSON.parse(
      localStorage.getItem('buyTicketFormData'),
    );
    return { ...initialValues, ...buyTicketFormData };
  };

  useEffect(() => {
    localStorage.setItem('buyTicketStepData', JSON.stringify(stepData));
  }, [stepData]);

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
      card: Yup.object().shape({
        number: Yup.string()
          .matches(/^[0-9]{16}$/, 'Заполните верно номер карты')
          .required('Заполните номер карты'),
        valid_thru: Yup.string()
          .matches(/^[0-9]{2}\/[0-9]{2}/, 'Заполните верно срок действия карты')
          .required('Заполните срок действия карты'),
        name: Yup.string().required('Заполните имя, фамилию владельца карты'),
      }),
    }),
  });

  const schemaArray = [Step1Schema, Step2Schema, Step3Schema];

  useEffect(() => {
    const buyTicketFormData = JSON.parse(
      localStorage.getItem('buyTicketFormData'),
    );

    schemaArray[stepData.step - 1]
      .isValid({ ...initialValues, ...buyTicketFormData })
      .then((valid) => {
        setInitialValid(valid);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <div>
      <Formik
        validationSchema={schemaArray[stepData.step - 1]}
        initialValues={getLocalInitialValues()}
        isInitialValid={isInitialValid}
        initialErrors
        onSubmit={(values, { setSubmitting }) => {
          if (stepData.step === stepData.stepsCount) {
            setStepData({ ...stepData, finished: true });
            localStorage.removeItem('buyTicketStepData');
            localStorage.removeItem('buyTicketFormData');

            const {
              acceptRules,
              performance,
              performanceTitle,
              ...valuesForm
            } = values;
            console.log(valuesForm);
          }

          setSubmitting(false);
        }}
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
            <BuyProgress stepData={stepData} />
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
                {!stepData.finished && stepData.step > 1 && (
                  <Button
                    className={styles.prev}
                    onClick={() => {
                      setStepData({ ...stepData, step: stepData.step - 1 });
                      setTouched({});
                      setErrors({});
                    }}
                  >
                    <Icon type="left" />
                    <span className={styles.text}>Назад</span>
                  </Button>
                )}
              </Col>
              <Col>
                {!stepData.finished && stepData.stepsCount !== stepData.step ? (
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
                        }
                      });
                    }}
                  >
                    {btnStepText[stepData.step - 1]}
                    <Icon type="right" />
                  </Button>
                ) : (
                  !stepData.finished && (
                    <Fragment>
                      <button
                        type="submit"
                        className="ant-btn ant-btn-primary"
                        disabled={isSubmitting}
                      >
                        Купить билет
                      </button>
                    </Fragment>
                  )
                )}
              </Col>
            </Row>
            {stepData.finished && (
              <Row type="flex" justify="flex-start">
                <Col>
                  <Button
                    className="ant-btn ant-btn-primary"
                    onClick={() => {
                      setStepData({ ...defaultStepData });
                      setTouched({});
                      setErrors({});
                    }}
                  >
                    <span className={styles.text}>Купить ещё билет</span>
                  </Button>
                </Col>
              </Row>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BuyTicketForm;
