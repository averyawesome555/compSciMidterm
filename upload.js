$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const redirect_uri = "https://compscimidterm.netlify.com/upload.html" // replace with your redirect_uri;
    const client_secret = "Vpiwn0OO0XenCksGj1c3KsVp"; // replace with your client secret
    const scope = "https://www.googleapis.com/auth/drive.file";
    var access_token= "";
    const client_id = "308549705993-gt1beeb6iccl23qqh52haorlelmbt3i8.apps.googleusercontent.com"; // replace it with your client id


    $.ajax({
        type: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) {

           console.log("Result Data: ", resultData);
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           //window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");

           isFirstTimeLogin();
           listAll();
        }
  });

    $("#uploadFile").on("click", function (e) {
        for (i = 0; i < $("#files")[0].files.length; i++) {
            uploadFile($("#files")[0].files[i]);
        }
    });

    // maybe comment out?
    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }

    function uploadFile(file) {
        var formData = new FormData();
        var metadata = {
            "name": file.name,
            "mimeType": file.type,
            };

        // add assoc key values, this will be posts values
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        formData.append("file", file);

        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));

            },
            url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
            success: function (data) {
                console.log("Succsesful file upload");
                console.log(data);
            },
            error: function (error) {
                console.log("Error in uploadFile");
                console.log(error);
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        }); // end of AJAX call
    }
}
