class RealCalculator {
    add(a, b) {
        return a + b;
    }
    
    sub(a, b){
        return a - b;
    }

    mult(a, b){
        return a * b;
    }


    div(a, b){
        if(b != 0){
            return a / b;
        }
    }

    pow(a, n){
        return Math.pow(a,n);
    }

    prod(a, p){
        return a * p;
    }

    zero() {
        return 0;
    }

    one() {
        return 1;
    }

    get(a){        
        if(a instanceof Matrix) return new MatrixCalculator;
        if(a instanceof Complex) return new ComplexCalculator;
        if(a instanceof Vector) return new VectorCalculator;
        return new RealCalculator;
    }

    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](
                elem.values.length, 
                elem.values[0][0]
            );
        } else if (elem instanceof Vector) {
            return calc[method](
                elem.values.length, 
                elem.values[0]
            );
        }
        return calc[method]();
    }
}