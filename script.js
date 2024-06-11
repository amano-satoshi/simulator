$(function() {
    /* 面積計算切替 */
    $('.calc-btn').click(function() {
        $('.select-content').hide();
        $('.calc-content').show();
    });
    $('.back-btn').click(function() {
        $('.calc-content').hide();
        $('.select-content').show();
    });

    /* 都道府県切替 */
    $('[class=select-form]').change(function() {
        // 選択されているvalue属性値を取り出す
        let val = $('[class=select-form]').val();
        console.log(val);
        $('[class=image]').removeClass('active');
        $('[class=image]').eq(val).addClass('active');
        console.log($('[class=image]').eq(val));
    });
});