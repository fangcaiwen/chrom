// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#ff0000'}, function() {
  //   console.log("The color is green1111.");
  // });

	
  // 只有特殊网页才显示pageAction
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开百度才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});

  	// 拿cookie
  	const url = 'https://www.baidu.com';
		chrome.cookies.getAll({url}, cookies => {
		console.log("cookies===");
		console.log(cookies);
	});

	// 给插件图标加个文字，样式	
	chrome.browserAction.setBadgeText({text: 'wind'});
	chrome.browserAction.setBadgeBackgroundColor({color: [0, 255, 0, 255]});	


	// 鼠标右键
	chrome.contextMenus.create({
	    id: 'baidu-search',
	    title: '使用度娘搜索：%s',
	    contexts: ['selection'],
	    type:"normal"
	});
	chrome.contextMenus.onClicked.addListener(function(info, tab) {
	    switch(info.menuItemId){
	        case 'baidu-search':
	            chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText)});
	            break;
	    }
	});

	// 浏览器通知	
	chrome.notifications.create(null, {
		type: 'basic',
		iconUrl: 'images/icon_16.png',
		title: '这是标题',
		message: '您刚才点击了自定义右键菜单！'
	});

	

});