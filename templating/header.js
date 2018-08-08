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
        <li><a href="subjects_list.html">Manage Herd</a></li>
        <li><a href="providers_list.html">Manage Service Providers</a></li>
        <li><a href="download_history.html">Download History</a></li>  
        <li><a href="alerts_list.html">Alerts</a></li>    
        </ul>
        <ul class="nav navbar-right navbar-nav">
        <li><a href="account/user_account.html">Account</a></li>
        <li><a href="account/logout.html">Logout</a></li> 
        </ul>
    </div>
    </div>
</nav>`


$("#placeholder").append(navbar);

//find element with attr == address and add class.

var localaddress = getQueryVariable();

function getQueryVariable(variable)
{
    var query = window.location.pathname.split("/");
    var page = query[query.length-1];    
    return(page);
}

try {
    $(`[href="${localaddress}"]`)[0].parentElement.classList = "active"
} catch{}
