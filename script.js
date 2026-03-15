function getNumber(v){

if(!v) return 0

return parseInt(v.toString().replace(/\./g,'')) || 0

}

function format(n){

return n.toLocaleString("id-ID")

}


function newMonth(){

let container=document.createElement("div")

container.className="container"

container.innerHTML=`

<table>

<tr>
<th colspan="2">Essential Expenses</th>
</tr>

<tr>
<td>Available Income</td>
<td id="essentialBudget">0</td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="essentialInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="essentialInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="essentialInput"></td>
</tr>

<tr>
<td>Total Spending</td>
<td id="essentialTotal">0</td>
</tr>

<tr>
<td>Status</td>
<td id="essentialStatus">-</td>
</tr>

</table>



<table>

<tr>
<th colspan="2">Non Essential Expenses</th>
</tr>

<tr>
<td>Available Income</td>
<td id="nonBudget">0</td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="nonInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="nonInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="nonInput"></td>
</tr>

<tr>
<td>Total Spending</td>
<td id="nonTotal">0</td>
</tr>

<tr>
<td>Status</td>
<td id="nonStatus">-</td>
</tr>

</table>



<table>

<tr>
<th colspan="2">Savings</th>
</tr>

<tr>
<td>Available Income</td>
<td id="saveBudget">0</td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="saveInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="saveInput"></td>
</tr>

<tr>
<td contenteditable="true">Expense</td>
<td><input class="saveInput"></td>
</tr>

<tr>
<td>Total Spending</td>
<td id="saveTotal">0</td>
</tr>

<tr>
<td>Status</td>
<td id="saveStatus">-</td>
</tr>

</table>

`

document.getElementById("months").appendChild(container)

setupInputs()

calculateBudgets()

}



function setupInputs(){

document.querySelectorAll("input").forEach(i=>{

i.addEventListener("input",calculate)

})

}



function calculateBudgets(){

let income=getNumber(document.getElementById("monthlyIncome").value)

if(income==0) return

let essential=income*0.5
let non=income*0.3
let save=income*0.2

document.getElementById("essentialBudget").innerText=format(essential)
document.getElementById("nonBudget").innerText=format(non)
document.getElementById("saveBudget").innerText=format(save)

}



function calculate(){

let essentialTotal=0
let nonTotal=0
let saveTotal=0


document.querySelectorAll(".essentialInput").forEach(i=>{

essentialTotal+=getNumber(i.value)

})

document.querySelectorAll(".nonInput").forEach(i=>{

nonTotal+=getNumber(i.value)

})

document.querySelectorAll(".saveInput").forEach(i=>{

saveTotal+=getNumber(i.value)

})


document.getElementById("essentialTotal").innerText=format(essentialTotal)
document.getElementById("nonTotal").innerText=format(nonTotal)
document.getElementById("saveTotal").innerText=format(saveTotal)

checkStatus()

saveData()

}



function checkStatus(){

let essentialBudget=getNumber(document.getElementById("essentialBudget").innerText)
let nonBudget=getNumber(document.getElementById("nonBudget").innerText)
let saveBudget=getNumber(document.getElementById("saveBudget").innerText)

let essentialTotal=getNumber(document.getElementById("essentialTotal").innerText)
let nonTotal=getNumber(document.getElementById("nonTotal").innerText)
let saveTotal=getNumber(document.getElementById("saveTotal").innerText)

updateStatus("essential",essentialTotal,essentialBudget)
updateStatus("non",nonTotal,nonBudget)
updateStatus("save",saveTotal,saveBudget)

generateAdvice()

}



function updateStatus(type,total,budget){

let status=document.getElementById(type+"Status")

if(total==0){

status.innerText="No Spending"

status.style.color="gray"

return

}

let percent=total/budget

if(percent>1){

status.innerText="Over Budget"

status.style.color="red"

}

else if(percent>0.9){

status.innerText="Budget Tight"

status.style.color="orange"

}

else{

status.innerText="Under Budget"

status.style.color="green"

}

}



function generateAdvice(){

let advice=document.getElementById("adviceMessage")

let essential=document.getElementById("essentialStatus").innerText
let non=document.getElementById("nonStatus").innerText
let save=document.getElementById("saveStatus").innerText


if(essential=="Over Budget" && non=="Over Budget" && save=="Over Budget"){

advice.innerHTML=
"🚨 You are over budget in ALL categories.<br><br>"+
"Recommendations:<br>"+
"• Stop non-essential spending<br>"+
"• Review large bills<br>"+
"• Focus on food, housing, and utilities first"

return

}

if(essential=="Over Budget"){

advice.innerHTML=
"⚠️ You are over budget in Essential Expenses.<br>"+
"Try reviewing fixed costs."

return

}

if(non=="Over Budget"){

advice.innerHTML=
"⚠️ You are over budget in Non Essential Expenses.<br>"+
"Reduce shopping or entertainment."

return

}

if(save=="Over Budget"){

advice.innerHTML=
"⚠️ You exceeded your planned savings allocation."

return

}

advice.innerHTML=
"✅ Your spending is within budget."

}



function saveData(){

localStorage.setItem("budgetPage",document.body.innerHTML)

}



window.onload=function(){

let saved=localStorage.getItem("budgetPage")

if(saved){

document.body.innerHTML=saved

setupInputs()

}

}
