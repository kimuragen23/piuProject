$(document).ready(() => {
    // Handler for .ready() called.
    $("#btn-getorder").on("click", () => {
        console.log("주문하기 버튼 클릭!");
        getOrder();
    })
});


function getOrder() {
    let sendData = JSON.stringify({
        cust_name: $("#name").val(),
        order_code: $("#ordercode").val(),
        cust_pwd: $("#pwd").val()
    });

    $.ajax({
        type: 'post', // 타입 (get, post, put 등등)
        url: '/orders/detail', // 요청할 서버url
        headers: { // Http header
            "Content-Type": "application/json",
        },
        dataType: 'json', // 데이터 타입 (html, xml, json, text 등등)
        data: sendData,
        success: function (result) { // 결과 성공 콜백함수
            $("#cust_name").text(result.cust_name);
            $("#email").text(result.email);
            $("#phone_number").text(result.phone_number);
            $("#depositor_name").text(result.depositor_name);
            $("#orderstatus").text(result.orderstatus);
            $("#account_name").text(result.account_name);
            $("#account_number").text(result.account_number);
            $("#account_bank").text(result.account_bank);
            $("#product_count").text(result.product_count);
            $("#product_name").text(result.product_name);
            $("#product_price").text(result.product_price);
            $("#cust_post").text(result.address.cust_post);
            $("#cust_address").text(result.address.cust_address);
            $("#cust_detailaddress").text(result.address.cust_detailaddress);

            $("#card-orderdetail").removeClass("hide");
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log(error);
        }
    });
}

