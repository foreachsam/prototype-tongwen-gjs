#!/usr/bin/gjs

const TongWen = imports.TongWen.Util;

let simp = TongWen.toSimp('測試句子');
let trad = TongWen.toTrad(simp);
print('簡體: ', simp);
print('繁體: ', trad);
