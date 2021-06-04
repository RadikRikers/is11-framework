class UniversalCalculator extends RealCalculator{
    Complex(re, im){
        return new Complex(re, im);
    }

    Vector(values){
        return new Vector(values);
    }

    Matrix(values){
        return new Matrix(values);
    }

    add(a, b){
        return this.get(a).add(a,b);
    }

    sub(a, b){
        return this.get(a).sub(a,b);
    }

    mult(a, b){
        return this.get(a).mult(a,b);
    }

    div(a,b){
        return this.get(a).div(a,b);
    }

    prod(a, p) {
        if(typeof(p) === 'number'){
            return this.get(a).prod(a,p);
        }
        return null;
    }

    pow(a, n) {
        if(typeof(n) === 'number'){
            return this.get(a).pow(a,n);
        }
        return null;
    }

    one(type, elem){
        type = type?type:elem?elem.constructor.name:null;
        switch(type){
            case 'Complex': return new ComplexCalculator.one();
            case 'Vector': return new VectorCalculator.one(elem.values.length, elem.values[0]);
            case 'Matrix': return new MatrixCalculator.one(elem.values.length, elem.values[0][0]);
            default: return super.one();
        }
    }

    zero(type, elem){
        type = type ? type : elem ? elem.constructor.name : null;
        switch(type){
            case 'Complex': return (new ComplexCalculator).zero();
            case 'Vector': return (new VectorCalculator).zero(elem.values.length, elem.values[0]);
            case 'Matrix': return (new MatrixCalculator).zero(elem.values.length, elem.values[0][0]);
            default: return super.zero();
        }
    }
}