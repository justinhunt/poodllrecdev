<?php
?>
<!DOCTYPE html>
<html>
<meta http-equiv=”Pragma” content=”no-cache”>
<meta http-equiv=”Expires” content=”-1″>
<meta http-equiv=”CACHE-CONTROL” content=”NO-CACHE”>

<head>
    <title>Poodll Recorder</title>
    <meta charset="UTF-8">

    <?php $cloud_wwwroot = "http://localhost/poodllrecdev"; ?>
    <!-- ?php $cloud_wwwroot = "https://cloud.poodll.com"; -->
    <!-- php $cloud_wwwroot = "http://localhost/moodle"; ? -->


    <link rel="stylesheet" type="text/css" href="<?= $cloud_wwwroot ?>/filter/poodll/cloudstyles.css?v=20">
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="<?= $cloud_wwwroot ?>/fastpoodllconfig.js?v=001" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?= $cloud_wwwroot ?>/lib/requirejs/require.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?= $cloud_wwwroot ?>/poodllloader.js?v=001" crossorigin="anonymous"></script>

<style type="text/css">
/* BMR video recorder */
#AUTOID, .iframe-bmr{
	max-width: 410px;	
}
#AUTOID .poodll_mediarecorderbox_bmr{
	width: auto !important;
}
#AUTOID, .iframe-bmr, #settingsicon_filter_poodll_controlbar_AUTOID{
	bottom: 0px;
	right: 0px;
}
/*end*/
</style>
</head>
<body>
<div id="AUTOID"></div>
<!-- <input type="text" id="theupdatecontrol"/> -->
</body>
</html>