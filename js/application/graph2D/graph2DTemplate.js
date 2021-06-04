Template.prototype.graph2DTemplate = () => `
    <div class="content">
    <div>
        <button id="showHide">Скрыть/Показать</button>
    </div>
    <div class="over hide">
        <button id="addFunction">Добавить функцию</button>
        <div id="funcs"></div>
    </div>
    <canvas width="500" height="500" id="canvas"></canvas>
    </div>`;