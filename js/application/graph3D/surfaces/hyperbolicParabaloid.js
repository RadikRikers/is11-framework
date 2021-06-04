Surface.prototype.hyperbolicParaboloid = (p = 2, q = 2, count = 20, color = '#f03538') => {

    const points = [];
    const edges = [];
    const polygones = [];

    const LEFT = -10;
    const RIGHT = 10
    const step = (RIGHT - LEFT) / count;
    //точки 
    for (let x = LEFT; x < RIGHT; x += step) {
        for (let y = LEFT; y < RIGHT; y += step) {
            points.push(new Point(
                x,
                (x ** 2 / p - y ** 2 / q) / 2,
                y,
            ));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1] && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));

        }
    }

    for (let i = 0; i < points.length; i++) {
        if (points[i + 1 + count] && (i + 1) % count !== 0) {
            polygones.push(new Polygon([
                i,
                i + 1,
                i + 1 + count,
                i + count
            ], color));
        }
    }

    return new Subject(points, edges, polygones);
}