// import _ from 'lodash';
import Immutable from 'seamless-immutable';

export const setSumBalanceData = (state, { params }) => {
    console.log("TCL: setSumBalanceData -> params", params)
    return Immutable.merge(state, {
        sum_balance_data: params.data,
    })
}

export const setPartnerYearData = (state, { params }) => {
    console.log("TCL: setPartnerYearData -> params", params)
    return Immutable.merge(state, {
        partner_year_data: params.data,
    })
}

export const setPercentProductData = (state, { params }) => {
    console.log("TCL: setPercentProductData -> params", params)
    return Immutable.merge(state, {
        percent_product_data: params.data,
    })
}