import payment from '../app/processes/payment';
import paymentHelper from '../app/helpers/paymentHelper';

describe('Payment process', () => {
	let process;
	before(() => {
		process = new payment();
	});

    describe('On payslip request', () => {
        it('calculates gross income', () => {
    		const yearlyIncome = 60050;
    		const actual = process.calculateGrossIncome(yearlyIncome);
    		const expected = 5004;
    		expect(actual).to.be.equal(expected);
        });

        it('calculates income tax', () => {
        	const yearlyIncome = 60050;
    		const actual = process.calculateIncomeTax(yearlyIncome);
    		const expected = 922;
    		expect(actual).to.be.equal(expected);
        });

        it('calculates net income', () => {
        	const yearlyIncome = 60050;
    		const actual = process.calculateNetIncome(yearlyIncome);
    		const expected = 4082;
    		expect(actual).to.be.equal(expected);
        });

        it('calculates super', () => {
			const yearlyIncome = 60050;
			const suerRate = '9%';
    		const actual = process.calculateSuper(yearlyIncome, suerRate);
    		const expected = 450;
    		expect(actual).to.be.equal(expected);
        });

        it('generates payslip',() => {
        	const input = {
        		firstName: 'David',
        		lastName:'Rudd',
        		salary: 60050,
        		superRate : '9%',
        		paymentStartDate: '01 March – 31 March'
        	}
        	const actual = process.generatePayslip(input);
        	const expected = 'David Rudd,01 March – 31 March,5004,922,4082,450';
        	expect(actual).to.be.equal(expected);
        });

		it('generates payslip with comma separeted input', () => {
			const helper = new paymentHelper();
			const input = 'Ryan,Chen,120000,10%,01 March – 31 March';

			const actual = process.generatePayslip(helper.extractEmployeeDataOutofCsv(input));
			const expected = 'Ryan Chen,01 March – 31 March,10000,2696,7304,1000';
			expect(actual).to.be.equal(expected);
		});
    });
});
