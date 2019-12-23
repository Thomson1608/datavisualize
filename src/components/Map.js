import React from "react";
import { VectorMap } from "react-jvectormap";
import _ from 'lodash';
//utils
import { numberWithCommas } from '../utils/number-utils';

const Map = props => {
    const { map_data, markers } = props;

    const handleClick = (e, country_code) => {
        props.handleRegionClick(country_code);
        setTimeout(() => { Array.from(document.getElementsByClassName("jvectormap-tip")).forEach((el) => { el.style.display = 'none' }); }, 50);
    }

    return (
        <div>
            <VectorMap
                map={"world_mill"}
                backgroundColor="#505050" //change it to ocean blue: #0077be || #505050
                zoomOnScroll={true}
                containerStyle={{
                    width: "100%",
                    height: "520px"
                }}
                onRegionClick={handleClick} //gets the country code
                containerClassName="map"
                markers={markers}
                markerStyle={
                    {
                        initial: {
                            fill: 'red',
                            stroke: '#383f47'
                        }
                    }
                }
                regionStyle={{
                    initial: {
                        fill: "white",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: "pointer",
                    },
                }}
                series={{
                    regions: [
                        {
                            values: map_data,
                            scale: ['#E1DD2E', '#44B0FE'],
                            normalizeFunction: "polynomial",
                        }
                    ]
                }}
                onRegionTipShow={(e, el, code) => {
                    if (_.isNumber(map_data[code])) {
                        el.html(el.html() + ` (${numberWithCommas(map_data[code].toString())})`);
                    } else {
                        el.html(el.html() + ` (Chưa có dữ liệu)`);
                    }
                }}
            />
        </div>
    );
};

const areEqual = (prevProps, nextProps) => {
    if (_.isEqual(prevProps.map_data, nextProps.map_data)) return true;
    return false;
}

export default React.memo(Map, areEqual);