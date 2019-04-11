import getExpensesTotal from '../../components/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 of no expenses', () => {
    expect(getExpensesTotal([])).toBe(0);
});

test('Should return amount for 1 expense correctly', () => {
    expect(getExpensesTotal([expenses[0]])).toBe(195);
});

test('Should correctly add up mulitiple expenses', () => {
    expect(getExpensesTotal(expenses)).toBe(114245);
})
