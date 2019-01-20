var loc = location.href.split("/");
var level = loc[4] == "account" ? "../" : "./";
var acctlevel = loc[4] == "account" ? "./" : "account/";
var navbar =
    `<nav class="navbar navbar-inverse">
    <div class="container-fluid">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
        </button>
        <a class="navbar-brand" href="#">Logo</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
        <li><a href="main.html">Home</a></li>
        <li><a href="${level}subjects_list.html">Manage Herd</a></li>
        <li><a href="${level}providers_list.html">Manage Service Providers</a></li>
        <li><a href="${level}download_history.html">Download History</a></li>  
        <li><a href="${level}alerts_list.html">Alerts</a></li>    
        </ul>
        <ul class="nav navbar-right navbar-nav">
        <li class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" style='margin:8px 0;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class='glyphicon glyphicon-alert' style='color:darkgray;' ></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            </ul>
        </li>
        <li><a href="${acctlevel}user_account.html">Account</a></li>
        <li><a href="${acctlevel}logout.html">Logout</a></li> 
        </ul>
    </div>
    </div>
</nav>`

$("#placeholder").append(navbar);

//find element with attr == address and add class.

var localaddress = getQueryVariable();

function getQueryVariable(variable) {
    var query = window.location.pathname.split("/");
    var page = query[query.length - 1];
    return (page);
}

try {
    $(`[href="${localaddress}"]`)[0].parentElement.classList = "active"
} catch{ }

function templateLoad() {
    SESSION_USER = GET_USER_SESSION();
    if(!SESSION_USER) location.href = `./${location.pathname.indexOf("account/") > -1? "" : "account/"}login.html`
    $.when(getUnresolvedAlertsForUser(SESSION_USER.id)).then(function (data) {
        if (data.length <= 0) {
            $(".dropdown-menu").hide();
        } else {
            data.forEach(d => {
                $(".dropdown-menu").append('<button class="dropdown-item btn btn-link" type="button"><a href="alert_list.html">' + d.name + '</a></button>')
            })
            $(".glyphicon-alert").css("color" , "red")            
        }
    })
}

templateLoad()

