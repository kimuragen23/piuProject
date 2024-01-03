$(document).ready(() => {
    $("#btn-order").on("click", () => {
        sendOrder();
    })
});


function sendOrder() {
    let sendData = JSON.stringify({
        cust_name: $("#name").val(),
        order_code: $("#ordercode").val(),
        cust_pwd: $("#pwd").val()
    });

    $.ajax({
        type: 'post', // 타입 (get, post, put 등등)
        url: '/orders/dpstPrcsn', // 요청할 서버url
        headers: { // Http header
            "Content-Type": "application/json",
        },
        data: sendData,
        success: function (result) { // 결과 성공 콜백함수
            alert("업데이트 되었습니다.");
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log(error);
        }
    });
}