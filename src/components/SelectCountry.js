import React from 'react';
//constants
import country_code_iso2_data from '../constants/country_code';
//lib
import getCountryISO3 from 'country-iso-2-to-3';
//antd
import { Select, } from 'antd';
const { Option } = Select;

const SelectCoutry = (props) => {
    const { setCountryCodeIso2, country_code_iso2 } = props;
    
    const handleChange = (val) => {
        setCountryCodeIso2(val)
    }

    return (
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Choose country"
            optionFilterProp="children"
            onChange={handleChange}
            value={country_code_iso2}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                country_code_iso2_data.map(item => {
                    const { code, name } = item;
                    return (
                        <Option value={code} key={code}>{`${name}(${getCountryISO3(code)})`}</Option>
                    )
                })
            }
        </Select>
    )
}

export default React.memo(SelectCoutry)