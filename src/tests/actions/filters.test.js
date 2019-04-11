import moment from "moment";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";

test("Should generate set text filter action", () => {
  const action = setTextFilter("bill");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "bill"
  });
});

test("Should generate set text filter action", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});

test("Should setup sort by date action", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE"
  });
});

test("Should setup sort by amount action", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("Should generate set start date action", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  });
});

test("Should generate set end date action", () => {
  const action = setEndDate(moment(1));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(1)
  });
});
