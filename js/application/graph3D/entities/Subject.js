class Subject {
    constructor(points = [], edges = [], polygones = []){
        this.points = points;
        this.edges = edges;
        this.polygones = polygones;
    }

    setRandomColor() {
        const color = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
        };
        for (let i = 0; i < this.polygones.length; ++i) {
            this.polygones[i].color = color;
        }
    };
}
