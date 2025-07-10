import { expect } from 'chai';
import { config } from 'dotenv';
import { queryGraphQl } from 'helper/apiUtils';
import { queryAllCountryNames, queryCountryDetailsByCode } from 'payload/queries';
config();

const TOKEN = process.env.Token;


describe('Get info on country names, codes, and emoji', () => {

    it('should get all country names', async () => {
        const response = await queryGraphQl(queryAllCountryNames);
        expect(response.statusCode).equal(200);
        const responseData = response.body.data;
        expect(responseData).not.undefined;
        expect(responseData.countries).length.to.be.greaterThan(0);
        console.log(responseData.countries.length);
    });
    it('should get details based on country code', async () => {
        const response = await queryGraphQl(queryCountryDetailsByCode('IN'));
        expect(response.statusCode).equal(200);
        const responseData = response.body.data;
        // expect(responseData).not.undefined;
        console.log(responseData);
    });

});