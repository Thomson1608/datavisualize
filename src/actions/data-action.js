import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
    setSumBalanceData: ['params'],
    setPartnerYearData: ['params'],
    setPercentProductData: ['params'],
});