import payment from '../app/processes/payment';

describe('Payment process', () => {
	let process;
	before(() => {
        process = new payment('David,Rudd,60050,9%,01 March – 31 March');
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

		it('generates payslip with comma separeted input', () => {
			const input = 'Ryan,Chen,120000,10%,01 March – 31 March';
            const proc = new payment(input);
            const actual = proc.generatePayslip(input);
			const expected = 'Ryan Chen,01 March – 31 March,10000,2696,7304,1000';
			expect(actual).to.be.equal(expected);
		});

        it('returns invalid message if the input is invalid', () => {
            const input = 'Ryan,,120000,10%,01 March – 31 March';
            const proc = new payment(input);
            const actual = proc.generatePayslip(input);
            const expected = 'invalid employee details';
            expect(actual).to.be.equal(expected);
        });
    });
});
