const MERCARI = document.getElementById("mercari"),
  ETC = document.getElementById("etc"),
  PRICE = document.getElementById("calc-form__price-input__text"),
  SHIPPING = document.getElementById("calc-form__shipping-input__text"),
  BTN = document.getElementById("btn"),
  MESSAGE = document.querySelector(".js-price"),
  PRICE_CLEAR_BTN = document.getElementById("calc-form__price-input__btn"),
  SHIPPING_CLEAR_BTN = document.getElementById(
    "calc-form__shipping-input__btn"
  ),
  NO_PRICE = "금액이 입력되지 않았습니다",
  PRICE_ROW_THAN_ZERO = "금액이 0보다 작습니다.";

const stdPrice = 5000;

function clearPrice(event) {
  PRICE.value = "";
}
function clearShipping(event) {
  SHIPPING.value = "";
}

function handleInput(event) {
  const char = event.key;
  if (isNaN(char)) {
    alert("숫자만 입력해 주세요.");
    event.preventDefault();
    return true;
  } else {
    return false;
  }
}

function checkPrice(val, ship) {
  if (val === "") {
    alert(NO_PRICE);
    return -1;
  }
  if (val < 0 || ship < 0) {
    alert(PRICE_ROW_THAN_ZERO);
    return -1;
  }
  let sum = 0;
  if (ship === "") {
    sum = parseInt(val);
  } else {
    sum = parseInt(val) + parseInt(ship);
  }
  return sum;
}

function calcFeeFlea(sum) {
  if (sum < stdPrice) {
    return 300;
  } else {
    return sum * 0.06;
  }
}

function calcFeeShop(sum) {
  if (sum < stdPrice) {
    return 300 + 330;
  } else {
    return sum * 0.06 + 330;
  }
}

function handleCalc(event) {
  //총금액 변수 선언
  let price = checkPrice(PRICE.value, SHIPPING.value);
  if (price < 0) {
    return false;
  }
  //금액 공백 입력시 에러 후 종료
  let fee = 0;

  if (MERCARI.checked) {
    fee = calcFeeFlea(price);
  } else {
    fee = calcFeeShop(price);
  }
  fee = Math.ceil(fee);
  const ESTIMATE = JSON.stringify(Math.ceil((price + fee) * 12));
  MESSAGE.innerText =
    "견적 금액 : " + `${ESTIMATE}원입니다.\n(포함된 대행료 : ${fee * 12}원)`;
}

function init() {
  BTN.addEventListener("click", handleCalc);
  PRICE.addEventListener("keypress", handleInput);
  SHIPPING.addEventListener("keypress", handleInput);
  PRICE_CLEAR_BTN.addEventListener("click", clearPrice);
  SHIPPING_CLEAR_BTN.addEventListener("click", clearShipping);
}
init();
