import moment from "moment";

import filtersReducer from "../../reducers/filters";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should setup filter values with filled text", () => {
    const state = filtersReducer(undefined, {type: "SET_TEXT_FILTER", text: "rent"});
    expect(state.text).toBe('rent');
})

test("should setup filter values with sort by amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe('amount');
});

test("should setup filter values with sort by DATE", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe('date');
});

test("should setup filter values with set start date", () => {
    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate: moment(0).subtract(2, 'days') });
    expect(state.startDate).toEqual(moment(0).subtract(2, 'days'));
  });

  test("should setup filter values with set end date", () => {
    const state = filtersReducer(undefined, { type: "SET_END_DATE", endDate: moment(0).add(2, 'days') });
    expect(state.endDate).toEqual(moment(0).add(2, 'days'));
  });

  