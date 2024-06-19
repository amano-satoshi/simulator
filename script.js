$(function() {
    $.jCanvas.defaults.fromCenter = false;
    $.jCanvas.defaults.layer = true;
    let c = $("#canvas1");
    let select_show = false;
    const image_list = ['./image/hokkaido.png', './image/aomori.png', './image/chiba.png', './image/gifu.png', './image/kyoto.png', './image/hiroshima.png', './image/kochi.png', './image/kagoshima.png'];
    const select_element = document.getElementById("select-form");
    const max_shapes = 5;
    let base_x = 400;
    let base_y = 100;
    let shape_num = 0;
    const shape_element = document.getElementById("shape-form");

    /* 設置図形数表示 */
    c.drawText({
        fillStyle: '#000',
        strokeStyle: '#000',
        strokeWidth: 1,
        x: 10, y: 10,
        fontSize: 32,
        fontFamily: 'Verdana, sans-serif',
        text: '設置数： ' + shape_num,
        name: "shape_count"
    });
    
    /* 面積計算切替 */
    $('.calc-btn').click(function() {
        $('.select-content').hide();
        $('.calc-content').show();
        c.setLayerGroup('shapes', {
            intangible: true
        });
    });
    $('.back-btn').click(function() {
        $('.calc-content').hide();
        $('.select-content').show();
        c.setLayerGroup('shapes', {
            intangible: false
        });
    });

    /* 結果表示 */
    $('.answer-btn').click(function() {
        $('.real-size').show();
        $('.score').show();
        $('.answer-btn').hide();
        $('.back-btn').hide();
        $('.output-btn').show();
    });

    /* 図形描画 */
    $('[class=shape-form]').change(function() {
        if (shape_num >= max_shapes) {
            return;
        }
        let val = $('[class=shape-form]').val();
        // 図形描画
        if (val == 1) { // 三角形
            shape_num += 1;
            c.drawLine({
                strokeStyle: '#000',
                fillStyle: 'rgba(0, 0, 153, 0.5)',
                strokeWidth: 1,
                x1: base_x + 50, y1: base_y,
                x2: base_x, y2: base_y + 100,
                x3: base_x + 100, y3: base_y + 100,
                closed: true,
                draggable: true,
                name : "triangle" + shape_num,
                groups: ['shapes']
            });
        } else if (val == 2) { // 四角形
            shape_num += 1;
            c.drawLine({
                strokeStyle: '#000',
                fillStyle: 'rgba(0, 153, 0, 0.5)',
                strokeWidth: 1,
                x1: base_x, y1: base_y,
                x2: base_x, y2: base_y + 100,
                x3: base_x + 100, y3: base_y + 100,
                x4: base_x + 100, y4: base_y,
                closed: true,
                draggable: true,
                name : "rectangle" + shape_num,
                groups: ['shapes']
            });
        } else if (val == 3) { // 平行四辺形
            shape_num += 1;
            c.drawLine({
                strokeStyle: '#000',
                fillStyle: 'rgba(153, 0, 0, 0.5)',
                strokeWidth: 1,
                x1: base_x + 50, y1: base_y,
                x2: base_x, y2: base_y + 100,
                x3: base_x + 100, y3: base_y + 100,
                x4: base_x + 150, y4: base_y,
                closed: true,
                draggable: true,
                name : "parallelogram" + shape_num,
                groups: ['shapes']
            });
        } else if (val == 4) { // 台形
            shape_num += 1;
            c.drawLine({
                strokeStyle: '#000',
                fillStyle: 'rgba(0, 153, 153, 0.5)',
                strokeWidth: 1,
                x1: base_x + 25, y1: base_y,
                x2: base_x, y2: base_y + 100,
                x3: base_x + 100, y3: base_y + 100,
                x4: base_x + 75, y4: base_y,
                closed: true,
                draggable: true,
                name : "trapezoid" + shape_num,
                groups: ['shapes']
            });
        } else if (val == 5) { // ひし形
            shape_num += 1;
            c.drawLine({
                strokeStyle: '#000',
                fillStyle: 'rgba(153, 0, 153, 0.5)',
                strokeWidth: 1,
                x1: base_x + 50, y1: base_y,
                x2: base_x - 25, y2: base_y + 50,
                x3: base_x + 50, y3: base_y + 100,
                x4: base_x + 125, y4: base_y + 50,
                closed: true,
                draggable: true,
                name : "rhombus" + shape_num,
                groups: ['shapes']
            });
        }
        shape_element.selectedIndex = 0;
        c.setLayer('shape_count', {
            text: '設置数： ' + shape_num,
        });
        c.drawLayers();
    });

    /* 図形リセット */
    $('.reset-btn').click(function() {
        shape_num = 0;
        // 図形レイヤー一斉削除
        c.removeLayerGroup('shapes');
        c.setLayer('shape_count', {
            text: '設置数： ' + shape_num,
        });
        c.drawLayers();
    });

    /* 都道府県表示 */
    $('[class=select-form]').change(function() {
        // 現在表示されている都道府県の削除
        if (select_show == true) {
            c.removeLayer('select');
            select_show = false;
        }
        let val = $('[class=select-form]').val();
        // 選択されている都道府県のレイヤー作成
        if (val != 0) {
            c.addLayer({
                type:'image',
                source: image_list[val-1],
                x: 340, y: 40,
                width: 600, height: 600,
                intangible: true,
                name : "select"
            });
        }
        // 最背面に設定
        c.moveLayer('select', 0);
        // 描画
        c.drawLayers();
        select_show = true;
        select_element.selectedIndex = 0;
    });
});