Surface.prototype.donut = (color = '#f03538', R = 20, r = 5, widthPoints = 20, radiousPoints = 30) => {
    let points = [];
    let edges = [];
    let polygones = [];
    // R - радиус пончика, r - толщина пончика, radiousPoints - кол-во точек для R(сколько кругов), widthPoints - кол-во точек для r
    // точькиъ
    let alpha = 2 * Math.PI / widthPoints;
    let beta = 2 * Math.PI / radiousPoints;
    for (let j = 0; j < widthPoints; j++) {
        for (let i = 0; i < radiousPoints; i++) {
            points.push(
                new Point(
                    (R + r * Math.cos(alpha * j)) * Math.cos(beta * i),
                    (R + r * Math.cos(alpha * j)) * Math.sin(beta * i),
                    r * Math.sin(alpha * j) - 5,
                )
            );
        }
    }
    // ребъра
    let counter = radiousPoints - 1;
    let couplePoint = 0;
    for(let i = 0; i < radiousPoints * widthPoints;i++){
        if(i == counter){
            edges.push(new Edge(i, couplePoint));
            counter += radiousPoints;
            couplePoint = i + 1;
        } else {
            edges.push(new Edge(i, i + 1));
        }
    }   
    for (let i = 0; i < points.length; i++) {
        if (points[i + radiousPoints]) {
            edges.push(new Edge(i, i + radiousPoints));
        }
    }
    let firstPoints = [];
    let secondPoints = [];
    for(let i = 0; i < radiousPoints; i++){
        firstPoints.push(i);
    }
    for(let i = 0; i < radiousPoints; i++){
        secondPoints.push(points.length-1 - i);
    }
    for(let i = 0; i < firstPoints.length; i++){
        edges.push(new Edge(firstPoints[i], secondPoints[secondPoints.length-1 - i]));
    }
    //полигъОнес
    for(let i = 0; i < radiousPoints; i++){
        let circle1 = [];
        let circle2 = [];
        for(let j = 0; j < widthPoints; j++){
            if(i == radiousPoints - 1){
                circle1.push(i+j*radiousPoints);
                circle2.push(0+j*radiousPoints);
            } else {
                circle1.push(i+j*radiousPoints);
                circle2.push(i+1+j*radiousPoints);
            }
        } 
        for(let j = 0; j < circle1.length; j++){
            if(j!=circle1.length-1){
                polygones.push(new Polygon([circle1[j], circle1[j+1], circle2[j+1], circle2[j]], color));
            } else {
                polygones.push(new Polygon([circle1[j], circle1[0], circle2[0], circle2[j]], color));
            }
        }
    }
    return new Subject(points, edges, polygones);
}