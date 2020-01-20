$(document).ready(function(){

     // client id of the project

     var clientId = "308549705993-gt1beeb6iccl23qqh52haorlelmbt3i8.apps.googleusercontent.com";

     // redirect_uri of the project

     var redirect_uri = "https://compscimidterm.netlify.com/upload.html";

     // scope of the project

     var scope = "https://www.googleapis.com/auth/drive.file";

     // the url to which the user is redirected to

     var url = "";

        // the actual url to which the user is redirected to

        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
        +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
        +"&access_type=offline";

        // this line makes the user redirected to the url

        window.location = url;



});
