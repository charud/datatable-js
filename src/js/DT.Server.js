var DT = DT || {};

/**
 * @param string baseUrl A path to the server file that should receive requests from this module
 */
DT.Server = function(baseUrl)
{ 
	var me = {};

	me.get = function(action, parameters)
	{
		parameters = parameters || {};
		parameters['action'] = action;
		var serializedParameters = decodeURIComponent($.param(parameters));
		
		var url = baseUrl + "?" + serializedParameters;
		return $.getJSON(url).error(function()
		{
			console.log("Get request to " + url + " failed. Check that the response data is valid JSON.");
		});
	};

	me.post = function(action, parameters)
	{
		return $.post(baseUrl + "?action=" + action, parameters);
	};

	return me;
};	