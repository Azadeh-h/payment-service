import PaymentHelper from '../helpers/paymentHelper';
import Employee from '../models/employee';

export default class payment {
    constructor(employeeData) {
        this.helper = new PaymentHelper();
        this.employee = new Employee(employeeData);
    }

    calculateGrossIncome(salary) {
        return Math.floor(salary / 12);
    }

    calculateIncomeTax(salary) {
        const range = this.helper.salaryInRange(salary);
        const incomeTax = Math.ceil((range.fixRate + (salary - (range.min - 1)) * range.perDollar) / 12);
        return incomeTax;
    }

    calculateNetIncome(salary) {
        const grossIncome = this.calculateGrossIncome(salary);
        const incomeTax = this.calculateIncomeTax(salary);
        const netIncome = grossIncome - incomeTax;
        return netIncome;
    }

    calculateSuper(salary, superRate) {
        const grossIncome = this.calculateGrossIncome(salary);
        const rate = this.helper.extractSuperRate(superRate);
        const incomeSuper = Math.floor(grossIncome * rate);
        return incomeSuper;
    }

    generatePayslip() {
        if (!this.employee.isValid()) {
            return 'invalid employee details';
        }
        let data = [];
        data.push(this.employee.constructName());
        data.push(this.employee.paymentStartDate.replace(/(\r\n|\n|\r)/g, ''));
        data.push(this.calculateGrossIncome(this.employee.salary));
        data.push(this.calculateIncomeTax(this.employee.salary));
        data.push(this.calculateNetIncome(this.employee.salary));
        data.push(this.calculateSuper(this.employee.salary, this.employee.superRate));

        return data.join(',');
    }
}
