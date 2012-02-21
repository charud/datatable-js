<?php

if($_GET['action'] == "getFruits")
{
	$fruits = array(
		array('type' => 'Apple', 'name' => 'Golden Delicious', 'taste' => 'Good'),
		array('type' => 'Pear', 'name' => 'Bartlett', "taste" => 'Really tasty'),
		array('type' => 'Orange', 'name' => 'Endless Summer', 'taste' => 'Amazing')
	);

	echo json_encode($fruits);
	die();
}
else if($_GET['action'] == "getPagedFruits")
{
	$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 6;
	$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

	$fruits = array();
	for($i = $offset; $i < $offset + $limit; $i++)
	{
		$fruits[] = array("type" => 'Fruit ' . ($i+1), 'name' => 'Name ' . ($i+1), 'taste' => 'Score: ' . $i);
	}

	echo json_encode($fruits);
	die();
}