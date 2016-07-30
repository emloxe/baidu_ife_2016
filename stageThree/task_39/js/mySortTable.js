/*
	new MySortTable({
		wrapDom : //表格添加到的DOM
		theadData : 表格头信息
		tbodyData : 表格body信息，是一个二维数组
	});

	//样式
.my-table {border-collapse:collapse;}
.my-table,th,td,tr {border:1px solid #222;box-sizing: border-box;}
.my-table thead{background: #dfdfdf}
.my-table th ,.my-table td{padding: 10px 20px;text-align: center;}


.t-icon{cursor: pointer;display: inline-block;width: 0;height: 0;border-right:5px solid transparent;border-left:5px solid transparent;  }
.t-icon-up{border-top: 8px solid #888;  margin: 0 1px 0 5px; }
.t-icon-down{border-bottom: 8px solid #888;}


*/


function MySortTable(opts){
	this.wrapDom = opts.wrapDom;
	this.theadData = opts.theadData;
	this.tbodyData = opts.tbodyData;

	this.init();
	
}


//生成表格
MySortTable.prototype.init = function(){
	var theadData = this.theadData;
	var tbodyData = this.tbodyData;

	var tb = document.createElement('table');
	var thead = document.createElement('thead');
	var tbody = document.createElement('tbody');
	var tr = document.createElement('tr');
	var trHTML = '';

	tb.class = tb.className = 'my-table';

	//生成表头

	for (var i = 0; i < theadData.length; i++) {
		
		if (i > 0) {
			trHTML+= '<th>'+ theadData[i] +'<i class="t-icon t-icon-up" data-id="'+i+'"></i><i class="t-icon t-icon-down" data-id="'+i+'"></i></th>'
		}else{
			trHTML += '<th>'+ theadData[i] + '</th>';
		}
	}
	tr.innerHTML = trHTML;
	thead.appendChild(tr);
	tb.appendChild(thead);


	for (var i = 0; i < tbodyData.length; i++) {
		var tr = document.createElement('tr');
		trHTML = '';
		for (var j = 0; j < tbodyData[i].length; j++) {			
			trHTML += '<td>'+tbodyData[i][j]+'</td>';
		}
		tr.innerHTML = trHTML;
		tbody.appendChild(tr);
	}
	tb.appendChild(tbody);
	this.wrapDom.appendChild(tb);


	//设置统一宽度
	var td = tbody.getElementsByTagName('td');
	var w = thead.getElementsByTagName('th')[1].offsetWidth;
	thead.getElementsByTagName('th')[0].style.width = w + 'px';
	for (var i = 0; i < td.length; i++) {
		td[i].style.width = w + 'px';
	}

console.log(w);
	//将DOM节点传出去
	this.tb = tb;
	this.thead = thead;
	this.tbody = tbody;
}


//排序函数
MySortTable.prototype.sortData = function(id , d){

	var tbodyData = this.tbodyData;
	var newSortDate;		

	if (d === 'up') {
		newSortDate = tbodyData.sort(function(a,b){return b[id] - a[id]});

	}else{
		newSortDate = tbodyData.sort(function(a,b){return a[id] - b[id]});
	}

	this.renderTable( newSortDate );

}


//点击事件
MySortTable.prototype.bindDom = function(){

	var iconUpDom = document.getElementsByClassName('t-icon-up'),
	  iconDownDom = document.getElementsByClassName('t-icon-down');
	var self = this;

	for (var i = 0; i < iconUpDom.length; i++) {

		(function(){
			iconUpDom[i].onclick = function(e){
				var id = e.target.getAttribute('data-id');
				self.sortData(id , 'up' );
			}
			iconDownDom[i].onclick = function(e){
				var id = e.target.getAttribute('data-id');
				self.sortData(id , 'down');
			}
		})(i);
		
	}


	return this;
}



//重新排序
MySortTable.prototype.renderTable = function(data){
	var tbodyData = data;
	var tbody = this.tbody;
	var thead = this.thead;
	tbody.innerHTML = '';

	for (var i = 0; i < tbodyData.length; i++) {
		var tr = document.createElement('tr');
		trHTML = '';
		for (var j = 0; j < tbodyData[i].length; j++) {			
			trHTML += '<td>'+tbodyData[i][j]+'</td>';
		}
		tr.innerHTML = trHTML;
		tbody.appendChild(tr);
	}

	//设置统一宽度
	var td = tbody.getElementsByTagName('td');
	var w = thead.getElementsByTagName('th')[1].offsetWidth;
	thead.getElementsByTagName('th')[0].style.width = w + 'px';
	for (var i = 0; i < td.length; i++) {
		td[i].style.width = w + 'px';
	}

}

MySortTable.prototype.fixThead = function(){
	var table = this.tb;
	var thead = this.thead;
	var tbody = this.tbody;


	var scrollEvent = function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(table.offsetTop - scrollTop <= 0){
			thead.style.position = 'fixed';
			thead.style.top = '0';
			if(table.offsetTop + parseInt(getComputedStyle(table).height) - scrollTop <= 0){
				thead.style.position = 'absolute';
			}
		}else{
			thead.style.position = 'static';
		}
	}
	window.onscroll = scrollEvent;

	return this;
	
}




