export default class paymentHelper {
	constructor() {
		let salaryRange = [];
		salaryRange.push({min:0, max:18200 ,fixRate: 0, perDollar: 0});
		salaryRange.push({min:18201, max:37000, fixRate: 0, perDollar: 0.19});
		salaryRange.push({min:37001, max:80000, fixRate: 3572, perDollar: 0.325});
		salaryRange.push({min:80001, max:180000, fixRate: 17547, perDollar: 0.37});
		salaryRange.push({min:180001, max:10000000, fixRate: 54547, perDollar: 0.45});
		this.salaryRange = salaryRange;
	}

	salaryInRange(salary) {
		for(let range of this.salaryRange){
			if(salary >= range.min && salary <= range.max){
				return range;
			}
		}
	}

	extractSuperRate(superRate) {
        if(superRate.indexOf('%') <= -1) 
        	return 0;
		return parseInt(superRate.replace('%', ''), 10) / 100;
		
	}

	extractEmployeeDataOutofCsv(input) {
		const data = input.split(',');
		const output = 
		 {
			firstName: data[0],
			lastName: data[1],
			salary: data[2],
			superRate : data[3],
			paymentStartDate: data[4]
		}
		return output;
	}
}