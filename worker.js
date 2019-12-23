importScripts('https://d3js.org/d3.v5.min.js');

self.addEventListener('message', e => {
    const { file } = e.data;
    console.time('taskA')
    d3.csv(file).then(data => {
        postMessage(data);
        console.timeEnd('taskA')
    })
})