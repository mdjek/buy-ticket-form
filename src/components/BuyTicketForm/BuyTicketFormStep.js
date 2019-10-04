import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import moment from 'moment';
import { Col, Row, Select } from 'antd';
import InputMask from 'react-input-mask';
import {
  CheckboxForm,
  DatePickerForm,
  InputForm,
  SelectForm,
} from '../formControls';

const BuyTicketFormStep = ({ stepData, setStepData, formikProps }) => {
  const { Option } = Select;

  useEffect(() => {
    localStorage.setItem(
      'buyTicketFormData',
      JSON.stringify(formikProps.values),
    );
  }, [formikProps.values]);

  const renderStep = (step) => {
    const {
      errors,
      handleChange,
      handleBlur,
      touched,
      setFieldValue,
      values,
    } = formikProps;

    const handleSelectTypePayment = (value) => {
      setStepData({
        ...stepData,
        stepsCount: value === 'card' ? 3 : 2,
      });

      setFieldValue('payment.type', value);
    };

    const handleChangeName = (e) => {
      setFieldValue('payment.card.name', e.target.value.toUpperCase());
    };

    const handleChangeNumber = (e) => {
      setFieldValue('payment.card.number', e.target.value.replace(/\s/g, ''));
    };

    switch (step) {
      case 2:
        return (
          <Fragment>
            <h3>Данные пользователя</h3>
            <p className="required">Все поля обязательны</p>
            <Row gutter={20}>
              <Col xs={24} sm={12}>
                <label>
                  <div className="caption">Имя</div>
                  <InputForm
                    name="first_name"
                    placeholder="Имя"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && errors.first_name}
                  />
                </label>
              </Col>
              <Col xs={24} sm={12}>
                <label>
                  <div className="caption">Фамилия</div>
                  <InputForm
                    name="last_name"
                    placeholder="Фамилия"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && errors.last_name}
                  />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Почта</div>
                  <InputForm
                    type="email"
                    name="email"
                    placeholder="user@mail.ru"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Дата рождения</div>
                  <DatePickerForm
                    name="birthday"
                    value={
                      values.birthday && moment(values.birthday, 'YYYY-MM-DD')
                    }
                    style={{ maxWidth: '180px' }}
                    handleChange={setFieldValue}
                    error={touched.birthday && errors.birthday}
                  />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Способ оплаты</div>
                  <Select
                    name="payment.type"
                    placeholder="Выберите способ оплаты"
                    value={(values.payment && values.payment.type) || undefined}
                    onChange={handleSelectTypePayment}
                  >
                    <Option value="card">Оплатить картой</Option>
                    <Option value="cash">На месте</Option>
                  </Select>
                  {get(errors, 'payment.type') &&
                    get(touched, 'payment.type') && (
                      <span className="error">{errors.payment.type}</span>
                    )}
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <CheckboxForm
                  checked={values.acceptRules}
                  name="acceptRules"
                  label="Согласен с условиями"
                  error={touched.acceptRules && errors.acceptRules}
                  handleChange={setFieldValue}
                />
              </Col>
            </Row>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <h3>Данные карты</h3>
            <p className="required">Все поля обязательны</p>
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
                    onChange={handleChangeNumber}
                    onBlur={handleBlur}
                  />
                </label>
                <div>
                  {get(errors, 'payment.card.number') &&
                    get(touched, 'payment.card.number') && (
                      <span className="error">
                        {errors.payment.card.number}
                      </span>
                    )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
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
                    style={{ maxWidth: '180px' }}
                  />
                  <div>
                    {get(errors, 'payment.card.valid_thru') &&
                      get(touched, 'payment.card.valid_thru') && (
                        <span className="error">
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
                    onChange={handleChangeName}
                    onBlur={handleBlur}
                  />
                  <div>
                    {get(errors, 'payment.card.name') &&
                      get(touched, 'payment.card.name') && (
                        <span className="error">
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
            <p className="required">Все поля обязательны</p>
            <Row>
              <Col>
                <label>
                  <div className="caption">Событие</div>
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

  return renderStep(stepData.step);
};

CheckboxForm.propTypes = {
  stepData: PropTypes.shape({}),
  setStepData: PropTypes.shape({}),
  formikProps: PropTypes.shape({}),
};

export default BuyTicketFormStep;
