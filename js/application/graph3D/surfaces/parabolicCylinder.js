Surface.prototype.parabolicCylinder = (
    color = '#f03538', x = -20, y = -20, z = 0, count = 50, a = 50
) => {
    this.points = [];
    this.edges = [];
    this.polygones = [];
    let u = -1;
    //точки
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < count; i++) {
            points.push(
                new Point(
                    x + i * i / a,
                    y + j * 5,
                    z + Math.pow(u, i) * i
                )
            );
        }
    }
    //ребра
    for (let i = 0; i < count; i++) {
        edges.push(new Edge(i * count, i * count + 1));
    }
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            if (((i + 2) != count) && ((i + 2) != (count + 1))) {
                edges.push(new Edge(j * count + i, j * count + i + 2));
            }
            if ((j + 1) != count) {
                edges.push(new Edge(j * count + i, (j + 1) * count + i));
            }
        }
    }
    //полигоны
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            if (((i + 2) != count) && ((i + 2) != (count + 1)) && ((j + 1) != count)) {
                polygones.push(new Polygon([i, i + 2, j * count + 2 + i, j * count + i], color));
            }/*else {
    polygones.push(new Polygon([i, i + 1,j*count+2+i,j*count+i], color));
    }*/
        }
    }
    /*for (let i = 0; i < count; i++) {
    if((j+1)!=count){
    polygones.push(new Polygon([(count-2)*count+i,(count-2)*count+i+2,(count-1)*count+i+2,(count-1)*count+i], color));
    }
    }*/
    return new Subject(points, edges, polygones);
}