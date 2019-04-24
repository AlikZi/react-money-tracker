import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div className="container list">
    <div className="list-header">
      <div className="list-header__expenses">
        Expenses
      </div>
      <div className="list-header__expense">
        Expense
      </div>
      <div className="list-header__amount">
        Amount
      </div>
    </div>
    {props.expenses.length === 0 && <p className="list-item list-item--message">No expenses in this period.</p>}
    {props.expenses.map((expense) => {
      return <ExpenseListItem key={expense.id} {...expense} />;
    })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
