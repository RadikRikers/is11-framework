function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function abs(x) { return Math.abs(x); }
function sqrt(x) { return Math.sqrt(x); }

class UI {
    constructor({ callbacks }) {
        this.callbacks = callbacks;
        this.num = 0;
        document.getElementById('addFunction')
            .addEventListener('click', () => this.addFunction());
        document.getElementById('showHide')
            .addEventListener('click', this.showHide);
    }

    showHide() {
        var div = document.querySelector('.over');
        div.classList.toggle('hide');
    }

    addFunction() {
        // инпут для функции
        var input = document.createElement('input');
        input.setAttribute('placeholder', `function №${this.num}`);
        input.dataset.num = this.num;
        input.addEventListener('keyup', () => this.keyup(input));
        // кнопка для удаления функции
        var button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.callbacks.delFunction(input.dataset.num);
            divFuncs.removeChild(input);
            divFuncs.removeChild(button);
        });
        // добавить элементы на страницу
        var divFuncs = document.getElementById('funcs');
        divFuncs.appendChild(input);
        divFuncs.appendChild(button);
        this.num++;
    }

    keyup(elem) {
        try {
            var f;
            eval(`f = function(x) { return ${elem.value}; }`);
            this.callbacks.enterFunction(f, elem.dataset.num);
        } catch(e) {
            //console.log(e);
        }
    }
}