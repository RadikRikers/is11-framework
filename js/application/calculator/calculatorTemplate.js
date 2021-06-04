Template.prototype.calculatorTemplate = () => `
<div class="content">
    <div class="info">
        <div id="calcElement">информация по элементу</div>
        <div id="matrixSize"></div>
        <div id="vectorSize"></div>
        <button id="clearElement">Очистить</button>
    </div>
    <div class="controls">
        <div class="matrixControls">
            <button id="addMatrix">+Матрица</button>
            <button id="subMatrixSize">-</button>
            <button id="addMatrixSize">+</button>
        </div>
        <div class="vectorControls">
            <button id="addVector">+Вектор</button>
            <button id="subVectorSize">-</button>
            <button id="addVectorSize">+</button>
        </div>
        <button id="addComplex">+Комплексное число</button>
    </div>
    <div id="calc" class="calculator">
        <div id="firstNumber"></div>
        <button id="add">Сложить</button>
        <button id="sub">Вычитание</button>
        <button id="mult">Умножение</button>
        <button id="div">Деление</button>
        <div id="secondNumber"></div>
    </div>
    <button id="calcBtn">Посчитать</button>
    <div id="answer"></div>
</div>
`;