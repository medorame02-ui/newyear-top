/* New Year TOP — рисует топ из данных, которые присылает плагин.
   D — список строк "ник|фраги|смерти|в_голову|буква_скилла|скилл"
   S — номер первого места на странице, M — место игрока, T — всего игроков */
(function () {
	var rows = window.D || [];
	var first = window.S || 1;
	var me = window.M || 0;
	var total = window.T || rows.length;

	if (rows.length === 1 && rows[0] === '') rows = [];

	function esc(s) {
		return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	var last = first + rows.length - 1;
	var html = '';

	// гирлянда сверху
	var g = '<div class="garland">';
	for (var b = 0; b < 40; b++) g += '<i class="c' + (b % 5) + '" style="animation-delay:' + (-(b % 5) * 0.4) + 's"></i>';
	html += g + '</div>';
	// падающие снежинки
	for (var f = 0; f < 14; f++) {
		html += '<img class="fl" src="flake.png" alt="" style="left:' + ((f * 7.3 + 3) % 100) + '%;width:' + (10 + (f * 7) % 16) +
			'px;animation-duration:' + (7 + (f * 3) % 7) + 's;animation-delay:' + (-(f * 1.7) % 9) + 's">';
	}
	html += '<div class="head">' +
		'<img class="pk" src="tree.png" alt="">' +
		'<div class="ttl"><h1>ТОП ' + first + '–' + last + '</h1>' +
		'<div class="sub">Всего игроков: <b>' + total + '</b>' +
		(me ? ' &nbsp;&#9670;&nbsp; Твоё место: <b>' + me + '</b>' : '') +
		'</div></div>' +
		'<img class="wt" src="snowman.png" alt="">' +
		'</div>';

	html += '<table><tr><th>#</th><th class="nick">Ник</th><th>Фраги</th><th>Смерти</th>' +
		'<th>В голову</th><th>Эфф.</th><th>Скилл</th></tr>';

	for (var i = 0; i < rows.length; i++) {
		var p = rows[i].split('|');
		var place = first + i;
		var k = +p[1], d = +p[2], h = +p[3];
		var eff = (k + d) > 0 ? Math.round(k * 100 / (k + d)) : 0;
		var hp = k > 0 ? Math.round(h * 100 / k) : 0;
		var grade = p[4] || 'L-';
		var cls = (place <= 3 ? 't' + place : '') + (place === me ? ' me' : '');

		html += '<tr class="' + cls + '">' +
			'<td class="pos">' + (place <= 3 ? '<img class="cup" src="cup' + place + '.png" width="24" height="24" alt="' + place + '">' : place) + '</td>' +
			'<td class="nick">' + esc(p[0]) + '</td>' +
			'<td>' + k + '</td>' +
			'<td>' + d + '</td>' +
			'<td>' + h + ' <small>' + hp + '%</small></td>' +
			'<td><span class="bar"><i style="width:' + eff + '%"></i></span><b class="pc">' + eff + '%</b></td>' +
			'<td><span class="sk ' + grade.charAt(0) + '">' + esc(grade) + '</span> <span class="skn">' + p[5] + '</span></td>' +
			'</tr>';
	}

	html += '</table>';
	html += '<div class="foot"><img src="gift.png" alt="">С Новым годом!<img src="gift.png" alt=""></div>';

	document.getElementById('a').innerHTML = html;
})();
