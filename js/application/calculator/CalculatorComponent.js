class CalculatorComponent extends Component {
    constructor(options) {
        super(options);
        this.calc = new UniversalCalculator;
        this.a = null;
        this.b = null;
        this.c = null;
        this.matrixSize = 2;
        this.vectorSize = 3;
        this.clearElement();
    }

    addEventListeners() {
        document.getElementById('clearElement').addEventListener('click', () => this.clearElement());
        document.getElementById('addMatrix').addEventListener('click', () => this.addMatrix());
        document.getElementById('subMatrixSize').addEventListener('click', () => this.subMatrixSize());
        document.getElementById('addMatrixSize').addEventListener('click', () => this.addMatrixSize());
        document.getElementById('addVector').addEventListener('click', () => this.addVector());
        document.getElementById('subVectorSize').addEventListener('click', () => this.subVectorSize());
        document.getElementById('addVectorSize').addEventListener('click', () => this.addVectorSize());
        document.getElementById('addComplex').addEventListener('click', () => this.addComplex());
        document.getElementById('calcBtn').addEventListener('click', () => this.calcBtn());
        document.getElementById('add').addEventListener('click', () => this.addElements());
        document.getElementById('sub').addEventListener('click', () => this.subElements());
        document.getElementById('mult').addEventListener('click', () => this.multElements());
        document.getElementById('div').addEventListener('click', () => this.divElements());
    }

    addElements(){
        this.fillElements();
        const c = this.calc.add(this.a, this.b);
        console.log(c);
    }

    subElements(){
        this.fillElements();
        const c = this.calc.sub(this.a, this.b);
        console.log(c);
    }

    multElements(){
        this.fillElements();
        const c = this.calc.add(this.a, this.b);
        console.log(c);
    }

    divElements(){
        this.fillElements();
        const c = this.calc.add(this.a, this.b);
        console.log(c);
    }

    fillElements(){
        this.goToElementValues(this.a, document.querySelectorAll(".a"));
        this.goToElementValues(this.b, document.querySelectorAll(".b"));
    }

    goToElementValues(elem, values, num = 0, length = 0){
        if(elem instanceof Matrix){
            elem.values.forEach((column, j) => column.forEach((el, i) => {
                const index = j * elem.values.length + i + num * length;
                if(typeof el === 'number'){
                    elem.values[j][i] = values[index].value - 0;
                } else {
                    this.goToElementValues(elem.values[j][i], values, index, elem.values.length + 1);
                }
            }));
        } else if(elem instanceof Vector){
            elem.values.forEach((el,i) => {
                const index = i + num * length;
                if(typeof el === 'number'){
                    elem.values[i] = values[index].value - 0;
                } else {
                    this.goToElementValues(elem.values[i], values, index, elem.values.length + 1)
                }
            });
        } else if(elem instanceof Complex){
            elem.re = values[num * 2].value - 0;
            elem.im = values[num * 2 + 1].value - 0;
        } else {
            console.log(values, num);
            elem = values[num].value - 0;
        }
    }

    fillInfo() {
        const divElement = document.getElementById('calcElement');
        if (typeof this.a === 'number') {
            divElement.innerHTML = 'Вещественное число';
        }
        if (this.a instanceof Complex) {
            divElement.innerHTML = 'Комлпексное число';
        }
        if (this.a instanceof Matrix) {
            divElement.innerHTML = 'Матрица';
        }
        if (this.a instanceof Vector) {
            divElement.innerHTML = 'Вектор';
        }
        document.getElementById('matrixSize').innerHTML = `размер матрицы : ${this.matrixSize}`;
        document.getElementById('vectorSize').innerHTML = `размер вектора : ${this.vectorSize}`;
    }

    fillCalc(type) {
        document.getElementById('firstNumber').innerHTML = this.genCalculatorHTML(this.a,'a');
        document.getElementById('secondNumber').innerHTML = this.genCalculatorHTML(this.b,'b');
        
    }
    genCalculatorHTML(elem, className){
        if (elem instanceof Matrix) {
            return this.genMatrixHTML(elem.values.length, this.genCalculatorHTML(elem.values[0][0],className));
        } else if (elem instanceof Vector) {
            return this.genVectorHTML(elem.values.length, this.genCalculatorHTML(elem.values[0],className));
        } else if (elem instanceof Complex) {
            return `<input class="${className}" value="${elem.re}">+i*<input class="${className}" value="${elem.im}">`;
        }
        return `<input class="${className}" value="${elem}">`;
    }

    genMatrixHTML(size, elem){
        let str = '';
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                str+=`${elem}, `;
            }
            str+=`<br>`;
        }
        return `<span>(<span>${str}</span>)</span>`;
    }

    genVectorHTML(size, elem){
        let str = '';
        for(let i = 0; i < size; i++){
            str+=`${elem}, `;
        }
        str+=`<br>`;
        return `<span>(<span>${str}</span>)</span>`;
    }
    clearElement() {
        this.a = this.calc.zero();
        this.b = this.calc.zero();
        this.fillInfo();
        this.fillCalc('Real');
    }
    addComplex() {
        this.a = this.calc.zero('Complex');
        this.b = this.calc.zero('Complex');
        this.fillInfo();
        this.fillCalc('Complex');
    }
    addMatrix() {
        const values = [];
        for (let i = 0; i < this.matrixSize; i++) {
            values.push([]);
            for (let j = 0; j < this.matrixSize; j++) {
                values[i].push(this.a);
            }
        }
        this.a = this.calc.zero(null, this.calc.Matrix(values));
        this.b = this.calc.zero(null, this.calc.Matrix(values));
        this.fillInfo();
        this.fillCalc('Matrix');
    }
    addMatrixSize() {
        this.matrixSize++;
        this.fillInfo();
    }
    subMatrixSize() {
        if (this.matrixSize > 1) {
            this.matrixSize--;
        }
        this.fillInfo();
    }
    addVector() {
        const values = [];
        for (let i = 0; i < this.vectorSize; i++) {
            values.push([]);
            for (let j = 0; j < this.vectorSize; j++) {
                values[i].push(this.a);
            }
        }
        this.a = this.calc.zero(null, this.calc.Vector(values));
        this.b = this.calc.zero(null, this.calc.Vector(values));
        this.fillInfo();
        this.fillCalc('Vector');
    }
    addVectorSize() {
        this.vectorSize++;
        this.fillInfo();
    }
    subVectorSize() {
        if (this.vectorSize > 1) {
            this.vectorSize--;
        }
        this.fillInfo();
    }
    calcBtn() {
        let sign = document.getElementById('sign').value;
        let aArr = document.getElementsByClassName('firstNumb');
        let bArr = document.getElementsByClassName('secondNumb');
        let answer = document.getElementById('answer');
        answer.innerHTML = '';
        //преобразуем input'ы в переменную
        if (this.a instanceof Matrix) {
            let k = 0;
            for (let i = 0; i < this.matrixSize; i++) {
                for (let j = 0; j < this.matrixSize; j++) {
                    this.a.values[j][i] = +aArr[k].value;
                    this.b.values[j][i] = +bArr[k].value;
                    k++;
                }
            }
        } else if (this.a instanceof Vector) {
            for (let i = 0; i < this.vectorSize; i++) {
                this.a.values[i] = +aArr[i].value;
                this.b.values[i] = +bArr[i].value;
            }
        } else if (this.a instanceof Complex) {
            this.a.re = +aArr[0].value;
            this.a.im = +aArr[1].value;
            this.b.re = +bArr[0].value;
            this.b.im = +bArr[1].value;
        } else {
            this.a = +aArr[0].value;
            this.b = +bArr[0].value;
        }
        //выполняем действие
        if (sign == '+') {
            this.c = this.calc.add(this.a, this.b);
        }
        if (sign == '-') {
            this.c = this.calc.sub(this.a, this.b);
        }
        if (sign == '*') {
            this.c = this.calc.mult(this.a, this.b);
        }
        if (sign == '/') {
            this.c = this.calc.div(this.a, this.b);
        }
        //генерируем input для записи ответа
        if (this.c instanceof Matrix) {
            for (let i = 0; i < this.matrixSize; i++) {
                let column = document.createElement('div');
                column.classList.add('numberColumn');
                for (let j = 0; j < this.matrixSize; j++) {
                    let input = document.createElement('input');
                    input.value = this.c.values[j][i];
                    input.readOnly = true;
                    column.appendChild(input);
                }
                answer.appendChild(column);
            }
        } else if (this.c instanceof Vector) {
            for (let i = 0; i < this.vectorSize; i++) {
                let input = document.createElement('input');
                input.value = this.c.values[i];
                input.readOnly = true;
                answer.appendChild(input);
            }
        } else if (this.c instanceof Complex) {
            for (let i = 0; i < 2; i++) {
                let input = document.createElement('input');
                input.readOnly = true;
                if (i == 0) {
                    input.value = this.c.re;
                } else {
                    input.value = this.c.im;
                }
                answer.appendChild(input);
                if (i == 0) {
                    let aPlus = document.createElement('label');
                    aPlus.innerHTML = '+';
                    answer.appendChild(aPlus);
                }
            }
            let aIm = document.createElement('label');
            aIm.innerHTML = 'i';
            answer.appendChild(aIm);
        } else {
            let input = document.createElement('input');
            input.value = this.c;
            input.readOnly = true;
            answer.appendChild(input);
        }
    }

}