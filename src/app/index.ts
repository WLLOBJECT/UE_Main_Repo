// Your code
import { Member,Member_Cache } from './model';
const searchBtn = document.getElementById("searchBtn");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const helpBtn = document.getElementById("helpBtn");
const formSubmit = document.getElementById("formSubmit");
const formDiv = document.getElementById("formDiv");
const tbody = document.getElementById("tbody");
const msg = document.getElementById("msg");
const tip = document.getElementById("tip");
const tip2 = document.getElementById("tip2");
const close = document.getElementById("close");
const close2 = document.getElementById("close2");
const close3 = document.getElementById("close3");
const yes = document.getElementById("yes");
// console.log(searchBtn);
let id: string = "";
let total: number = 0;
let index: number = -1;
let memberArr: Member[] = [];

let member: Member = {
    id: 0,
    name: "",
    dob: new Date('1990-01-01'),
    gender: "Male",
    membership: "Basic",
    start: new Date('1990-01-01'),
    contact: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalCondition: "",
    trial: false,
}

if(formDiv != null){
    formDiv.setAttribute("style", "display:none;");
}

if(tip != null){
    tip.setAttribute("style", "display:none;");
}

if(tip2 != null){
    tip2.setAttribute("style", "display:none;"); 
}

if(searchBtn != null){
    searchBtn.onclick = () => {
        // console.log(123);
        list();
    }
}

if(addBtn != null && formDiv != null){
    addBtn.onclick = () => {
        // console.log(123);
        index = -1;
        formDiv.setAttribute("style", "display:block;");
        setNumValue("formId", total + 1)
    }
}

if(resetBtn != null){
    resetBtn.onclick = () => {
        // console.log("reset");
        setValue("keyword", "");
        list();
    }
}

if(helpBtn != null){
    helpBtn.onclick = () => {
        // console.log(123);
        showMsg("This is the member management page!");
    }
}

if(yes != null){
    yes.onclick = () => {
        // console.log(123);
        // showMsg("This is the member management page!");
        if(index == -1){
            return;
          }
          memberArr.splice(index,1);
          localStorage.setItem(Member_Cache, JSON.stringify(memberArr));
          list();
          closeMsg();
    }
}

if(tbody != null){
    tbody.onclick = (e) => {
        // e.target
        let ele = e.target as HTMLButtonElement;
        let type = ele.getAttribute("type");
        if(type == "edit"){
            index = parseInt(ele.name);
            if(formDiv != null){
                let m = memberArr[index];
                formDiv.setAttribute("style", "display:block;");
                let birth = new Date(m.dob);
                let day = birth.getDate();
                let month = birth.getMonth() + 1;
                setValue("formBirth", birth.getFullYear() + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day));

                let startDay = new Date(m.start);
                let day2 = startDay.getDate();
                let month2 = startDay.getMonth() + 1;
                setValue("formStartDay", startDay.getFullYear() + "-" + (month2 >= 10 ? month2 : "0" + month2) + "-" + (day2 >= 10 ? day2 : "0" + day2));
                setNumValue("formId", total + 1);
                setValue("formName", m.name);
                setValue("formContact", m.contact);
                setValue("formEmail", m.email);
                setValue("formAddress", m.address);
                setValue("formEmergencyContact", m.emergencyContact);
            }
        }else if(type == "del"){
            index = parseInt(ele.name)
            showMsg2();
            closeForm();
        }
        // console.log(ele.name, ele.getAttribute("type"));
        // showMsg("This is the member management page!");
    }
}

if(formSubmit != null){
    formSubmit.onclick = () => {
        member.id = getNumValue("formId");
        member.name = getValue("formName");
        member.contact = getValue("formContact");
        let gender = getValue("formGender");
        if(gender == 'Female'){
            member.gender = 'Female';
        }else if(gender == 'Female'){
            member.gender = 'Male';
        }else if(gender == 'Female'){
            member.gender = 'Unspecified';
        }
        let ship = getValue("formMembership");
        //'Basic' | 'Premium' | 'Corporate' | 'Student' | 'Day pass'
        if(ship == 'Basic'){
            member.membership = 'Basic';
        }else if(ship == 'Premium'){
            member.membership = 'Premium';
        }else if(ship == 'Corporate'){
            member.membership = 'Corporate';
        }else if(ship == 'Student'){
            member.membership = 'Student';
        }else if(ship == 'Day pass'){
            member.membership = 'Day pass';
        }
        member.email = getValue("formEmail");
        member.address = getValue("formAddress");
        member.emergencyContact = getValue("formEmergencyContact");
        console.log(member);
        
        let birth = getValue("formBirth");
        let startDay = getValue("formStartDay");
        if(member.name == ""){
            // alert("Name not empty");
            showMsg("Name not empty");
            return;
          }
      
          if(!new RegExp("[a-zA-Z]+").test(member.name)){
            // alert("Name not empty");
            showMsg("Name not empty");
            return;
          }
          
          if(!new RegExp("[0-9]{4}-[0-1][0-9]-[0-3][0-9]").test(birth)){
            // alert("Contact number not empty");
            showMsg("Name not empty");
            return;
          }else{
            try {
              new Date(birth);
            } catch (error) {
              showMsg("Name not empty");
            }
          }
          if(!new RegExp("[0-9]{4}-[0-1][0-9]-[0-3][0-9]").test(startDay)){
            // alert("Contact number not empty");
            showMsg("Date format error");
            
            return;
          }else{
            try {
              new Date(startDay);
            } catch (error) {
               showMsg("Date format error");
              
            }
          }
          if(!new RegExp("([0-9_-])+").test(member.contact)){
            showMsg("The contact number is invalid");
            return;
          }
          if(!new RegExp("([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+").test(member.email)){
            // alert("Email not empty");
            showMsg("The mailbox format is invalid");
            return;
          }
          if(member.address == ""){
            // alert("Address not empty");
            showMsg("Address not empty");
            return;
          }
          if(!new RegExp("([0-9_-])+").test(member.emergencyContact)){
            // alert("Emergency Contact number not empty");
            showMsg("The emergency contact number is invalid");
            return;
          }
          member.dob = new Date(birth);
          member.start = new Date(startDay);
          if(index == -1){
            memberArr.push(member);
          }else{
            memberArr[index] = member;
          }
          localStorage.setItem(Member_Cache, JSON.stringify(memberArr));
          alert("action success");
          list();
          closeForm();
    }
}

const showMsg = (text: string) => {
    if(msg != null && tip != null){
        msg.innerHTML = text;
        tip.setAttribute("style", "display:block;");
    }
}

const showMsg2 = () => {
    if(tip2 != null){
        tip2.setAttribute("style", "display:block;");
    }
}

const closeMsg = () => {
    if(tip != null){
        tip.setAttribute("style", "display:none;");
    }
}

const closeForm = () => {
    if(formDiv != null){
        formDiv.setAttribute("style", "display:none;");
    }
}

const closeMsg2 = () => {
    if(tip2 != null){
        tip2.setAttribute("style", "display:none;");
    }
}

const getValue = (id: string) => {
    const ele = document.getElementById(id) as HTMLInputElement;
    if(ele != null){
        return ele.value;
    }
    return "";
}

const getNumValue = (id: string) => {
    const ele = document.getElementById(id) as HTMLInputElement;
    if(ele != null){
        return parseInt(ele.value);
    }
    return 0;
}

const setValue = (id: string, value: string) => {
    const ele = document.getElementById(id) as HTMLInputElement;
    if(ele != null){
        ele.value = value;
    }
}

const setNumValue = (id: string, value: number) => {
    const ele = document.getElementById(id) as HTMLInputElement;
    if(ele != null){
        ele.value = "" + value;
    }
}

const list = () => {
    let cache = localStorage.getItem(Member_Cache);
    if(cache){
      let arr = <Member[]>JSON.parse(cache);
      let id = getValue("keyword");
      if(id && id != ""){
        memberArr = arr.filter(a => a.id == parseInt(id));
      }else{
        memberArr = arr;
      }
    }

    let html = '';
    for(let i = 0; i < memberArr.length; i++){

        let tr = '<tr>' +
                '<td>' + i + '</td>' +
                '<td>' + memberArr[i].id + '</td>' +
                '<td>' + memberArr[i].name + '</td>' +
                '<td>' + memberArr[i].dob + '</td>' +
                '<td>' + memberArr[i].gender + '</td>' +
                '<td>' + memberArr[i].email + '</td>' +
                '<td>' + memberArr[i].contact + '</td>' +
                '<td>' +
                '      <button (click)="edit(i)" name="' + i + '" type="edit">edit</button>' +
                '       <button (click)="del(i)" name="' + i + '" type="del">delete</button>' +
                '   </td>' +
                '</tr>'
        html += tr;
    }
    if(tbody != null){
        tbody.innerHTML = html;
    }
    total = memberArr.length;
}
list();

if(close != null){
    close.onclick = () => {
        // console.log("close");
        closeMsg();
    }
}

if(close2 != null){
    close2.onclick = () => {
        // console.log("close2");
        closeMsg2();
    }
}

if(close3 != null){
    close3.onclick = () => {
        // console.log("close2");
        closeMsg2();
    }
}