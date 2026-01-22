let nameInp = document.querySelector("#name");
let amountInp = document.querySelector("#amount");
let addBtn = document.querySelector("#add-expense");
let totalVal=document.querySelector("#total-val")
let list=document.querySelector("#expense-list")

let expenses=[];
// let expenses=JSON.parse(localStorage.getItem("history"))||[];
// render()

addBtn.addEventListener("click",function(){
    if(nameInp.value=="" || amountInp.value<=0){
        alert("Please fill in all fields");
        return;
    }
    let name=nameInp.value;
    let amount=Number(amountInp.value);
    let exp_obj={"name":name,"amount":amount};
    expenses.push(exp_obj);
    nameInp.value="";
    amountInp.value="";
    render();
})

function render(){
   let clutter="";
   let total=0;
    expenses.forEach(function(item){
        clutter+=`
        <li><i>${item.name}</i>  : <span class="amo">$${item.amount}</span></li>
        `;
        total+=item.amount
    }
        )
    list.innerHTML=clutter;
    totalVal.innerHTML=total;

    // localStorage.setItem(JSON.stringify("history",expenses))
}

