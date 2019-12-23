import React, { useState } from 'react';
//redux
import { useSelector } from 'react-redux';
//lib
import Immutable from 'seamless-immutable';
//constants
import country_code from '../constants/country_code';
//component
import Background from '../components/Background';
//utils
import { numberWithCommas } from '../utils/number-utils';
//antd
import { Row, Col, Select, Typography } from 'antd';
import { Table } from 'antd';
const { Text } = Typography;
const { Option } = Select;

const getYearFilterData = () => {
    let data = [];
    for (let i = 1962; i <= 2017; i++) {
        data = [...data, { text: i, value: i }]
    }
    return data;
}

const getCoutryFilterData = () => {
    let data = [];
    country_code.map(item => {
        data = [...data, { text: item.name, value: item.name }]
        return {};
    })
    return data;
}

const columns_balance = [
    {
        title: 'No',
        dataIndex: 'STT',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        filters: getYearFilterData(),
        onFilter: (value, record) => record.year === value,
        sorter: (a, b) => a.year - b.year,
        ellipsis: true
    },
    {
        title: 'Location code',
        dataIndex: 'location_code',
    },
    {
        title: 'Location name',
        dataIndex: 'location_name',
        filters: getCoutryFilterData(),
        onFilter: (value, record) => record.location_name.includes(value),
    },
    {
        title: 'Import',
        dataIndex: 'Tong_Import',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.Tong_Import - b.Tong_Import,
    },
    {
        title: 'Export',
        dataIndex: 'Tong_Export',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.Tong_Export - b.Tong_Export,
    },
    {
        title: 'Balance',
        dataIndex: 'Balance',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.Balance - b.Balance,
    },
];

const columns_partner = [
    {
        title: 'No',
        dataIndex: 'STT',
        key: 'STT',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        filters: getYearFilterData(),
        onFilter: (value, record) => record.year === value,
        sorter: (a, b) => a.year - b.year,
    },
    {
        title: 'Location code',
        dataIndex: 'location_code',
        key: 'location_code',
    },
    {
        title: 'Location name',
        dataIndex: 'location_name',
        filters: getCoutryFilterData(),
        onFilter: (value, record) => record.location_name.includes(value),
    },
    {
        title: 'Partner code',
        dataIndex: 'partner_code',
        key: 'partner_code',
    },
    {
        title: 'Import',
        dataIndex: 'Tong_Import',
        key: 'Tong_Import',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.Tong_Import - b.Tong_Import,
    },
    {
        title: 'Export',
        dataIndex: 'Tong_Export',
        key: 'Tong_Export',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.Tong_Export - b.Tong_Export,
    },
];

const columns_percent = [
    {
        title: 'No',
        dataIndex: 'STT',
        key: 'STT',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        filters: getYearFilterData(),
        onFilter: (value, record) => record.year === value,
        sorter: (a, b) => a.year - b.year,
    },
    {
        title: 'Location code',
        dataIndex: 'location_code',
        key: 'location_code',
    },
    {
        title: 'Location name',
        dataIndex: 'location_name',
        filters: getCoutryFilterData(),
        onFilter: (value, record) => record.location_name.includes(value),
    },
    {
        title: 'Session name',
        dataIndex: 'Session_name',
        key: 'Session_name',
    },
    {
        title: 'Sum import',
        dataIndex: 'SumImport',
        key: 'SumImport',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.SumImport - b.SumImport,
    },
    {
        title: 'Sum export',
        dataIndex: 'SumExport',
        key: 'SumExport',
        render: val => <span>{numberWithCommas(val)}</span>,
        sorter: (a, b) => a.SumExport - b.SumExport,
    },
    {
        title: 'Percent session import',
        dataIndex: 'Percent_Session_Im',
        key: 'Percent_Session_Im',
        render: val => <span>{`${val}%`}</span>,
        sorter: (a, b) => a.Percent_Session_Im - b.Percent_Session_Im,
    },
    {
        title: 'Percent import',
        dataIndex: 'PercentIm',
        key: 'PercentIm',
        render: val => <span>{`${val}%`}</span>,
        sorter: (a, b) => a.PercentIm - b.PercentIm,
    },
    {
        title: 'Percent session export',
        dataIndex: 'Percent_Session_Ex',
        key: 'Percent_Session_Ex',
        render: val => <span>{`${val}%`}</span>,
        sorter: (a, b) => a.Percent_Session_Ex - b.Percent_Session_Ex,
    },
    {
        title: 'Percent export',
        dataIndex: 'PercentEx',
        key: 'PercentEx',
        render: val => <span>{`${val}%`}</span>,
        sorter: (a, b) => a.PercentEx - b.PercentEx,
    },
]

export default () => {
    /* #region  init */
    const [file, setFile] = useState('SumBalance');
    const [columns, setColumns] = useState(columns_balance);
    const data_reducer = useSelector(state => state.data_reducer);
    const [data_source, setDataSource] = useState(Immutable.asMutable(data_reducer.sum_balance_data, { deep: true }));
    /* #endregion */

    const handleChangFile = (val) => {
        setFile(val)
        if (val === 'SumBalance') {
            setColumns(columns_balance)
            setDataSource(Immutable.asMutable(data_reducer.sum_balance_data, { deep: true }));
        } else if (val === 'Export_import_partner_year') {
            setColumns(columns_partner)
            setDataSource(Immutable.asMutable(data_reducer.partner_year_data, { deep: true }))
        } else if (val === 'Percent') {
            setColumns(columns_percent)
            setDataSource(Immutable.asMutable(data_reducer.percent_product_data, { deep: true }))
        }
    }

    return (
        <Background>
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Text strong>File</Text>
                    <br />
                    <Select
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Choose file"
                        optionFilterProp="children"
                        onChange={handleChangFile}
                        value={file}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value='SumBalance'>SumBalance.csv</Option>
                        <Option value='Export_import_partner_year'>Export_import_partner_year.csv</Option>
                        <Option value='Percent'>Percent.csv</Option>
                    </Select>
                </Col>
                <Col xs={24}>
                    <Table columns={columns} dataSource={data_source} rowKey={'STT'} />
                </Col>
            </Row>
        </Background>
    )
}