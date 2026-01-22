let nameInp = document.querySelector("#name");
let amountInp = document.querySelector("#amount");
let addBtn = document.querySelector("#add-expense");
let totalVal=document.querySelector("#total-val")
let list=document.querySelector("#expense-list")


let expenses=JSON.parse(localStorage.getItem("history"))||[];
render()

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
    expenses.forEach(function(item,index){
        clutter+=`
        <li><i>${item.name}</i>  : <span class="amo">$${item.amount}</span>
        <button  data-index="${index}" class="del-btn">Delete</button>
        <button data-index="${index}" class="edit-btn">Edit</button>
        </li> `;
        total+=item.amount
    }
        )
    list.innerHTML=clutter;
    totalVal.innerHTML=total;

    // PREVIOUSLY I MADE A MISTAKE ON:
    // localStorage.setItem(JSON.stringify("history",expenses))
    localStorage.setItem("history",JSON.stringify(expenses));   
}


list.addEventListener("click",function(details){
    let id=details.target.dataset.index;
    if(details.target.classList.contains("del-btn")){
        expenses.splice(id,1)
        render();
    }
    if(details.target.classList.contains("edit-btn")){
        let New_name=prompt("Enter new name",expenses[id].name)
        expenses[id].name=New_name
        let New_amt=Number(prompt("Enter new amount",expenses[id].amount))
        expenses[id].amount=New_amt
        render();
    }

})
