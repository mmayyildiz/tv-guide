import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import './style.css'

interface CalendarProps {
    changeDate: Function
    selectedDate: string;
}

const Calendar = ({ changeDate, selectedDate }: CalendarProps) => {

    const selectDate = (nextDayValue: string) => {

        changeDate(nextDayValue);
    }

    const today = moment.utc('20200129');

    return (
        <div>
            { _.range(7).map((value) => {

                let nextDay;
                let nextDayValue: string;
                let nextDayLabel: string;

                if (value === 0) {
                    nextDayValue = today.format('YYYYMMDD');
                    nextDayLabel = 'Today';
                } else {
                    nextDay = today.add(1, 'day');
                    nextDayValue = nextDay.format('YYYYMMDD');
                    nextDayLabel = nextDay.format('dddd');
                }

                const isSelectedDate = selectedDate === nextDayValue;

                return (
                    <div key={nextDayLabel} className="calendarDay" onClick={() => selectDate(nextDayValue)}
                        style={{ fontWeight: isSelectedDate ? "bold" : "normal", opacity: isSelectedDate ? 1 : 0.7 }}>
                        { nextDayLabel}
                    </div>
                )
            })}

        </div>
    );
}

export default Calendar;
