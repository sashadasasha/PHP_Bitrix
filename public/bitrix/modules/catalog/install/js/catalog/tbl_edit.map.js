{"version":3,"sources":["tbl_edit.js"],"names":["JCCatTblEdit","arParams","this","intERROR","PREFIX","PREFIX_TR","PROP_COUNT_ID","TABLE_PROP_ID","CELLS","CELL_CENT","BX","ready","proxy","Init","prototype","PROP_TBL","PROP_COUNT","SetCells","arCells","arCenter","i","clone","length","replace","addRow","id","parseInt","value","newRow","oCell","typeHtml","needCell","insertRow","rows","insertCell","innerHTML","cells","adjust","style","textAlign","JCCatTblEditExt","PREFIX_NAME","BTN_ID","CELL_PARAMS","dialog","eventId","itemId","btnCollection","BTN","bind","findChild","tagName","attribute","type","showDialog","arCellParams","adminFormTools","modifyFormElements","target","proxy_context","hasAttribute","getAttribute","removeCustomEvent","onSave","CAdminDialog","content_url","SEARCH_PAGE","message","height","Math","max","window","innerHeight","width","innerWidth","draggable","resizable","min_height","min_width","addCustomEvent","Show","params","input","link","measure","util","htmlspecialchars","name","measureRatio","Close"],"mappings":"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","file":"tbl_edit.map.js"}