Surface.prototype.pyramid = (color = '#f03538', a = 5, b = 5, count = 30, height = 5, x = 0, z = 0) => {
    let points = [];
    let edges = [];
    let polygones = [];
    let angle = 2 * Math.PI / count;
    for (let i = 0; i < count; i++) {
        points.push(new Point(a * Math.cos(0 + angle * i) + x, -5, b * Math.sin(0 + angle * i) + z));
    }
    points.push(new Point(x, height, z));
    for(let i = 0; i < count; i++){
        edges.push(new Edge(i, points.length - 1));
        edges.push(new Edge(i, i + 1));
    }
    edges.push(new Edge(0, points.length-2));
    let dotes = [];
    for(let i = 0; i < points.length - 1; i++){
        dotes.push(i);
    }
    for(let i = 0; i < points.length - 1; i++){
        polygones.push(new Polygon([points.length-1, i, i + 1], color));
    }
    polygones.push(new Polygon(dotes, color));
    polygones.push(new Polygon([0, points.length - 2, points.length-1], color));
    return new Subject(points, edges, polygones);
}