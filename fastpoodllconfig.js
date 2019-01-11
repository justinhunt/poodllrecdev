
M={};
var moodlestrings= {"lastmodified":"Last modified","name":"Name","error":"Error","info":"Information","yes":"Yes","no":"No","cancel":"Cancel","confirm":"Confirm","areyousure":"Are you sure?","closebuttontitle":"Close","unknownerror":"Unknown error"};
var poodllstrings= {"recui_uploading": "Uploading", "recui_uploadsuccess": "Uploaded Successfully",  "recui_awaitingconversion": "Awaiting conversion", "recui_record": "Record","recui_start": "Start","recui_startactivity": "Start Activity", "recui_testmic": "Test Microphone", "recui_stop": "Stop","recui_play": "Play","recui_save": "Save", "recui_pause": "Pause","recui_upload": "Upload","recui_readytorecord": "Ready to record","recui_recordagain": "Record again"};

//other messaghes
poodllstrings['recui_downloadfile'] = 'Download file';

//error messages
poodllstrings['recui_mediaaborterror'] = 'Something strange happened which prevented the webcam/microphone from being used';
poodllstrings['recui_medianotallowederror'] = 'The user must allow the browser access to the webcam/microphone';
poodllstrings['recui_medianotfounderror'] = 'There is no recording device connected or enabled';
poodllstrings['recui_medianotreadableerror'] = 'Something is preventing the browser from accessing the webcam/microphone';
poodllstrings['recui_medianotsupportederror'] = 'Your browser type does not support recording over an HTTP connection.';
poodllstrings['recui_mediaoverconstrainederror'] = 'The current webcam/microphone can not produce a stream with the current requirements';
poodllstrings['recui_mediasecurityerror'] = 'Your browser type does not support recording over an HTTP connection.';
poodllstrings['recui_mediatypeerror'] = 'Failed to get stream because no media type was specified.';
poodllstrings['recui_unsupportedbrowser'] = 'This browser can not record here. Sorry.<br>Please try Google Chrome on a Desktop PC.';
poodllstrings['recui_recordorchoose'] = 'Record or Choose';
poodllstrings['recui_choosefile'] = 'Choose File';

M.str = {"moodle":moodlestrings, "filter_poodll": poodllstrings};
M.util={};
M.util.get_string=function(thekey,thecomponent){
 if(!M.str[thecomponent]){return '';};
 if(!M.str[thecomponent][thekey]){return '';};
 return M.str[thecomponent][thekey];
};
M.cfg = {};
M.cfg.wwwroot="http://localhost/poodllrecdev";
//M.cfg.wwwroot="https://cloud.poodll.com";
//M.cfg.wwwroot="http://localhost/moodle";


//<![CDATA[
var require = {
    baseUrl : M.cfg.wwwroot + '/local/cpapi/lib/requirejs/',
    // We only support AMD modules with an explicit define() statement.
    enforceDefine: true,
    skipDataMain: true,
    waitSeconds : 0,

    paths: {
        jquery: M.cfg.wwwroot + '/lib/jquery/jquery-3.1.0.min',
        jqueryui: M.cfg.wwwroot + '/lib/jquery/ui-1.12.1/jquery-ui.min',
        jqueryprivate: M.cfg.wwwroot + '/lib/requirejs/jquery-private',
        filter_poodll: M.cfg.wwwroot + '/filter/poodll/amd/src/',
        core:  M.cfg.wwwroot + '/lib/amd/src/'
    },

    // Custom jquery config map.
    map: {
        // '*' means all modules will get 'jqueryprivate'
        // for their 'jquery' dependency.
        '*': { jquery: 'jqueryprivate' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        jqueryprivate: { jquery: 'jquery' }
    }
};