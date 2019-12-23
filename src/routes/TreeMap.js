import React, { useState, } from 'react';
//redux
import { useSelector } from 'react-redux';
//constants
import base_colors from '../constants/colors';
//lib
import _ from 'lodash';
import { generatorId } from '../utils/number-utils';
//components
import Background from '../components/Background';
import TreepMap from '../components/TreeMap';
import SelectCountry from '../components/SelectCountry';
//antd
import { Row, Col, Select, Typography, Button, Radio, message } from 'antd';
const { Option } = Select;
const { Text } = Typography;

/* #region  init select year option */
const createYear = (start, end) => {
    let select = [];
    for (let i = start; i > end; i--) {
        const val = i;
        select.push(
            <Option value={val} key={val}>{val}</Option>
        )
    }
    return select;
}
/* #endregion */


/* #region  message */
const success = () => {
    message.success('Lấy dữ liệu thành công', 2);
};

const warning = () => {
    message.warning('Chưa có dữ liệu cho quốc gia này', 2);
};
/* #endregion */

/* #region  radio style */
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
}
/* #endregion */


export default () => {

    /* #region  init */
    const [country_code_iso2, setCountryCodeIso2] = useState(undefined);
    const [year, setYear] = useState(undefined);
    const [view_type, setViewType] = useState('Import');
    const [data_tree, setDataTree] = useState(undefined);
    const data_reducer = useSelector(state => state.data_reducer);
    const percent_product_data = data_reducer.percent_product_data;
    /* #endregion */

    /* #region  processData */
    const processData = () => {
        const filter_data_by_coutry_year = percent_product_data.filter(item => (item.country_code_iso2 === country_code_iso2 && item.year === year))
        if (filter_data_by_coutry_year.length === 0) {
            warning();
        }
        else {
            let group_by_session_code = {};
            filter_data_by_coutry_year.forEach(ele => {
                const { Session_code, product_id, PercentIm, PercentEx, SumExport, SumImport } = ele;
                let item = {
                    id: generatorId(),
                    name: Session_code.toString() + product_id.toString(),
                    percent: view_type === 'Import' ? PercentIm : PercentEx,
                    sum: view_type === 'Import' ? SumImport : SumExport,
                    color: _.isEmpty(base_colors[Session_code]) ? '#cc3300' : base_colors[Session_code].color
                }
                if (_.isEmpty(group_by_session_code[Session_code])) {
                    group_by_session_code[Session_code] = [item];
                } else {
                    group_by_session_code[Session_code].push(item);
                }
            })
            let children_root = [];
            Object.values(group_by_session_code).map((item, key) => {
                children_root = [...children_root, {
                    name: key.toString(),
                    id: generatorId(),
                    children: item
                }]
                return {}
            })
            const data_tree_map = {
                root: {
                    name: 'tree map',
                    children: children_root
                }
            }
            success();
            setDataTree(data_tree_map);
        }
    }
    /* #endregion */

    return (
        <Background>
            <Row gutter={[16, 16]}>
                <Col xs={18}>
                    {
                        !_.isEmpty(data_tree) &&
                        <TreepMap data={data_tree} />
                    }
                </Col>
                <Col xs={6}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Text strong>Country</Text>
                            <br />
                            <SelectCountry setCountryCodeIso2={setCountryCodeIso2} country_code_iso2={country_code_iso2} />
                        </Col>
                        <Col xs={24}>
                            <Text strong>Year</Text>
                            <br />
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose year"
                                optionFilterProp="children"
                                onChange={val => setYear(val)}
                                value={year}
                                filterOption={(input, option) =>
                                    option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
                                }
                            >
                                {createYear(2017, 1961)}
                            </Select>
                        </Col>
                        <Col xs={24}>
                            <Radio.Group value={view_type} onChange={e => setViewType(e.target.value)}>
                                <Radio style={radioStyle} value={'Export'}>Export</Radio>
                                <Radio style={radioStyle} value={'Import'}>Import</Radio>
                            </Radio.Group>
                        </Col>
                        <Col xs={24}>
                            <Button type='primary' onClick={processData}>Apply</Button>
                        </Col>
                        {
                            Object.values(base_colors).map((item, key) => {
                                return (
                                    <Col key={key} xs={24} style={{ display: 'flex' }}>
                                        <div style={{ height: 20, minWidth: 50, maxWidth: 50, backgroundColor: item.color, marginRight: 8 }} />
                                        <Text>{`${key + 1}. ${item.name}`}</Text>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                </Col>
            </Row>
        </Background>
    )
}