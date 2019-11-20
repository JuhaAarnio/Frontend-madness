function Decode() {
    let virtualBarcode = document.getElementById('virtual_barcode').value;
    let version = virtualBarcode.substring(0,1);
    let iban_area = document.getElementById('payee');
    let amount_area = document.getElementById('amount');
    let reference_area = document.getElementById('payment_reference');
    let date_area = document.getElementById('due_date');

    if (version==="4"){
        let iban = document.createTextNode(virtualBarcode.substring(1,17));
        let euros = document.createTextNode(virtualBarcode.substring(17,23) + ":" + virtualBarcode.substring(23,25));
        let reference = document.createTextNode(virtualBarcode.substring(28,43));
        let due_date = document.createTextNode(virtualBarcode.substring(44,50));
        iban_area.appendChild(iban);
        amount_area.appendChild(euros);
        reference_area.appendChild(reference);
        date_area.appendChild(due_date);
    }
    if (version==="5"){

    }
    else{
        console.log("Erraneous version");
    }
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