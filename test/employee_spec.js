import employee from '../app/models/employee';

describe('Employee Data', () => {
    describe('Is valid if...', () => {
        it('details are valid', () => {
            let validEmployeeDetail = new employee('David,Rudd,60050,9%,01 March – 31 March')
            expect(validEmployeeDetail.isValid()).to.be.equal(true);
        });
    });

    describe('Is invalid if...', () => {
        it('salary is less than 0', () => {
            let app = new employee('David,Rudd,0,9%,01 March – 31 March');
            expect(!app.salaryIsValid())
        });
        it('superRate is greater than 50%', () => {
            let app  = new employee('David,Rudd,60050,53%,01 March – 31 March');
            expect(!app.superRateIsValid())
        });
        it('firstname or lastname not exists ', () => {
            let app  = new employee('David,,60050,9%,01 March – 31 March');
            expect(!app.nameIsValid())
        });
    });
});