import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Typography } from 'antd';
const { Text } = Typography;

export default (props) => {
    const { show_export, show_import, show_balance, is_group, data } = props;

    return (
        <>
            {
                is_group ?
                    <LineChart
                        width={900}
                        height={600}
                        data={data}
                        margin={{
                            top: 10, right: 30, left: 60, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {show_export && <Line type="monotone" dataKey="Tong_Export" name='Export' stroke="#E99699" />}
                        {show_import && <Line type="monotone" dataKey="Tong_Import" name='Import' stroke="#8BB1D7" />}
                        {show_balance && <Line type="monotone" dataKey="Balance" name='Balance' stroke="#D9DF85" />}
                    </LineChart>
                    :
                    <div>
                        {
                            show_export &&
                            <>
                                <Text strong>Export</Text>
                                <LineChart
                                    width={800}
                                    height={200}
                                    data={data}
                                    syncId="syncId"
                                    margin={{
                                        top: 10, right: 30, left: 60, bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Tong_Export" name='Export' stroke="#E99699" fill="#E99699" />
                                </LineChart>
                            </>
                        }
                        {
                            show_import &&
                            <>
                                <Text strong>Import</Text>
                                <LineChart
                                    width={800}
                                    height={200}
                                    data={data}
                                    syncId="syncId"
                                    margin={{
                                        top: 10, right: 30, left: 60, bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Tong_Import" name="Import" stroke="#8BB1D7" fill="#8BB1D7" />
                                </LineChart>
                            </>
                        }
                        {
                            show_balance &&
                            <>
                                <Text strong>Balance</Text>
                                <LineChart
                                    width={800}
                                    height={200}
                                    data={data}
                                    syncId="syncId"
                                    margin={{
                                        top: 10, right: 30, left: 60, bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Balance" name="Balance" stroke="#D9DF85" fill="#D9DF85" />
                                </LineChart>
                            </>
                        }
                    </div>
            }
        </>
    )
}