class Graph2DComponent extends Component {
    constructor(options) {
        super(options);

        this.graphs = [];
    
        this.WINDOW = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        };
    
        this.graph = new Graph({
            id: 'canvas',
            width: 800,
            height: 800,
            WINDOW: this.WINDOW,
            callbacks: { 
                wheel: event => this.wheel(event), 
                mouseup: () => this.mouseup(), 
                mousedown: () => this.mousedown(), 
                mousemove: event => this.mousemove(event), 
                mouseleave: () => this.mouseleave()
            }
        });
        this.ui = new UI({ 
            callbacks: { 
                enterFunction: (f, num) => this.enterFunction(f, num),
                delFunction: num => this.delFunction(num)
            }
        });
    
        this.zoomStep = 0.2;
        this.canScroll = false;
   
        this.renderGraph();
    }


    enterFunction(f, num) {
        this.graphs[num] = {
            f,
            color: '#f23',
            width: 3
        };
        this.renderGraph();
    }
    delFunction(num) {
        this.graphs[num] = null;
        this.renderGraph();
    }

    wheel(event) {
        var delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep;
        if (this.WINDOW.WIDTH - this.zoomStep > 0) {
            this.WINDOW.WIDTH += delta;
            this.WINDOW.HEIGHT += delta;
            this.WINDOW.LEFT -= delta / 2;
            this.WINDOW.BOTTOM -= delta / 2;
        }
        this.renderGraph();
    }

    mousedown() {
        this.canScroll = true;
    }
    mouseup() {
        this.canScroll = false;
    }
    mouseleave() {
        this.canScroll = false;
    }
    mousemove(event) {
        if (this.canScroll) {
            this.WINDOW.LEFT -= this.graph.sx(event.movementX);
            this.WINDOW.BOTTOM -= this.graph.sy(event.movementY);
        }
        this.renderGraph();
    }

    printFunction(f, color, width) {
        var x = this.WINDOW.LEFT;
        var dx = this.WINDOW.WIDTH / 300;
        while (x < this.WINDOW.WIDTH + this.WINDOW.LEFT) {
            try {
                this.graph.line(x, f(x), x + dx, f(x + dx), color, width);
            } catch (e) { }
            x += dx;
        }
    }

    printOXY() {
        const { LEFT, WIDTH, BOTTOM, HEIGHT } = this.WINDOW;
        var size = 0.1;
        var MAIN_COLOR = '#000';
        var SEC_COLOR = '#bbb';
        // Ox
        this.graph.line(LEFT, 0, WIDTH + LEFT, 0, MAIN_COLOR, 1);
        // Oy
        this.graph.line(0, BOTTOM, 0, HEIGHT + BOTTOM, MAIN_COLOR, 1);
        // Ox >
        this.graph.line(WIDTH + LEFT, 0, WIDTH + LEFT - 1 / 2, size, MAIN_COLOR, 1);
        this.graph.line(WIDTH + LEFT, 0, WIDTH + LEFT - 1 / 2, -size, MAIN_COLOR, 1);
        // Oy >
        this.graph.line(0, HEIGHT + BOTTOM, +size, HEIGHT + BOTTOM - 1 / 2, MAIN_COLOR, 1);
        this.graph.line(0, HEIGHT + BOTTOM, -size, HEIGHT + BOTTOM - 1 / 2, MAIN_COLOR, 1);
        for (var i = 1; i < WIDTH + LEFT; i++) {
            this.graph.line(i, HEIGHT, i, BOTTOM, SEC_COLOR, 1);
            if (i % 5 == 0) {
                this.graph.line(i, -size * 2, i, size * 2, MAIN_COLOR, 2);
            } else {
                this.graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > LEFT; i--) {
            this.graph.line(i, HEIGHT, i, BOTTOM, SEC_COLOR, 1);
            if (i % -5 == 0) {
                this.graph.line(i, -size * 2, i, size * 2, MAIN_COLOR, 2);
            } else {
                this.graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = 1; i < HEIGHT + BOTTOM; i++) {
            this.graph.line(LEFT, i, WIDTH, i, SEC_COLOR, 1);
            if (i % 5 == 0) {
                this.graph.line(-size * 2, i, size * 2, i, MAIN_COLOR, 2);
            } else {
                this.graph.line(-size, i, size, i, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > BOTTOM; i--) {
            this.graph.line(LEFT, i, WIDTH, i, SEC_COLOR, 1);
            if (i % -5 == 0) {
                this.graph.line(-size * 2, i, size * 2, i, MAIN_COLOR, 2);
            } else {
                this.graph.line(-size, i, size, i, MAIN_COLOR, 1);
            }
        }
    }

    printNumbers() {
        for (var i = 1; i < this.WINDOW.WIDTH + this.WINDOW.LEFT; i++) {
            this.graph.number(i, i, 0, 'x');
        }
        for (var i = 1; i < Math.abs(this.WINDOW.LEFT); i++) {
            this.graph.number(-i, -i, 0, 'x');
        }
        for (var i = 1; i < this.WINDOW.HEIGHT + this.WINDOW.BOTTOM; i++) {
            this.graph.number(i, 0, i, 'y');
        }
        for (var i = 1; i < Math.abs(this.WINDOW.BOTTOM); i++) {
            this.graph.number(-i, 0, -i, 'y');
        }
        this.graph.number('0', 0, 0, '0');
    }

    getZero(f, a, b, eps) {
        if (isNaN(f(a) - 0) || isNaN(f(b) - 0)) {
            return null;
        }
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (Math.abs(a - b) < eps) {
            return (a + b) / 2;
        }
        var half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return this.getZero(f, a, half, eps);
        }
        if (f(half) * f(b) <= 0) {
            return this.getZero(f, half, b, eps);
        }
    }

    renderGraph() {
        this.graph.clear();
        this.printOXY();
        for (var i = 0; i < this.graphs.length; i++) {
            if (this.graphs[i]) {
                this.printFunction(
                    this.graphs[i].f, 
                    this.graphs[i].color, 
                    this.graphs[i].width
                );
                this.graph.printFuncNames(
                    this.graphs[i].name, 
                    this.graphs[i].nameCoor, 
                    this.graphs[i].f, 
                    this.graphs[i].color
                );
            }
        }
        this.printNumbers();
        // нарисовать ноль
        /*var x = this.getZero(this.graphs[0].f, 1, 4, 0.0001);
        if (x !== null) {
            // нарисовать асимптоты 
            // график другим цветом
            this.graph.point(x, 0, 3); // нарисовать точку
        }*/
    }
}