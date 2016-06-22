import paymentHelper from '../helpers/paymentHelper';
import employee from '../models/employee';

export default class payment {
	constructor() {
		this.helper = new paymentHelper();
	}

	calculateGrossIncome(salary){
		return Math.floor(salary / 12);
	}

	calculateIncomeTax(salary){
		const range = this.helper.salaryInRange(salary);
		const incomeTax  = Math.ceil((range.fixRate + (salary - (range.min - 1)) * range.perDollar) / 12);
		return incomeTax;
	}

	calculateNetIncome(salary){
		const grossIncome = this.calculateGrossIncome(salary);
		const incomeTax = this.calculateIncomeTax(salary);
		const netIncome = grossIncome - incomeTax;
		return netIncome;
	}

	calculateSuper(salary, superRate){
		const grossIncome = this.calculateGrossIncome(salary);
		const rate = this.helper.extractSuperRate(superRate);
		const incomeSuper = Math.floor(grossIncome * rate);
		return incomeSuper;
	}

	generatePayslip(employeeData){
        const emp = new employee(employeeData);
        let data = [];
        if(emp.isValid()) {
    		data.push(emp.constructName());
    		data.push(emp.paymentStartDate.replace(/(\r\n|\n|\r)/g,''));
    		data.push(this.calculateGrossIncome(emp.salary));
    		data.push(this.calculateIncomeTax(emp.salary));
    		data.push(this.calculateNetIncome(emp.salary));
    		data.push(this.calculateSuper(emp.salary, emp.superRate));
        }
        return data.join(',');
	}
}
