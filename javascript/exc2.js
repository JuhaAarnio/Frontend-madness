function Decode() {
    let virtualBarcode = document.getElementById('virtual_barcode').value;
    let isValid = checkBarcode(virtualBarcode);
    if (virtualBarcode.length === 54 && isValid === true){
        let version = virtualBarcode.substring(0,1);
        let iban_area = document.getElementById('payee');
        let amount_area = document.getElementById('amount');
        let reference_area = document.getElementById('payment_reference');
        let date_area = document.getElementById('due_date');
        let iban, euros, reference, due_date;
        if (version==="4"){
            iban = document.createTextNode(virtualBarcode.substring(1,17));
            euros = document.createTextNode(virtualBarcode.substring(17,23) + "," + virtualBarcode.substring(23,25));
            reference = document.createTextNode(virtualBarcode.substring(26,45));
            due_date = document.createTextNode(virtualBarcode.substring(45,51));
        }
        if (version==="5") {
            iban = document.createTextNode(virtualBarcode.substring(1, 17));
            euros = document.createTextNode(virtualBarcode.substring(17, 23) + "," + virtualBarcode.substring(23, 25));
            reference = document.createTextNode(virtualBarcode.substring(25, 48));
            due_date = document.createTextNode(virtualBarcode.substring(48, 54));
        }
        else{
            console.log("Erraneous version");
        }
        iban_area.appendChild(iban);
        amount_area.appendChild(euros);
        reference_area.appendChild(reference);
        date_area.appendChild(due_date);
    }
    else if (isValid === false) {
        console.log("Invalid characters in barcode!")
    }
    else if (virtualBarcode.length !== 54){
        console.log("Invalid barcode")
    }
}

function checkBarcode(virtualBarcode) {
    let i;
    let reg = new RegExp('^[0-9]+$');
    for(i=0; i < virtualBarcode.length; i++){
        if (!virtualBarcode[i].match(reg)){
            return false;
        }
    }
    return true;
}

function Hide()  {
    let info_area = document.getElementById('info_area');
    let hide_button = document.getElementById('hide_button');
    info_area.style.display = "none";
    hide_button.onclick = Show;
    hide_button.setAttribute('value', "Show")
}

function Show() {
    let info_area = document.getElementById('info_area');
    let hide_button = document.getElementById('hide_button');
    info_area.style.display = "block";
    hide_button.onclick = Hide;
    hide_button.setAttribute('value', "Hide")
}

function OnLoad() {
    document.getElementById('hide_button').onclick = Hide;
    document.getElementById('decode_button').onclick = Decode;
}
window.onload = OnLoad;