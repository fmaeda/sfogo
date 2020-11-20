import React from 'react';

import { format } from 'date-fns';

import { FaRegCalendar, FaRegClock } from 'react-icons/fa';

import { Container } from './styled';

type Props = {
  date: Date;
};

class DateTime extends React.Component<Props> {
  render(): JSX.Element {
    const { date } = this.props;

    return (
      <Container>
        <span>
          <FaRegCalendar />
          {format(date, 'dd/MM/yyyy')}
        </span>
        <span>
          <FaRegClock />
          {format(date, 'HH:mm:ss')}
        </span>
      </Container>
    );
  }
}

export default DateTime;
