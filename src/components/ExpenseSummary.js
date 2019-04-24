import React from 'react';
import getExpensesTotal from './expenses-total';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const expensesCount = props.expenses.length;
    const expensesWord = props.expenses.length === 1 ? 'expense': 'expenses';
    const expensesTotal = numeral(getExpensesTotal(props.expenses)/100).format('$0,0.00');
    
    return (<div className="summary">
        <div className="container">
        <div className="summary__content">
        <h2 className="summary__content-text">Viewing <span>{expensesCount}</span> {expensesWord} totaling <span>{expensesTotal}</span></h2>
        <Link to='/create' className="btn summary__content-btn">Add Expense</Link>
        </div>
        </div>
    </div>)
}

const mapStateToProps = (state) => {
    return {
      expenses: selectExpenses(state.expenses, state.filters)
    };
  };

export default connect(mapStateToProps)(ExpensesSummary);