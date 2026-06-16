const { DateTime } = require('luxon');

exports.getDateFilterParams = (query) => {
    const today = DateTime.now();

    let startDate = query.startDate;
    let endDate = query.endDate;

    // Default range: Mon of last week to Sat of last week
    const defaultStart = today.startOf('week').minus({ weeks: 1 }).toISODate();
    const defaultEnd = today.startOf('week').minus({ weeks: 1 }).plus({ days: 5 }).toISODate();

    if (!startDate || !endDate) {
        startDate = defaultStart;
        endDate = defaultEnd;
    }

    // Parse to Luxon to perform math for Prev/Next Week navigation!
    const currentStartDt = DateTime.fromISO(startDate);
    const currentEndDt = DateTime.fromISO(endDate);

    const prevStartDate = currentStartDt.minus({ days: 7 }).toISODate();
    const prevEndDate = currentEndDt.minus({ days: 7 }).toISODate();

    const nextStartDate = currentStartDt.plus({ days: 7 }).toISODate();
    const nextEndDate = currentEndDt.plus({ days: 7 }).toISODate();

    // Quick ranges (all relative to today)
    const dateToday = today.toISODate();
    const dateLastMonth = today.minus({ months: 1 }).toISODate();
    const dateLast3Months = today.minus({ months: 3 }).toISODate();
    const dateLast6Months = today.minus({ months: 6 }).toISODate();

    return {
        startDate,
        endDate,
        defaultStart,
        defaultEnd,
        prevStartDate,
        prevEndDate,
        nextStartDate,
        nextEndDate,
        dateToday,
        dateLastMonth,
        dateLast3Months,
        dateLast6Months
    };
};
