var DT = DT || {};

DT.RemoteDataTable = function(options)
{
	var me = {};
	var _dataTable;
	var _server;
	var _serverAction;
	var _limit = 15;
	var _offset = 0;

	me.init = function()
	{
		_dataTable = new DT.DataTable(options);
		_server = options.server || getServerFromTable();
		_serverAction = options.action || getServerActionFromTable();
		_limit = options.limit || getLimitFromTable();

		$('*[data-paging=previous]').click(me.gotoPreviousPage);
		$('*[data-paging=next]').click(me.gotoNextPage);
	};

	me.load = function(parameters)
	{
		parameters = parameters || {};
		parameters.limit = parameters.limit || _limit;
		parameters.offset = parameters.offset || _offset;

		_server.get(_serverAction, parameters).success(function(data)
		{
			_dataTable.fill(data);
		});

		_dataTable.getElement().find("*[data-paging='page']").text((_offset+1) + " - " + ((_offset+1) + _limit));
	};

	me.gotoPreviousPage = function()
	{
		if(_offset - _limit >= 0)
		{	
			_offset -= _limit;
			me.load({limit: _limit, offset: _offset});
		}
	};

	me.gotoNextPage = function()
	{
		_offset += _limit;
		me.load({limit: _limit, offset: _offset});
	}

	var getServerFromTable = function()
	{
		var serverUrl = _dataTable.getElement().attr("data-server");
		return new DT.Server(serverUrl);
	};

	var getServerActionFromTable = function()
	{
		return _dataTable.getElement().attr("data-action");
	};

	var getLimitFromTable = function()
	{
		return parseInt(_dataTable.getElement().attr("data-limit"));
	};

	me.init();
	return me;
};