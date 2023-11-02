class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let nodeArray = Array.from(this.nodes);
    let idx = nodeArray.indexOf(vertex);
    if (idx >= 0) {
      nodeArray.splice(idx, 1);
      this.nodes = new Set(nodeArray);
    }

    for (let node of nodeArray) {
      let adjacentArray = Array.from(node.adjacent);
      let idx = adjacentArray.indexOf(vertex);
      if (idx >= 0) {
        adjacentArray.splice(idx, 1);
        node.adjacent = new Set(adjacentArray);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let visited = new Set(stack);
    let result = [];

    while (stack.length > 0) {
      let current = stack.pop();
      result.push(current.value);
      current.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let visited = new Set(queue);
    let result = [];

    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current.value);
      current.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
