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
        iban = document.createTextNode(virtualBarcode.substring(1,17));
        euros = document.createTextNode(virtualBarcode.substring(17,23).replace(/^0+/,'') +
                                        "," + virtualBarcode.substring(23,25) + " €");
        due_date = document.createTextNode(virtualBarcode.substring(52,54) + "." + virtualBarcode.substring(50,52) +
            "." + "20" + virtualBarcode.substring(48,50));
        if (version==="4"){
            reference = document.createTextNode(virtualBarcode.substring(29,48).replace(/^0+/,''));
        }
        if (version==="5") {
            reference = document.createTextNode(virtualBarcode.substring(25, 48).replace(/^0+/,''));
        }
        else{
            console.log("Erraneous version");
        }
        if (virtualBarcode.substring(50,52) === "00" || virtualBarcode.substring(52,54) === "00"){
            due_date = document.createTextNode("Not set");
        }
        iban_area.appendChild(iban);
        amount_area.appendChild(euros);
        reference_area.appendChild(reference);
        date_area.appendChild(due_date);
    }
    else if (isValid === false) {
        alert("Invalid characters in barcode!")
    }
    else if (virtualBarcode.length !== 54){
        alert("Invalid barcode")
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

function changeColorFocus(color){
    let input_field = document.getElementById('virtual_barcode');
    input_field.style.backgroundColor = "gray";
    console.log("focused");
}

function changeColorUnfocus() {
    let input_field = document.getElementById('virtual_barcode');
    input_field.style.backgroundColor = "";
    console.log("focused");
}

function OnLoad() {
    document.getElementById('hide_button').onclick = Hide;
    document.getElementById('decode_button').addEventListener("click", Decode);
    document.getElementById('virtual_barcode').addEventListener("focus", changeColorFocus);
    document.getElementById('virtual_barcode').addEventListener("blur", changeColorUnfocus);
}
window.onload = OnLoad;