import React, { useState, } from 'react';
//redux
import { useSelector } from 'react-redux';
//component
import Background from '../components/Background';
import StackedAreaChart from '../components/StackedAreaChart';
import LineChart from '../components/LineChart';
import SelectCountry from '../components/SelectCountry';
//antd
import { Row, Col, Select, Typography, Button, Checkbox, Radio, message } from 'antd';
const { Option } = Select;
const { Text } = Typography;

/* #region  init select year option */
const createYear = (start, end) => {
    let select = [];
    for (let i = start; i > end; i--) {
        const val = i.toString();
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
    const [from_year, setFromYear] = useState(undefined);
    const [to_year, setToYear] = useState(undefined);
    const [area_data, setAreaData] = useState([]);
    const [view_type, setViewType] = useState('Line');
    const [is_group, setIsGroup] = useState(false);
    const [show_import, setShowImport] = useState(true);
    const [show_export, setShowExport] = useState(true);
    const [show_balance, setShowBalance] = useState(false);
    const data_reducer = useSelector(state => state.data_reducer);
    const sum_balance_data = data_reducer.sum_balance_data;
    /* #endregion */

    /* #endregion csv */

    /* #region  process data */
    const processData = () => {
        const filter_data = sum_balance_data.filter(item => (item.country_code_iso2 === country_code_iso2 && item.year >= from_year && item.year <= to_year));
        if (filter_data.length === 0) {
            warning();
        } else {
            success();
            setAreaData(filter_data);
        }
    }

    /* #endregion */

    return (
        <Background key='AreaChart'>
            <Row gutter={[16, 16]}>
                {/*start render map */}
                <Col xs={18}>
                    {view_type === 'Area' &&
                        <StackedAreaChart
                            is_group={is_group}
                            show_export={show_export}
                            show_import={show_import}
                            show_balance={show_balance}
                            data={area_data}
                        />}
                    {view_type === 'Line' &&
                        <LineChart
                            is_group={is_group}
                            show_export={show_export}
                            show_import={show_import}
                            show_balance={show_balance}
                            data={area_data}
                        />}
                </Col>
                {/* end render map */}
                {/* start render select */}
                <Col xs={6}>
                    <Row gutter={[16, 16]} >
                        <Col xs={24}>
                            <Text strong>Country</Text>
                            <br />
                            <SelectCountry setCountryCodeIso2={setCountryCodeIso2} country_code_iso2={country_code_iso2} />
                        </Col>
                        <Col xs={12}>
                            <Text strong>From year</Text>
                            <br />
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose year"
                                optionFilterProp="children"
                                onChange={val => setFromYear(val)}
                                value={from_year}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {createYear(2017, 1961)}
                            </Select>
                        </Col>
                        <Col xs={12}>
                            <Text strong>To year</Text>
                            <br />
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose year"
                                optionFilterProp="children"
                                onChange={val => setToYear(val)}
                                value={to_year}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {createYear(2017, 1961)}
                            </Select>
                        </Col>
                        <Col xs={24}>
                            <Text strong>Display config</Text>
                        </Col>
                        <Col xs={24}>
                            <Radio.Group value={view_type} onChange={e => setViewType(e.target.value)}>
                                <Radio style={radioStyle} value={'Line'}>Line Chart</Radio>
                                <Radio style={radioStyle} value={'Area'}>Area Chart</Radio>
                            </Radio.Group>
                        </Col>
                        <Col xs={24}>
                            <Checkbox checked={is_group} onChange={e => setIsGroup(e.target.checked)}>
                                <Text>Group</Text>
                            </Checkbox>
                        </Col>
                        <Col xs={24} style={{ display: 'flex' }}>
                            <Checkbox checked={show_export} onChange={e => setShowExport(e.target.checked)}>Export</Checkbox>
                            <div style={{ height: 20, width: 50, backgroundColor: '#E99699', marginLeft: 8 }} />
                        </Col>
                        <Col xs={24} style={{ display: 'flex' }}>
                            <Checkbox checked={show_import} onChange={e => setShowImport(e.target.checked)}>Import</Checkbox>
                            <div style={{ height: 20, width: 50, backgroundColor: '#8BB1D7', marginLeft: 8 }} />
                        </Col>
                        <Col xs={24} style={{ display: 'flex' }}>
                            <Checkbox checked={show_balance} onChange={e => setShowBalance(e.target.checked)}>Balance</Checkbox>
                            <div style={{ height: 20, width: 50, backgroundColor: '#D9DF85' }} />
                        </Col>
                        <Col xs={24}>
                            <Button type='primary' onClick={processData}>Apply</Button>
                        </Col>
                    </Row>
                </Col>
                {/* end render select */}
            </Row>
        </Background>
    )
}
