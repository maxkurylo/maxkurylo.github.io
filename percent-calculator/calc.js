// "use strict";

var URL_DEP_CALC = '/deposits/calculator?bank=PB&locale=ru';
var ENTER_TYPE = '2';
var ENTER_TYPE_P24 = '0';
var ENTER_TYPE_FRONT = '1';
var BANK_CODE = 'PB';


function getDepOffers(programs) {
    var depOffers = {
        "order": ["980", "840", "978"],
        "tabledata": {
            "840": { "deposits": [], "curr_mnemonic": "USD", "curr_name": "Доллар", "curr_short_name": i18n("usd") },
            "978": { "deposits": [], "curr_mnemonic": "EUR", "curr_name": "Евро", "curr_short_name": i18n("eur") },
            "980": { "deposits": [], "curr_mnemonic": "UAH", "curr_name": "Гривня", "curr_short_name": i18n("uah") }
        }
    };
    for (var p = 0; p < programs.length; p++) {
        if (/_/.test(programs[p]["code"])) { continue; }
        if (programs[p]["code"] == "SBSV") { continue; }
        if (programs[p]["needShow"] == "n") { continue; }
        var rates = { "980": { "terms": [] }, "978": { "terms": [] }, "840": { "terms": [] } };
        for (var r = 0; r < programs[p]["rates"].length; ++r) {
            for (var curr in programs[p]["rates"][r]["curr"]) {
                switch (curr) {
                    case "uah": var currNum = "980"; break;
                    case "usd": var currNum = "840"; break;
                    case "eur": var currNum = "978";
                }
                rates[currNum].terms.push(
                    {
                        "offer_rules": {
                            "percents_on_card": (programs[p]["prcToCard"] === "y"),
                            "capitalization": (programs[p]["capitalization"] === "y"),
                            "get_money_in_office": true
                        },
                        "period_int": programs[p]["rates"][r]["duration"],
                        "base_rate": programs[p]["rates"][r]["curr"][curr]["rate"],
                        "bonus_plus": programs[p]["rates"][r]["curr"][curr]["bonus"]
                    }
                );
            }
        }
        for (var i in depOffers["tabledata"]) {
            if (rates[i]["terms"].length == 0) { continue; }
            depOffers["tabledata"][i]["deposits"].push(
                {
                    "terms": rates[i]["terms"],
                    "dep_name": i18n(programs[p]["code"]),
                    "dep_code": programs[p]["code"]
                }
            );
        }
    }
    return depOffers;
}
var depositOffers = getDepOffers(programs);
var depositsDrawObj = new DepositsDraw({ programs: programs });


//var depositOffers  = {"order_deposits":["DPN0","DP00","DEN0","DE00","DPR0","DPBN","KOPI","PADV"],"extras":{"have_prolongation_rates":true},"order":["980","840","978"],"bank":"PB","tabledata":{"840":{"curr_short_name":"долл","max_rate":15,"deposits":[{"infoURL":"https://docs.google.com/document/d/1WLTAGmt-W7ezTHSgxoMgtMoerjOPy34R7DpriJ1_Wck/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":15,"period":"12 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD"],"type_code":"NDGB","rulesPercent":["UAH","USD"],"main":"","type":6486,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":14,"period":"6 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD"],"type_code":"ND6B","rulesPercent":["UAH","USD"],"main":"","type":6485,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":13,"period":"3 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD"],"type_code":"ND3B","rulesPercent":["UAH","USD"],"main":"","type":6484,"blocking":"0"}],"description":"<ul><li>самая выгодная процентная ставка;</li><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет;</li><li>возврат вклада производится только по окончании срока</li> </ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus-Srochniy","dep_name":"Депозит плюс срочный","dep_code":"DPN0","chance_recharge":"Да","fishka":"Самая выгодная ставка. Возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1ZRaPKxrAuk7eA534JXfCtl7GM1-X158Bs9Ucdvx2ON0/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":13,"period":"12 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD","UAH"],"type_code":"DEGB","rulesPercent":["UAH","USD"],"main":"","type":53,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":12,"period":"6 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD","UAH"],"type_code":"DE6B","rulesPercent":["UAH","USD"],"main":"","type":52,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":11,"period":"3 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD","UAH"],"type_code":"DE3B","rulesPercent":["UAH","USD"],"main":"","type":51,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":10,"period":"1 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["USD"],"type_code":"DE1B","rulesPercent":["UAH","USD"],"main":"","type":50,"blocking":"0"}],"description":"<ul><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus","dep_name":"Депозит Плюс","dep_code":"DP00","chance_recharge":"Да","fishka":"Часть начисленных процентов зачисляется на счет «Бонус Плюс».","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/document/d/1nq9enLcGe_b0ed_jDdMnazEMvsJGBN1Eo3N6NrWsW1c/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":14.5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD"],"type_code":"NS12","rulesPercent":["UAH","USD"],"main":"","type":6474,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":13.5,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD"],"type_code":"NSV6","rulesPercent":["UAH","USD"],"main":"","type":6473,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":12.5,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD"],"type_code":"NSV3","rulesPercent":["UAH","USD"],"main":"","type":6472,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет;</li><li>\nвозврат вклада производится только по окончании срока</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart-Srochniy","dep_name":"Стандарт срочный","dep_code":"DEN0","chance_recharge":"Да","fishka":"Отличие от обычного «Стандарта» – возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1X3LYf7iY0Hs7mIflAaGid6cb0DBMZVrwciAskgcgsZo/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":12.5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","UAH"],"type_code":"DE12","rulesPercent":["UAH","USD"],"main":"","type":18,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":11.5,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","UAH"],"type_code":"NDE6","rulesPercent":["UAH","USD"],"main":"","type":2,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":10.5,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","UAH"],"type_code":"NDE3","rulesPercent":["UAH","USD"],"main":"","type":3,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":9.5,"period":"1 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD"],"type_code":"NDE1","rulesPercent":["UAH","USD"],"main":"","type":4,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart","dep_name":"Стандарт","dep_code":"DE00","chance_recharge":"Да","fishka":"Возможность пополнения вклада и ежемесячная выплата процентов.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/17WwXTbLS0YMObeG5Y1ogDqtJpiWBN3LvS9JxTmKUi0Q/edit","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD"],"type_code":"DVPR","rulesPercent":["UAH","USD"],"main":"","type":20,"blocking":"0"}],"description":"возможность снимать деньги со счета без комиссии и снижения процентной ставки","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-PrivatVklad","dep_name":"Приват-вклад","dep_code":"DPR0","chance_recharge":"Да","fishka":"Возможность снять часть вклада без комиссии и снижения % ставки.","partial_withdrawsl":"Да"},{"infoURL":"","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":1,"period":"12 мес","able_to_issue":false,"bonus_plus":0,"minSum":"0.00","rules":["USD"],"type_code":"NLDV","rulesPercent":["UAH","USD"],"main":"","type":5885,"blocking":"2"}],"description":"может открываться банком в случае продления депозита на новый срок","percent_payment":"Ежемесячно","ecommerce_link":"http://","dep_name":"До востребования","dep_code":"PADV","chance_recharge":"Да","fishka":"Cчет, который открывается банком при продлении депозита на новый срок.","partial_withdrawsl":"Да"}],"curr_mnemonic":"USD","curr_name":"Доллар США"},"978":{"curr_short_name":"евро","max_rate":15,"deposits":[{"infoURL":"https://docs.google.com/document/d/1WLTAGmt-W7ezTHSgxoMgtMoerjOPy34R7DpriJ1_Wck/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":15,"period":"12 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR"],"type_code":"NDGB","rulesPercent":["UAH","EUR"],"main":"","type":6483,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":14,"period":"6 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR"],"type_code":"ND6B","rulesPercent":["UAH","EUR"],"main":"","type":6482,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":13,"period":"3 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR"],"type_code":"ND3B","rulesPercent":["UAH","EUR"],"main":"","type":6481,"blocking":"0"}],"description":"<ul><li>самая выгодная процентная ставка;</li><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет;</li><li>возврат вклада производится только по окончании срока</li> </ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus-Srochniy","dep_name":"Депозит плюс срочный","dep_code":"DPN0","chance_recharge":"Да","fishka":"Самая выгодная ставка. Возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1ZRaPKxrAuk7eA534JXfCtl7GM1-X158Bs9Ucdvx2ON0/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":13,"period":"12 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"DEGB","rulesPercent":["UAH","EUR"],"main":"","type":57,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":12,"period":"6 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"DE6B","rulesPercent":["UAH","EUR"],"main":"","type":56,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":11,"period":"3 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"DE3B","rulesPercent":["UAH","EUR"],"main":"","type":55,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":10,"period":"1 мес","able_to_issue":true,"bonus_plus":1,"minSum":"2.00","rules":["EUR"],"type_code":"DE1B","rulesPercent":["UAH","EUR"],"main":"","type":54,"blocking":"0"}],"description":"<ul><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus","dep_name":"Депозит Плюс","dep_code":"DP00","chance_recharge":"Да","fishka":"Часть начисленных процентов зачисляется на счет «Бонус Плюс».","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/document/d/1nq9enLcGe_b0ed_jDdMnazEMvsJGBN1Eo3N6NrWsW1c/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":14.5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR"],"type_code":"NS12","rulesPercent":["UAH","EUR"],"main":"","type":6477,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":13.5,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"0.00","rules":["EUR"],"type_code":"NSV6","rulesPercent":["UAH","EUR"],"main":"","type":6476,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":12.5,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR"],"type_code":"NSV3","rulesPercent":["UAH","EUR"],"main":"","type":6475,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет;</li><li>\nвозврат вклада производится только по окончании срока</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart-Srochniy","dep_name":"Стандарт срочный","dep_code":"DEN0","chance_recharge":"Да","fishka":"Отличие от обычного «Стандарта» – возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1X3LYf7iY0Hs7mIflAaGid6cb0DBMZVrwciAskgcgsZo/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":12.5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"DE12","rulesPercent":["UAH","EUR"],"main":"","type":17,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":11.5,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"NDE6","rulesPercent":["UAH","EUR"],"main":"","type":7,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":10.5,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR","UAH"],"type_code":"NDE3","rulesPercent":["UAH","EUR"],"main":"","type":9,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":9.5,"period":"1 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR"],"type_code":"NDE1","rulesPercent":["UAH","EUR"],"main":"","type":10,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart","dep_name":"Стандарт","dep_code":"DE00","chance_recharge":"Да","fishka":"Возможность пополнения вклада и ежемесячная выплата процентов.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/17WwXTbLS0YMObeG5Y1ogDqtJpiWBN3LvS9JxTmKUi0Q/edit","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":5,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["EUR"],"type_code":"DVPR","rulesPercent":["UAH","EUR"],"main":"","type":21,"blocking":"0"}],"description":"возможность снимать деньги со счета без комиссии и снижения процентной ставки","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-PrivatVklad","dep_name":"Приват-вклад","dep_code":"DPR0","chance_recharge":"Да","fishka":"Возможность снять часть вклада без комиссии и снижения % ставки.","partial_withdrawsl":"Да"},{"infoURL":"","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":1,"period":"12 мес","able_to_issue":false,"bonus_plus":0,"minSum":"0.00","rules":["EUR"],"type_code":"NLDV","rulesPercent":["UAH","EUR"],"main":"","type":5883,"blocking":"2"}],"description":"может открываться банком в случае продления депозита на новый срок","percent_payment":"Ежемесячно","ecommerce_link":"http://","dep_name":"До востребования","dep_code":"PADV","chance_recharge":"Да","fishka":"Cчет, который открывается банком при продлении депозита на новый срок.","partial_withdrawsl":"Да"}],"curr_mnemonic":"EUR","curr_name":"Евро"},"980":{"curr_short_name":"грн","max_rate":29,"deposits":[{"infoURL":"https://docs.google.com/document/d/1WLTAGmt-W7ezTHSgxoMgtMoerjOPy34R7DpriJ1_Wck/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":29,"period":"12 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"NDGB","rulesPercent":["UAH"],"main":"","type":6489,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":28,"period":"6 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"ND6B","rulesPercent":["UAH"],"main":"","type":6488,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":27,"period":"3 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"ND3B","rulesPercent":["UAH"],"main":"","type":6487,"blocking":"0"}],"description":"<ul><li>самая выгодная процентная ставка;</li><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет;</li><li>возврат вклада производится только по окончании срока</li> </ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus-Srochniy","dep_name":"Депозит плюс срочный","dep_code":"DPN0","chance_recharge":"Да","fishka":"Самая выгодная ставка. Возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1ZRaPKxrAuk7eA534JXfCtl7GM1-X158Bs9Ucdvx2ON0/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":25,"period":"12 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DEGB","rulesPercent":["UAH"],"main":"","type":11,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":24,"period":"6 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE6B","rulesPercent":["UAH"],"main":"","type":12,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":24,"period":"3 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE3B","rulesPercent":["UAH"],"main":"","type":13,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":22,"period":"1 мес","able_to_issue":true,"bonus_plus":2,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE1B","rulesPercent":["UAH"],"main":"","type":14,"blocking":"0"}],"description":"<ul><li>ежемесячная выплата процентов, при этом часть процентов зачисляется на счет <A href=\"http://bonus.privatbank.ua/\"target=\"_blank\">«Бонус Плюс»</a>;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Plus","dep_name":"Депозит Плюс","dep_code":"DP00","chance_recharge":"Да","fishka":"Часть начисленных процентов зачисляется на счет «Бонус Плюс».","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/document/d/1nq9enLcGe_b0ed_jDdMnazEMvsJGBN1Eo3N6NrWsW1c/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":28,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"NS12","rulesPercent":["UAH"],"main":"","type":6480,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":27,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"NS06","rulesPercent":["UAH"],"main":"","type":6479,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":26,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"NS03","rulesPercent":["UAH"],"main":"","type":6490,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет;</li><li>\nвозврат вклада производится только по окончании срока</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart-Srochniy","dep_name":"Стандарт срочный","dep_code":"DEN0","chance_recharge":"Да","fishka":"Отличие от обычного «Стандарта» – возврат вклада проводится только по окончании срока.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1X3LYf7iY0Hs7mIflAaGid6cb0DBMZVrwciAskgcgsZo/edit","link_details":"","terms":[{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":24,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE12","rulesPercent":["UAH"],"main":"","type":1,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":23,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE06","rulesPercent":["UAH"],"main":"","type":16,"blocking":"0"},{"prolongation_increase_rate":0.5,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":23,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DE03","rulesPercent":["UAH"],"main":"","type":15,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":21,"period":"1 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DVN1","rulesPercent":["UAH"],"main":"","type":22,"blocking":"0"}],"description":"<ul><li> ежемесячная выплата процентов;</li><li>возможность пополнять счет</li></ul>","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-Standart","dep_name":"Стандарт","dep_code":"DE00","chance_recharge":"Да","fishka":"Возможность пополнения вклада и ежемесячная выплата процентов.","partial_withdrawsl":"Нет"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/17WwXTbLS0YMObeG5Y1ogDqtJpiWBN3LvS9JxTmKUi0Q/edit","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":true},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":10,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH"],"type_code":"DVPR","rulesPercent":["UAH"],"main":"","type":19,"blocking":"0"}],"description":"возможность снимать деньги со счета без комиссии и снижения процентной ставки","percent_payment":"Ежемесячно","ecommerce_link":"Depozit-PrivatVklad","dep_name":"Приват-вклад","dep_code":"DPR0","chance_recharge":"Да","fishka":"Возможность снять часть вклада без комиссии и снижения % ставки.","partial_withdrawsl":"Да"},{"infoURL":"https://docs.google.com/a/privatbank.ua/document/d/1yBRJEc6vuBvi41wrBLGkSyvIu7BZymos2th1FXN7qmA/edit","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":false},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":23,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DS12","rulesPercent":["UAH"],"main":"","type":6468,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":false},"period_int":6,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":22,"period":"6 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DS06","rulesPercent":["UAH"],"main":"","type":6471,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":false},"period_int":3,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":21,"period":"3 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DS03","rulesPercent":["UAH"],"main":"","type":6470,"blocking":"0"},{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":false,"get_money_in_office":false},"period_int":1,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":20,"period":"1 мес","able_to_issue":true,"bonus_plus":0,"minSum":"2.00","rules":["USD","EUR","UAH","RUR"],"type_code":"DS01","rulesPercent":["UAH"],"main":"","type":6469,"blocking":"0"}],"description":"пользоваться услугой можно точно так же, как привычным депозитом, но при этом начисленные проценты НЕ облагаются налогами","percent_payment":"Ежемесячно","ecommerce_link":"ссылка","dep_name":"Услуга «Стандарт безналоговый для пенсионеров, получателей зарплаты и социальных выплат»","dep_code":"DPBN","chance_recharge":"Да","fishka":"Возможность подключить услугу – в разработке. Сейчас Вы можете оформить услугу в Интернет-банке Приват24 или на сайте pb.ua/depozit","partial_withdrawsl":"Нет"},{"infoURL":"","link_details":"http://privatbank.ua/kopi/","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":false,"capitalization":false,"get_money_in_office":false},"period_int":12,"group":"","resident":true,"bonusCodeAppearence":false,"base_rate":20,"period":"12 мес","able_to_issue":true,"bonus_plus":0,"minSum":"0.00","rules":["USD","EUR","UAH","RUR"],"type_code":"KOK1","rulesPercent":["UAH"],"main":"","type":23,"blocking":"0"}],"description":"возможность просто и незаметно накапливать деньги. Например, процент от суммы трат. Выберите условие, которое подходит именно Вам","percent_payment":"При возврате вклада","ecommerce_link":"","dep_name":"Услуга «Копилка»","dep_code":"KOPI","chance_recharge":"Да","fishka":"Копите легко и быстро, откладывая деньги на карту с каждого поступления или траты.","partial_withdrawsl":"Да"},{"infoURL":"","link_details":"","terms":[{"prolongation_increase_rate":0,"offer_rules":{"percents_on_card":true,"capitalization":true,"get_money_in_office":true},"period_int":12,"group":"","resident":false,"bonusCodeAppearence":false,"base_rate":1,"period":"12 мес","able_to_issue":false,"bonus_plus":0,"minSum":"0.00","rules":["USD","EUR","UAH","RUR"],"type_code":"NLDV","rulesPercent":["UAH"],"main":"","type":5884,"blocking":"2"}],"description":"может открываться банком в случае продления депозита на новый срок","percent_payment":"Ежемесячно","ecommerce_link":"http://","dep_name":"До востребования","dep_code":"PADV","chance_recharge":"Да","fishka":"Cчет, который открывается банком при продлении депозита на новый срок.","partial_withdrawsl":"Да"}],"curr_mnemonic":"UAH","curr_name":"Гривна"}}};

$(function () {
    var Helpers = new function () {
        this.beautiful_numbers = function (number) {
            var n = number.toString();
            return n.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        };
    };

    var Currency = function (depositAPICurrency, currecyId) {
        this.name = depositAPICurrency.curr_name;
        this.shortName = depositAPICurrency.curr_short_name;
        this.mnemonic = depositAPICurrency.curr_mnemonic;
        this.id = currecyId;
    };


    var CalculatorColumn = function (column_id) {
        this.setGeneralDepositProperties = function (period, annualPercentage, isCapitalization, bonusplusPercentage) {
            _period = period;
            _annualPercentage = annualPercentage;
            if (isCapitalization === undefined) { isCapitalization = true; }
            if (bonusplusPercentage === undefined) { bonusplusPercentage = 0; }
            _bonusplusPercentage = bonusplusPercentage;
            _isCapitalization = isCapitalization;
        };

        this.setInvestAmount = function (amount) {
            _mainAmount = parseFloat(amount);
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setMonthlyRefillAmount = function (amount) {
            _monthlyRefillAmount = parseFloat(amount);
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setNoFirstCharge = function (flag) {
            _isNoFirstCharge = flag;
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setPeriod = function (period, program) {
            _period = period;
            _isDPSV = false;
            _isKPLK = (program === "KOPI" || program === "DDND");
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setPeriodDays = function (periodDays) {
            _periodDays = periodDays;
            _isDPSV = true;
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setAnnualPercentage = function (annualPercentage, bonusplusPercentage) {
            _annualPercentage = annualPercentage;
            if (bonusplusPercentage === undefined) { bonusplusPercentage = 0; }
            _bonusplusPercentage = bonusplusPercentage;
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setLongationQuantity = function (longationQuantity) {
            _longationQuantity = longationQuantity;
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setIsCapitalization = function (isCapitalization) {
            _isCapitalization = isCapitalization;
            _setPercentsAmount();
            _setColumnValues();
        };

        this.setCurrency = function (currency) {
            _currency = currency;
        };

        this.setTax = function (tax) {
            _taxInPercents = tax;
            _setPercentsAmount();
            _setColumnValues();
        };

        var _getAmountInCalculatorPercents = function (fullAmount, partOfAmount, isBonusplus) {
            var countBlocksWithDefaultValue = 4;
            if (_bonusplusAmount <= 0) { countBlocksWithDefaultValue = 3; }

            var defaultCommonPercentPart = countBlocksWithDefaultValue * 10;
            var defaultBlockPercentPart = defaultCommonPercentPart / countBlocksWithDefaultValue;
            if (_bonusplusAmount <= 0 && isBonusplus == true) { defaultBlockPercentPart = 0; }

            var inPercents = partOfAmount / fullAmount * (100 - defaultCommonPercentPart);
            return inPercents + defaultBlockPercentPart;
        };


        var _getFullAmount = function () {
            return (_mainAmount + (_monthlyRefillAmount * _getPeriodWithLongation()) + _percentsAmount + _bonusplusAmount);
        };

        var _getPeriodWithLongation = function () {
            return _period + _period * _longationQuantity;
        };

        var _getFullRefillAmount = function () {
            var chargeCnt = (_isNoFirstCharge) ? _getPeriodWithLongation() - 1 : _getPeriodWithLongation();
            return _monthlyRefillAmount * chargeCnt;
        };

        var _setTitles = function () {
            var getBeatyAmountWithCurrency = function (amount) {
                return Helpers.beautiful_numbers(Math.round(amount));//+ ' ' + _currency.shortName;
            };

            var monthlyFullRefillAmount = _getFullRefillAmount();
            var fullInvestAmount = _mainAmount + monthlyFullRefillAmount;
            var finalAmount = Math.round(fullInvestAmount) + Math.round(_percentsAmount) + Math.round(_bonusplusAmount);

            var mainAmountBeauty = getBeatyAmountWithCurrency(_mainAmount);
            var monthlyRefillAmountBeauty = getBeatyAmountWithCurrency(_monthlyRefillAmount);
            var monthlyFullRefillAmountBeauty = getBeatyAmountWithCurrency(monthlyFullRefillAmount);
            var percentsAmountBeauty = getBeatyAmountWithCurrency(_percentsAmount);
            var bonusplusAmountBeauty = getBeatyAmountWithCurrency(_bonusplusAmount);

            var placement = 'left';
            var monthleRefillTitle = i18n("MonthlyCharge") + monthlyRefillAmountBeauty + i18n("ChargeAmount") + monthlyFullRefillAmountBeauty; //gettext('Ежемесячное пополнение') + ', ' + monthlyRefillAmountBeauty + '. ' + gettext('Сумма пополнений') + ': ' + monthlyFullRefillAmountBeauty;
            _$bar_main_account.tooltip('destroy');
            _$bar_main_account.tooltip({ 'placement': placement, 'title': /*gettext(*/i18n("DepositAmount")/*)*/ + ', ' + mainAmountBeauty });
            _$bar_monthlyRefillAmount.tooltip('destroy');
            _$bar_monthlyRefillAmount.tooltip({ 'placement': placement, 'title': monthleRefillTitle });
            _$bar_monthly_percents.tooltip('destroy');
            _$bar_monthly_percents.tooltip({ 'placement': placement, 'title': /*gettext(*/i18n("PercentPaid")/*)*/ + ', ' + percentsAmountBeauty });
            _$bar_monthly_percents_bonusplus.tooltip('destroy');
            _$bar_monthly_percents_bonusplus.tooltip({ 'placement': placement, 'title': /*gettext(*/i18n("PercentPaidBonus")/*)*/ + ', ' + bonusplusAmountBeauty });

            _$spanInvestAmount.html(getBeatyAmountWithCurrency(fullInvestAmount));
            _$spanFinalAmount.html(getBeatyAmountWithCurrency(finalAmount));
            _$spanAmtFull.html(getBeatyAmountWithCurrency(_mainAmount) + " (" + _currency.shortName + ")");
            _$spanChargeFull.html(monthlyFullRefillAmountBeauty + " (" + _currency.shortName + ")");
            _$spanPercentsRate.html(_annualPercentage.toString() + " % (" + i18n("CalcOnYear") + ")");
            _$spanPercentsFull.html(getBeatyAmountWithCurrency(Math.round(_percentsAmount) + Math.round(_bonusplusAmount)) + " (" + _currency.shortName + ")");
            // _$spanProfit.html(Helpers.beautiful_numbers((_profit*100).toFixed(2)) + " % ("+i18n("CalcOnYear")+")");
            _$spanPercentsBonusplus.html(bonusplusAmountBeauty);
            if (_bonusplusAmount > 0) { _$bonusplusRow.show(); } else { _$bonusplusRow.hide(); }
        };


        var _setColumnValues = function () {
            var fullAmount = _getFullAmount();
            var main_amount_in_percent = _getAmountInCalculatorPercents(fullAmount, _mainAmount);
            var monthly_refill_amount_in_percent = _getAmountInCalculatorPercents(fullAmount, (_monthlyRefillAmount * _getPeriodWithLongation()));
            var percents_amount_in_percent = _getAmountInCalculatorPercents(fullAmount, _percentsAmount);
            var bonusplus_amount_in_percent = _getAmountInCalculatorPercents(fullAmount, _bonusplusAmount, true);

            _$bar_main_account.css({ 'height': main_amount_in_percent + '%' });
            _$bar_monthlyRefillAmount.css({ 'height': monthly_refill_amount_in_percent + '%' });
            _$bar_monthly_percents.css({ 'height': percents_amount_in_percent + '%' });
            _$bar_monthly_percents_bonusplus.css({ 'height': bonusplus_amount_in_percent + '%' });
            _setTitles()
        };


        //        var _setPercentsAmount = function() {
        //			var finalAmount = _mainAmount;
        //			var finalPercentAmount = 0;
        //			var bonusplusPercentAmount = 0;
        //			var taxAmount = 0;
        //			var annualPercentageWithoutBonusplus = _annualPercentage - _bonusplusPercentage;
        //			var percents4period = annualPercentageWithoutBonusplus / 12;
        //			var percentAmount = 0;
        //            for (var l=1; l<=_longationQuantity; l++) {
        //                for (var i = 1; i <= _period; i++) {
        //                    finalAmount += _monthlyRefillAmount;
        //                    percentLocal = finalAmount * percents4period / 100;
        //                    percentAmount += percentLocal;
        //                    if (_isCapitalization) {
        //                        finalAmount += percentLocal;
        //                    }
        //                    var bonusplusPercentAmountPerMonth = finalAmount * _bonusplusPercentage * _DAYS_IN_MONTH/(365*100);
        //                    bonusplusPercentAmountPerMonth = bonusplusPercentAmountPerMonth - (bonusplusPercentAmountPerMonth * _taxInPercents / 100);
        //                    bonusplusPercentAmount += bonusplusPercentAmountPerMonth;
        //                }
        //                percentAmount = percentAmount - (percentAmount * _taxInPercents / 100);
        //                finalPercentAmount = percentAmount;
        //            }
        //			finalAmount += bonusplusPercentAmount;
        //			if (!_isCapitalization) {
        //				finalAmount += Math.round(finalPercentAmount);
        //			};
        //
        //			_percentsAmount = Math.round(finalPercentAmount);
        //			_bonusplusAmount = Math.round(bonusplusPercentAmount);
        //        };

        var _setPercentsAmount = function () {
            var finalAmount = _mainAmount;
            var finalPercentAmount = 0;
            var bonusplusPercentAmount = 0;
            var taxAmount = 0;
            var annualPercentageWithoutBonusplus = _annualPercentage - _bonusplusPercentage;
            var longationPercentage = 0;
            var longationStep = 0;
            var isPeriodEnd = false;
            var finalPercentAmount4Period = 0;

            if (_isDPSV) {
                var periodWithLongation = Math.floor(_periodDays / _DAYS_IN_MONTH);
                var lastDaysOfDPSV = _periodDays - Math.floor(periodWithLongation * _DAYS_IN_MONTH);
            } else {
                var periodWithLongation = _getPeriodWithLongation();
            }

            for (var i = 1; i <= periodWithLongation; i++) {
                finalAmount += (_isNoFirstCharge && i === 1) ? 0 : _monthlyRefillAmount;
                var periodEnd = i % _period;
                isPeriodEnd = (periodEnd == 0) ? true : false;
                //                longationStep = Math.floor((i-1) / _period);
                //                longationPercentage = 0.5 * longationStep;

                var percentAmount = finalAmount * (annualPercentageWithoutBonusplus + longationPercentage) * _DAYS_IN_MONTH / (365 * 100);
                var bonusplusPercentAmountPerMonth = finalAmount * _bonusplusPercentage * _DAYS_IN_MONTH / (365 * 100);

                percentAmount = percentAmount - (percentAmount * _taxInPercents / 100);
                bonusplusPercentAmountPerMonth = bonusplusPercentAmountPerMonth - (bonusplusPercentAmountPerMonth * _taxInPercents / 100);

                bonusplusPercentAmount += bonusplusPercentAmountPerMonth;
                finalPercentAmount += percentAmount;
                finalPercentAmount4Period += percentAmount;

                if (_isCapitalization && !_isKPLK) {
                    finalAmount += percentAmount;
                } else if (_isKPLK && isPeriodEnd) {
                    finalAmount += finalPercentAmount4Period;
                    finalPercentAmount4Period = 0;
                }
            }

            if (_isDPSV) {
                var percentAmountDPSV = finalAmount * annualPercentageWithoutBonusplus * lastDaysOfDPSV / (365 * 100);
                percentAmountDPSV = percentAmountDPSV - (percentAmountDPSV * _taxInPercents / 100);
                finalPercentAmount += percentAmountDPSV;
                if (_isCapitalization) {
                    finalAmount += percentAmountDPSV;
                }
            }

            finalAmount += bonusplusPercentAmount;
            if (!_isCapitalization) {
                finalAmount += finalPercentAmount;
            }

            _percentsAmount = finalPercentAmount;
            _bonusplusAmount = bonusplusPercentAmount;

            _profit = Math.pow((1 + _annualPercentage / 100 / _period), periodWithLongation) - 1;
        };

        var _$column = $(column_id);
        var _$bar_main_account = $('.bar-main-amount', _$column);
        var _$bar_monthlyRefillAmount = $('.bar-monthly-refill-amount', _$column);
        var _$bar_monthly_percents = $('.bar-monthly-percents', _$column);
        var _$bar_monthly_percents_bonusplus = $('.bar-monthly-percents-bonusplus', _$column);

        var _$spanInvestAmount = $('.span-invest-amount');
        var _$spanFinalAmount = $('.span-final-amount');
        var _$spanAmtFull = $('.span-amt-full');
        var _$spanChargeFull = $('.span-charge-full');
        var _$spanPercentsRate = $('.span-percents-rate');
        var _$spanPercentsFull = $('.span-percents-full');
        // var _$spanProfit       = $('.span-profit');
        var _$spanPercentsBonusplus = $('.span-percents-bonusplus');
        var _$bonusplusRow = $('.bonusplus-row');
        var _taxInPercents = 0;

        var _mainAmount = 40;
        var _monthlyRefillAmount = 40;
        var _isNoFirstCharge = false;
        var _percentsAmount = 15;
        var _bonusplusAmount = 5;
        var _profit = 777;

        var _period = 12;
        var _periodDays = 0;                // срок депозита в днях для депозита "Зручный"
        var _isDPSV = false;                // показатель, что у текущего депозита срок указан в днях, а не в месяцах
        var _isKPLK = false;
        var _annualPercentage = 22;
        var _bonusplusPercentage = 0;
        var _isCapitalization = true;
        var _DAYS_IN_MONTH = 30.41666;
        var _longationQuantity = 0;
        var _currency = undefined;
    };


    var ContractType = function (contractTypeAPIObject) {
        this.getId = function () {
            return _contractTypeAPIObject.type;
        };

        this.getRate = function () {
            return _contractTypeAPIObject.base_rate;
        };

        this.getBonusPlusRate = function () {
            return _contractTypeAPIObject.bonus_plus;
        };

        this.getPeriod = function () {
            return _contractTypeAPIObject.period_int;
        };

        this.isCapitalizationAvailable = function () {
            return _contractTypeAPIObject.offer_rules.capitalization || false;
        };

        this.isPercentOnCardAvailable = function () {
            return _contractTypeAPIObject.offer_rules.percents_on_card || false;
        };

        this.getLiteralId = function () {
            return _contractTypeAPIObject.type_code;
        };

        this.isOpenable = function () {
            return _contractTypeAPIObject.able_to_issue;
        };

        var _contractTypeAPIObject = contractTypeAPIObject;
    };


    var ContractTypeCollection = function (depositAPIContractTypeList) {
        this.init = function () {
            _sortByPeriod();
        };

        this.getContractTypeByPeriod = function (period) {
            for (var i = 0; i < _contractTypeList.length; i++) {
                var contractType = this.getContractTypeByIndexNumber(i);
                if (contractType.getPeriod() == period) {
                    return contractType;
                }
            }
            return undefined;
        };

        this.getContractTypeByIndexNumber = function (indexNumber) {
            var rawContractType = _contractTypeList[indexNumber];
            if (!rawContractType) { return undefined }
            return new ContractType(rawContractType);
        };

        this.getLength = function () {
            return _contractTypeList.length;
        };

        this.getOpenableContractTypesCount = function () {
            var cnt = 0;
            for (var i = 0; i < this.getLength(); i++) {
                if (this.getContractTypeByIndexNumber(i).isOpenable()) { cnt++; }
            }
            return cnt;
        };

        var _sortByPeriod = function () {
            _contractTypeList.sort(_comareByPeriod);
        };

        var _comareByPeriod = function (a, b) {
            if (a.period_int < b.period_int)
                return -1;
            if (a.period_int > b.period_int)
                return 1;
            return 0;
        };

        var _contractTypeList = [];
        _contractTypeList = $.extend(_contractTypeList, depositAPIContractTypeList);
        this.init();
    };


    var Deposit = function (depositAPIObject) {
        this.getContractTypeCollection = function () {
            return _contractTypeCollection;
        };

        this.getName = function () {
            return _depositAPIObject.dep_name;
        };

        this.getId = function () {
            return _depositAPIObject.dep_code;
        };

        this.isOpenable = function () {
            return (_contractTypeCollection.getOpenableContractTypesCount() > 0);
        };

        var _numOrdA = function (a, b) { return (a - b); };
        var _depositAPIObject = depositAPIObject;
        var _contractTypeCollection = new ContractTypeCollection(_depositAPIObject.terms);
    };


    var DepositCollection = function (depositAPIList) {
        this.getDepositById = function (depositId) {
            for (var i = 0; i < _depositAPIList.length; i++) {
                var deposit = this.getDepositByIndexNumber(i);
                if (deposit.getId() == depositId) {
                    return deposit;
                }
            }
            return undefined;
        };

        this.getDepositByIndexNumber = function (depositIndex) {
            var rawDeposit = _depositAPIList[depositIndex];
            if (!rawDeposit) { return undefined }
            return new Deposit(rawDeposit);
        };

        this.getLength = function () {
            return _depositAPIList.length;
        };

        var _depositAPIList = depositAPIList;
    };


    var DepositCalculator = function () {
        this.init = function () {
            _initCurrencySelect();
            _initCreateDepositButton();
        };

        var _setCurrency = function (currency) {
            var depositAPIList = _depositOffers.tabledata[currency].deposits;
            if (!depositAPIList) { depositAPIList = [] }
            _depositCollection = new DepositCollection(depositAPIList);
            _currentCurrency = new Currency(_depositOffers.tabledata[currency], currency);
            _investedColumn.setCurrency(_currentCurrency);
            _customerGetColumn.setCurrency(_currentCurrency);
            _initDepositSelectList();
        };

        var _initCurrencySelect = function () {
            var $currencySelect = $('#deposit-currency-select');
            var buttonsTemplate = '';
            for (var i = 0; i < _depositOffers.order.length; i++) {
                var currencyId = _depositOffers.order[i];
                var currency = _depositOffers.tabledata[currencyId];
                var currencyButtonTemplate = '<li class="currency-btn menu__item submenu__cur"><a href="#" class="menu__link submenu__link button2" data-toggle="tab" id="currency-' + currencyId + '">' + i18n(currencyId) + '</a></li>';
                buttonsTemplate += currencyButtonTemplate;
            }
            $currencySelect.html(buttonsTemplate + $currencySelect.html());

            var $currencyButtons = $('.currency-btn', $currencySelect);

            $currencyButtons.off('click').on('click', function (event) {
                // event.preventDefault();
                var $this = $(this);
                $currencyButtons.removeClass('active');
                $this.addClass('active');
                var currencyId = $('a', $this).attr('id').split('-')[1];
                _setCurrency(currencyId);
            });

            $($('a', $currencyButtons)[0]).trigger('click');
        };

        var _initDepositSelectList = function () {
            var depositListLi = '';
            for (var i = 0; i < _depositCollection.getLength(); i++) {
                var deposit = _depositCollection.getDepositByIndexNumber(i);
                // if (deposit.isOpenable()) {  }
                depositListLi += ('<li><a href="#" id="deposit-' + deposit.getId() + '">' + i18n(deposit.getId()) + '</a></li>');
            }
            _$deposit_select.html(depositListLi);

            var $depositSelectAList = _$deposit_select.find('a');
            $depositSelectAList.off('click').on('click', function (event) {
                $this = $(this);
                event.preventDefault();
                var $caret = $('<span class="caret"></span>');

                var $fchildDropdownValue = $("a.deposit-select-value");
                $fchildDropdownValue.text($this.text() + ' ').append($caret);
                $fchildDropdownValue.val($this.text());
                _initSelectedDeposit($this.attr('id').split('-')[1]);
            });
            // switch on old dep
            try {
                var oldEl = $('#deposit-' + _currentDeposit.getId(), _$deposit_select);
                (oldEl.length == 0) ? $($('a', _$deposit_select)[0]).trigger('click') : oldEl.trigger('click');
            } catch (e) { $($('a', _$deposit_select)[0]).trigger('click'); }
        };

        var _initSelectedDeposit = function (deposit_id) {
            _currentDeposit = _depositCollection.getDepositById(deposit_id);
            _initUIDepositElements();
        };

        var _setPeriodAndRate = function (contractType, fakeRate) {
            var period = contractType.getPeriod();
            var program = _currentDeposit.getId();
            _investedColumn.setPeriod(period, program);
            _customerGetColumn.setPeriod(period, program);

            var annualPercentage = fakeRate || contractType.getRate();
            var bonusplusPercentage = contractType.getBonusPlusRate();
            _investedColumn.setAnnualPercentage(annualPercentage, bonusplusPercentage);
            _customerGetColumn.setAnnualPercentage(annualPercentage, bonusplusPercentage);

            _$mainRateSpan.html(annualPercentage + '%');
            _$bonusplusRateSpan.html(bonusplusPercentage + '%');

        };

        var _setPeriodAndRateDPSV = function (dateClose) {
            var now = new Date();
            var periodDays = parseInt((dateClose.getTime() - now.getTime()) / (24 * 3600 * 1000)) + 1;
            if (60 <= periodDays && periodDays <= 90) {
                _currentContractType = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(0);
            } else if (91 <= periodDays && periodDays <= 180) {
                _currentContractType = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(1);
            } else if (181 <= periodDays && periodDays <= 360) {
                _currentContractType = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(2);
            }
            var period = (periodDays / 30) | 0;
            var annualPercentage = _currentContractType.getRate();
            var bonusplusPercentage = _currentContractType.getBonusPlusRate();

            _$daysTermSpan.html(periodDays + "&nbsp;" + getRightDayEnd(periodDays));
            _$daysRateSpan.html(annualPercentage + '%');

            _investedColumn.setPeriod(period);
            _customerGetColumn.setPeriod(period);
            _investedColumn.setPeriodDays(periodDays);
            _customerGetColumn.setPeriodDays(periodDays);

            _investedColumn.setAnnualPercentage(annualPercentage, bonusplusPercentage);
            _customerGetColumn.setAnnualPercentage(annualPercentage, bonusplusPercentage);
        };

        var _setLongationQuantity = function (longationQuantity) {
            _$longationCountSpan.html(longationQuantity);
            _investedColumn.setLongationQuantity(longationQuantity);
            _customerGetColumn.setLongationQuantity(longationQuantity);
        };

        var _setIsCapitalization = function (isCapitalization) {
            _investedColumn.setIsCapitalization(isCapitalization);
            _customerGetColumn.setIsCapitalization(isCapitalization);
        };

        var _setTax = function (tax) {
            _investedColumn.setTax(tax);
            _customerGetColumn.setTax(tax);
        };

        var _needCheckMaxRefillAmount = function () {
            switch (_currentDeposit.getId()) {
                case "DPR0":
                case "KOPI":
                case "PADV":
                case "DPBN": return false;
                default: return true;
            }
        };

        var _initUIDepositElements = function () {
            _initInvestSlider();
            _initRefillSlider();
            _initTermSlider();
            _initPercentEditor();
            _initLongationSlider();
            _initSliderValues();
            _initPercentsToggle();
            _initTaxToggle();
        };

        var _initInvestSlider = function () {
            if (_$sliderRefill.data('slider')) {
                _$sliderInvest.slider('destroy');                           // при переключении валют приходится удалять предыдущий слайдер чтобы нарисовать его заново
            }
            _$sliderInvest.slider({
                'min': _MIN_SLIDER_AMOUNT,
                'max': _MAX_SLIDER_AMOUNT,
                'step': _AMOUNT_SLIDER_STEP,
                'scale': 'logarithmic',
                'logarithmic_shift': 700,
                'value': (_currentCurrency.id == 980) ? _DEFAULT_INVEST_SLIDER_AMOUNT_UAH : _DEFAULT_INVEST_SLIDER_AMOUNT_USD_EUR,
                //'selection':'after',
                'tooltip': _SLIDER_TOOLTIP,
                'handle': _SLIDER_HANDLE,
                formatter: function (amount) {
                    $('#invest_amount').val(amount).change();
                    _investedColumn.setInvestAmount(amount);
                    _customerGetColumn.setInvestAmount(amount);
                }
            });
            if (_needCheckMaxRefillAmount()) {
                _$sliderInvest.on('change', function (e) {
                    var invest_amount = e.value.newValue;
                    var refill_amount = _$sliderRefill.slider('getValue');
                    if (invest_amount < refill_amount) {
                        _$sliderRefill.slider("setValue", invest_amount);
                    }
                })
            }
        };

        var _initRefillSlider = function () {
            var maxRefillSum = { "980": 50000, "840": 3000, "978": 3000 };
            var maxSliderAmount = maxRefillSum[_currentCurrency.id];
            switch (_currentDeposit.getId()) {
                case "DPR0":
                case "PADV":
                case "DPBN": maxSliderAmount = _MAX_SLIDER_AMOUNT; break;
                case "DENS": maxSliderAmount = 0; break;
            }
            if (_$sliderRefill.data('slider')) {
                _$sliderRefill.slider('destroy');                           // при переключении валют приходится удалять предыдущий слайдер чтобы нарисовать его заново
            }
            _$sliderRefill.slider({
                'min': _MIN_SLIDER_AMOUNT,
                'max': maxSliderAmount,
                'step': _AMOUNT_SLIDER_STEP,
                'scale': 'linear',
                'value': (_currentCurrency.id == 980) ? _DEFAULT_MONTHLY_REFILL_SLIDER_AMOUNT_UAH : _DEFAULT_MONTHLY_REFILL_SLIDER_AMOUNT_USD_EUR,
                //'selection':'after',
                'tooltip': _SLIDER_TOOLTIP,
                'handle': _SLIDER_HANDLE,
                formatter: function (amount) {
                    $('#monthly_refill_amount').val(amount).change();
                    _investedColumn.setMonthlyRefillAmount(amount);
                    _customerGetColumn.setMonthlyRefillAmount(amount);
                }
            });
            _$noFirstCharge.on('change', function () {
                _investedColumn.setNoFirstCharge(_$noFirstCharge.prop("checked"));
                _customerGetColumn.setNoFirstCharge(_$noFirstCharge.prop("checked"));
            });
            if (_needCheckMaxRefillAmount()) {
                _$sliderRefill.on('change', function (e) {
                    var invest_amount = $('#invest_amount').val();
                    invest_amount = parseInt(invest_amount);
                    if (e.value.newValue > invest_amount) {
                        _$sliderRefill.slider("setValue", invest_amount);
                    }
                })
            }
        };

        var _initPercentEditor = function () {
            var pencil = $('#main-rate-change');
            setTooltipOnBonus();
            pencil.off('click').on('click', function (event) {
                var rateP = pencil.parent();
                var currentRate = document.getElementById('main-rate-span').innerHTML;
                rateP.hide();
                rateP.after("<p class='percent-rate-p'><input type='text' class='slider-value' value='" + parseFloat(currentRate) + "'></p>");
                var editP = rateP.next();
                var input = editP.children('input');
                // Функция, которая убирает поле ввода и показывает процентную ставку ничего не меняя.
                var _cancelChangingPercentRate = function () {
                    editP.remove();
                    rateP.show();
                };
                // Функция, которая сохраняет введенную процентную ставку.
                var _changePercentRate = function () {
                    var newRate = input.val();
                    if (newRate < 100 && /^\d{1,2}(\.{0,1}\d{0,2}){0,1}$/.test(newRate)) {      // валидация новой процентной ставки
                        var termIndex = _$sliderTerm.slider('getValue');
                        var isEnabled = _$sliderTerm.slider('isEnabled');
                        var i = isEnabled ? 1 : 2;                                  // это число помогает привести позицию слайдера к позиции в списке
                        _currentContractType = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(termIndex - i);
                        _setPeriodAndRate(_currentContractType, newRate);
                    } else if (newRate == '') {                                      // если в поле ввода пустота - возвращаем старое значение
                    } else {
                        showErrorMSG(input[0], " ");                                 // если валидации не прошли
                        return false;
                    }
                    _cancelChangingPercentRate();                                   // убираем форму ввода
                    setTooltipOnBonus();
                };

                input.focus().on('blur', _changePercentRate);                       // применяем новую процентную ставку при смене фокуса
                input.keypress(function (e) {
                    if (e.keyCode == 13) { _changePercentRate(); }                   // применяем новую процентную ставку по кнопке Enter
                    return fieldsFilter(e, 5, 'money');                             // или просто фильтруем ввод символов
                });
                input.keydown(function (e) {
                    removeAllErrorsFromInput(input[0]);                             // очищаем сообщение об ошибке по нажатию любой клавиши
                    if (e.keyCode == 27) { _cancelChangingPercentRate(); }           // возвращаем всё назад по Esc
                });
                input.on("paste", function (e) { return false; });
            });
        };

        var _initTermSlider = function () {
            if (_currentDeposit.getId() == "DPSV") {
                _$sliderTerm.closest('.calculator-row').hide();
                _$inputTerm.closest('.calculator-row').show();
                _initTermInput();
                return;
            } else {
                _$sliderTerm.closest('.calculator-row').show();
                _$inputTerm.closest('.calculator-row').hide();
            }

            var termLength = _currentDeposit.getContractTypeCollection().getLength();
            var isFakeTermLength = false;
            if (termLength == 1) {
                termLength++;
                isFakeTermLength = true;
            }

            if (_$sliderTerm.data('slider')) {
                _$sliderTerm.slider('destroy');
            }
            _$sliderTerm.slider({
                'min': 1,
                'max': termLength,
                'step': 1,
                // 'value':contractTypes.length,
                'handle': _SLIDER_HANDLE,
                'tooltip': _SLIDER_TOOLTIP,
                formatter: function (value) {
                    if (isFakeTermLength) { value -= 1; }
                    _currentContractType = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(value - 1);
                    _setPeriodAndRate(_currentContractType);
                    setTooltipOnBonus();
                }
            });
            _$sliderTerm.slider('enable');

            var val = _$sliderTerm.data('slider').getValue();

            if (isFakeTermLength) {
                val = termLength;
                _$sliderTerm.slider('disable');
            }

            if (val > _currentDeposit.getContractTypeCollection().getLength()) { val = termLength }
            _$sliderTerm.data('slider').setValue(val);


            var _setSliderSpans = function (isFakeTermLength) {
                var termLength = _currentDeposit.getContractTypeCollection().getLength();
                if (isFakeTermLength) {
                    termLength++;
                }
                var $rates_row = $('.rates-row');
                var $terms_row = $('.terms-row');
                var rates = '';
                var terms = '';
                for (var i = 0; i < termLength; i++) {
                    var idx = i;
                    var cls_rate = 'slider-rate';
                    var cls_term = 'slider-term';
                    if (i + 1 == termLength) {
                        cls_rate = '';
                        cls_term = '';
                    }
                    if (isFakeTermLength) {
                        idx = 0;
                    }
                    var baseRate = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(idx).getRate(); // + '%';
                    var period = _currentDeposit.getContractTypeCollection().getContractTypeByIndexNumber(idx).getPeriod();
                    if (isFakeTermLength && i == 0) {
                        baseRate = '';
                        period = '';
                    }
                    rates += '<div class="' + cls_rate + '"><div style="width: 21px; position: relative;"><div style="display: inline-block;"><span style="position: relative; left: -50%;font-size: 10px;">' + baseRate + '</span></div></div></div>';
                    terms += '<div class="' + cls_term + '"><div style="width: 21px; position: relative;"><div style="display: inline-block;"><span style="position: relative; left: -50%;">' + period + '</span></div></div></div>';
                }
                $rates_row.html(rates);
                $terms_row.html(terms);

                var marginRatesPercents = (100 / (termLength - 1));
                $('.slider-rate', $rates_row).css({ 'width': marginRatesPercents + '%', 'float': 'left' });

                var marginTermsPercents = (100 / (termLength - 1));
                $terms_row.find('.slider-term').css({ 'width': marginTermsPercents + '%', 'float': 'left' });
            };
            _setSliderSpans(isFakeTermLength);
        };

        var _initTermInput = function () {
            if (!pickers[_$inputTerm[0].id]) {
                var minDate = new Date();
                var maxDate = new Date();
                minDate.setDate(minDate.getDate() + 60);
                maxDate.setDate(maxDate.getDate() + 360);
                pickers[_$inputTerm[0].id] = new Pikaday({
                    field: _$inputTerm[0],
                    firstDay: 1,
                    i18n: clLangs.ua,
                    defaultDate: minDate,
                    setDefaultDate: true,
                    minDate: minDate,
                    maxDate: maxDate,
                    format: 'DD.MM.YYYY',
                    onSelect: _setPeriodAndRateDPSV
                });
            }
            _setPeriodAndRateDPSV(pickers[_$inputTerm[0].id].getDate());
        };

        var _initLongationSlider = function () {
            switch (_currentDeposit.getId()) {
                case "DPSV": var maxLongationsCount = 0; break;
                default: var maxLongationsCount = 5; break;
            }
            if (_$sliderLongation.data('slider')) {                      // если до этого слайдер существовал
                var value = _$sliderLongation.slider('getValue');       // то берём его значение
                _$sliderLongation.slider('destroy');                    // и разваливаем тут всё на...
            }
            _$sliderLongation.slider({
                'min': 0,
                'max': maxLongationsCount,
                'step': 1,
                'value': (value && value <= maxLongationsCount) ? value : 0,
                'handle': _SLIDER_HANDLE,
                //'selection':'after',
                'tooltip': _SLIDER_TOOLTIP,
                formatter: function (value) {
                    _setLongationQuantity(value);
                }
            });

            var _setSliderSpans = function (maxLongationCount) {
                var $longation_row = $('.longation-row');
                var rowWidth = $longation_row.width();
                var longations = '';
                for (var i = 0; i < maxLongationCount; i++) {
                    var cls_longation = 'slider-longation';
                    if (i + 1 == maxLongationCount) {
                        cls_longation = '';
                    }
                    longations += '<div class="' + cls_longation + '"><div style="width: 21px; position: relative;"><div style="display: inline-block;"><span style="position: relative; left: -50%;">' + i + '</span></div></div></div>';
                }
                $longation_row.html(longations);
                var marginRatesPercents = (100 / (maxLongationCount - 1));
                $longation_row.find('.slider-longation').css({ 'width': marginRatesPercents + '%', 'float': 'left' });
            };
            _setSliderSpans(maxLongationsCount + 1);

            if (maxLongationsCount == 0) {                               // если вывбрать количество продлений нельзя, то и не показываем его
                _$sliderLongation.closest('.calculator-row').hide();
            } else {
                _$sliderLongation.closest('.calculator-row').show();
            }
        };

        var _initSliderValues = function () {
            var $slider_values = $('.slider-value').not('.no-slider');
            $slider_values.keypress(function (evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode;
                return !(charCode > 31 && (charCode < 48 || charCode > 57));
            });

            $slider_values.off('input').on('input', function () {
                var $this = $(this);
                _alertForMonthlyRefillAmount($this);
                $this.parents('.for-slider').find('.calculator-slider').data('slider').setValue(parseFloat($this.val()));
            });
        };

        var _alertForMonthlyRefillAmount = function (input) {
            if (input[0].id == 'monthly_refill_amount' && _needCheckMaxRefillAmount()) {
                var invest_amount = $('#invest_amount').val();
                var curr = _currentCurrency.mnemonic.toLowerCase();
                if (input.val() > parseInt(invest_amount)) {
                    showModal("<h5 style='text-align: center;'>" + i18n("MonthlyChargeLimit") + invest_amount + " " + i18n(curr) + "</h5>");
                }
            }
        };

        var _initPercentsToggle = function () {
            var $output_percents_select = $('#output-percents-select');
            var $percentsRow = $('.percents-row');
            var selectOptions = '';

            $percentsRow.hide();
            if (_currentContractType.isCapitalizationAvailable()) {
                selectOptions += '<li class="output-percents-btn" id="is-capitalization"><a href="#"><img src="/static/app/img/dpb-icon_Capital.png">' + /*gettext(*/i18n("Add")/*)*/ + '</a><div>' + i18n("AddUnder") + '</div></li>';
                $percentsRow.show();
            }

            if (_currentContractType.isPercentOnCardAvailable()) {
                selectOptions += '<li class="output-percents-btn" id="is-not-capitalization"><a href="#"><img src="/static/app/img/dpb-icon_Card.png">' + /*gettext(*/i18n("Card")/*)*/ + '</a><div>' + i18n("CardUnder") + '</div></li>';
                $percentsRow.show();
            }
            // $output_percents_select.html(selectOptions);

            var $outputPercentsButtons = $('.output-percents-btn', $output_percents_select);
            _setIsCapitalization(false);
            $outputPercentsButtons.off('click').on('click', function (event) {
                var $this = $(this);
                event.preventDefault();
                $outputPercentsButtons.removeClass('active');
                $this.addClass('active');
                var isCapitalization = ($this.attr('id') == 'is-capitalization');
                _setIsCapitalization(isCapitalization);
            });
            $($('a', $outputPercentsButtons)[0]).trigger('click');
        };

        var _initTaxToggle = function () {
            var tax = 19.5;
            var $tax_select = $('#tax-select');
            var $taxButtons = $('.tax-btn', $tax_select);
            $taxButtons.off('click').on('click', function (event) {
                var $this = $(this);
                event.preventDefault();
                $taxButtons.removeClass('active');
                $this.addClass('active');
                var isTax = ($this.attr('id') == 'is-tax');
                var taxInPercents = ((isTax) ? tax : 0);
                _setTax(taxInPercents);
            });

            var taxBankWhiteList = ['PB', 'AB'];
            console.log(_currentDeposit.getId());
            if (taxBankWhiteList.indexOf(_bank) >= 0 && _currentDeposit.getId() != "DPBN") {
                var $activeBtn = $('.tax-btn.active', $tax_select);
                var isTax = ($activeBtn.attr('id') == 'is-tax');
                var taxInPercents = ((isTax) ? tax : 0);
                _setTax(taxInPercents);
                _$taxRow.show();
            } else {
                _$taxRow.hide();
                _setTax(0);
                $taxButtons.removeClass('active');
                $('#is-not-tax').addClass('active');
            }
        };

        var _initCreateDepositButton = function () {
            $('#calc_create_dep').off('click').on('click', function () {
                var depCode = _currentDeposit.getId();
                var depTerm = _currentContractType.getPeriod();
                var depCurr = _currentCurrency.id;
                depositsDrawObj.setCurrency(_currentCurrency.mnemonic.toLowerCase());
                var programLines = depositsDrawObj.prepareProgramLines();
                programLines = DepositsDraw.mergeComplexPrograms(programLines);

                var isMerged = 'false',
                    mergedPrograms,
                    startTerm, endTerm,
                    mergedLines;
                if (depCode === "DEN0" || depCode === "DE00") {      // для смерженых депозитов придётся получать дополнительные параметры
                    for (var i = 0; i < programLines.length; i++) {
                        if (programLines[i].code === 'DEN0_DE00') {
                            mergedLines = programLines[i].lines;
                            break;
                        }
                    }
                    for (var j = 0; j < mergedLines.length; j++) {
                        startTerm = mergedLines[j].listener.startTerm;
                        endTerm = mergedLines[j].listener.endTerm;
                        if (parseInt(startTerm) <= parseInt(depTerm) && parseInt(endTerm) >= parseInt(depTerm)) {
                            mergedPrograms = mergedLines[j].listener.programs;
                            isMerged = 'true';
                            break;
                        }
                    }
                }
                var params = tuple(bin(depCode), number(depTerm), bin(depCurr), bin(isMerged), bin(mergedPrograms), bin(startTerm), bin(endTerm));
                console.log('OpenSpecifiedDeposit', depCode, depTerm, depCurr, isMerged, mergedPrograms, startTerm, endTerm);
                console.log('OpenSpecifiedDeposit', params);
                ws.send(enc(tuple(atom('client'), tuple(bin('OpenSpecifiedDeposit'), params))));
                document.getElementById('depositsLink').click();
            });
        };

        var _investedColumn = new CalculatorColumn('#column1');
        var _customerGetColumn = new CalculatorColumn('#column2');
        var _depositCollection = new DepositCollection([]);
        var _currentDeposit = undefined;
        var _currentContractType = undefined;
        var _currentCurrency = undefined;
        var _depositOffers = depositOffers;
        var _bank = "PB"; //_depositOffers.bank;

        var _$deposit_select = $('.deposit-select');
        var _$taxRow = $('.tax-row');

        var _$inputTerm = $('#input-term');
        var _$sliderTerm = $('#slider-term');
        var _$sliderInvest = $('#slider-invest');
        var _$sliderRefill = $('#slider-refill');
        var _$noFirstCharge = $('#noFirstCharge');
        var _$sliderLongation = $('#slider-longation');

        var _$mainRateSpan = $('#main-rate-span');
        var _$longationCountSpan = $('#longation-count-span');
        var _$bonusplusRateSpan = $('#bonusplus-rate-span');
        var _$daysTermSpan = $('#days-term-span');
        var _$daysRateSpan = $('#days-rate-span');
        var _MIN_SLIDER_AMOUNT = 0;
        var _MAX_SLIDER_AMOUNT = 100000000;
        var _AMOUNT_SLIDER_STEP = 100;
        var _DEFAULT_INVEST_SLIDER_AMOUNT_UAH = 5000;
        var _DEFAULT_INVEST_SLIDER_AMOUNT_USD_EUR = 1000;
        var _DEFAULT_MONTHLY_REFILL_SLIDER_AMOUNT_UAH = 500;
        var _DEFAULT_MONTHLY_REFILL_SLIDER_AMOUNT_USD_EUR = 500;
        var _SLIDER_TOOLTIP = 'hide';
        var _SLIDER_HANDLE = 'square';

        this.init();
    };


    depositCalculator = new DepositCalculator();
});




function setTooltipOnBonus() {
    var pencil = $('#main-rate-change');
    var m = pencil.parents("div.fixed-height-body")[0];
    var toolText = $(m).find('a.tooltips > span');
    toolText.html(document.getElementById('bonusplus-rate-span').innerHTML + " " + i18n('of') + " " + document.getElementById('main-rate-span').innerHTML + " " + i18n('LineBonusTooltip'));
}
