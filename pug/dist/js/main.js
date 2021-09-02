console.log("stet");
function postM() {
    // const form = document.createElement("form")
    var forms = document.forms["form-area"];
    var email = forms.elements["email"].value;
    var name = forms.elements["name"].value;
    var contents = forms.elements["area-small"].value === "" ? forms.elements["area-big"].value : forms.elements["area-small"].value;
    console.log(email, contents, name);
    alert("POST機能はまだ実装してないよ！");
}

//# sourceMappingURL=main.js.map
