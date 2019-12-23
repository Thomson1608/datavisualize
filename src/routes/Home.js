import React, { useState } from 'react';
//redux
import { useSelector } from 'react-redux';
//country code
import country_geocode from '../constants/country_geocode';
//lib
import _ from 'lodash';
//component
import Background from '../components/Background';
import Map from '../components/Map';
import PieChart from '../components/PieChart';
import SelectCountry from '../components/SelectCountry';
//antd
import { Row, Col, Select, Typography, Button, Radio, message } from 'antd';
const { Option } = Select;
const { Text } = Typography;

/* #region  init select year option */
const createYear = () => {
    let select = [];
    for (let i = 2017; i > 1961; i--) {
        const val = i;
        select.push(
            <Option value={val} key={val}>{val}</Option>
        )
    }
    return select;
}
/* #endregion */

/* #region  radio style */
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
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

const Home = () => {
    /* #region  init */
    const [country_code_iso2, setCountryCodeIso2] = useState(undefined);
    const [year, setYear] = useState(undefined);
    const [view_type, setViewType] = useState('Tong_Export');
    const [map_data, setMapData] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [nation, setNation] = useState(undefined);
    const [nation_other, setNationOther] = useState(undefined);
    const [view_detail, setViewDetail] = useState(false);
    const data_reducer = useSelector(state => state.data_reducer);
    const partner_year_data = data_reducer.partner_year_data;
    const sum_balance_data = data_reducer.sum_balance_data;
    /* #endregion */

    /* #region  process data */
    const filterDataByYear = year => {
        try {
            // setDataByYear(_.keyBy(partner_year_data.filter(item => item.year === year), 'country_code_iso2'))
        } catch (error) {
        }
    }

    const processData = () => {
        try {
            setNationOther(undefined);
            setMapData(undefined);
            setViewDetail(false);
            let map_data_result = {};
            const data_filter_year_coutry = partner_year_data.filter(item => (item.year === year && item.country_code_iso2 === country_code_iso2));
            if (!_.isEmpty(data_filter_year_coutry)) {
                data_filter_year_coutry.map(item => {
                    map_data_result[item.partner_code_ios2] = view_type === 'Tong_Export' ? item.Tong_Export : item.Tong_Import;
                })
                const nation = country_geocode[country_code_iso2];
                if (!_.isEmpty(nation)) {
                    setMarkers([{
                        latLng: [nation.latitude, nation.longitude], name: nation.name
                    }]);
                    const current_nation = sum_balance_data.filter(item => (item.year === year && item.country_code_iso2 === country_code_iso2));
                    if (!_.isEmpty(current_nation)) {
                        setNation(current_nation[0]);
                    }
                }
                setMapData(map_data_result);
                success();
            } else {
                warning();
            }
        } catch (error) {
        }
    }
    /* #endregion */

    /* #region  handle change select */
    const handleChangeYear = (val) => {
        setYear(val);
        filterDataByYear(val);
    }
    /* #endregion */

    /* #region   */
    const handleRegionClick = (country_code_iso2) => {
        const current_nation = sum_balance_data.filter(item => (item.year === year && item.country_code_iso2 === country_code_iso2));
        if (!_.isEmpty(current_nation)) {
            setNationOther(current_nation[0]);
        } else {
            warning();
        }
    }
    /* #endregion */

    const handleViewDetail = () => {
        setViewDetail(true);
    }

    return (
        <Background key="Home">
            <Row gutter={[16, 16]}>
                {/*start render map */}
                <Col xs={18}>
                    <Map handleRegionClick={handleRegionClick} map_data={map_data} markers={markers} />
                    <br />
                    <div style={{ height: 20, width: '100%', background: 'linear-gradient(to right, #e1dd2e 0%, #44b0fe 100%)' }} />
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
                        <Col xs={24}>
                            <Text strong>Year</Text>
                            <br />
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Choose year"
                                optionFilterProp="children"
                                onChange={handleChangeYear}
                                value={year}
                                filterOption={(input, option) =>
                                    option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
                                }
                            >
                                {createYear()}
                            </Select>
                        </Col>
                        <Col xs={24}>
                            <Radio.Group value={view_type} onChange={e => setViewType(e.target.value)}>
                                <Radio style={radioStyle} value={'Tong_Export'}>Export</Radio>
                                <Radio style={radioStyle} value={'Tong_Import'}>Import</Radio>
                            </Radio.Group>
                        </Col>
                        <Col xs={24}>
                            <Button type='primary' onClick={processData}>Apply</Button>
                            <Button type='primary' style={{ marginLeft: 8 }} onClick={handleViewDetail}>Detail</Button>
                        </Col>
                    </Row>
                </Col>
                {/* end render select */}
                {
                    (view_detail && !_.isEmpty(nation_other)) &&
                    <Col xs={18}>
                        <PieChart nation={nation_other} />
                    </Col>
                }
                {
                    (view_detail && !_.isEmpty(nation)) &&
                    <Col xs={18}>
                        <PieChart nation={nation} />
                    </Col>
                }
                {
                    (view_detail && !_.isEmpty(nation)) &&
                    <Col xs={18}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <div style={{ height: 30, width: 50, backgroundColor: '#E99699', marginRight: 10 }} />
                            <Text>Import</Text>
                        </div>
                        <br />
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <div style={{ height: 30, width: 50, backgroundColor: '#8BB1D7', marginRight: 10 }} />
                            <Text>Export</Text>
                        </div>
                    </Col>
                }
            </Row>
        </Background>
    )
}

export default Home;
