class PolynomialCalculator {
    polynomial(members){
        return new Polynomial(members);
    }

    add(a,b){
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            //console.log(elemA, member);
            if(member){
                members.push(new Member(calc.
                    add(elemA.value, member.value), elemA.power));   
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => { 
            if(!members.find(elemA => elemA.power === elemB.power)){
                members.push(new Member(elemB.value, elemB.power));
            } 
        });
        
        return new Polynomial(members);        
    }

    sub(a,b){
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if(member){
                members.push(new Member(calc.
                    sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => { 
            if(!members.find(elemA => elemA.power === elemB.power)){
                members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
            }
        });
        return new Polynomial(members);        
    }

    mult(a,b){
        const calc = new UniversalCalculator;
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if(member){
                members.push(new Member(calc.
                    mult(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => { 
            if(!members.find(elemA => elemA.power === elemB.power)){
                members.push(new Member(elemB.value, elemB.power));
            } 
        });
        return new Polynomial(members);        
    }
}