class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        this.WINDOW = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        };
        this.lumenValue = document.getElementById('lumen').value;
        this.LIGHT = new Light(-40, 10, -20, this.lumenValue);
        this.canRotate = false;
        this.isLeftClicked = false;
        this.isMiddleClicked = false;
        this.dx = 0;
        this.dy = 0;
        this.dz = 0;
        this.sur = new Surface;
        this.zoomStep = 0.9;
        this.graph2D = new Graph({
            WINDOW: this.WINDOW,
            id: 'canvas3D',
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mouseleave: () => this.mouseleave(),
                mousedown: (event) => this.mousedown(event),
                mousemove: (event) => this.mousemove(event)
            }
        });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.figure = this.sur.sphere();
        document.getElementById('lumen').addEventListener("change", () => {
            let size = document.getElementById('lumen').value;
            this.LIGHT.lumen = size;
            this.printScene();
        });
        document.getElementById('change').addEventListener('click', () => {
            //let clr = '#' + Math.floor(Math.random() * 0xF00000).toString(16);
            this.figure.setRandomColor();
            this.printScene();
        });
        document.getElementById('points').addEventListener("change", () => this.printScene());
        document.getElementById('edges').addEventListener("change", () => this.printScene());
        document.getElementById('polygones').addEventListener("change", () => this.printScene());
        document.getElementById('figure').addEventListener("change", () => {
            let fig = document.getElementById('figure').value;
            if (fig == "Сфера") {
                this.figure = this.sur.sphere();
            }
            if (fig == "Куб") {
                this.figure = this.sur.cube(-5, -5);
            }
            if (fig == "Тор") {
                this.figure = this.sur.donut();
            }
            if (fig == "Пирамида") {
                this.figure = this.sur.pyramid();
            }
            if (fig == "ЭЦ") {
                this.figure = this.sur.ellipticalCylinder();
            }
            if (fig == "ОГ") {
                this.figure = this.sur.oneSheetHyperboloid();
            }
            if (fig == "ЭП") {
                this.figure = this.sur.ellipticalParaboloid();
            }
            if (fig == "ПЦ") {
                this.figure = this.sur.parabolicCylinder();
            }
            if (fig == "Овал") {
                this.figure = this.sur.ellipsoid();
            }
            if (fig == "ДГ") {
                this.figure = this.sur.twoSheetHyperboloid();
            }
            if (fig == "ГЦ") {
                this.figure = this.sur.hyperbolicCylinder();
            }
            if (fig == "Седло") {
                this.figure = this.sur.hyperbolicParaboloid();
            }
            this.printScene();
        });
        this.printScene();
    }
    wheel(event) {
        let delta = (event.wheelDelta > 1) ? 1.1 : 0.9;
        for (let i = 0; i < this.figure.points.length; i++) {
            this.graph3D.zoom(delta, this.figure.points[i]);
        }
        this.printScene();
    }
    clear() {
        this.graph2D.clear();
    }
    printSubject(subject) {
        if (document.getElementById('polygones').checked) {
            this.graph3D.calcDistance(subject, this.WINDOW.CAMERA, 'distance');
            this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');
            this.graph3D.sortByArtistAlorithm(subject);
            for (let i = 0; i < subject.polygones.length; i++) {
                const points = subject.polygones[i].points;
                const array = [];
                for (let j = 0; j < points.length; j++) {
                    array.push({
                        x: this.graph3D.xs(subject.points[points[j]]),
                        y: this.graph3D.ys(subject.points[points[j]])
                    });
                }
                const lumen = this.graph3D.calcIlluminance(
                    subject.polygones[i].lumen, this.LIGHT.lumen
                );
                let { r, g, b } = subject.polygones[i].color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph2D.polygones(array, subject.polygones[i].rgbToHex(r, g, b));
                this.printText(`${i}`, points.x, points.y);
            }
        }
        if (document.getElementById('edges').checked) {
            for (let i = 0; i < subject.edges.length; i++) {
                const edge = subject.edges[i];
                const p1 = subject.points[edge.p1];
                const p2 = subject.points[edge.p2];
                this.graph2D.line(
                    this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2)
                );
            }
        }
        if (document.getElementById('points').checked) {
            for (let i = 0; i < subject.points.length; i++) {
                const point = subject.points[i];
                this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point));
            }
        }
    }
    printText(text, x, y) {
        let canv = document.getElementById('canvas3D');
        let ctx = canv.getContext('2d');
        this.graph2D.number3D(text, x, y, ctx);
    }
    printScene() {
        this.clear();
        this.printSubject(this.figure);
    }
    mouseup() {
        this.canRotate = false;
    }
    mouseleave() {
        this.canRotate = false;
    }
    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        if (event.which == 1) {
            this.isLeftClicked = true;
            this.isMiddleClicked = false;
        }
        if (event.which == 2) {
            this.isLeftClicked = false;
            this.isMiddleClicked = true;
        }
    }
    mousemove(event) {
        const angle = Math.PI / 3600;
        if (this.canRotate && this.isLeftClicked) {
            this.figure.points.forEach(point => {
                this.graph3D.rotateOy((this.dx - event.offsetX) * angle, point);
                this.graph3D.rotateOx((this.dy - event.offsetY) * angle, point);
            });
        }
        if (this.canRotate && this.isMiddleClicked) {
            this.figure.points.forEach(point => {
                this.graph3D.rotateOz((this.dz - event.offsetX) * angle, point);
            });
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
        this.dz = event.offsetY;
        this.printScene();
    }
}