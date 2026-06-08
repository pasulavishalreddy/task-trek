document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        if (document.getElementsByClassName("updatebtn").disabled === false) {
            updatetodo(); 
        } else {
            addtodo();
        }
    }
});
