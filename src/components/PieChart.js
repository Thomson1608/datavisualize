import React, { Fragment } from 'react';
import {
    PieChart, Pie, Cell,
} from 'recharts';
//utils
import { numberWithCommas } from '../utils/number-utils';
import { Typography, Row, Col } from 'antd';
const { Text } = Typography;

const COLORS = ['#E99699', '#8BB1D7'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieInfo = ({ nation }) => {
    return (
        <Fragment>
            <Col xs={8}>
                <Text strong>Country</Text>
            </Col>
            <Col xs={12}>
                <Text>{nation.location_name}</Text>
            </Col>
            <Col xs={8}>
                <Text strong>Year</Text>
            </Col>
            <Col xs={12}>
                <Text>{nation.year}</Text>
            </Col>
            <Col xs={8}>
                <Text strong>Export</Text>
            </Col>
            <Col xs={12}>
                <Text>{numberWithCommas(nation.Tong_Export)}</Text>
            </Col>
            <Col xs={8}>
                <Text strong>Import</Text>
            </Col>
            <Col xs={12}>
                <Text>{numberWithCommas(nation.Tong_Import)}</Text>
            </Col>
        </Fragment>
    )
}

export default (props) => {
    const { nation } = props;
    const data = [
        {
            name: 'Import',
            value: nation.Tong_Import
        },
        {
            name: 'Export',
            value: nation.Tong_Export
        },
    ]

    return (
        <Row gutter={[16, 16]}>
            <Col xs={8}>
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                </PieChart>
            </Col>
            <Col xs={12} style={{ height: 200, display: 'flex', alignItems: 'center' }}>
                <Row gutter={[8, 8]}>
                    <PieInfo nation={nation} />
                </Row>
            </Col>
        </Row>
    )
}