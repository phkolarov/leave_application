
<link rel="stylesheet" type="text/css" href="/leave_application/css/css_n.css">
<h1>Добави официален формуляр</h1>
<hr/>
<h4 >Заявени отпуски</h4>
<div >Година <select class="year"></select></div>
<div>
	<table >
		<th >Период</th>
		<th >Брой работни дни</th>
		<th >Заместван от</th>
	</table>
</div>
<h4 >Добавяне</h4>
<div class="row">
	<div class='col-sm-4'>
		<label for="startDate">От дата</label>
		<input type='text' class="form-control" id='startDate' />
	</div>

	<div class='col-sm-4	'>
		<label for="endDate">До дата</label>
		<input type='text' class="form-control" id='endDate' />
	</div>
	<div class="col-sm-4">
		<label for="debuty">Ще бъда заместван от</label>
		<select id="debuty" class="form-control"></select>
	</div>
</div>
<hr/>
<div class="row buttonDiv">
	<button type="button" class="btn btn-info btn-file btn-sm" id="submit">Добави</button>
</div>

<div>

	
</div>
<?php
/**
 * Created by PhpStorm.
 * User: Filip
 * Date: 26.5.2016 г.
 * Time: 16:06 ч.
 */