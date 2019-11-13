function allowDrop(ev) {
    ev.preventDefault()
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
}
function drop(ev) {
    ev.preventDefault()
    let data = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(data))
}
/*function onLoad() {
    document.getElementById('draggable_image').addEventListener("dragstart", drag(event))
    document.getElementById('drop_area').addEventListener("ondrop", drop(event))
}*/