import employee from '../app/models/employee';

describe('Employee Data', () => {
    describe('Is valid if...', () => {
        it('details are valid', () => {
            let validEmployeeDetail = new employee({
                firstName: 'David',
                lastName: 'Rudd',
                salary: 60050,
                superRate: '9%',
                paymentStartDate:'01 March – 31 March'
            })

            expect(validEmployeeDetail.isValid()).to.be.equal(true);
        });
    });

    describe('Is invalid if...', () => {
        it('salary is less than 0', () => {
            let app = new employee({salary: 0});
            expect(!app.salaryIsValid())
        });
        it('superRate is greater than 50%', () => {
            let app  = new employee({superRate: '52%'});
            expect(!app.superRateIsValid())
        });
        it('firstname or lastname is not existed ', () => {
            let app  = new employee({firstName: 'David', lastName: ''});
            expect(!app.nameIsValid())
        });
    });
});