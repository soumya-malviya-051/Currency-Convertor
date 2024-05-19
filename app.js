const BASE_URL="https://open.er-api.com/v6/latest";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")
const icon=document.querySelector(".dropdown i");




// for(let code in countryList){
//     console.log(code, countryList[code]);
// }


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value=1;
    }

    console.log(fromCurr.value, toCurr.value);
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response =await fetch(URL);
    let data= await response.json();
    let rates=data.rates;

    let exchangeRate=rates[toCurr.value];
    console.log(rates);
    console.log(exchangeRate);

    let finalAmount=amountVal* exchangeRate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})

// let findExchangerates=(toCurr, arrExchange)=>{
    
// }

icon.addEventListener("click", () => {
    let fromValue = fromCurr.value;
    let toValue = toCurr.value;
    
    fromCurr.value = toValue;
    toCurr.value = fromValue;
    
    updateFlag(fromCurr);
    updateFlag(toCurr);
    btn.click();
});