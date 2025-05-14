import { cn, formatDateTime } from '@/src/lib/utils';
import React, { FC } from 'react';

interface FormattedDateTimeProps {
  date: string;
  className?: string;
}

const FormattedDateTime: FC<FormattedDateTimeProps> = ({ date, className }) => {
  return (
    <p className={(cn('body-1, text-light-200'), className)}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;
