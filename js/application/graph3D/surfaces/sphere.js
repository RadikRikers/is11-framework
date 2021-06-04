Surface.prototype.sphere = (color = '#f03538', x = 0, y = 0, z = 0, R = 10, vertPoints = 9, horizPoints = 9) => {
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
                    x + R * Math.sin(angleVert * i) * Math.cos(angleHoriz * j),
                    y + R * Math.sin(angleVert * i) * Math.sin(angleHoriz * j),
                    z + R * Math.cos(angleVert * i)
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
    
    /*
    let ooaaa = [];
    for(let i = 0; i < polygones.length; i++){
        if(i % 2 === 1){
            ooaaa.push(polygones[i]);
        }
    }
    */
    return new Subject(points, edges, polygones);
}