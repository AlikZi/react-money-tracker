import expenses from '../fixtures/expenses';
import expensesReducer from "../../reducers/expenses";


test("Should return default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should setup add expense", () => {
  const expense = {
      id: 1123,
      description: "rent",
      amount: "180000",
      note: '',
      createdAt: 20000
     };
  const state = expensesReducer(expenses, {
    type: "ADD_EXPENSE",
    expense: expense
  });
  expect(state).toEqual([...expenses,expense]);
});

test("should setup remove expense by id", () => {
  const state = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: "1" });
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test("should setup remove expense by id", () => {
    const state = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: "4" });
    expect(state).toEqual(expenses);
  });


test("should setup edit expense using id and updates ", () => {
    const state = expensesReducer(expenses, { type: "EDIT_EXPENSE", id: "1", updates: {description: 'April Rent'}});
    expect(state[0].description).toBe('April Rent')
})

test("should setup edit expense using id and updates ", () => {
    const state = expensesReducer(expenses, { type: "EDIT_EXPENSE", id: "5", updates: {description: 'April Rent'}});
    expect(state).toEqual(expenses)
})
