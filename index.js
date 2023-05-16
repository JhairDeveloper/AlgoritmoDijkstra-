const camino = {
  uno: { dos: 100, tres: 30}, // 1
  dos: { tres: 20}, // 1
  tres: { cuatro: 10, cinco: 60 }, // 1
  cuatro: { cinco: 50, dos: 15}, // 1
  cinco: {} // 1
  //--------------------------------------
  //Total de 5
}

const caminoMasCorto = (costs, processed) => {
  return Object.keys(costs).
  reduce((previusValue, currentValue) => {   // 
    if (previusValue === null || costs[currentValue] < costs[previusValue]) { // This part could be hard to understand
      if (!processed.includes(currentValue)) {
        previusValue = currentValue;
      }
    }
    return previusValue;
  }, null);
};

const processNodes = (graph, parents, costs, node, processed) => {
    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
          let newCost = cost + children[n];
          if (!costs[n]) {
            costs[n] = newCost;
            parents[n] = node;
          }
          if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
          }
        }
        processed.push(node);
        node = caminoMasCorto(costs, processed);
      }
}

const dijkstra = (graph, startNode, finishNode) => {

  // Creo un nuevo objeto pero aniado una nueva caracteristica
  const costs = Object.assign({[finishNode]: Infinity}, graph[startNode]);

  // caminos, aniado key al objeto creado
  const parents = {[finishNode]: graph[finishNode]};

  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // pista de los nodos que ya han sido procesados
  const processed = [];

  let node = caminoMasCorto(costs, processed);

  processNodes(graph, parents, costs, node, processed);

  let optimalPath = [finishNode];
  let parent = parents[finishNode];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs[finishNode],
    path: optimalPath
  };

  return results;

};
console.log(camino);
function aniadir(){
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;;
    console.log(dijkstra(camino, start, end));
}
