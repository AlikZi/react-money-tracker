export default (expenses) => {
    return expenses.reduce((sum, value) => sum + value.amount, 0);
};