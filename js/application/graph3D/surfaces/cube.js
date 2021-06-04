Surface.prototype.cube = (x = 0, y = 0, z = 0, size = 10, color = '#f03538') => {
    return new Subject([
        new Point(x, y, z),
        new Point(x + size, y, z),
        new Point(x, y + size, z),
        new Point(x, y, z + size),
        new Point(x, y + size, z + size),  
        new Point(x + size, y, z + size),           
        new Point(x + size, y + size, z),
        new Point(x + size, y + size, z + size)
    ],
    [
        new Edge(0, 1),
        new Edge(1, 6),
        new Edge(0, 2),
        new Edge(0, 3),
        new Edge(1, 5),
        new Edge(3, 5),
        new Edge(3, 4),
        new Edge(2, 4),
        new Edge(6, 7),
        new Edge(4, 7),
        new Edge(5, 7),
        new Edge(6, 2)
    ],
    [
        new Polygon([0,1,5,3], color),
        new Polygon([0,2,4,3], color),
        new Polygon([0,2,6,1], color),
        new Polygon([4,3,5,7], color),
        new Polygon([2,4,7,6], color),
        new Polygon([6,1,5,7], color)
    ]
    );
}