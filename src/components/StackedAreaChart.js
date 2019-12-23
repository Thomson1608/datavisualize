import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { Typography } from 'antd';
const { Text } = Typography;

export default (props) => {
    const { show_export, show_import, show_balance, is_group, data } = props;

    return (
        <>
            {
                is_group ? <AreaChart
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
                    {show_export && <Area type="monotone" dataKey="Tong_Export" stackId="1" name='Export' stroke="#DB5054" fill="#DB5054" />}
                    {show_import && <Area type="monotone" dataKey="Tong_Import" stackId="1" name='Import' stroke="#3D7DBC" fill="#3D7DBC" />}
                    {show_balance && <Area type="monotone" dataKey="Balance" stackId="1" name='Balance' stroke="#C0C934" fill="#C0C934" />}
                </AreaChart> :
                    <div>
                        {
                            show_export &&
                            <>
                                <Text strong>Export</Text>
                                <AreaChart
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
                                    <Area type="monotone" dataKey="Tong_Export" name='Export' stroke="#DB5054" fill="#DB5054" />
                                </AreaChart>
                            </>
                        }
                        {
                            show_import &&
                            <>
                                <Text strong>Import</Text>
                                <AreaChart
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
                                    <Area type="monotone" dataKey="Tong_Import" name='Import' stroke="#3D7DBC" fill="#3D7DBC" />
                                </AreaChart>
                            </>
                        }
                        {
                            show_balance &&
                            <>
                                <Text strong>Balance</Text>
                                <AreaChart
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
                                    <Area type="monotone" dataKey="Balance" name='Balance' stroke="#C0C934" fill="#C0C934" />
                                </AreaChart>
                            </>
                        }
                    </div>
            }
        </>
    )
}