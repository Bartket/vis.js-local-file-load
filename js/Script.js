// Vis.js config and File Reader (parser)

// Vis.js config

var _nodes = new vis.DataSet();
var _edges = new vis.DataSet();

var container = document.getElementById('mynetwork');
var data = {
  nodes: _nodes,
  edges: _edges,
};
var options = {
   nodes: {
     shape: 'dot',
     font: {
       face: 'Tahoma'
     }
   },
   edges: {
     width: 0.15,
     smooth: {
       type: 'continuous'
     }
   },
   interaction: {
     tooltipDelay: 200,
     hideEdgesOnDrag: false
   },
   physics: false,
   edges: {
     smooth: false
   }
 };
var network = new vis.Network(container, data, options);

// File Reader (parser)

function loadFile() {
  var input, file, fr;

  if (typeof window.FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');
  if (!input) {
    alert("Um, couldn't find the fileinput element.");
  }
  else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  }
  else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  }
  else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e) {
    lines = e.target.result;
    var Network = JSON.parse(lines);
    _nodes.add(Network.nodes);
    _edges.add(Network.edges);
  }

}
