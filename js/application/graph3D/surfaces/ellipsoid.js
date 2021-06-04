Surface.prototype.ellipsoid = (color = '#f03538', x = 0, y = 0, z = 0, a=20, b=10, c=10, vertPoints = 50, horizPoints = 50) => {
    angleVert = Math.PI / vertPoints;
    angleHoriz = 2 * Math.PI / horizPoints;
    let points = [];
    let edges = [];
    let polygones = [];
    //точки
    for (let i = 0; i < vertPoints; i++) {
        for (let j = 0; j < horizPoints; j++) {
            points.push(
                new Point(
                    x + a * Math.sin(angleVert * i) * Math.cos(angleHoriz * j),
                    y + b * Math.sin(angleVert * i) * Math.sin(angleHoriz * j),
                    z + c * Math.cos(angleVert * i)
                )
            );
        }
    }
    //рёбра
    let current = horizPoints;
    for (let i = horizPoints; i < vertPoints * horizPoints; i++) {
        if (i % horizPoints != horizPoints - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += horizPoints;
        }
    }
    for (let i = 0; i < vertPoints * horizPoints - horizPoints; i++) {
        edges.push(new Edge(i, i + horizPoints));
    }
    //полигоны
    let polCurrent = 0;
    for (let i = 0; i < vertPoints * horizPoints - horizPoints; i++) {
        if (i % horizPoints != horizPoints - 1) {
            polygones.push(new Polygon([i, i + 1,i + horizPoints + 1 , i + horizPoints], color));
        } else {
            polygones.push(new Polygon([i, polCurrent,i + 1 , i + horizPoints], color));
            polCurrent += horizPoints;
        }
    }
    let dotes = [];
    for(let i = 1; i <= horizPoints; i++){
        dotes.push(vertPoints * horizPoints - i);
    }
    polygones.push(new Polygon(dotes, color));
    return new Subject(points, edges, polygones);
}