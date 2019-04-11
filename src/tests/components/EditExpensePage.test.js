import React from 'react';
import {shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn()};
    wrapper = shallow(<EditExpensePage 
                      expense={expenses[1]}
                      editExpense={editExpense}
                      removeExpense={removeExpense}
                      history={history}
                      />);
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit(edit expense)', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(editExpense).toHaveBeenCalledWith(expenses[1].id, expenses[1]);
    expect(history.push).toHaveBeenCalledWith('/');
});

test('Should handle onClick(remove expense)', () => {
    wrapper.find('button').prop('onClick')({id: expenses[1].id});
    expect(removeExpense).toHaveBeenCalledWith({id: expenses[1].id });
    expect(history.push).toHaveBeenCalledWith('/');
});