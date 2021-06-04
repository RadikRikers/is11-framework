Surface.prototype.ellipticalCylinder = (color = '#f03538', x = 0, z = 0, a = 10, b = 5, t = 20, h = 15) => {
    angle = 2 * Math.PI / t;
    let points = [];
    let ellipse1 = [];
    let ellipse2 = [];
    let edges = [];
    let polygones = [];

    //точки

    for (let i = 0; i < t; i++) {
        ellipse1.push(
            new Point(
                x + a * Math.cos(angle * i),
                -h,
                z + b * Math.sin(angle * i)
            )
        );
        ellipse2.push(
            new Point(
                x + a * Math.cos(angle * i),
                h,
                z + b * Math.sin(angle * i)
            )
        );
    }
    for (let i = 0; i < t; i++) {
        points.push(ellipse1[i]);
    }
    for (let i = 0; i < t; i++) {
        points.push(ellipse2[i]);
    }

    //ребра

    for (let i = 0; i < t; i++) {
        if (i != t - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, 0));
        }
    }
    for (let i = t; i < 2 * t; i++) {
        if (i != 2 * t - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, t));
        }
    }

    for (let i = 0; i < t; i++) {
        edges.push(new Edge(i, i + t))
    }

    //полигоны

    for(let i = 0; i < t; i++){
        if (i != t - 1) {
            polygones.push(new Polygon([i, i + 1, i + t + 1, i + t], color));
        } else {
            polygones.push(new Polygon([i, 0, t, i + t], color));
        }
    }

    return new Subject(points, edges, polygones);
}