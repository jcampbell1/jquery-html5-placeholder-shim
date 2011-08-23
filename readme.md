# HTML5 Placeholder support for non compliant browsers using jQuery.

This plugin adds support for the placeholder attribute in HTML5 form elements to browsers that don't natively support it.

## Usage:

Just include the ``jquery.html-placeholder-shim.js`` script into your document head like so:

    <head>
      <script type='text/javascript' src='jquery.js'></script>
      <script type='text/javascript' src='jquery/html5-placeholder-shim.js'></script>
    </head>

The script will automatically execute itself on the ``$(document).ready`` event.

## HTML5 placeholder Example:

    <input type="search" placeholder="search the internets" name="query" />

## License:

Dual licensed under the MIT and GPL licenses.
