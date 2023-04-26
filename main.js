var custom_hightlight = {
    "mapKeyStyle": {
        'color': 'Color',
        'fontSize': 'Font Size',
        'background': 'background'
    },
    "editableKey": "\u0019",
    "editKey": "e",
}

var tag;
var editableKey = custom_hightlight.editableKey ? custom_hightlight.editableKey : "\u0019"
var listStyle = custom_hightlight.listStyle ? custom_hightlight.listStyle : []
var mapKeyStyle = custom_hightlight.mapKeyStyle ? custom_hightlight.mapKeyStyle : {}
var editing = false


async function editContent() {
    const { value: selectedValue } = await Swal.fire({
        title: 'Select an option',
        input: 'select',
        inputOptions: custom_hightlight["mapKeyStyle"],
        inputPlaceholder: 'Select an option',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
            return 'You need to select something!'
            }
        }
    });        
    return selectedValue   
}
async function editValue(val) {
    const { value: result } = await Swal.fire({
        input: 'text',
        inputLabel: `${val}`,
        inputPlaceholder: `Enter the ${val}`
      })
      
      return result
}
function getKeyByValue(object, value) {
    for (let key in object) {
      if (object[key] === value) {
        return key;
      }
    }
}
  
window.addEventListener('mouseup', (e)=>{
    var highlightable = e.target
    tag = e.target.localName
    var editable = document.getElementById("editable")
    var cant_edit = highlightable.id == "uneditable"
    var sweetalert = document.querySelector(".swal2-container")
    if (tag != "html" && tag != "body" && !editable && !cant_edit && !sweetalert){
        var previous_unactive = document.querySelector(".select-unactive")
        if (previous_unactive){
            previous_unactive.classList.remove("select-unactive")
            previous_unactive.classList.remove("select-active")
            highlightable.classList.add("select-unactive")
            highlightable.classList.remove("select-active")
            console.log(getSelection())
            console.log(e.target.localName)
        }else{
            highlightable.classList.add("select-unactive")
            highlightable.classList.remove("select-active")
            console.log(getSelection())
            console.log(e.target.localName)
        }

    }else{
        var previous_unactive = document.querySelector(".select-unactive")
        if (previous_unactive && !editable){
            previous_unactive.classList.remove("select-unactive")
            previous_unactive.classList.remove("select-active")
        }
    }
})

window.addEventListener("keypress", async (e)=>{
    console.log("editing1", editing)
    if (!editing){
        console.log("editing2", editing)
        if (e.key == editableKey){
            var unactive_el = document.querySelector(".select-unactive")
            var active_el = document.querySelector(".select-active")
            if (unactive_el){
                var editable = document.getElementById("editable")
                if (editable){
                    editable.id = ""
                    unactive_el.id = "editable"
                    unactive_el.classList.replace("select-unactive", "select-active")
                }else{
                    unactive_el.id = "editable"
                    unactive_el.classList.replace("select-unactive", "select-active")
                }
            }
            if (active_el){
                active_el.id = ""
                active_el.classList.replace("select-active", "select-unactive")
            }
        }
        if (e.key.toLowerCase() == custom_hightlight["editKey"]) {
            console.log("editing3", editing)
            editing = true
            console.log("editing4", editing)
            var editable_el = document.getElementById("editable")
            if (editable_el){
                const selectedValue = await editContent();
                if (selectedValue) {
                    const result = await editValue(selectedValue);
                    editable_el.style[selectedValue] = result
                    editing = false
                    editable_el.id = ""
                    editable_el.classList.replace("select-active", "select-unactive")
                }
            }
            console.log("editing5", editing)
        }
        if (active_el) {
            console.log(listStyle)
            console.log(mapKeyStyle)
            styleValue = mapKeyStyle[e.key.toLowerCase()]
            console.log(styleValue)
        }
    }
})
// window.addEventListener("click", (e)=>{
//     var el = e.target
//     if (el.id == "editable"){
//         console.log(el)
//     }
// })


