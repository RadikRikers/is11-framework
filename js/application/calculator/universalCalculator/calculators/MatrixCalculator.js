class MatrixCalculator extends RealCalculator {
    add(a,b){
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map(
            (arr, i) => arr.map(
                (elem, j) => calc.add(elem, b.values[i][j])
            )
        ));
    }

    sub(a,b){
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map(
            (arr, i) => arr.map(
                (elem, j) => calc.sub(elem, b.values[i][j])
            )
        ));
    }

    mult(a, b) {
        const calc = this.get(a.values[0][0]);
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            const row = [];
            for (let j = 0; j < a.values[i].length; j++) {
                const multiply = [];
                for (let k = 0; k < a.values[i].length; k++) {
                    multiply.push(calc.mult(a.values[k][i], b.values[j][k]));
                }
                row.push(multiply.reduce(
                    (sum, current) => calc.add(sum, current), 
                    calc.zero(a.values.length, a.values[0][0])
                ));
            }
            values.push(row);
        }
        return new Matrix(values);
    }

    prod(a,p){
        const calc = this.get(a.values[0]);
        let c = [];
        for(let i = 0; i < a.values.length; i++){
            let row = [];
            for(let j = 0; j < a.values.length; j++){
                row.push(calc.mult(a.values[i][j], p));
            }
            c.push(row);
        }
        return new Matrix(c);
    }

    zero(length, elem){
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < length; i++){
            values.push([]);
            for(let j = 0; j < length; j++){
                values[i][j] = this.type(calc, elem, 'zero'); 
            }
        }
        return new Matrix(values);
    }

    one(length, elem){
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < length; i++){
            values.push([]);
            for(let j = 0; j < length; j++){
                values[i][j] = (i === j) ? 
                    this.type(calc, elem, 'one'): 
                    this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }
}