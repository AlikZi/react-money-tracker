import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, createdAt, note }) => {
    expensesData[id] = { description, amount, createdAt, note };
  });
  database
    .ref("expenses")
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense(23, {
    description: "gas bill"
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: 23,
    updates: {
      description: "gas bill"
    }
  });
});

test("should setup add expense action object with provided values", () => {
  const expenseData = expenses[0];
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("Should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: "6000",
    note: "Apple mouse",
    createdAt: 3000
  };
  // Check if the action correctly dispatched
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    // Check if expense added to the firebase
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test("Should add expense with defaults to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0
  };
  // Check if the action correctly dispatched
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    // Check if expense added to the firebase
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test("should setup  set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("Should fetch the expenses from firebase", () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("Should remove the expense from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  // Check if Remove Expense correctly dispatched in redux store
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: "REMOVE_EXPENSE",
      id
    });
  });
  // Check if expense is removed from the firebase
  database.ref(`expense/${id}`).once('value').then((snapshot)=>{
    expect(snapshot.val()).toEqual(null);
    done();
  })
});
