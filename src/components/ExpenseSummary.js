import React from 'react';
import getExpensesTotal from './expenses-total';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const expensesCount = props.expenses.length;
    const expensesWord = props.expenses.length === 1 ? 'expense': 'expenses';
    const expensesTotal = numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00');
    
    return (<div>
        <h2>Viewing: {expensesCount} {expensesWord} totaling: {expensesTotal}</h2>
    </div>)
}

const mapStateToProps = (state) => {
    return {
      expenses: selectExpenses(state.expenses, state.filters)
    };
  };

export default connect(mapStateToProps)(ExpensesSummary);