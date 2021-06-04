class App extends Component {
    constructor(options){
        super(options);
        this.header = new HeaderComponent({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showGraph2D: () => this.showGraph2D(),
                showCalculator: () => this.showCalculator(),
                showGraph3D: () => this.showGraph3D()
            }
        });
        this.graph2D = new Graph2DComponent({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate
        });
        this.calculator = new CalculatorComponent({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate
        });
        this.graph3D = new Graph3DComponent({
            id: 'Graph3D',
            parent: this.id,
            template: template.graph3DTemplate
        });

        // проинициализировать компоненты
        this.calculator.hide();
        this.graph3D.hide();
    }

    showGraph2D() {
        this.calculator.hide();
        this.graph2D.show();
        this.graph3D.hide();
    }

    showCalculator() {
        this.graph2D.hide();
        this.calculator.show();
        this.graph3D.hide();
    }

    showGraph3D() {
        this.graph2D.hide();
        this.calculator.hide();
        this.graph3D.show();
    }
}