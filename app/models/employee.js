import paymentHelper from '../helpers/paymentHelper';

export default class employee {
    constructor (args) {
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.salary = args.salary;
        this.superRate = args.superRate;
        this.paymentStartDate = args.paymentStartDate;
        this.helper = new paymentHelper();
    }

    nameIsValid() {
        return (this.firstName && this.lastName);
    }

    salaryIsValid () {
        return this.salary > 0;
    }

    superRateIsValid = function() {
        let rate = this.helper.extractSuperRate(this.superRate);
        return rate >= 0 && rate <= .5
    };

    isValid(){
        return this.nameIsValid() &&
            this.salaryIsValid() &&
            this.superRateIsValid();
    };
    
    constructName(){
        return this.firstName.concat(' ', this.lastName);
    }
}