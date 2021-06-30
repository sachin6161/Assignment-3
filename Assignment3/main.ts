const myData:any = [
    {
        First_Name:"Mr.",
        Middle_Name:"Sachin",
        Last_Name:"kumar",
        Email:"sachin1620@gmail.com",
        Phone_Number:"9955171847",
        Role:"trainee",
        Address:"supaul"
    },
​
    {
        First_Name:"Miss",
        Middle_Name:"pooja",
        Last_Name:"Agarwal",
        Email:"pooja@gmail.com",
        Phone_Number:"8888888888",
        Role:"student",
        Address:"bihar"
    },
​
    {
        First_Name:"Mr.",
        Middle_Name:"Abhinav",
        Last_Name:"kumar",
        Email:"abhinav@gmail.com",
        Phone_Number:"62101725232",
        Role:"Student",
        Address:"Patna"
​
    },
​
    {
        First_Name:"Mr.",
        Middle_Name:"Sachin",
        Last_Name:"Kumar",
        Email:"sachin@gmail.com",
        Phone_Number:"990000047",
        Role:"trainee",
        Address:"Patna"
​
    },
​
    {
        First_Name:"Mr.",
        Middle_Name:"Akshay",
        Last_Name:"Kumar",
        Email:"akshay@gmail.com",
        Phone_Number:"88890171847",
        Role:"Student",
        Address:"Punjab"
​
    },
​
    {
        First_Name:"Mr.",
        Middle_Name:"Alok",
        Last_Name:"Kumar",
        Email:"alok@gmail.com",
        Phone_Number:"880901847",
        Role:"Developer",
        Address:"Hariyana"
​
    },
​
    {
        First_Name:"Mr.",
        Middle_Name:"Ankit",
        Last_Name:"Kumar",
        Email:"ankit@gmail.com",
        Phone_Number:"9900171847",
        Role:"Student",
        Address:"New Delhi"
​
    },
​
    {
        First_Name:"Md.",
        Middle_Name:"Danish",
        Last_Name:"Raza",
        Email:"danish@gmail.com",
        Phone_Number:"748862847",
        Role:"Student",
        Address:"Bihar"
​
    }
];
​
​
​
​
interface crud<T>{
     createData<T>();
     readData<T>();
     updateData<T>(tr:any);
     deleteData<T>(td:any);
}
​
​
class Model {
        First_Name:string;
        Middle_Name:string;
        Last_Name:string;
        Email:string;
        Phone_Number:number;
        Role:string;
        Address:string;
​
}
​
​
class MyClass extends Model implements crud<any>{
​
    @FormatDate(new Date())  
    createData<T>(){
        var addR:any=document.getElementById("list") as HTMLTableElement;
        var newR=addR.insertRow();
        var newC:any;
        for(var val in myData[0])
        newC=newR.insertCell();
        //newC=newR.insertCell();
        const btns=document.createElement('td');
         btns.innerHTML=` <button id="onEditing" onClick="new MyClass.updateData(this)">Edit</button> <button id="onDeleting"
         onClick="new MyClass().deleteData(this)">Delete</button> `;
         newR.appendChild(btns);
        this.updateData(btns.firstChild);
​
    }
​
    readData<T>(){
        document.getElementById("firstButton").innerHTML="Refresh Data";
        var text=`<div class="tabledata"><table align="center" id="list"><tr>`;
​
        for(var key in myData[0]){
             text+=`<th>${key}</th>`;
        }
​
        text+="<th></th></tr>";
        var value="<tr>";
        for(var i in Object.keys(myData)){
            
            this.First_Name=myData[i]["First_Name"];

            
            this.Middle_Name= myData[i]["Middle_Name"];
           
            
            this.Last_Name=myData[i]["Last_Name"];
         
            this.Email=myData[i]["Email"];
           
            this.Phone_Number=myData[i]["Phone_Number"];

          
            this.Role=myData[i]["Role"];
          
            this.Address=myData[i]["Address"];
       
       
            
            value+=`<td>${this.First_Name}</td>`;
            value+=`<td>${this.Middle_Name}</td>`;
            value+=`<td>${this.Last_Name}</td>`;
            value+=`<td>${this.Email}</td>`;
            value+=`<td>${this.Phone_Number}</td>`;
            value+=`<td>${this.Role}</td>`;
            value+=`<td>${this.Address}</td>`;

        value+=`<td id="button1"> <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button>
         <button id="onDeleting"
            onClick="new MyClass().deleteData(this)">Delete</button> </td>`;
            value+="</tr>";
    }
​
​
        document.getElementById("page").innerHTML=` ${text} ${value}
        </table>    </div>
        `;
    }
​
    updateData<T>(tr:any){
​
        var row:any=tr.parentElement.parentElement;
        row.setAttribute('contenteditable',true);
        row.children[Object.keys(myData[0]).length].setAttribute('contenteditable',false);
        var tds:any=tr.parentElement.remove();
        if(!this.inEditing(row)){
        row.className='in-editing';
        row.setAttribute('old-data',row.innerHTML);
        this.createButton(row);
    }
​
    }
​
     deleteData<T>(td:any):void{
             if(confirm("Are you sure to delete this record ?")){
                 var row:any=td.parentElement.parentElement;
                 var tab=document.getElementById("list") as HTMLTableElement;
                 tab.deleteRow(row.rowIndex);
             }
​
     }
​
​
// Now extra features of Model class apart from implemented features
​
   inEditing<T>(row:any){
        return row.classList.contains(`in-editing`);
    }
​
    createButton<T>(row:any){
        const buttons:any=document.createElement('td');
        buttons.className="button-toolbar";
        buttons.innerHTML= ` <button class="save-button">Save</button>  <button class="cancel-button">Cancel</button>  `;
        row.appendChild(buttons);
        buttons.setAttribute('contenteditable',false);
        const btnsave=buttons.querySelector('.save-button');
        const btncancel=buttons.querySelector('.cancel-button');
        btnsave.addEventListener('click',(ev:any)=>{
            ev.stopPropagation();
            this.save(row);
        });
        btncancel.addEventListener('click',(ev:any)=>{
            ev.stopPropagation();
            this.cancel(row);
        });
    }
​
    save<T>(row:any){
        row.classList.remove('in-editing');
        this.removeButtons(row);
        row.setAttribute('contenteditable',false);
    }
​
    removeButtons<T>(row:any){
        const btn=row.querySelector('.button-toolbar');
        btn.remove();
        const btns=document.createElement('td');
        btns.innerHTML=` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
        onClick="new MyClass().deleteData(this)">Delete</button> `;
        row.appendChild(btns);
    }
​
    cancel<T>(row:any){
        row.innerHTML=row.getAttribute('old-data');
        row.classList.remove('in-editing');
        const btns=document.createElement('td');
        btns.innerHTML=` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
        onClick="new MyClass().deleteData(this)">Delete</button> `;
        row.appendChild(btns);
        row.setAttribute('contenteditable',false);
    }
​
​
}
​
//  :::: Decorator Factory ::::
​
function FormatDate<T>(dt:any){
    return function(target:any,name:string,descriptor:PropertyDescriptor){
     const dtm=document.getElementById("dateTime") as HTMLInputElement;
     dtm.innerHTML=dt.toLocaleString();
}
}
​
​
​
​
function main<T>(){
    var obj=new MyClass();
    obj.readData();
    document.getElementById("addData").style.display="Block";
}

