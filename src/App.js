import React from 'react';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import ruRu from 'antd/es/locale/ru_RU';
import BuyTicketForm from './components/BuyTicketForm';

moment.locale('ru');

const App = () => (
  <ConfigProvider locale={ruRu}>
    <div className="App">
      <header className="header">Buy Ticket Form</header>
      <main>
        <div className="wrapper">
          <BuyTicketForm />
        </div>
      </main>
    </div>
  </ConfigProvider>
);

export default App;
