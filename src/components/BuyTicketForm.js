import React, { useState, Fragment } from 'react';
import { Formik } from 'formik';
import { Button, Row, Col, Select, Checkbox, Icon } from 'antd';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { InputForm, SelectForm, DatePickerForm } from './formControls';
import { LineProgress } from '.';
import styles from './BuyTicketForm.module.scss';
import moment from 'moment';

const BuyTicketForm = () => {
  const initialValues = {
    performance: null,
    session: null,
    first_name: '',
    last_name: '',
    birthday: null,
    email: '',
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

  const { Option } = Select;

  const Step1Schema = Yup.object().shape({
    performance: Yup.string().required('Выберите событие').nullable(),
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
  });

  const Step3Schema = Yup.object().shape({
    payment: Yup.object().shape({
      number: Yup.string().required('Заполните номер карты'),
      valid_thru: Yup.string().required('Заполните срок действия карты'),
      name: Yup.string().required('Заполните имя, фамилию владельца карты'),
    }),
  });

  const schemaArray = [Step1Schema, Step2Schema, Step3Schema];

  const renderStep = (step, data) => {
    const {
      errors,
      handleChange,
      handleBlur,
      touched,
      setFieldValue,
      values,
    } = data;

    console.log(values);
    console.log(errors);

    const handleSelectTypePayment = (value) => {
      let stepsCount;

      if (value === 'card') {
        stepsCount = stepData.stepsCount + 1;
      } else if (stepData.stepsCount > 2) {
        stepsCount = stepData.stepsCount - 1;
      } else {
        stepsCount = stepData.stepsCount;
      }

      setStepData({
        ...stepData,
        stepsCount,
      });

      setFieldValue('payment.type', value);
    };

    switch (step) {
      case 2:
        return (
          <Fragment>
            <h3>Данные пользователя</h3>
            <p className={styles.required}>Все поля обязательны</p>
            <Row>
              <Col>
                <InputForm
                  name="first_name"
                  placeholder="Имя"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.first_name && errors.first_name}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <InputForm
                  name="last_name"
                  placeholder="Фамилия"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.last_name && errors.last_name}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <InputForm
                  type="email"
                  name="email"
                  placeholder="user@mail.ru"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <DatePickerForm
                  name="birthday"
                  value={values.birthday && moment(values.birthday, 'YYYY-MM-DD')}
                  style={{ width: '100%' }}
                  handleChange={setFieldValue}
                  error={touched.birthday && errors.birthday}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Select
                  name="payment.type"
                  placeholder="Выберите способ оплаты"
                  value={values.payment.type || undefined}
                  onChange={handleSelectTypePayment}
                >
                  <Option value="card">Оплатить картой</Option>
                  <Option value="cash">На месте</Option>
                </Select>
                {errors.payment &&
                  errors.payment.type &&
                  touched.payment &&
                  touched.payment.type(
                    <span className={styles.error}>{errors.payment.type}</span>,
                  )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Checkbox name="accept">Согласен с условиями</Checkbox>
              </Col>
            </Row>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <h3>Данные карты</h3>
            <p className={styles.required}>Все поля обязательны</p>
            <Row>
              <Col>
                <label>
                  <div className="caption">Номер карты</div>
                  <InputMask
                    name="payment.card.number"
                    type="text"
                    className="ant-input"
                    placeholder="0000 0000 0000 00000"
                    mask="9999 9999 9999 9999"
                    size={20}
                    value={values.payment.card.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
                <div>
                  {errors.payment &&
                    errors.payment.card &&
                    errors.payment.card.number &&
                    touched.payment &&
                    touched.payment.card &&
                    touched.payment.number && (
                      <span className={styles.error}>
                        {errors.payment.card.number}
                      </span>
                    )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <label>
                  <div className="caption">Действует до</div>
                  <InputMask
                    name="payment.card.valid_thru"
                    type="text"
                    className="ant-input"
                    placeholder="00/00"
                    mask="99/99"
                    size={4}
                    value={values.payment.card.valid_thru}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.payment &&
                      errors.payment.card &&
                      errors.payment.card.valid_thru &&
                      touched.payment &&
                      touched.payment.card &&
                      touched.payment.card.valid_thru && (
                        <span className={styles.error}>
                          {errors.payment.card.valid_thru}
                        </span>
                      )}
                  </div>
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Владелец карты</div>
                  <InputMask
                    name="payment.card.name"
                    type="text"
                    className="ant-input"
                    placeholder="IVANOV IVAN"
                    maskChar=""
                    mask="AAAAAAAAAAAAAAAAAAAAAA"
                    formatChars={{
                      A: '[A-Za-z ]',
                    }}
                    value={values.payment.card.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.payment &&
                      errors.payment.card &&
                      errors.payment.card.name &&
                      touched.payment &&
                      touched.payment.card &&
                      touched.payment.card.name && (
                        <span className={styles.error}>
                          {errors.payment.card.name}
                        </span>
                      )}
                  </div>
                </label>
              </Col>
            </Row>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <h3>Выбрать событие</h3>
            <p className={styles.required}>Все поля обязательны</p>
            <Row>
              <Col>
                <label>
                  <div className="caption">Спектакль</div>
                  <SelectForm
                    name="performance"
                    placeholder="Выберите событие"
                    value={values.performance}
                    handleChange={setFieldValue}
                    error={touched.performance && errors.performance}
                  >
                    <Option value="card">aaa</Option>
                    <Option value="cash">bbb</Option>
                  </SelectForm>
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Расписание</div>
                  <SelectForm
                    name="session"
                    placeholder="Выберите подходящее время"
                    value={values.session}
                    handleChange={setFieldValue}
                    error={touched.session && errors.session}
                  >
                    <Option value="card">ccc</Option>
                    <Option value="cash">ddd</Option>
                  </SelectForm>
                </label>
              </Col>
            </Row>
          </Fragment>
        );
    }
  };

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
            {renderStep(stepData.step, {
              values,
              errors,
              handleChange,
              handleBlur,
              touched,
              setFieldValue,
              isValid,
              setSubmitting,
            })}
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
