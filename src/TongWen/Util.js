
//https://github.com/softcup/New-Tongwentang-for-Web/blob/master/tongwen_core.js
//
const Map = imports.TongWen.Table.Map;
const Phrase = imports.TongWen.Table.Phrase;

let flagSimp = 'simplified'; // 簡體
let flagTrad = 'traditional'; // 繁體

let s2t = {}; // 繁轉簡 對照表
let t2s = {}; // 簡轉繁 對照表

let maxSTLen = 1; // 簡轉繁 最長的詞句
let maxTSLen = 1; // 繁轉簡 最長的詞句

// 新增 簡轉繁 對照表
function addS2TTable(table) {
	for (var i in table) {
		maxSTLen = Math.max(maxSTLen, table[i].length);
		s2t[i] = table[i];
	}
}

// 新增 繁轉簡 對照表
function addT2STable(table) {
	for (var i in table) {
		maxTSLen = Math.max(maxTSLen, table[i].length);
		t2s[i] = table[i];
	}
}

function convert(str, flag) {
	let len = 4;
	let map = null;

	if (flag === flagSimp) {
		// 繁轉簡
		map = t2s;
		len = Math.min(maxTSLen, str.length);
	} else {
		// 簡轉繁
		map = s2t;
		len = Math.min(maxSTLen, str.length);
	}

	// 單字轉換
	let list = str.split('');

	list.forEach(function(item, key, list) {
		list[key] = map[item] || item;
	});

	str = list.join('');


	// 詞彙轉換
	var txt = "", s = "", bol = true;
	for (var i = 0, c = str.length; i < c;) {
		bol = true;
		for (var j = len; j > 1; j--) {
			s = str.substr(i, j);
			if (s in map) {
				txt += map[s];
				i += j;
				bol = false;
				break;
			}
		}

		if (bol) {
			txt += str.substr(i, 1);
			i++;
		}
	}
	if (txt != "") {
		str = txt;
	}
	return str;
}

function toSimp(str) {
	return convert(str, flagSimp);
}

function toTrad(str) {
	return convert(str, flagTrad);
}

function init() {
	addS2TTable(Map.s2t);
	addS2TTable(Phrase.s2t);
	addT2STable(Map.t2s);
	addT2STable(Phrase.t2s);
}

init();
