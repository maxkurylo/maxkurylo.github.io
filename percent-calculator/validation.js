var Validation = {

    bonusCode: "",

    /**
    * Валидация поля суммы депозита на не больше определенного числа
    * @param e   - событие
    * @param min - сумма меньше которой пользователь не должен ввести число
    * @param max - сумма больше которой пользователь не должен ввести число
    * @param msg - сообщение, которое нужно показать, если валидация не прошла
    */
    "money": function(e, min, max, msg) {
        var money = e.detail.replace(/ /g,"");
        if( !/^(0\.\d{1,2}|[1-9]{1}\d{0,}(\.\d{1,2}){0,1})$/.test(money) ) {
            showErrorMSG(e.target, msg);
            return false; }
        if(!this.min(e, min)) return false;
        if(max!='none' && parseFloat(money) > max){
            showErrorMSG(e.target, i18n("MaxAmount")+max+" "+i18n(currency));
            return false; }
        var parent = e.target.parentNode;
        if(parent.lastChild.tagName == "DIV" && parent.lastChild.className == "errorMSG") parent.removeChild(parent.lastChild);
        return true;
    },

    "pay": function(e, min, max, deptype, msg) {
        var money = document.querySelector("input[id^='money']").value;
        var pay = e.detail.replace(/ /g,"");
        if( !/^(0\.\d{1,2}|[1-9]{1}\d{0,}(\.\d{1,2}){0,1})$/.test(pay) ) {
            showErrorMSG(e.target, msg);
            return false; }
        if(!this.min(e, min)) return false;
        var maxSum = (deptype == 'DPBN') ? max : money.replace(/ /g,"");
        if(money!=undefined && parseFloat(pay) > parseFloat(maxSum)) {
            showErrorMSG(e.target, i18n("MaxPayAmount")+money+" "+i18n(currency));
            return false; }
        var parent = e.target.parentNode;

        if(parent.lastChild.tagName == "DIV" && parent.lastChild.className == "errorMSG") parent.removeChild(parent.lastChild);
        return true;
    },

    /**
    * Валидация поля input с типом date
    */
    "date": function(e) {
        var val = (e.detail instanceof Date) ? e.detail : null;
        if(val == null || val.toString() == "Invalid Date") { showErrorMSG(e.target, i18n("WrongDate")); return false; }

        var picker = pickers[e.target.id];
        if(picker) {
            if(picker._d < picker._o.minDate) { showErrorMSG(e.target, i18n("DateMin")); return false; }
            if(picker._d > picker._o.maxDate) { showErrorMSG(e.target, i18n("DateMax")); return false; }
        } else { return false; }
        if((e.target.parentNode).lastChild.tagName == "DIV" && (e.target.parentNode).lastChild.className == "errorMSG") (e.target.parentNode).removeChild((e.target.parentNode).lastChild);
        return true;
    },

    "dateDPSV": function(e) {
        var val = (e.detail instanceof Date) ? e.detail : null;
        if(val == null || val.toString() == "Invalid Date") { showErrorMSG(e.target, i18n("WrongDate")); return false; }

        var picker = pickers[e.target.id];
        if(picker) {
            if(picker._d < picker._o.minDate) { showErrorMSG(e.target, i18n("DateMin")); return false; }
            if(picker._d > picker._o.maxDate) { showErrorMSG(e.target, i18n("DateMax")); return false; }
        } else { return false; }
        if((e.target.parentNode).lastChild.tagName == "DIV" && (e.target.parentNode).lastChild.className == "errorMSG") (e.target.parentNode).removeChild((e.target.parentNode).lastChild);
        return true;
    },

    /**
    * Валидация поля input с типом date для регулярного платежа (дата РП не может быть больше 28)
    */
    "dateRegPay": function(e) {
        console.log("calendar validation: ");
        var min, max, val = (e.detail instanceof Date) ? e.detail : null;
        if(val == null || val.toString() == "Invalid Date") { showErrorMSG(e.target, i18n("WrongDate")); return false; }
        if(val.getDate() > 28) { showErrorMSG(e.target, i18n("DateInterval")); return false; }

        if(e.target.getAttribute("type")=="calendar") {
            var picker = pickers[e.target.id];
            if(picker) {
                if(picker._d < picker._o.minDate) { showErrorMSG(e.target, i18n("DateMin")); return false; }
                if(picker._d > picker._o.maxDate) { showErrorMSG(e.target, i18n("DateMax")); return false; }
            }else { return false; }
        }else {
            min = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e.target.getAttribute("min"));
            max = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e.target.getAttribute("max"));
            if(min==null || max==null) { showErrorMSG(e.target, i18n("RefreshPage")); return false; }

            min = new Date(Date.parse(e.target.getAttribute("min")));
            max = new Date(Date.parse(e.target.getAttribute("max")));
            if(val < min) { showErrorMSG(e.target, i18n("DateMin")); return false; }
            if(val > max) { showErrorMSG(e.target, i18n("DateMax")); return false; }
        }
        if((e.target.parentNode).lastChild.tagName == "DIV" && (e.target.parentNode).lastChild.className == "errorMSG") (e.target.parentNode).removeChild((e.target.parentNode).lastChild);
        return true;
    },

    "chargeMoney": function(e, min, max, curr, msg) {
        if(!this.money(e, min, max, msg)) return false;                 // сначала валидация как для обычного поля money
        if(curr == 980) return true;                                    // если валюта депозита гривна - пропускаем все дальнейшие проверки
        var cardsRates = userCardsFrom || [];                           // переменная userCardsFrom или userCardsTo задаётся в функции cardsManager:convertationWarning/4
        var cardSelect = document.querySelectorAll("select[id^='cardSelectFrom_charge']")[0];
        var cardId = cardSelect.selectedOptions[0].value;
        var money = e.detail.replace(/ /g,"");
        for (var i in cardsRates) {
            if (cardsRates[i].pan == cardId) {
                var maxAmount = maxAmtExchange/cardsRates[i].convertation_rate;
                if(parseFloat(money) > maxAmount) {
                    showErrorMSG(e.target, msg);
                    return false;
                } else {
                    return true;
                }
            }
        }
        return true;
    },

    "thPersonDate": function(e) {
        var val = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(e.target.value),
            date= (e.detail instanceof Date) ? e.detail : null,
            id = e.target.id;
        if(val) { try { val = new Date(val[3],(val[2]-1),val[1]); }
                  catch(e) {val = null;} }
        if(val == null || date == null || date.toString() == "Invalid Date" || date.toString() != val.toString()) {
            showErrorMSG(e.target, i18n("WrongDate"), id+"_er", "after");
            return false; }
        showErrorMSG(e.target, "", id+"_er", "after");
        return true;
    },

    "card": function(e, msg) {
        var elId = "no_card_warning";
        if (e.target.selectedIndex == 0 && e.target.length != 1) {
            showErrorMSG(e.target, msg || i18n("cardIsNotSelected"), elId);
            return false;
        } else if (e.target.value == "nocard" || e.target.value == "loading") {
            showErrorMSG(e.target, msg || i18n("cardIsNotSelected"), elId);
            return false;
        } else {
            var divmsg = (e.target.parentNode).querySelector("#"+elId) || null;
            if(divmsg != null) (divmsg.parentNode).removeChild(divmsg);
            return true;
        }
    },

    "fewCards": function(e) {
        if(!this.card(e)) return false;                                 // сначала валидация как для обычного поля карт
        var elId = "few_cards_warning";
        var $block = $(e.target).closest("div[id^='fewCards']");        // весь блок, содержащий несколько карт
        var $other = $block.find("select").not('#'+e.target.id);        // другие карты из блока "несколько карт"
        for(var i=0; i < $other.length; i++) {
            if($other[i].value == e.target.value) {                     // если такая карта уже выбрана
                showErrorMSG(e.target, i18n("fewCardsWarning"), elId);
                return false;
            }
        }
        var divmsg = (e.target.parentNode).querySelector("#"+elId) || null;
        if(divmsg != null) (divmsg.parentNode).removeChild(divmsg);
        return true;
    },

    "moneyOfFewCards": function(e, min, max, totalId, msg1, msg2) {
        if(!this.money(e, min, max, msg1)) return false;
        totalAmt = parseFloat(document.getElementById(totalId).value.replace(/ /g,""));
        var $block = $(e.target).closest("div[id^='fewCards']");        // весь блок, содержащий несколько карт
        var $allAmt = $block.find("input[id^='moneyFromCard']");        // другие поля сумм из блока "несколько карт"
        var total = 0;
        $allAmt.each(function(i,m) {
            total = total + parseFloat(m.value.replace(/ /g,""));
        });
        var $form = $block.closest("div.form");
        var $span = $form.find("div[id^='moneyOfFewCards_error']");    // span, в котором отображать результат валидации
        if(total.toFixed(2) != totalAmt.toFixed(2)) {
            $span.html(msg2);
            return false;
        } else {
            $span.html("");
            return true;
        }
    },

    "withdrawBranch": function(e,id) {
        var radio = document.querySelector("input[id^='"+id+"']");
        if(radio.checked){ return this.card(e); }
        else{ return true; }
    },

    "phone": function(e, minLength, maxLength){
        if(/^\+/.test(e.detail)) {          // если телефон ввели с плюсом
            maxLength++;                    // то увеличиваем допустимое количество цифр на один знак
            minLength++;
        }
        if(this.length(e, minLength, maxLength) == true) {
            if (!/^\+{0,1}\d{1,}$/.test(e.detail)){
                showErrorMSG(e.target, i18n("PhoneMsg"));
                return false;
            } else return true;
        } else return false;
    },

    "nums": function(e, minLength, maxLength, fieldType){
        if(this.length(e, minLength, maxLength) == true){
            if (!/^\d{1,}$/.test(e.detail)){
                switch(fieldType){
                    case   'otp': msg = i18n("OtpMsg"); break;
                    case 'phone': msg = i18n("PhoneMsg"); break;
                    case 'bonus': msg = i18n("BonusMsg"); break;
                    default: msg = i18n("WrongData");
                }
                showErrorMSG(e.target, msg);
                return false;
            }else return true;
        }else return false;
    },

    "percents": function(e, min, max, msg) {
        msg = msg || i18n("WrongData");
        var value = e.detail.replace(/ /g,"");
        if( !/^(0\.\d{1,2}|[1-9]{1}\d{0,}(\.\d{1,2}){0,1})$/.test(value) ) {
            showErrorMSG(e.target, msg);
            return false; }
        if(!this.min(e, min)) return false;
        if(max!=='none' && parseFloat(value) > max){
            showErrorMSG(e.target, i18n("MaxValue")+max);
            return false; }
        var parent = e.target.parentNode;
        if(parent.lastChild.tagName == "DIV" && parent.lastChild.className == "errorMSG") parent.removeChild(parent.lastChild);
        return true;
    },

    "willRelation": function(e) {
        if (e.target.selectedIndex === 0) {
            showErrorMSG(e.target, i18n("WillBadRelation"));
            return false;
        } else {
            removeAllErrorsFromInput(e.target);
            return true;
        }
    },

    // Валидация полей выбора процентов по завещанию.
    // Проверяет чтобы процент был указан от 1 до 100 и сумма всех процентов была равна 100.
    "willPercent": function (e) {
        var prc = parseFloat(e.target.value);
        if (prc <= 0 || prc > 100) {
            showErrorMSG(e.target, i18n("WillNullPercent"));
            return false;
        }
        var form = $(e.target).closest('.form');
        var prcInputs = form.find('input[id^="percent_"]');
        var sumPercent = 0;
        prcInputs.each(function () { sumPercent += parseFloat(this.value); });
        if (sumPercent !== 100) {
            showErrorMSG(e.target, i18n("WillSumPercent"));
            return false;
        } else {
            removeAllErrorsFromInput(e.target);
            return true;
        }
    },

    /**
    * Валидация поля на длинну
    * @param         e - событие
    * @param minlength - минимальное количество символов
    * @param maxlength - максимальное количество символов
    */
    "length": function(e, minlength, maxlength) {
        var radio6 = document.getElementById("reason6"),
        field = e.detail,
        el = e.target,
        parent = el.parentNode;
        if (radio6 != null && radio6.checked) {
            return field.length >= 1 && field.length <= maxlength;
        }else {
            if(field.length >= minlength && field.length <= maxlength) {
                hint = parent.lastChild;
                if (parent.lastChild.tagName == "DIV" && parent.lastChild.className == "errorMSG") parent.removeChild(hint);
                return true;
            }else {
                text = (minlength == maxlength) ? i18n("CharQuantity")+ maxlength : i18n("EnterFrom")+ minlength +i18n("EnterTo")+maxlength+i18n("EnterChars");
                showErrorMSG(el, text);
                return false;
            }
        }
    },

    /**
     * Валидация поля на минимальную сумму
     * @param   e - событие
     * @param min - минимальная сумма (float)
     */
    "min": function(e, min) {
        var field = e.detail.replace(/ /g,"");
        if( parseFloat(field) < min){
            showErrorMSG(e.target, i18n("MinAmount")+min+" "+ i18n(currency));
            return false;
        }else return true;
    },

    "empty": function(e) {
        try { var value = e.detail.trim(); }catch(e) { var value = e.detail; }
        var id = e.target.id;
        if(value == "") { showErrorMSG(e.target, i18n("EmptyField"), id+"_er", "after"); return false;}
        showErrorMSG(e.target, "", id+"_er", "after");
        return true;
    },

    "selectDep": function(e) {
        var allCheckBox = document.querySelectorAll("table.sel_dep input[type='checkbox']");
        var mainCheckbox = document.getElementById("checkAllDeps");
        if(mainCheckbox.checked) { return true; }
        for(var i=1; i<allCheckBox.length; ++i) { if(allCheckBox[i].checked) {return true;} }
        showErrorMSG(e.target, i18n('ChooseDeposit'));
        return false;
    },

    "set": function(formId, fieldStart, msg) {
        console.log("IN set validation!!!!");
        var form = document.getElementById(formId);
        console.log("F start = "+fieldStart);
        var el;
        var fieldStartTrim = (/^relation/.test(fieldStart)) ? "relation" : fieldStart;  // id поля при выборе родства (will) будет вида 'relation_1', 'relation_2' и т.д.
        switch(fieldStartTrim) {
            case "modal":           el = "modal"; break;
            case "cardRest":        el = form.querySelector("select[id^='cardRest']").parentNode.parentNode; break;
            case "cardReg":         el = form.querySelector("select[id^='cardReg']").parentNode.parentNode; break;
            case "card":            el = form.querySelector("select[id^='card']").parentNode.parentNode; break;
            // case "date":            el = form.querySelector("input[id^='calendar']"); break;
            case "name":            el = form.querySelector("input[id^='depositName']"); break;
            case "terminationRadio":el = form.querySelector("input[id^='myReason']"); break;
            case "codeValue":       this.bonusCode = "BadCode"; break;
            case "relation":        el = form.querySelector("select[id^='" + fieldStart + "']"); break;
            case "bank_select":     el = form.querySelector("select[id^='bank_select']"); break;
            case "currency":        el = form.querySelector("select[id^='currency']"); break;
            case "forpreload":      el = form.querySelector("div[id^='forpreload']"); break;
            case "delegation_date_selector": el = form.querySelector("[id^='delegation_date_selector']"); break;
            default:                el = form.querySelector("input[id^='"+ fieldStart +"']");
        }
        console.log("Elem = " + el.id);
        if(el === "modal") {
            modalWindow.add({text:'<h3>'+msg+'</h3>', contentClass:'modal-text-center', positionId: form.id})
        } else {
            showErrorMSG(el, msg);
        }
    },

    // TODO: после рефакторинга процесса Will - удалить
    "selectVal": function(form, fieldStart, msg) {
        console.log("IN select validation!!!!");
        form = document.getElementById(form);
        console.log("F start = "+fieldStart);
        console.log("FORM = "+form);
        el = form.querySelector("select[id^='"+ fieldStart + "']");
        console.log("Elem = "+el);
        showErrorMSG(el, msg, fieldStart+"_er");
        el.addEventListener("change", function(event){ removeErrorMsgById(el.id, fieldStart+"_er") });
    },

    bonus: function() {
        if(this.bonusCode != '') return false;
        return true;
    },

    "sendToEmail": function (e) {
        var radio = e.target.previousSibling;
        if (radio.checked) return this.email(e);
        return true;
    },

    "email": function (e) {
        var email = e.detail;
        if(/^.+@.+\..+$/.test(email)) {
            return true;
        } else {
            msg = i18n("WrongEmail");
            showErrorMSG(e.target, msg);
            return false;
        }
    }
};

function checkBonus() {
    console.log(this.value);
    ws.send(enc(tuple(atom('client'), tuple(atom('checkBonus'),this.value))));
}
function checkBonusResponse(formId, elStarts) {
    Validation.bonusCode = "";
    removeErrorMSG(formId, elStarts);
}

function showWarns(e){
    var ev = (!e) ? window.event : e;
    var elem = ev.target;
    var pan = elem.selectedOptions[0].value;
    var userCards = (/^cardSelectFrom/.test(elem.id)) || (/^cardRegSelectFrom/.test(elem.id)) ? userCardsFrom : userCardsTo;    // переменная userCardsFrom или userCardsTo задаётся в функции cardsManager:setWarnings/3

    elem.classList.remove('error');
    removeInfoMSG(elem);

    for(var i=0; i<userCards.length;++i) {
        if(userCards[i].pan.toString() !== pan){ continue; }
        var msg = userCards[i].warningList.join(" ");
        showInfoMSG(elem, msg);
        var warnFunList = userCards[i].warnFunList;
        for (var f=0; f<warnFunList.length; ++f) {
            WarnFunList[warnFunList[f]].apply(userCards[i],[ev]);
        }
        return;
    }
}

var WarnFunList = {
    "cardConvertModalShow": function(ev) {
        var elem = ev.target;
        var depositCurr = (typeof currency == "number") ? currency : translate["mnm"]["currency"][currency];
        var userCard = this;
        var buttons = document.querySelectorAll("#forpreload .button");
        if( depositCurr != userCard.currency ) {
            var par = null;
            var depositProgram = (par = findAncestorByClassName(elem,"deposit-content__info")) ? par.id : false;
            switch(depositProgram) {
                case "DPN0":
                case "DENS":
                case "DEN0": break;
                default:
                    for(var j=0; j<buttons.length; ++j) {
                        buttons[j].addEventListener("click", convertationMSG, false); }
            }
        }else {
            for(var j=0; j<buttons.length; ++j) {
                buttons[j].removeEventListener("click", convertationMSG, false);
            }
        }
    }
};



// модальное окно появляется только при попытке открыть валютного договора с гривненой карты
var convertationMSG = function() {
    if(currency!='uah'){
        showModal(i18n("ConversionModal"), "convertation", "off");
    }
};

//function checkCardConvert(e, opType) {
//    var elem = (!e)? window.event.target:e.target,
//        errorMsg = elem.parentNode.parentNode,
//        par = null;
//    var depositProgram = (par = findAncestorByClassName(elem,"deposit-content__info")) ? par.id : false;
//    elem.classList.remove('error');
//    showErrorMSG(errorMsg, "");
//    //console.log(elem);
//    var pan = elem.selectedOptions[0].value,
//        elId = "convert_warning",
//        userCards = (/^cardSelectFrom/.test(elem.id)) || (/^cardRegSelectFrom/.test(elem.id)) ? userCardsFrom : userCardsTo,    // переменная userCardsFrom или userCardsTo задаётся в функции cardsManager:convertationWarning/4
//        depositCurr = (typeof currency == "number") ? currency : translate["mnm"]["currency"][currency];
//
//    //console.log(pan);
//    for(var i in userCards) {
//        if(userCards[i].pan == pan){
//            //console.log(translate["mnm"]["currency"][currency]);
//            //console.log(depositCurr);
//            if( depositCurr != userCards[i].currency ) {
//                console.log(userCards[i].currency);
//                console.log(depositCurr);
//                var c = (depositCurr == "978") ? "eur" : "usd";
//                var msg = "";//тут можно в зависимости от типа операции менять текст сообщения (пока это нужно только для termination)
//                var showConvertRate = (userCards[i].convertation_rate*1).toFixed(3);
//                switch(opType) {
//                    case "termination": msg = i18n("ConversionWarningTermination")+showConvertRate; break;
//                         case "charge": msg = i18n("ConversionWarningTermination")+showConvertRate; break;
//                               default: msg = i18n("ConversionWarning")+showConvertRate+
//                                              ((depositCurr != "980") ? setParamsInMsg(i18n("ConversionWarningP2Open"),"XXX",[postNBU4Charge,~~(maxAmtExchange/userCards[i].convertation_rate),i18n(c),numberBeautifier(maxAmtExchange)]) : "");
////                                              ((depositCurr != "980") ? setParamsInMsg(i18n("ConversionWarningP2Open"),"XXX",["30",~~(maxAmtExchange/userCards[i].convertation_rate),i18n(c),numberBeautifier(maxAmtExchange)]) : "");
//                }
//                showErrorMSG(elem, msg, elId);
//                switch(depositProgram) {
//                    case "DPN0":
//                    case "DENS":
//                    case "DEN0": break;
//                    default:
//                        var buttons = document.querySelectorAll("#forpreload .button");
//                        for(var j=0; j<buttons.length; ++j) {
//                            buttons[j].addEventListener("click", convertationMSG, false); } }
//                return;
//            }else {
//                var divmsg = (elem.parentNode).querySelector("#"+elId) || null;
//                if(divmsg != null) (divmsg.parentNode).removeChild(divmsg);
//                //console.log("IN GOOD CARD");
//                var buttons = document.querySelectorAll("#forpreload .button");
//                //console.log(buttons);
//                for(var j=0; j<buttons.length; ++j) {
//                    buttons[j].removeEventListener("click", convertationMSG, false);
//                }
//            }
//        }
//    }
//}
//function setWarningOnKUNCard(e) {
//    var elem = (!e)? window.event.target:e.target;
//    var pan = elem.selectedOptions[0].value,
//        elId = "kun_warning";
//
//    for(var i in userCardsTo) {
//        if(userCardsTo[i].pan == pan && userCardsTo[i].product_type == "KUN" && userCardsTo[i].charge28 == "undefined"){
//            var msg = i18n("CommissionWarning");
//            showErrorMSG(elem, msg, elId); break;
//        }else{
//            var divmsg = (elem.parentNode).querySelector("#"+elId) || null;
//            if(divmsg != null) (divmsg.parentNode).removeChild(divmsg);
//        }
//    }
//}

/**
 *  Добавление сообщения про максимальную сумму пополнения
 *  и отображение эквивалента суммы пополнения в валюте карты.
 */
function showEquivalentSumOnCharge(event) {
    var card  = event.target;                               // поле выбора карты (на нём висит лисенер, вызывающий эту функцию)
    var form  = $(card).closest('div[id^=form_charge]');    // вся форма пополнения
    var money = $('input#money',form)[0];                   // поле ввода суммы пополнения
    var equi  = $('span#equivalent_sum',form)[0];           // место для отображения эквивалента суммы в валюте карты
    var warn  = $('div#max_sum_warn',form)[0];              // div для отображения сообщения под полем ввода суммы пополнения на форме
    var radioBtn_cash = $('input#getMoneyCash',form);       // радио-кнопка выбора варианта пополнения наличными
    var elId  = "sum_warning";
    var pan   = card.selectedOptions[0].value;
    var userCards = (/^cardSelectFrom/.test(card.id)) ? userCardsFrom : userCardsTo;    // переменная userCardsFrom или userCardsTo задаётся в функции cardsManager:convertationWarning/4
    var depositCurr = (typeof currency == "number") ? currency : translate["mnm"]["currency"][currency];

    radioBtn_cash.off('change').on('change', function() {
        warn.innerHTML = '';
        warn.parentNode.style.display = 'none';
        equi.className = '';
        changeEquivalentSumOnCharge(money);
    });

    for(var i in userCards) {
        if(userCards[i].pan == pan) {
            if( depositCurr != userCards[i].currency ) {
                var c = (depositCurr == "978") ? "eur" : "usd";
                var msg = (depositCurr != "980") ? setParamsInMsg(i18n("ConversionWarningP2Charge"),"XXX",[postNBU4Charge,~~(maxAmtExchange/userCards[i].convertation_rate),i18n(c),numberBeautifier(maxAmtExchange)]) : "";
//                var msg = (depositCurr != "980") ? setParamsInMsg(i18n("ConversionWarningP2Charge"),"XXX",["30",~~(maxAmtExchange/userCards[i].convertation_rate),i18n(c),numberBeautifier(maxAmtExchange)]) : "";
                warn.innerHTML = msg;
                warn.parentNode.style.display = 'block';
                equi.className = userCards[i].currency;
            } else {
                warn.innerHTML = '';
                warn.parentNode.style.display = 'none';
                equi.className = '';
            }
            changeEquivalentSumOnCharge(money);
        }
    }
}

//function inetCardWarning(event) {
//    var card = event ? event.target : window.event.target;
//    var pan  = card.selectedOptions[0].value;
//    var elId = "inet_warning";
//    for(var i in userCardsTo) {
//        if(userCardsTo[i].pan == pan && userCardsTo[i].product_type == "INET") {
//            console.log(userCardsTo[i].product_type);
//            var msg = i18n("InetWarning");
//            showErrorMSG(card, msg, elId);
//            break;
//        } else {
//            var divmsg = card.parentNode.querySelector("#"+elId) || null;
//            if(divmsg != null) divmsg.parentNode.removeChild(divmsg);
//        }
//    }
//}

/**
 *  Функция навешивается на onkeyup поля ввода суммы пополнения
 *  и отображает эквивалентную сумму в валюте карты, если это нужно.
 *  Отображаем эквивалент только если span#equivalent_sum содержит
 *  в атрибуте class код валюты карты.
 */
function changeEquivalentSumOnCharge(event) {
    var money = event.target || event;                          // можно передавать событие или непосредственно поле ввода суммы
    var equi = document.getElementById('equivalent_sum');
    var curr = equi.className;
    var sum = money.value.toString().replace(/ /g, '');
    var depositCurr = (typeof currency == "number") ? currency : translate["mnm"]["currency"][currency];
    for (var i in userCardsFrom) {
        if(userCardsFrom[i].currency == curr) {
            var rate = userCardsFrom[i].convertation_rate;
            rate = (depositCurr == 980) ? 1/rate : rate;
        }
    }
    if(curr && rate) {
        var result = numberBeautifier((sum * rate).toFixed(2));
        var currText = {'980':'uah','840':'usd','978':'eur'}[curr];
        equi.innerHTML = "(екв. " + result + " " + i18n(currText) + ")";
    } else {
        equi.innerHTML = '';
    }
}

function setParamsInMsg(msg,bindings,params) {
    if(!Array.isArray(bindings) && Array.isArray(params)) {
        var bind = bindings;
        bindings = [];
        for(var i=0; i<params.length; ++i) { bindings[i] = bind; }
    }

    for(var param=0;param<bindings.length; ++param) {
        msg = msg.replace(bindings[param],params[param]);
    }
    return msg;
}


// При проверке клиента по признаку резидент/нерезидент - удаление кнопок
function deleteButtonsForNonResidents() {
    var exFilter = function (btnList, regexp) {
        for (var i=0; i<btnList.length; ++i) {
            if(!regexp.test(btnList[i].id))
                btnList[i].parentNode.removeChild(btnList[i]); } }
    var dp = document.querySelectorAll('a[id^="button_DP00"]'),
        de = document.querySelectorAll('a[id^="button_DE00"]'),
        bn = document.querySelectorAll('a[id^="button_DPBN"]');
    exFilter(dp, /^button_DP00_12/);
    exFilter(de, /^button_DE00_12/);
    exFilter(bn, /^button_DPBN_12/);
}



function validateSources(list) {
    return list.reduce(function(acc,x) {
        var event = new CustomEvent('validation');
            event.initCustomEvent('validation',true,true,querySourceRaw(x));
        var el = qi(x),
            listener = el && el.validation,
            res = !listener || listener && el.dispatchEvent(event);
        if (el) res ? el.classList.remove('error') : el.classList.add('error');
        return res && acc; },true); }


// IE polyfill

(function () {
   function CustomEvent ( event, params ) {
       params = params || { bubbles: false, cancelable: false, detail: undefined };
       var evt = document.createEvent( 'CustomEvent' );
       evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
       return evt;  };
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; })();