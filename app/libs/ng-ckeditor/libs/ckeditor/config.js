/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc,footnotes';
	config.skin = 'moonocolor';

	/*config.toolbar_full = [
		{ name: 'basicstyles',
			items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
		{ name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
		{ name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
		'/',
		{ name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
		{ name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
		{ name: 'forms', items: [ 'Outdent', 'Indent' ] },
		{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
		{ name: 'document', items: [ 'PageBreak', 'Footnotes', 'Source' ] },
		{ name: 'lite', items:['lite_ToggleTracking','lite_ToggleShow','lite_AcceptOne','lite_RejectOne','lite_AcceptAll','lite_RejectAll','lite_ToggleTooltips'] },
	];*/

	//var lite = config.lite = config.lite || {};
	//config.extraPlugins = 'lite';

	// set to false if you want change tracking to be off initially
	//lite.isTracking = true;

	// these are the default tooltip values. If you want to use this default configuration, just set lite.tooltips = true;
	//lite.tooltips = true;
	//lite.tooltipTemplate = '%a by %u, first edit %t';
	
	// %REMOVE_END%

	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
