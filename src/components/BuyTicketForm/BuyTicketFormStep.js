import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import moment from 'moment';
import { Col, Row, Select, Button } from 'antd';
import InputMask from 'react-input-mask';
import {
  CheckboxForm,
  DatePickerForm,
  InputForm,
  SelectForm,
} from '../formControls';
import styles from './BuyTicketFormStep.module.scss';

// data example
import performances from '../../json/performances';
import sessions from '../../json/sessions';

const BuyTicketFormStep = ({ stepData, setStepData, formikProps }) => {
  const {
    errors,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
    values,
  } = formikProps;

  const { Option } = Select;

  const [performanceData, setPerformanceData] = useState({
    data: null,
    sessions: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setPerformanceData({
        ...performanceData,
        data: performances,
        sessions,
      });
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performanceData.sessions === null]);

  useEffect(() => {
    localStorage.setItem('buyTicketFormData', JSON.stringify(values));
  }, [values]);

  const renderPerformanceData = () =>
    performanceData.data.data.map((item) => (
      <div key={item.id} className={styles.performance}>
        <p className={styles.title}>
          {item.attributes && `«${item.attributes.title}»`}
        </p>
        <div className={styles.genres}>
          {item.attributes && item.attributes.genres && (
            <Fragment>
              <span>Жанры: </span>
              {item.attributes.genres.map((elem, index) => (
                <span key={elem}>
                  {elem}
                  {index !== item.attributes.genres.length - 1 ? ', ' : ''}
                </span>
              ))}
            </Fragment>
          )}
        </div>
        <Button
          type="primary"
          onClick={() => {
            setFieldValue('performance', item.id);
            setFieldValue('performanceTitle', item.attributes.title);

            // if (performanceData.sessions.data) {
            //   setPerformanceData({
            //     ...performanceData,
            //     sessions: {
            //       data: performanceData.sessions.data.filter(
            //         (sessionItem) =>
            //           item.id === sessionItem.relationships.performance.data.id,
            //       ),
            //     },
            //   });
            // }
          }}
        >
          Выбрать
        </Button>
      </div>
    ));

  const renderSessions = () => {
    const filteredSessions = performanceData.sessions.data.filter(
      (item) => values.performance === item.relationships.performance.data.id,
    );

    return filteredSessions.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.attributes.from}
      </Option>
    ));
  };

  const renderStep = (step) => {
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
            <Row>
              <Col>
                {performanceData.data && !values.performance ? (
                  renderPerformanceData()
                ) : values.performanceTitle ? (
                  <div className={styles['selected-item']}>
                    {`«${values.performanceTitle}» `}
                    <Button
                      size="small"
                      onClick={() => {
                        setPerformanceData({
                          ...performanceData,
                          data: performances,
                          sessions,
                        });
                        setFieldValue('performance', null);
                        setFieldValue('session', null);
                      }}
                    >
                      Изменить
                    </Button>
                  </div>
                ) : (
                  <Fragment>
                    <div className={styles.load}>
                      Загружаем подходящие мероприятия
                    </div>
                  </Fragment>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                {values.performance && !performanceData.sessions && (
                  <div className={styles.load} style={{ padding: 0 }} />
                )}
                <label>
                  <div className="caption">Расписание</div>
                  <SelectForm
                    disabled={!values.performance || !performanceData.sessions}
                    name="session"
                    placeholder="Выберите подходящее время"
                    value={values.session}
                    handleChange={setFieldValue}
                    error={touched.session && errors.session}
                  >
                    {performanceData.sessions &&
                    performanceData.sessions.data &&
                    values.performance ? (
                      renderSessions()
                    ) : (
                      <Option value="" />
                    )}
                  </SelectForm>
                </label>
              </Col>
            </Row>
          </Fragment>
        );
    }
  };

  if (stepData.finished) {
    return (
      <Fragment>
        <div>
          <h3>Билет успешно куплен.</h3>
          Спасибо, что любите наш театр. Ждём Вас!
        </div>
      </Fragment>
    );
  }

  return renderStep(stepData.step);
};

CheckboxForm.propTypes = {
  stepData: PropTypes.shape({}),
  setStepData: PropTypes.shape({}),
  formikProps: PropTypes.shape({}),
};

export default BuyTicketFormStep;
