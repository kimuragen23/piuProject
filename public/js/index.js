$(document).ready(() => {
    getProduct({ productcode_id: 1 });
    getProduct({ productcode_id: 2 });

    $("#btn-getorder").on("click", () => {
        getOrder();
    })

    $("#btn-order").on("click", () => {
        sendOrder();
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

//상품정보를 가져옴.
function getProduct({ productcode_id = 1 } = {}) {
    let products = [];
    let product_name = "", price = "", inventory = "";
    $.ajax({
        type: 'get', // 타입 (get, post, put 등등)
        url: `/products/${productcode_id}`, // 요청할 서버url
        headers: { // Http header
            "Content-Type": "application/json",
        },
        success: function (result) {
            /*
                {
                    "product_id": 9,
                    "product_name": "곰돌이옷",
                    "price": 50000,
                    "size": "L",
                    "inventory": 10,
                    "brand_name": "테스트브랜드",
                    "brand_id": 1,
                    "productcode_id": 1
                }
             */

            product_name = result[0].product_name;
            price = result[0].price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            inventory = result[0].inventory;
            result.map((v, i) => {
                products.push(
                    {
                        product_id: v.product_id,
                        size: v.size,
                    }
                );
            });
            console.log(products);
            $(".productrow").append(makeTemplate({
                name: product_name,
                price: price,
                products: products
            }));
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log(error);
        }
    });
}

function makeTemplate({ name = "", price = "", products = [] }) {
    let selectOption = ``;
    products.map((v, i) => {
        selectOption += `<option value="${v.product_id}">${v.size}</option>`;
    });
    let selectTemplate = `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="${name}">사이즈</label>
            </div>
            <select class="custom-select" id="${name}-select">
                <option selected>선택해주세요</option>
                ${selectOption}
            </select>
        </div>
    `
    return `
        <div class="col-sm-4">
            <div class="card">
                <img src="/images/${name}.jpg" class="card-img-top" alt="..." width="300" height="300">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h3>${price}원</h3>
                    ${selectTemplate}
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">수량</span>
                        </div>
                        <input id="${name}-count"type="text" class="form-control" placeholder="수량" aria-label="수량" aria-describedby="basic-addon1">
                    </div>
                    <button type="button" class="btn btn-primary" onclick="step2(this)">주문하기</button>
                </div>
            </div>
        </div>
    `;
}

function step2(_) {
    $("#step1").addClass("hide");
    $("#step2").removeClass("hide");
    let name = $(_).parent().children().eq(0).text();
    let product_id = $(`#${name}-select`).find('option:selected').val();
    let size = $(`#${name}-select`).find('option:selected').text();
    let count = $(`#${name}-count`).val();

    $("#o_product_name").val(name);
    $("#o_product_name").data("product_id", product_id);


    $("#o_size").val(size);
    $("#o_product_count").val(count);
}

function sendOrder() {
    let sendData = {
        "cust_name": "",
        "phone_number": "",
        "email": "",
        "cust_pwd": "",
        "address": {
            "cust_post": "",
            "cust_address": "",
            "cust_detailaddress": ""
        },
        "product_info": {
            "product_id": 0,
            "orderproduct_count": 10
        },
        "agree": false,
        "depositor_name": ""
    }
    sendData.product_info.product_id = parseInt($("#o_product_name").data("product_id"));
    sendData.product_info.orderproduct_count = parseInt($("#o_product_count").val());
    sendData.cust_name = $("#o_name").val();
    sendData.phone_number = $("#o_phone_number").val();
    sendData.email = $("#o_email").val();
    sendData.cust_pwd = $("#o_pwd").val();
    sendData.address.cust_post = $("#o_post").val();
    sendData.address.cust_address = $("#o_address").val();
    sendData.address.cust_detailaddress = $("#o_addressdetail").val();
    sendData.depositor_name = $("#o_depositor_name").val();

    sendData.agree = $("#o_agree").is(':checked');

    $.ajax({
        type: 'post', // 타입 (get, post, put 등등)
        url: '/orders', // 요청할 서버url
        headers: { // Http header
            "Content-Type": "application/json",
        },
        dataType: 'json', // 데이터 타입 (html, xml, json, text 등등)
        data: JSON.stringify(sendData),
        success: function (result) { // 결과 성공 콜백함수
            console.log(result);
            $("#or_order_code").val(result.order_code);
            $("#step2").addClass("hide");
            $("#step3").removeClass("hide");
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log(error);
        }
    });
}