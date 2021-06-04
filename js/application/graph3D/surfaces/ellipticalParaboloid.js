Surface.prototype.ellipticalParaboloid = (color = '#f03538', x = 0, y = -55, a = 10, b = 5, t = 20, h = 20) => {
    angle = 2 * Math.PI / t;
    let points = [];
    let edges = [];
    let polygones = [];

    //точки
    for(let j = 0; j < h; j++){
        for (let i = 0; i < t; i++) {
            points.push(
                new Point(
                    x + a*j*Math.cos(angle*i),
                    y + Math.pow(j, 2),
                    b*j*Math.sin(angle*i),
                )
            )
        }    
    }
    
    //ребра

    let current = h;
    for (let i = h; i < t * h; i++) {
        if (i % h != h - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += h;
        }
    }
    for (let i = 0; i < t * h - h; i++) {
        edges.push(new Edge(i, i + h));
    }

    //полигоны

    let polCurrent = 0;
    for (let i = 0; i < t * h - h; i++) {
        if (i % h != h - 1) {
            polygones.push(new Polygon([i, i + 1,i + h + 1 , i + h], color));
        } else {
            polygones.push(new Polygon([i, polCurrent,i + 1 , i + h], color));
            polCurrent += h;
        }
    }
    let dotes = [];
    for(let i = 1; i <= h; i++){
        dotes.push(t * h - i);
    }
    polygones.push(new Polygon(dotes, color));

    return new Subject(points, edges, polygones);
}