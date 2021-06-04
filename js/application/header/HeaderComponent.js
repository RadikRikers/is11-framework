class HeaderComponent extends Component {
    addEventListeners() {
        document.getElementById('showGraph2D').
            addEventListener('click', () => this.callbacks.showGraph2D());
        document.getElementById('showCalculator').
            addEventListener('click', () => this.callbacks.showCalculator());
        document.getElementById('showGraph3D').
            addEventListener('click', () => this.callbacks.showGraph3D());
    }
}