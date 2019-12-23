import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
//utils
import { numberWithCommas } from '../utils/number-utils';
//lib
import _ from 'lodash';

export default ({ data }) => {
    return (
        <div style={{ height: 1000, width: 800 }}>
            <ResponsiveTreeMap
                root={data.root}
                identity="id"
                value="percent"
                innerPadding={1}
                outerPadding={1}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                label={(data) => `${data.name}: ${data.percent}%`}
                tooltip={({ data }) => {
                    const { name, percent, sum, color } = data;
                    return (
                        <>
                            <strong style={{ color }}>
                                Product code: {name}
                            </strong>
                            {
                                _.isNumber(sum) &&
                                <>
                                    <br />
                                    <strong style={{ color }}>
                                        {numberWithCommas(sum)}
                                    </strong>
                                </>
                            }
                            <br />
                            <strong style={{ color }}>
                                {percent}%
                            </strong>
                        </>
                    )
                }}
                labelSkipSize={12}
                // labelFormat=".0s"
                // labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                labelTextColor={'#ffffff'}
                colors={(data) => data.color || '#b1646a'}
                borderWidth={1}
                borderColor="#ffffff"
                animate={true}
                motionStiffness={90}
                motionDamping={11}
                leavesOnly={false}
            />
        </div>
    )
}