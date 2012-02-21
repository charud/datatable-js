var DT = DT || {};

DT.DataTable = function(options)
{
	var me = {}; 
	
	var _table;
	var _rowTemplate;
	var _selectedRow;

	// Check that a dataTable doesn't already exist for this table element,
	// and in that case, return the already existing instance instead of creating a new
	var dataTable = $(options.table).data("dataTable");
	if(dataTable) return dataTable;
	$(options.table).data("dataTable", me);
	
	me.init = function()
	{
		_table = $(options.table);
		_rowTemplate = options.rowTemplate || getTemplateFromTable(".template") || getDefaultTemplate();

		_table.find("tbody").on("mousedown", "tr", onRowClicked);
		_table.find("tbody").on("dblclick", "tr", onRowDoubleClicked);
	};
	
	me.add = function(item)
	{
		var row = DT.Templating.render(_rowTemplate, item);
		_table.find("tbody").append(row);
	};

	me.clear = function()
	{
		_table.find("tbody").empty();
	}

	me.fill = function(items)
	{
		me.clear();
		for(var i in items)
		{
			me.add(items[i]);
		}
	};

	me.getElement = function()
	{
		return _table;
	};

	var onRowClicked = function(e)
	{
		var row = e.currentTarget;
		if(_selectedRow) $(_selectedRow).removeClass("selected");
		$(row).addClass("selected");
		_selectedRow = row;
		$(me).trigger("rowClicked", row);
	};

	var onRowDoubleClicked = function(e)
	{
		if(_selectedRow == e.currentTarget)
		{
			$(me).trigger("rowDoubleClicked", [e.currentTarget]);

			var dataLink = $(e.currentTarget).attr("data-link");
			if(dataLink)
			{
				window.location = dataLink;
			}		
		}    
	}

	var getTemplateFromTable = function(identifier)	
	{
		var templates = _table.find(identifier);
		if(templates.size() == 1)
		{
			templates.removeClass("template");
			return templates.get(0);
		}
		else
		{
			return null;
		}
	}

	var getDefaultTemplate = function()
	{
		return $("<tr><td>Item</td></tr>");
	}

	me.init();
	return me;
}






