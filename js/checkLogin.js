    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            // modify the top right content - logged in info
            document.getElementById("loggedIn").style.display = "block";
            document.getElementById("anon").style.display = "none";
            // Modify the top left navbar link
            document.getElementById("homeLinkLoggedIn").style.display = "block";
            document.getElementById("homeLinkAnon").style.display = "none";
        } else {
            // modify the top right content - logged in info
            document.getElementById("anon").style.display = "block";
            document.getElementById("loggedIn").style.display = "none";
            // Modify the top left navbar link
            document.getElementById("homeLinkLoggedIn").style.display = "none";
            document.getElementById("homeLinkAnon").style.display = "block";
        }
    }

    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

    function deleteCookie(cname) {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}