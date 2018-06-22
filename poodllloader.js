 require(['jquery','core/log','filter_poodll/poodll_mediarecorder'], function($,log, pmr) {
        log.setConfig({"level":"trace"});

     //parse URL
     //++++++++++++++++++++++++++++++++
     var parseQueryString = function(url) {
         var urlParams = {};
         url.replace(
             new RegExp("([^?=&]+)(=([^&]*))?", "g"),
             function($0, $1, $2, $3) {
                 urlParams[$1] = $3;
             }
         );
         return urlParams;
     }
     //++++++++++++++++++++++++++++++++

	var params = [];
	params['widgetid'] = 'AUTOID';
	params['media_timeinterval'] = 2000;
	params['media_audiomimetype'] = 'audio/webm';//or audio/wav
	params['media_videorecordertype'] = 'auto';//or mediarec or webp
	params['media_videocapturewidth'] = 320;
	params['media_videocaptureheight'] = 240;
	params['media_skin_style'] = 'none';
	params['iframeembed']=true;
	params['using_s3'] = 'true';
	params['callbackjs']=false;
	//params['hideupload'] = true;
	//params['resource'] = 'https://path.to.some.audio.com';
	
	params['id'] = 0;
	params['timelimit'] = 0;
	params['mediatype'] = 'audio';
	params['media_skin'] = 'bmr';
	params['updatecontrol']='theupdatecontrol';
	params['parent']='http://localhost';

	params['expiredays']=0;
	params['transcode']=1;
	params['transcribe']=0;
	params['speechevents']=0;
	params['language']='en-US';
	params['transcribevocab']='none';
	params['notificationurl']='none';
	params['owner']='poodll';
	params['region']='tokyo';
	params['token']='123456789';
	params['moodlewsrestformat'] = 'json';//xml

	var urlparams = parseQueryString(location.search);
	if(('type' in urlparams)){params['media_skin']=urlparams['type'];}
	if(('timelimit' in urlparams)){params['timelimit']=parseInt(urlparams['timelimit']);}
	if(('media' in urlparams)){params['mediatype']=urlparams['media'];}
	if(('updatecontrol' in urlparams)){params['updatecontrol']=urlparams['updatecontrol'];}
	if(('parent' in urlparams)){
	    params['parent']=urlparams['parent'];
	}//insert check here for auth

	if(('id' in urlparams)){params['id']=urlparams['id'];}
	if(('expiredays' in urlparams)){params['expiredays']=parseInt(urlparams['expiredays']);}
	if(('transcode' in urlparams)){params['transcode']=parseInt(urlparams['transcode']);}
	if(('transcribe' in urlparams)){params['transcribe']=parseInt(urlparams['transcribe']);}
	if(('language' in urlparams)){params['language']=urlparams['language'];}
	if(('speechevents' in urlparams)){params['speechevents']=parseInt(urlparams['speechevents']);}
	if(('transcribevocab' in urlparams)){params['transcribevocab']=urlparams['transcribevocab'];}
	if(('notificationurl' in urlparams)){params['notificationurl']=urlparams['notificationurl'];}
	if(('owner' in urlparams)){params['owner']=urlparams['owner'];}
	if(('region' in urlparams)){params['region']=urlparams['region'];}
	if(('token' in urlparams)){params['wstoken']=urlparams['token'];}

	//The REST API we are calling
    params['functionname']='local_cpapi_fetch_upload_details';

     //fetch the Posturl. We need this.
     //set up our ajax request
     var xhr = new XMLHttpRequest();
     var that = this;

     //set up our handler for the response
     xhr.onreadystatechange = function(e){
         if(this.readyState===4){
             if(xhr.status==200){

                 //get a yes or forgetit or tryagain
                 var payload = xhr.responseText;
                 var payloadobject = JSON.parse(payload);
                 if(payloadobject) {

                     //returnCode > 0  indicates an error
                     if (payloadobject.returnCode > 0) {
                         //We alert the iframe host that something did not go right
                         var messageObject = {};
                         messageObject.id = params['id'];
                         messageObject.type = "error";
                         messageObject.code = payloadobject.returnCode;
                         messageObject.message = payloadobject.returnMessage;
                         window.parent.postMessage(messageObject, params['parent']);
                         return;
                     //if all good, then lets do the embed
                     } else {
                         params['allowedURL'] = payloadobject.allowedURL;
                         params['posturl'] = payloadobject.postURL;
                         params['filename'] = payloadobject.filename;
                         params['s3filename'] = payloadobject.s3filename;
                         params['s3root'] = payloadobject.s3root;
                         params['cloudfilename'] = payloadobject.shortfilename;
                         params['cloudroot'] = payloadobject.shortroot;

                         //hints is a catch all param for recorder specific configs
                         if(('hints' in urlparams)){
                             var jsonhints = atob(urlparams['hints']);
                             var hints = JSON.parse(jsonhints);
                             for (var key in hints) {
                                 if (hints.hasOwnProperty(key)) {
                                     params[key]=hints[key];
                                 }
                             }
                         }
                         pmr.embed('#' + 'AUTOID', params);
                    }

                 }else{
                     log.debug('error:' + payloadobject.message);

                 }
             }else{
                 log.debug('Not 200 response:' + xhr.status);
             }
         }
     };

     //log.debug(params);
     var xhrparams =  "wstoken=" + params['wstoken']
     + "&wsfunction=" + params['functionname']
     + "&moodlewsrestformat=" + params['moodlewsrestformat']
         + "&mediatype=" + params['mediatype']
         + '&parent=' + params['parent']
         + '&owner=' + params['owner']
         + '&region=' + params['region']
         + '&expiredays=' + params['expiredays']
         + '&transcribe=' + params['transcribe']
         + '&transcribelanguage=' + params['language']
         + '&transcribevocab=' + params['transcribevocab']
         + '&notificationurl=' + params['notificationurl'];

    // var serverurl= M.cfg.wwwroot + "/webservice/rest/server.php";
     var serverurl="https://cloud.poodll.com/webservice/rest/server.php";
     xhr.open("POST",serverurl, true);
     xhr.setRequestHeader("Cache-Control", "no-cache");
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     xhr.send(xhrparams);

    });