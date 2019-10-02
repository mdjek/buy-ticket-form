import React, { useState, Fragment } from 'react';
import { Formik } from 'formik';
import {
  Button,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Checkbox,
  Icon,
} from 'antd';
import InputMask from 'react-input-mask';
import { LineProgress } from '.';
import styles from './BuyTicketForm.module.scss';

const BuyTicketForm = () => {
  const initialValues = {
    session: null,
    first_name: '',
    last_name: '',
    birthday: '',
    email: '',
    payment: {
      type: '',
      card: {
        number: '',
        valid_thru: '',
        name: '',
      },
    },
  };

  const [stepData, setStepData] = useState({
    step: 1,
    stepsCount: 3,
  });

  const { Option } = Select;

  const renderStep = (step) => {
    switch (step) {
      case 2:
        return (
          <Fragment>
            <h3>Данные пользователя</h3>
            <p className={styles.required}>Все поля обязательны</p>
            <Row>
              <Col>
                <Input placeholder="Имя" />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input placeholder="Фамилия" />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input type="email" placeholder="user@mail.ru" />
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <DatePicker style={{ width: '100%' }} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Select placeholder="Выберите способ оплаты">
                  <Option value="card">Оплатить картой</Option>
                  <Option value="cash">На месте</Option>
                </Select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Checkbox>Согласен с условиями</Checkbox>
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
                    type="text"
                    className="ant-input"
                    placeholder="0000 0000 0000 00000"
                    mask="9999 9999 9999 9999"
                    size={20}
                  />
                </label>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <label>
                  <div className="caption">Действует до</div>
                  <InputMask
                    type="text"
                    className="ant-input"
                    placeholder="00/00"
                    mask="99/99"
                    size={4}
                  />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Владелец карты</div>
                  <Input placeholder="IVANOV IVAN" />
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
                  <Select placeholder="Выберите событие">
                    <Option value="card">Оплатить картой</Option>
                    <Option value="cash">На месте</Option>
                  </Select>
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <label>
                  <div className="caption">Расписание</div>
                  <Select placeholder="Выберите подходящее время">
                    <Option value="card">Оплатить картой</Option>
                    <Option value="cash">На месте</Option>
                  </Select>
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
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            {renderStep(stepData.step)}
            <Row
              type="flex"
              justify="space-between"
              style={{ marginTop: '30px' }}
            >
              <Col>
                {stepData.step > 1 && (
                  <Button
                    disabled={stepData.step <= 1}
                    onClick={() =>
                      setStepData({ ...stepData, step: stepData.step - 1 })
                    }
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
                    onClick={() =>
                      setStepData({ ...stepData, step: stepData.step + 1 })
                    }
                  >
                    Следующий шаг
                    <Icon type="right" />
                  </Button>
                ) : (
                  <Fragment>
                    <Button type="primary" disabled={isSubmitting}>
                      submit
                    </Button>
                    <Button type="danger" ghost>
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
