class VectorCalculator extends RealCalculator {
    add(a,b){
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.add(elem, b.values[i])));
    }

    sub(a,b){
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.sub(elem, b.values[i])));
    }

    mult(a,b){
        const calc = this.get(a.values[0]);
        let x = calc.sub(calc.mult(a.values[1],b.values[2]),
            calc.mult(a.values[2],b.values[1]));
        let y = calc.sub(calc.mult(a.values[2],b.values[0]),
            calc.mult(a.values[0],b.values[2]));
        let z = calc.sub(calc.mult(a.values[0],b.values[1]),
            calc.mult(a.values[1],b.values[0]));
        return new Vector([x, y, z]);
    }

    div(){
        return null;
    }

    pow(a, n){
        let c = new Vector(a.values);
        for(let i = 1; i < n; i++){
            c = this.mult(a,c);
        }
        return c;
    }

    prod(a,p){
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map(elem, i => calc.mult(elem[i], p)));
    }

    zero(length, elem){
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < length; i++){
            values.push(this.type(calc, elem, 'zero'));
        }
        return new Vector(values);
    }

    one(length, elem){
        const calc = this.get(elem);
        const values = [];
        for(let i = 0; i < length; i++){
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }
}