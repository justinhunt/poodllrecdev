
M={};
var moodlestrings= {"lastmodified":"Last modified","name":"Name","error":"Error","info":"Information","yes":"Yes","no":"No","cancel":"Cancel","confirm":"Confirm","areyousure":"Are you sure?","closebuttontitle":"Close","unknownerror":"Unknown error"};
var poodllstrings= {"recui_uploading": "Uploading", "recui_uploadsuccess": "Uploaded Successfully",  "recui_awaitingconversion": "Awaiting conversion", "recui_record": "Record","recui_start": "Start","recui_startactivity": "Start Activity", "recui_testmic": "Test Microphone", "recui_stop": "Stop"};
M.str = {"moodle":moodlestrings, "filter_poodll": poodllstrings};
M.util={};
M.util.get_string=function(thekey,thecomponent){
 if(!M.str[thecomponent]){return thekey;};
 if(!M.str[thecomponent][thekey]){return thekey;};
 return M.str[thecomponent][thekey];
};
M.cfg = {};
M.cfg.wwwroot="http://localhost/poodllrecdev";


//<![CDATA[
var require = {
    baseUrl : M.cfg.wwwroot + '/lib/requirejs/',
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