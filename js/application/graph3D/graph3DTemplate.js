Template.prototype.graph3DTemplate = () => `
    <div class="content">
        <canvas width="500" height="500" id="canvas3D"></canvas>
        <div class="boxes">
            <input type="checkbox" id="points" name="points" checked="checked">
            <label>Точки</label>
            <input type="checkbox" id="edges" name="edges" checked="checked">
            <label>Рёбра</label>
            <input type="checkbox" id="polygones" name="polygones" checked="checked">
            <label>Полигоны</label>
            <br>
            <select id="figure">
                <option value="Сфера">Сфера</option>
                <option value="Куб">Кубик</option>
                <option value="Тор">Бублик</option>
                <option value="Пирамида">Пирамидка</option>
                <option value="Овал">Овальчик:3</option>
                <option value="ЭЦ">Эллиптический Цилиндр</option>
                <option value="ПЦ">Параболический Цилиндр</option>
                <option value="ОГ">Однополосный гиперболоид</option>
                <option value="ЭП">Эллиптический параболоид</option>
                <option value="ДГ">Двухполосный гиперболоид</option>
                <option value="ГЦ">Гиперболический цилиндр</option>
                <option value="Седло">Седло блин</option>
            </select>
            <br>
            <input type="range" id="lumen" min="0" max="100000" step="1000" value="25000">
            <label>Свет</label>
            <br>
            <button id="change">ОАОААА</button>
        </div>
    </div>`;