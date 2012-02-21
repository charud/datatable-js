// Automatically apply JS behaviours to tables with class="dataTable"
$(function()
{
	$("table.dataTable").each(function(index, element)
	{
		if($(element).attr("data-server"))
		{
			var dataTable = new DT.RemoteDataTable({table: element});
			dataTable.load();
		}
		else
		{
			var dataTable = new DT.DataTable({table: element});
		}
	});
});