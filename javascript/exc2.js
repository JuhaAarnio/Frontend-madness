function Decode(virtualBarcode) {
    let version = virtualBarcode.slice(0,1)
    if (version==4){
        let iban = virtualBarcode.slice(2,16)
        let euros = virtualBarcode.slice(17,22)
        let cents = virtualBarcode.slice(23,24)
        let reference = virtualBarcode.slice(27,43)
        let due_date = virtualBarcode(44,50)
    }
}

function HideAndShow() {
    let info_area = document.getElementById('info_area')
    let hide_button = document.getElementById('hide_button')
}