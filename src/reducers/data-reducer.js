//lib
import { createReducer } from 'reduxsauce';
import Immutable from 'immutable';

//action types
import { Types } from '../actions/data-action';

//handler
import * as Handler from '../handlers/data-handler';

const INITIAL_STATE = Immutable.fromJS({
    sum_balance_data: [],
    partner_year_data: [],
    percent_product_data: [],
})

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_SUM_BALANCE_DATA]: Handler.setSumBalanceData,
    [Types.SET_PARTNER_YEAR_DATA]: Handler.setPartnerYearData,
    [Types.SET_PERCENT_PRODUCT_DATA]: Handler.setPercentProductData,
})

