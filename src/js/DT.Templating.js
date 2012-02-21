var DT = DT || {};

DT.Templating = (function(me)
{
	// Wraps the template in a div to get its outerHtml. This is important so that
	// template placeholders can be used even in the template tag
	me.render = function(elmTemplate, data)
	{
		var newElement = $(elmTemplate).clone();
		var wrappedNewElement = $("<div>").append(newElement)
		var outerHtml = wrappedNewElement.html(); 

		for(var i in data) 
		{
			outerHtml = outerHtml.replace("[" + i + "]", data[i]);
		}

		wrappedNewElement.html(outerHtml);
		newElement = $($(wrappedNewElement).children()[0]);
		newElement.attr("id", null);

		return newElement;
	};

	return me;
})(DT.Templating || {});