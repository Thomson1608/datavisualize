// importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js');

// import { csv } from 'd3';
export default () => {
    // self.importScripts('https://d3js.org/d3.v5.min.js');
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        console.log("TCL: e", e.data)
        // d3.csv(e.data.file).then(data => {
            // console.log(data)
        // })
        postMessage(e.data);
    })
}