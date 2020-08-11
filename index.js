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
  ACCOUNT_INFO = document.querySelector(".account-link"),
  ERR_NO_PRICE = "금액이 입력되지 않았습니다",
  ERR_PRICE_ROW_THAN_ONE = "금액이 1보다 작습니다.";

const stdPrice = 5000;

function clearPrice(event) {
  PRICE.value = "";
}
function clearShipping(event) {
  SHIPPING.value = "";
}

function checkInput(val) {
  if (isNaN(val)) {
    return 0;
  } else if (val < 0) {
    return -1;
  } else {
    return val;
  }
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
  price = checkInput(parseInt(PRICE.value));
  shipping = checkInput(parseInt(SHIPPING.value));

  if (price < 1 || shipping < 0) {
    return false;
  }
  //총금액 변수 선언
  let sum = price + shipping;

  //금액 공백 입력시 에러 후 종료
  let fee = 0;

  if (MERCARI.checked) {
    fee = calcFeeFlea(price);
  } else {
    fee = calcFeeShop(price);
  }
  fee = Math.ceil(fee);
  const sumAndFee = sum + fee;
  const ESTIMATE = JSON.stringify(Math.ceil(sumAndFee * 12));
  MESSAGE.innerText =
    `엔화 총 금액 : ${sumAndFee}엔으로\n` +
    `(물품 금액 : ${sum}엔 + 대행료 : ${fee}엔)\n` +
    "견적 금액은 " +
    `${ESTIMATE}원입니다.\n
    (포함된 대행료 : ${fee * 12}원)\n
    👇🏻입금계좌 안내는 아래의 링크로👇🏻 \n`;
  ACCOUNT_INFO.innerText = "계좌 안내 링크";
}

function init() {
  BTN.addEventListener("click", handleCalc);
  PRICE_CLEAR_BTN.addEventListener("click", clearPrice);
  SHIPPING_CLEAR_BTN.addEventListener("click", clearShipping);
}
init();
