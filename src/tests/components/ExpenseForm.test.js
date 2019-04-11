import React from "react";
import { shallow } from "enzyme";
import moment from 'moment';
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("shoud render Expense Form correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render error form invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("Should set description on input change", () => {
    const value = 'new description'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {
      target: { value }
    });
    expect(wrapper.state("description")).toBe(value);
  });

  test("Should set note on input change", () => {
    const value = 'new NOTE'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
      target: { value }
    });
    expect(wrapper.state("note")).toBe(value);
  });

  test("Should set amount if valid input", () => {
    const value = '32'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
      target: { value }
    });
    expect(wrapper.state("amount")).toBe(value);
  });

  test("Should not set amount if invalid input", () => {
    const value = '32.2324'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
      target: { value }
    });
    expect(wrapper.state("amount")).toBe('');
  });

  test('Should call onSubmit prop for valid form submission', () => {
      const onSubmitSpy = jest.fn();
      const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/>);
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });
      expect(wrapper.state('error')).toBe('');
      expect(onSubmitSpy).toHaveBeenCalledWith({
          amount: expenses[1].amount, 
          createdAt: expenses[1].createdAt,
          description: expenses[1].description, 
          note: expenses[1].note
        });
  });

  test('should set new date on date change', () => {
      const now = moment()
      const wrapper = shallow(<ExpenseForm />);
      wrapper.find('SingleDatePicker').prop('onDateChange')(now);
      expect(wrapper.state('createdAt')).toEqual(now);
  })

  test('should set calendar focused on focus change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
})