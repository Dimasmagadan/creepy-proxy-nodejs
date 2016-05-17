// Peter's Data Entry Suite Release 4.0.7.5000
// Copyright 2002 - 2008 Peter L. Blum, All Rights Reserved, www.PeterBlum.com
var gDES_InCallback=false;var gDES_BI={UA:navigator.userAgent.toLowerCase(),onkeypress:1,innerHTML:(document.body!=null)&&(document.body.innerHTML!=null),setInterval:window.setInterval!=null};if(DES_ChkBrws('konqueror')){gDES_BI.Name="Konqueror";gDES_BI.OS="Linux";gDES_BI.Konqueror=1;}else if(DES_ChkBrws('safari',1)||DES_ChkBrws('applewebkit',1)){gDES_BI.Name="Safari";gDES_BI.Safari=1;}else if(DES_ChkBrws('omniweb',1))gDES_BI.Name="OmniWeb";else if(DES_ChkBrws('opera',1)){gDES_BI.Name="Opera";gDES_BI.Opera1=1;}else if(DES_ChkBrws('webtv',1))gDES_BI.Name="WebTV";else if(DES_ChkBrws('msie',1)){gDES_BI.Name="Internet Explorer";gDES_BI.IEWin=1;}else if((gDES_BI.UA.indexOf('trident')>-1)&&DES_ChkBrws('rv',1)){gDES_BI.Name="Internet Explorer";gDES_BI.IEWin=1;}else if(DES_ChkBrws('netscape',1)){gDES_BI.Name="Netscape Mozilla";gDES_BI.Gecko=1;}else if(DES_ChkBrws('gecko',1)){gDES_BI.Name="Gecko";gDES_BI.Gecko=1;}else if(!DES_ChkBrws('compatible',1)){gDES_BI.Name="Netscape Navigator";gDES_BI.Ver=gDES_BI.UA.charAt(8);gDES_BI.Netscape=1;}else gDES_BI.Name="unknown";if(!gDES_BI.OS){if(DES_ChkBrws('linux',0))gDES_BI.OS="Linux";else if(DES_ChkBrws('x11',0))gDES_BI.OS="Unix";else if(DES_ChkBrws('mac',0))gDES_BI.OS="Mac";else if(DES_ChkBrws('win',0))gDES_BI.OS="Windows";else gDES_BI.OS="unknown";}if(gDES_BI.IEWin&&(gDES_BI.OS=="Mac")){gDES_BI.IEWin=0;gDES_BI.IEMac=1;if(gDES_BI.Ver>=5.2)gDES_BI.IEMacOSX=1;else if(gDES_BI.Ver>=5.1)gDES_BI.IEMac51=1;}else if(gDES_BI.IEWin){if(gDES_BI.Ver>=5.5){gDES_BI.IEWin55=1;if(gDES_BI.Ver>=7)gDES_BI.IEWin7=1;if(gDES_BI.Ver>=8)gDES_BI.IEWin8=1;if(gDES_BI.Ver>=10)gDES_BI.IEWin10=1;if(gDES_BI.Ver>=11)gDES_BI.IEWin11=1;}}else if(gDES_BI.Opera1){var vV=parseInt(gDES_BI.Ver);if(vV>=7){gDES_BI.Opera7=1;gDES_BI.Opera1=0;if(vV>=9)gDES_BI.Opera9=1;}}else if(gDES_BI.Gecko){if(DES_ChkBrws('firefox',1)){gDES_BI.FireFox=1;gDES_BI.Name="FireFox";var vFFV=parseFloat(gDES_BI.Ver);if(vFFV>=1.5)gDES_BI.FireFox15=1;if(vFFV>=2)gDES_BI.FireFox2=1;if(vFFV>=3)gDES_BI.FireFox3=1;}}else if(gDES_BI.Safari){if(gDES_BI.Ver>=520)gDES_BI.Safari3=1;}gDES_BI.onkeypress=!gDES_BI.Opera1&&!gDES_BI.Konqueror;gDES_BI.focusontable=gDES_BI.IEWin||gDES_BI.FireFox15;gDES_BI.MultilineTT=gDES_BI.IEWin||gDES_BI.IEMac51;function DES_ChkBrws(pID,pSetVer){var vPos=gDES_BI.UA.indexOf(pID)+1;if(pSetVer&&vPos){gDES_BI.Ver=parseFloat(gDES_BI.UA.substring(vPos+pID.length));if(isNaN(gDES_BI.Ver))gDES_BI.Ver=gDES_BI.UA.charAt(vPos+pID.length);}return vPos;}function DES_GetById(pId){function Fix(pF){if(pF&&window.RadAjaxNamespace){if(pF.innerHTML=="RADAJAX_HIDDENCONTROL")return null;if((pF.tagName=="DIV")&&(pF.style.display=="none")&&(pF.innerHTML=="")&&(pF.className=="")&&(pF.style.visibility==""))return null;}return pF;}if(typeof(pId)!="string")return pId;if(document.getElementById)return Fix(document.getElementById(pId));else if(document.all)return Fix(document.all[pId]);else if(document.layers){var vElement="";eval("if (document."+pId+") vElement = document."+pId+"; else vElement =document."+gDES_FormName+"."+pId);return Fix(vElement);}else return null;}function DES_GetByIdEx(pId,pExt,pMode){return DES_GetById(DES_PrepIdEx(pId,pExt,pMode));}function DES_PrepIdEx(pId,pExt,pMode){if(pMode==1)return pId+pExt;if(!gGBIRE)gGBIRE=new RegExp("_\\d+$");var vM=gGBIRE.exec(pId);if(vM!=null){pId=pId.substr(0,pId.length-vM[0].length)+pExt;if(!pMode)pId=pId+vM[0];}else pId=pId+pExt;return pId;}var gGBIRE;function DES_GetAtt(pE,pAName,pDefVal){if(pE.getAttribute){var vR=pE.getAttribute(pAName,0);if(vR==null){vR=eval("pE."+pAName);if(vR==null)vR=pDefVal;}else if((vR=="")&&(!document.all))vR=pDefVal;return vR;}else return pDefVal;}function DES_SetAtt(pE,pN,pV){if(gDES_BI.Opera7){eval("pE."+pN+"=pV");}else if(pE.setAttribute)pE.setAttribute(pN,pV,0);else{var vN=pE.name+"_"+pN;eval("vN = pV.toString();");}}function DES_Target(pE){if(!pE){pE=window.event;if(!pE)return null;}var vT=pE.target?pE.target:pE.srcElement;if(vT.nodeType==3)vT=vT.parentNode;return vT;}function DES_ParentNode(pE){if(pE.parentElement!=null)return pE.parentElement;else if(pE.parentNode!=null)return pE.parentNode;else return null;}function DES_GetChildNodes(pParent,pNodeName,pIndex){var vFoundCount=0;var vChildren=null;if(pParent.childNodes){vChildren=pParent.childNodes;}else if(pParent.children){vChildren=pParent.children;}else if(pParent.getElementsByTagName){vChildren=pParent.getElementsByTagName(pNodeName);}else{return null;}var vLength=vChildren.length;for(var vCount=0;vCount<vLength;vCount++)if(vChildren[vCount].nodeName==pNodeName){vFoundCount++;if(vFoundCount==pIndex)return vChildren[vCount];}return null;}function DES_SetInnerHTML(pFld,pV){if(gDES_BI.IEMac51||gDES_BI.IEMacOSX){pFld.innerHTML="";var vNE=document.createElement("span");vNE.innerHTML=pV;pFld.appendChild(vNE);}else pFld.innerHTML=pV;}function DES_SetFocus(pFldId){var vFld=DES_GetById(pFldId);if(!vFld)return;if(window.gDES_VG&&gDES_VG.FocF&&!eval(gDES_VG.FocF+'(vFld)'))return;if(vFld.gocDE)vFld=vFld.gocDE[0];if((vFld.focus!=null)&&((vFld.type==null)||(vFld.type!="hidden"))&&((vFld.disabled==null)||!vFld.disabled)&&((vFld.style==null)||DES_IsVisible(vFld))){try{vFld.focus();if(vFld.select)vFld.select();}catch(e){}}}function DES_HideFocus(pID,pV){var vF=DES_GetById(pID);if(vF.hideFocus!=null)vF.hideFocus=pV;}function DES_SetBkColor(pE,pC){if(gDES_BI.Opera1){if(pC=="")pC="white";pE.style.background=pC;}else{pE.style.backgroundColor=pC;if(!pC&&pE.background)pE.background="";}}function DES_IsVisible(pFld){var vV=true;while(vV&&(pFld!=null)&&(pFld!=document.body)){vV=!((pFld.style.visibility=="hidden")||(pFld.style.display=="none"));pFld=pFld.parentNode;}return vV;}function DES_UnselectPage(){if(gDES_BI.IEWin55&&document.execCommand)document.execCommand("Unselect",false,null);}function DES_Alert(pMsg,pDelay){if(!window.gDES_Alert){if(pDelay){var vCode="DES_AlertBody('"+pMsg+"');";setTimeout(vCode,10);}else DES_AlertBody(pMsg);}}var gDES_Alert=0;function DES_AlertBody(pMsg){if(window.gDES_Alert)return;window.gDES_Alert=1;try{alert(pMsg);}catch(e){}window.gDES_Alert=0;}function DES_ParseInt(pVal){var vR=0;var vNeg=false;for(var vI=0;vI<pVal.length;vI++){var vC=pVal.charAt(vI);if((vC>='0')&&(vC<='9'))vR=(vR*10)+parseInt(vC);else if(((vC=="-")||(vC=="("))&&(vI==0))vNeg=true;else if(vC!=")")return NaN;}if(vNeg)vR=-vR;return vR;}function DES_Round(pVal,pMd,pDP){if(pDP==-1)return pVal;var vTxt=pVal.toString();var vP=vTxt.indexOf(".");if(vP<0)return pVal;if(vTxt.length-(vP+1)<=pDP)return pVal;var vSF=Math.pow(10.0,pDP);var vSV=pVal*vSF;switch(pMd){case 0:vSV=Math.floor(Math.abs(vSV));if(pVal<0)vSV=-vSV;return vSV/vSF;case 1:var vNV=Math.floor(vSV);if((vSV!=vNV)&&(vNV%2==1)){vNV=Math.round(vSV);}return vNV/vSF;case 2:return parseFloat(new Number(pVal+'').toFixed(parseInt(pDP)));case 3:vSV=Math.ceil(vSV);return vSV/vSF;case 4:vSV=Math.ceil(Math.abs(vSV));if(pVal<0)vSV=-vSV;return vSV/vSF;}return 0;}function DES_Trunc(pDecimal){var vStr=pDecimal.toString();var vPos=vStr.indexOf(".");if(vPos==-1)return parseInt(vStr);else return parseInt(vStr.substr(0,vPos));}function DES_DecToStr(pV){var vR=pV.toString();if((vR.indexOf('e-')>-1)&&pV.toFixed){var vM=vR.match(/^.e\-(\d*)$/);var vSz=parseInt(vM[1]);vR=pV.toFixed(vSz);}return vR;}function DES_StripTags(pHTML){return gDES_BI.IEMac||(gDES_BI.IEWin&&!gDES_BI.IEWin55)?pHTML:DES_RERpl(pHTML,"<(.|\n)+?>","");}function DES_RERpl(pText,pFind,pReplace){var vRx=new RegExp(pFind,"ig");return pText.replace(vRx,pReplace);}var gDES_NLTkn=new Array("","<br />","\n","\r"," ");function DES_NLTkn(pText,pUse,pType){if(pType&&pUse){if((pType==3)&&!gDES_BI.MultilineTT)pType=4;return DES_RERpl(pText,"{NEWLINE}",gDES_NLTkn[pType]);}else return pText;}function DES_Trim(s){var m=s.match(/^\s*(\S+(\s+\S+)*)\s*$/);return(m==null)?"":m[1];}function DES_AttachEvent(pFld,pEvtName,pCode,pFst){if(typeof(pFld)=="string")pFld=DES_GetById(pFld);var vEv=eval("pFld."+pEvtName+";");if(typeof(vEv)=="function"){vEv=vEv.toString();vEv=vEv.substring(vEv.indexOf("{")+1,vEv.lastIndexOf("}"));if(vEv.charAt(vEv.length-1)!=";")vEv=vEv+";";if(vEv.indexOf(pCode)>-1)return;}else vEv="";if(pFst)vEv=pCode+vEv;else vEv=vEv+pCode;eval("pFld."+pEvtName+"= function(pE){var event = window.event; try {if (!event) event=pE;}catch(ex){}"+vEv+"}");DES_TrackEvent(pFld,pEvtName);}function DES_TrackEvent(pFld,pEvtName){if(window.attachEvent){if(!gDES_Events){gDES_Events=new Array;window.attachEvent("onunload",DES_DetachEvents);}gDES_Events[gDES_Events.length]={fld:pFld,evt:pEvtName};}}var gDES_Events=null;function DES_DetachEvents(){if(gDES_Events){for(var vI=0;vI<gDES_Events.length;vI++){var vO=gDES_Events[vI];eval("vO.fld."+vO.evt+" = null;vO.fld=null;");}}gDES_Events=null;}function DES_FireEvent(pFld,pEN,pDOMET){if(typeof(pFld)=="string")pFld=DES_GetById(pFld);if(pFld.fireEvent!=null)pFld.fireEvent('on'+pEN);else if((document.createEvent!=null)&&!gDES_BI.Opera7&&(!gDES_BI.Safari||gDES_BI.Safari3)){var vEv=document.createEvent(pDOMET);switch(pDOMET){case"UIEvents":vEv.initUIEvent(pEN,true,true,window,0);break;case"MouseEvents":vEv.initMouseEvent(pEN,true,true,window,0,0,0,0,0,false,false,false,false,0,null);break;default:vEv.initEvent(pEN,true,false);break;}pFld.dispatchEvent(vEv);}else{var vEv="";if(gDES_BI.Opera7||gDES_BI.Safari)vEv=eval("pFld.on"+pEN);else vEv=pFld.getAttribute('on'+pEN);vEv=vEv.toString();if(vEv.indexOf("javascript:")==0)vEv=vEv.slice(11);vEv=vEv.substring(vEv.indexOf("{")+1,vEv.lastIndexOf("}"));eval(vEv+';');}}function DES_StopEvent(pE){if(!pE)if(window.event)pE=window.event;else return;if(pE.cancelBubble!=null)pE.cancelBubble=true;if(pE.stopPropagation)pE.stopPropagation();if(pE.preventDefault)pE.preventDefault();pE.returnValue=false;if(pE.cancel!=null)pE.cancel=true;}function DES_EventStopped(pE){if(!pE)if(window.event)pE=window.event;else return false;if(gDES_BI.Opera7)return false;return pE.returnValue==false;}function DES_GetKeyCode(pE){var vKC=null;if(pE.keyCode)vKC=pE.keyCode;else if(pE.which)vKC=pE.which;return vKC;}function DES_IsCtrl(pE){var vCK=false;if(pE.ctrlKey!=null)vCK=pE.ctrlKey;else if(pE.modifiers!=null)vCK=(pE.modifiers|2)!=0;return vCK;}function DES_IsShift(pE){var vSK=false;if(pE.shiftKey!=null)vSK=pE.shiftKey;else if(pE.modifiers!=null)vSK=(pE.modifiers|4)!=0;return vSK;}function DES_ApplyCssPlus(pFld,pCss){pFld.className=DES_MergeCss(pFld.className,pCss);}function DES_MergeCss(pOCss,pPCss){if(!pPCss||(pOCss.indexOf(pPCss)>-1))return pOCss;if(pOCss=="")return pPCss;if(pPCss.charAt(0)==" ")return pOCss+pPCss;if(pPCss.charAt(pPCss.length-1)==" ")return pPCss+pOCss;return pPCss;}function DES_Reanimate(){if(gDES_BI.IEWin)window.setTimeout("DES_ReanBody();",50);}function DES_ReanBody(){for(var vI=0;vI<document.images.length;vI++){var vImg=document.images[vI];var vName=vImg.src.toUpperCase();if(vName.substring(vName.length-3,vName.length)=="GIF")vImg.src=vImg.src;}}function DES_WaitMsg(){var vMsg=window.gDES_PgLd?gDES_PgLd:"Page is loading. Please wait.";alert(vMsg);}function DES_OnReset(pIsPostBack){if(this.DES_VALReset)DES_VALReset(pIsPostBack);if(this.DES_RunAllFSC){gDES_Init=true;try{DES_RunAllFSC();}finally{gDES_Init=false;}}if(window.DES_CalcAll)DES_CalcAll();if(this.DES_CMonReset)DES_CMonReset();if(this.DES_VWBRefresh)DES_VWBRefresh();DES_RefreshPage(true);var vF=DES_GetById("DES_JSE");if(vF)vF.value=1;}function DES_EvtType(pF){var vEvt=0;switch(pF.tagName){case"SELECT":case"TEXTAREA":vEvt=1;break;case"INPUT":if((pF.type=="text")||(pF.type=="password")||(pF.type=="file"))vEvt=1;break;}return vEvt;}var gDES_Refresh=null;function DES_RefreshPage(pVal){if(window.gDES_VG&&pVal&&gDES_VG.VUpdF)eval(gDES_VG.VUpdF);DES_Refresh();if(this.TMTB_Resize)TMTB_Resize();if(this.gDES_PV)DES_PVRefresh();if(this.DES_UpdateRFM&&window.gDES_VG&&window.gDES_VG.AHRFM)DES_UpdateRFM();}function DES_AddRefresh(pFld,pFnc){if(!gDES_Refresh)gDES_Refresh=new Array();gDES_Refresh[gDES_Refresh.length]={fld:pFld,fnc:pFnc};}function DES_Refresh(pFld){if(gDES_Refresh)for(var vI=0;vI<gDES_Refresh.length;vI++){var vR=gDES_Refresh[vI];if(!pFld||(pFld==vR.fld))vR.fnc(vR.fld);}}function DES_FixRefresh(){if(gDES_Refresh){var vT=new Array;for(var vI=0;vI<gDES_Refresh.length;vI++){var vF=gDES_Refresh[vI].fld;var vFld=DES_GetById(vF.id);if(vFld)vT[vT.length]=gDES_Refresh[vI];else{vF.style.display="none";vF.style.visibility="hidden";vF.disabled=false;gDES_Refresh[vI].fnc(vF);}}gDES_Refresh=vT.length>0?vT:null;}}function DES_RefreshOne(pSrc,pDst,pDsp){if(pDst){pDst.style.visibility=pSrc.style.visibility=="hidden"?"hidden":"";if(!pDsp){pDsp="inline";if(pDst.tagName=="TABLE"){if(gDES_BI.Opera9)pDsp="inline-table";else if(gDES_BI.Safari3||gDES_BI.FireFox3)pDsp="inline-block";}}pDst.style.display=pSrc.style.display=="none"?"none":pDsp;if(pSrc.disabled!=null){pDst.disabled=pSrc.disabled;DES_DisableImg(pDst);}}}var gDES_DisableFilter="progid:DXImageTransform.Microsoft.BasicImage(opacity = 0.50)";function DES_DisableImg(pImg,pAny){function DsbCss(){if(pImg.DsbCss!=null){if(pImg.SvDsbCss==null)pImg.SvDsbCss=pImg.className;pImg.className=pImg.disabled?pImg.DsbCss:pImg.SvDsbCss;return true;}return false;}if((pImg.disabled!=null)&&(pAny||(pImg.tagName=="IMG")||((pImg.tagName=="INPUT")&&(pImg.type=="image")))){if(pImg.DsbImg!=null){if(pImg.SvDsbImg==null)pImg.SvDsbImg=pImg.src;pImg.src=pImg.disabled?pImg.DsbImg:pImg.SvDsbImg;}if(DsbCss())return;if(gDES_BI.IEWin55&&!gDES_BI.IEWin10)pImg.style.filter=pImg.disabled?gDES_DisableFilter:"";else if(pImg.style.opacity!=null){pImg.style.opacity=pImg.disabled?0.5:1.0;}}else if(pImg.disabled!=null)if(pImg.tagName!="SELECT")if(!DsbCss())for(var vI=0;vI<pImg.childNodes.length;vI++){var vC=pImg.childNodes[vI];if(vC.nodeType==1){vC.DsbCss=pImg.DsbCss;var vSv=vC.disabled;vC.disabled=pImg.disabled;DES_DisableImg(vC,pAny);vC.disabled=vSv;}}}function DES_WindowStatus(pMsg){if(window.status)window.status=pMsg;}function DES_CanEditParent(pFId){var vPos=pFId.lastIndexOf("_");if(vPos>-1){var vEF=DES_GetById(pFId.substr(0,vPos));if(vEF&&(vEF.readonly||vEF.disabled))return false;}return true;}function DES_FixCI(pCI){return pCI?pCI:gDES_CultureInfo;}function DES_GetCmdId(pKMap,pKC,pCK,pSK,pOKD){function GetIt(pPos,pTkn){var vEP=pKMap.indexOf("}",pPos+pTkn.length+1);return(vEP>-1)?parseInt(pKMap.substring(pPos+pTkn.length+1,vEP)):0;}if(gDES_BI.IEWin&&(pKC==17))return 0;var vMK=(pCK?"C":"")+(pSK?"S":"");var vTkn="{#"+pKC+vMK;var vPos=pKMap.indexOf(vTkn);if(vPos>-1){return GetIt(vPos,vTkn);}else if(!pOKD||(pKC<33)||(pKC>47)){var vKCS=String.fromCharCode(pKC);var vU=vKCS.toUpperCase();if((vU==vKCS)&&((pKC<65)||(pKC>90)))vMK=(pCK?"C":"");vKCS=vU;vTkn="{"+vKCS+vMK;vPos=pKMap.indexOf(vTkn+"|");if(vPos>-1){return GetIt(vPos,vTkn);}}return 0;}function DES_Debug(pMsg){var vF=DES_GetById("DES_Debug");if(!vF){var vF=document.createElement("span");document.body.appendChild(vF);}vF.innerHTML=vF.innerHTML+pMsg+"<br />";}function DES_Preload(pUrl){if(pUrl&&document.images){var vImg=new Image();vImg.src=pUrl;}}function DES_MatchGroup(pGRq,pGSp){if((pGRq=="*")||(pGSp=="*"))return true;if(pGSp=="")return pGRq=="";var vRp=/\$/g;pGSp=pGSp.replace(vRp,"\\$$");var vRx=new RegExp("^("+pGSp+")$","i");return vRx.test(pGRq);}function DES_DisplayStyle(pF){if(gDES_DStlRE.test(pF.tagName))return"block";else return"inline";}var gDES_DStlRE=/^((P)|(DIV)|(TABLE)|(TD)|(TH)|(TR)|(BLOCKQUOTE)|(PRE)|(HR)|(CENTER))$/;function DES_TxtLen(pFld){var vIsS=typeof(pFld)=="string";var vTxt=vIsS?pFld:pFld.value;var vL=vTxt.length;if(!vIsS&&(pFld.tagName!="TEXTAREA"))return vL;var vM;var vRE=/([^\r](?=\n))|(\r$)/g;while((vM=vRE.exec(vTxt))!=null){vL++;}return vL;}//!dc-end 4.0.4
function DES_DoAction(pAO){pAO.CondResult=-1;if(pAO.Enabled&&pAO.ActnFnc&&DES_DoEnabler(pAO)){pAO.CondResult=DES_EvalCondition(pAO.Cond);pAO.ActnFnc(pAO,pAO.CondResult);pAO.HasEval=1;}}function DES_DoEnabler(pAO){function VisEnb(){if((pAO.VT=="VAL")&&gDES_VG.ADVal&&pAO.Ctl){for(var vI=0;vI<pAO.Ctl.length;vI++){var vF=pAO.Ctl[vI];if(vF.AO&&(vF.AO.VT=="VT"))continue;if((vF.style.visibility=="hidden")||(vF.style.display=="none")||(vF.disabled))return false;}}return true;}if(!VisEnb()||(pAO.CanRun&&!pAO.CanRun(pAO))){if(pAO.VT=="VAL")if((pAO.EvtToVal!=1)||gDES_SubmitEvent)pAO.ActnFnc(pAO,1);return false;}return true;}var gDES_MAId=null;var gDES_Init=true;var gDES_SubmitEvent=false;var gDES_NoFC=false;function DES_CanRunActn(pAO){if(pAO.Enabler){var vR=DES_EvalCondition(pAO.Enabler);return vR!=0;}else return true;}function DES_InitActions(){if(window.PDP_InitObjects)PDP_InitObjects(false);if(window.attachEvent)window.attachEvent("onunload",DES_UnloadActions);if(window.DES_InitValA)DES_InitValA();var vAutoRun=new Array();for(var vActnID=0;vActnID<gDES_Actions.length;vActnID++){DES_InitOneAction(vActnID);var vAO=gDES_Actions[vActnID];if(vAO.AutoRun)vAutoRun[vAutoRun.length]=vAO;}for(var vI=0;vI<vAutoRun.length;vI++)DES_DoAction(vAutoRun[vI]);if(vAutoRun.length>0){if(window.DES_CalcAll)DES_CalcAll();DES_RefreshPage(true);}else if(window.gDES_ValRFM&&gDES_VG.AHRFM)DES_UpdateRFM();if(window.DES_PEFUnQueue)DES_PEFUnQueue();gDES_Init=false;}function DES_InitOneAction(pActnID){var vAO=gDES_Actions[pActnID];if(vAO.AOInited)return;vAO.AOInited=1;vAO.id=pActnID;if(vAO.Cond){var vCO=vAO.Cond;vCO.Action=vAO;if(vCO.InitFnc)vCO.InitFnc(vCO,vAO);}var vEn=vAO.Enabler;if((vEn!=null)&&(vEn.InitFnc!=null)){vEn.Action=vAO;vEn.InitFnc(vEn,vAO);}if(vAO.ExHU!=null)for(var vI=0;vI<vAO.ExHU.length;vI++)DES_HookupControl(DES_GetById(vAO.ExHU[vI]),vAO,null,cDES_HUCFlagECRA,null);if(vAO.InitFnc)vAO.InitFnc(vAO);if(this.DES_CEMAddAction)DES_CEMAddAction(vAO);}function DES_FieldChanged(pFldId,pHasEval){if(gDES_NoFC)return;gDES_SubmitEvent=false;var vFld=DES_GetById(pFldId);if(!vFld.ActionIDs)return;var vPV=0;for(var vI=0;vI<vFld.ActionIDs.length;vI++){var vAO=gDES_Actions[vFld.ActionIDs[vI]];if(!vAO)continue;if(pHasEval&&(vAO.VT=="VAL")&&!vAO.HasEval)continue;DES_DoAction(vAO);if(vAO.VT=="VAL")vPV=1;}if(vPV&&window.DES_PostValidateFld)DES_PostValidateFld(vFld);}function DES_UnloadActions(){for(var vI=0;vI<gDES_Actions.length;vI++){var vAO=gDES_Actions[vI];if(!vAO)continue;if(vAO.Ctl){for(var vJ=0;vJ<vAO.Ctl.length;vJ++){var vFld=vAO.Ctl[vJ];vFld.ActionIDs=null;vFld.GOCActionIDs=null;}vAO.Ctl=null;}vAO.Ctl2=null;vAO.ErrFld=null;vAO.ImgErrFld=null;vAO.TxtErrFld=null;vAO.LnkErrFld=null;}window.gDES_Vals=null;window.gDES_SSMsgs=null;window.gDES_ValFlds=null;window.gDES_AONoIDs=null;window.gDES_ValErrMsgs=null;}function DES_FindAOById(pID){var vFld=DES_GetById(pID);if(vFld&&vFld.AO)return vFld.AO;pID=pID.toUpperCase();for(var vActnID=0;vActnID<gDES_Actions.length;vActnID++){var vAO=gDES_Actions[vActnID];if(!vAO)continue;if((vAO.CID!=null)&&(vAO.CID==pID))return vAO;}return null;}function DES_SetEnabled(pAO,pEnabled){if((pAO!=null)&&(pEnabled!=pAO.Enabled)){pAO.Enabled=pEnabled;if(pEnabled)DES_DoAction(pAO);else{if(pAO.VT=="VAL")pAO.ActnFnc(pAO,1);}if(pAO.CID!=null){var vRFM=DES_GetByIdEx(pAO.CID,"_RFM");if(vRFM!=null)vRFM.style.visibility=pEnabled?"inherit":"hidden";}}}
function DES_EvalCondition(pCO){if(pCO.Enabled&&pCO.EvalFnc){var vR=pCO.EvalFnc(pCO);if((vR!=-1)&&pCO.Not)vR=(vR==1)?0:1;return vR;}else return-1;}function DES_InitCond(pCO,pAO){if(pCO.Trim==null)pCO.Trim=true;}function DES_InitOneFldCond(pCO,pAO){DES_InitCond(pCO,pAO);if(pCO.ConvVal==null)pCO.ConvVal=DES_ConvStrFld;if(pCO.IDToEval!="")DES_HookupControl(DES_GetById(pCO.IDToEval),pAO,pCO,false,pCO.HUCtrlFnc);}function DES_InitTwoFldCond(pCO,pAO){DES_InitOneFldCond(pCO,pAO);if(pCO.ConvVal2==null)pCO.ConvVal2=DES_ConvStrFld;if(pCO.IDToEval2!="")DES_HookupControl(DES_GetById(pCO.IDToEval2),pAO,pCO,false,pCO.HUCtrlFnc2);}function DES_InitMultiCond(pCO,pAO){DES_InitCond(pCO,pAO);for(var vI=0;vI<pCO.Conds.length;vI++){var vChild=pCO.Conds[vI];if(pAO.VT)vChild.Action=pAO;if(vChild.InitFnc)vChild.InitFnc(vChild,pAO);}}function DES_InitRangeCond(pCO,pAO){DES_InitOneFldCond(pCO,pAO);if(pCO.MinTxt!=null)pCO.Min=pCO.ConvStr(pCO,pCO.MinTxt,null);else pCO.Min=null;if(pCO.MaxTxt!=null)pCO.Max=pCO.ConvStr(pCO,pCO.MaxTxt,null);else pCO.Max=null;pCO.IsRng=1;}function DES_InitCompValCond(pCO,pAO){DES_InitOneFldCond(pCO,pAO);pCO.Val=pCO.ConvStr(pCO,pCO.ValTxt,null);}function DES_EvalMultiCond(pCO){if(pCO.Conds.length==0)return-1;var vResult=true;var vCanEval=false;if(pCO.ANDOp){for(var vI=0;vResult&&(vI<pCO.Conds.length);vI++){var vR=DES_EvalCondition(pCO.Conds[vI]);if(vR==0)vResult=false;if(vR!=-1)vCanEval=true;}}else{vResult=false;for(var vI=0;!vResult&&(vI<pCO.Conds.length);vI++){var vR=DES_EvalCondition(pCO.Conds[vI]);if(vR==1)vResult=true;if(vR!=-1)vCanEval=true;}}if(!vCanEval)return-1;if(pCO.NOTOp)vResult=!vResult;return vResult?1:0;}function DES_EvalReqTextCond(pCO){var vResult=true;var vVal=DES_GetTextValue(pCO.IDToEval,pCO.Trim,pCO.GetText);if(!pCO.Unassnd||(pCO.Unassnd.length==0))return(vVal!="")?1:0;if(pCO.CaseIns)vVal=vVal.toUpperCase();for(var vI=0;vResult&&(vI<pCO.Unassnd.length);vI++)if(pCO.Unassnd[vI]==vVal)vResult=false;return vResult?1:0;}function DES_EvalReqListCond(pCO){var vIdx=DES_GetSelIdx(pCO.IDToEval,pCO.GetSelIdx);if(vIdx==null)return-1;if(pCO.UnassgnIdx==null)pCO.UnassgnIdx=-1;return(vIdx!=pCO.UnassgnIdx)?1:0;}function DES_EvalRangeCond(pCO){var vVal=pCO.ConvVal(pCO,pCO.IDToEval,pCO.GetText);if(vVal==null)return-1;return(((pCO.Min==null)||(pCO.Comparer(pCO,pCO.Min,vVal,5)))&&((pCO.Max==null)||(pCO.Comparer(pCO,pCO.Max,vVal,3))))?1:0;}function DES_EvalComp2FldsCond(pCO){var vVal1=pCO.ConvVal(pCO,pCO.IDToEval,pCO.GetText);var vVal2=pCO.ConvVal2(pCO,pCO.IDToEval2,pCO.GetText2);if((vVal1==null)||(vVal2==null))return-1;return pCO.Comparer(pCO,vVal1,vVal2,pCO.Op)?1:0;}function DES_EvalCompValCond(pCO){var vVal=pCO.ConvVal(pCO,pCO.IDToEval,pCO.GetText);if(vVal==null)return-1;return pCO.Comparer(pCO,vVal,pCO.Val,pCO.Op)?1:0;}function DES_EvalDTCheckCond(pCO){pCO.Val=null;pCO.Val=pCO.ConvVal(pCO,pCO.IDToEval,pCO.GetText);if(!gDES_CanEval)return-1;if(pCO.Val!=null){return(((pCO.Min==null)||(pCO.Comparer(pCO,pCO.Min,pCO.Val,5)))&&((pCO.Max==null)||(pCO.Comparer(pCO,pCO.Max,pCO.Val,3))))?1:0;}else return 0;}function DES_EvalRegexCond(pCO){if(pCO.Expr=="")return-1;var vVal=DES_GetTextValue(pCO.IDToEval,pCO.Trim,pCO.GetText);if(vVal=="")return pCO.IBT;var vRx=new RegExp(pCO.Expr,pCO.Flags);return vRx.test(vVal)?1:0;}function DES_EvalCheckStateCond(pCO){var vFld=DES_GetById(pCO.IDToEval);if(vFld.checked!=null)return(vFld.checked==pCO.Chk)?1:0;else return-1;}function DES_EvalSelIdxListCond(pCO){var vLst=DES_GetById(pCO.IDToEval);if(vLst.multiple&&vLst.options&&(pCO.Idx>-1))return(vLst.options[pCO.Idx].selected==pCO.Sel)?1:0;var vSel=DES_IsSelIdx(pCO.IDToEval,pCO.Idx,pCO.IsSelIdx);if(vSel==null)return-1;return(vSel==pCO.Sel)?1:0;}function DES_EvalAltCS(pCO){if((pCO.OCSMode==0)&&gDES_SubmitEvent){pCO.OCSMode=1;return 1;}else if(pCO.OCSMode==0)return 0;else return 1;}function DES_EvalFixed(pCO){return gDES_SubmitEvent?1:pCO.Res;}var gDES_CanEval=true;function DES_ConvStrFld(pCO,pID,pGetTextFnc){var vVal=DES_GetTextValue(pID,pCO.Trim,pGetTextFnc);if(vVal==""){gDES_CanEval=false;return null;}else{gDES_CanEval=true;return pCO.ConvStr(pCO,vVal,null);}}function DES_StrConv(pCO,pTxt){return pTxt;}function DES_CIStrConv(pCO,pTxt){return pTxt.toUpperCase();}function DES_StripGrpSep(pGSep,pTxt){var vT='\\{0}';vT=vT.replace('{0}',pGSep);if(pGSep.charCodeAt(0)==160)vT='[ \\xA0]';return DES_RERpl(pTxt,vT,'');}function DES_RplDecSep(pDSep,pTSep,pTxt){if((pDSep!=".")&&(pTxt.indexOf(".")>-1)){var vR=false;if(pTxt.indexOf(pDSep)==-1){if(pTSep!=".")vR=true;else{var vPos1=pTxt.indexOf(pTSep);var vPos2=pTxt.lastIndexOf(pTSep);if((vPos1==-1)||(vPos1==vPos2))vR=true;}if(vR)pTxt=pTxt.replace(".",pDSep);}}return pTxt;}function DES_IntConv(pCO,pTxt){if(window.DES_DTTBFixCO)pCO=DES_DTTBFixCO(pCO);var vCI=DES_GetCulture(pCO.AO);pTxt=DES_StripGrpSep(vCI.NGSep,pTxt);var vVal=DES_ParseInt(pTxt);vVal=isNaN(vVal)?null:vVal;if(!pCO.Neg&&(vVal!=null)&&(vVal<0))vVal=null;if((vVal!=null)&&((vVal>2147483647)||(vVal<-2147483648)))vVal=null;return vVal;}function DES_DecConv(pCO,pTxt){if(window.DES_DTTBFixCO)pCO=DES_DTTBFixCO(pCO);var vCI=DES_GetCulture(pCO.AO);if(pCO.Per)pTxt=DES_RplDecSep(vCI.NDSep,vCI.NGSep,pTxt);pTxt=DES_StripGrpSep(vCI.NGSep,pTxt);if(!vCI.DecRE){var vPtrn="^\\s*([-\\+])?(\\d+)?(\\{0})?(\\d+)?\\s*$";vPtrn=vPtrn.replace("{0}",vCI.NDSep);vCI.DecRE=new RegExp(vPtrn);}var m=pTxt.match(vCI.DecRE);if(m==null)return null;var vPrepVal=(m[1]!=null?m[1]:"")+((m[2]!=null)&&(m[2].length>0)?m[2]:"0")+"."+(m[4]!=null?m[4]:"");var vVal=parseFloat(vPrepVal);vVal=isNaN(vVal)?null:vVal;if(!pCO.Neg&&(vVal!=null)&&(vVal<0.0))vVal=null;if(pCO.mxdec&&(vVal!=null)){var vT2=DES_DecToStr(vVal);var vDP=vT2.indexOf('.');if((vDP>-1)&&(vDP+pCO.mxdec+1<vT2.length))vVal=null;}return vVal;}function DES_Comparer(pCO,pLVal,pRVal,pOp){if(pLVal&&pLVal.getUTCDate&&pLVal.valueOf)pLVal=pLVal.valueOf();if(pRVal&&pRVal.getUTCDate&&pRVal.valueOf)pRVal=pRVal.valueOf();switch(pOp){case 0:return pLVal==pRVal;case 1:return pLVal!=pRVal;case 2:return pLVal>pRVal;case 3:return pLVal>=pRVal;case 4:return pLVal<pRVal;case 5:return pLVal<=pRVal;}return true;}var cDES_HUCFlagAltEvent=1;var cDES_HUCFlagECRA=2;function DES_HookupControl(pFld,pAO,pCO,pFlags,pHUCtrlFnc){if(!pFld)return false;if((pFlags==null)||(pFlags==false))pFlags=0;else if(pFlags==true)pFlags=cDES_HUCFlagAltEvent;if(pCO&&!pCO.HUEvts){if(window.DES_HookupRFM)DES_HookupRFM(pAO,pCO,pFld);return false;}if(!pCO||!pHUCtrlFnc){var vOF=null;vOFC=0;if(pAO.Ctl==null)pAO.Ctl=new Array;pAO.Ctl[pAO.Ctl.length]=pFld;if(pAO.REA&&pAO.ErrFldID&&window.DES_GOCInit){var vCFld=DES_GetById(pAO.ErrFldID);if(vCFld){DES_GOCInit(vCFld,pFld,1);vOF=pFld;pFld=vCFld;vOFC=1;}}var vFT=false;var vAOID=gDES_MAId!=null?gDES_MAId:pAO.id;if(pFld.ActionIDs==null){vFT=true;pFld.ActionIDs=new Array;if(((pFlags&cDES_HUCFlagAltEvent)==0)&&!pFld.gocDE){var vUseOnChange=DES_EvtType(pFld)==1;var vEv=vUseOnChange?pFld.onchange:pFld.onclick;if(typeof(vEv)=="function"){vEv=vEv.toString();vEv=vEv.substring(vEv.indexOf("{")+1,vEv.lastIndexOf("}"));}else vEv="";var vFunc=new Function("DES_FieldChanged('"+pFld.id+"'); "+vEv);if(vUseOnChange){pFld.onchange=vFunc;DES_TrackEvent(pFld,"onchange");}else{pFld.onclick=vFunc;DES_TrackEvent(pFld,"onclick");}}}else if(gDES_InCallback){for(var vI=0;vI<pFld.ActionIDs.length;vI++)if(vAOID==pFld.ActionIDs[vI])return false;}if(!pAO.RegID){pFld.ActionIDs[pFld.ActionIDs.length]=vAOID;if(pAO.REA)pAO.RegID=1;}if(vOFC)DES_GOCAddAO(vOF,vAOID);if(window.DES_VALRegCTV)DES_VALRegCTV(pFld,pAO,(pFlags&cDES_HUCFlagECRA)!=0);if(window.gDES_CMon&&(pAO.VT=="VAL"))DES_CMonInit({id:pFld.id,Grp:pAO.Group});if(window.DES_FSCInitKP)DES_FSCInitKP(pFld,pAO);return vFT;}else{pHUCtrlFnc(pCO,pAO,pFld.id);return false;}}function DES_HUGetChildCtrls(pCO,pAO,pFldID){var vDone=false;for(var vI=0;!vDone;vI++){vFld=pCO.GetChild(pFldID,vI,1);if(vFld!=null)DES_HookupControl(vFld,pAO,null,0,null);else vDone=true;}}function DES_HUGetChild2Ctrls(pCO,pAO,pFldID){var vDone=false;for(var vI=0;!vDone;vI++){vFld=pCO.GetChild2(pFldID,vI,1);if(vFld!=null)DES_HookupControl(vFld,pAO,null,0,null);else vDone=true;}}function DES_GCCheckRadioList(pFldID,pIdx,pMd){var vFld=DES_GetById(pFldID);var vBtns=DES_GetBtnList(vFld);var vID="";if(pMd==0){if(pIdx==0)return vFld;return vBtns[pIdx-1];}else return vBtns[pIdx];}function DES_GetTextValue(pId,pTrim,pGetTextFnc){function Prep(pS){if(pTrim)pS=DES_Trim(pS);if((vC.VWB!=null)&&(vC.value.toUpperCase()==vC.VWBUC))pS="";return pS;}var vC=DES_GetById(pId);if(pGetTextFnc!=null)return Prep(pGetTextFnc(pId));if((vC.tagName=="INPUT")&&((vC.type=="checkbox")||(vC.type=="radio")))return vC.checked?"1":"";if(typeof(vC.value)=="string")return Prep(vC.value);if(vC.options&&vC.selectedIndex)if(vC.selectedIndex==-1)return"";else{var vVal=vC.options[vC.selectedIndex].value;if(pTrim)vVal=DES_Trim(vVal);return vVal;}if((vC.tagName=="TABLE")||(vC.tagName=="SPAN")){var vBtns=DES_GetBtnList(vC);if(vBtns)for(var vI=0;vI<vBtns.length;vI++){var vBtn=vBtns[vI];if(vBtn.checked)return vBtn.value;}}return"";}function DES_GetSelIdx(pId,pGetFnc){if(pGetFnc!=null)return pGetFnc(pId);var vFld=DES_GetById(pId);if(vFld.selectedIndex==null)return null;return vFld.selectedIndex;}function DES_CBLGetSelIdx(pId){var vBtns=DES_GetBtnList(pId);if(vBtns)for(var vI=0;vI<vBtns.length;vI++){if(vBtns[vI].checked)return vI;}return-1;}function DES_IsSelIdx(pFId,pIdx,pFnc){if(pFnc!=null)return pFnc(pFId,pIdx);var vFld=DES_GetById(pFId);if(vFld.selectedIndex==null)return null;return vFld.selectedIndex==pIdx;}function DES_CBLIsSelIdx(pFId,pIdx){if(pIdx!=-1){var vBtns=DES_GetBtnList(pFId);return vBtns&&vBtns[pIdx].checked;}else return DES_CBLGetSelIdx(pFId)==-1;}function DES_GetBtnList(pFld){function FindChildren(array,parent){for(var vI=0;vI<parent.childNodes.length;vI++){var vC=parent.childNodes[vI];if(vC.tagName=="INPUT")array[array.length]=vC;else FindChildren(array,vC);}}pFld=DES_GetById(pFld);var vCB=pFld.childbuttons;if(!vCB){vCB=new Array();FindChildren(vCB,pFld);pFld.childbuttons=vCB;}return vCB;}function DES_GetCulture(pAO){return gDES_CultureInfo;}function DES_3PInit(){if(gDES_3PInitCnt>0){var vE=0;for(var vI=0;vI<gDES_3PInit.length;vI++){var vO=gDES_3PInit[vI];if(!vO.Inited){if(vO.Fnc(vO.ID))vO.Inited=1;else vE=1;}}if(vE){gDES_3PInitCnt--;if(gDES_3PInitCnt>0)window.setTimeout("DES_3PInit();",100);}}}var gDES_3PInitCnt=3;//!dc-end 4.0.1
var gDES_PageIsValid=true;var gDES_Vals=null;var gDES_AONoIDs=new Array;var gDES_CauseVal=false;var gDES_AltCfmMsg="";var gDES_ValPassCnt=0;var gDES_ValErrMsgs=null;var gDES_ValRFM=0;function DES_InitValAction(pAO){DES_AddVal(pAO);if(pAO.SumMsg==null)pAO.SumMsg="";if(pAO.SelErrMsg==null)pAO.SelErrMsg=DES_SelErrMsg;if(pAO.SelSumMsg==null)pAO.SelSumMsg=DES_SelSumMsg;if(pAO.UseFocus==null)pAO.UseFocus=false;if(pAO.ShowAlert==null)pAO.ShowAlert=false;if(pAO.CtlErrCss==null)pAO.CtlErrCss="";if(pAO.Group==null)pAO.Group="";if(pAO.EvtToVal==null)pAO.EvtToVal=0;if(pAO.Blnk==null)pAO.Blnk=false;if(pAO.BlnkCss==null)pAO.BlnkCss='';if(window.DES_Blink&&!pAO.BlinkFnc)pAO.BlinkFnc=DES_Blink;if(pAO.IsValid==null)pAO.IsValid=true;pAO.CondResult=pAO.IsValid?1:0;pAO.BlinkCnt=0;var vHasHF=pAO.HltFlds!=null;if(vHasHF)for(var vI=0;vI<pAO.HltFlds.length;vI++){var vHF=pAO.HltFlds[vI];vFld=DES_GetById(vHF.FID);if(!vFld)continue;vHF.OCss=vFld.className;if(vFld.HFPassCnt==null)vFld.HFPassCnt=-1;}if(pAO.ErrFldID!=null){pAO.ErrFld=DES_GetById(pAO.ErrFldID);if(pAO.ErrFld==null){pAO.Enabled=false;return;}pAO.ErrFld.AO=pAO;pAO.OrigCss=pAO.ErrFld.className;pAO.OrigColor=(pAO.ErrFld.style!=null)?pAO.ErrFld.style.color:null;pAO.ImgErrFld=DES_GetByIdEx(pAO.ErrFldID,"_Img");if((pAO.ErrFld.style!=null)&&(pAO.ErrFld.style.visibility!="hidden")&&pAO.FmttrFnc){if(pAO.TokenRepl)DES_EvalCondition(pAO.Cond);pAO.FmttrFnc(pAO,true);if(window.DES_StartBlink){gDES_SubmitEvent=true;DES_StartBlink(pAO);gDES_SubmitEvent=false;}}pAO.RFMFld=DES_GetByIdEx(pAO.ErrFldID,"_RFM");if(pAO.RFMFld)gDES_ValRFM=1;}if(!pAO.IsValid)DES_SetHiliteFields(pAO,0);if(!pAO.Ctl&&(pAO.VT=="VAL")){var vFnd=false;if(gDES_InCallback)for(var vI=0;vI<gDES_AONoIDs.length;vI++){if(pAO.CID==gDES_AONoIDs[vI].CID){vFnd=true;gDES_AONoIDs[vI]=pAO;break;}}if(!vFnd)gDES_AONoIDs[gDES_AONoIDs.length]=pAO;}}function DES_AddVal(pAO){if(pAO.VIdx!=null){if(!gDES_Vals){if(!gDES_VG.VCnt||(gDES_VG.VCnt<pAO.VIdx))gDES_VG.VCnt=pAO.VIdx+1;DES_InitValA();}else for(var vI=gDES_Vals.length;vI<pAO.VIdx;vI++)gDES_Vals[vI]=null;var vOld=gDES_Vals[pAO.VIdx];if(vOld){if(!vOld.CEMAO)if(vOld.HasEval){var vL=window.gDES_ReVal;if(!vL)vL=new Array();vL[vL.length]=pAO;window.gDES_ReVal=vL;}else if(pAO.IsValid==null){pAO.IsValid=vOld.IsValid;pAO.CondResult=vOld.CondResult;}}gDES_Vals[pAO.VIdx]=pAO;}}function DES_VALRegCTV(pFld,pAO,pECRA){if(!pFld.AVF){var vAVF=pAO.VT=="VAL";if(vAVF&&pECRA)if(window.gDES_VG&&!window.gDES_VG.EXHF)vAVF=false;if(vAVF){pFld.AVF=1;if(!window.gDES_ValFlds)gDES_ValFlds=new Array;gDES_ValFlds[gDES_ValFlds.length]=pFld;}}}function DES_ReVal(){var vL=window.gDES_ReVal;if(vL){var vGF=DES_GetById("DES_Group");var vGrp=vGF?vGF.value:"*";for(var vI=0;vI<vL.length;vI++){var vAO=vL[vI];if(!gDES_VG.SKVG)if(!DES_MatchGroup(vGrp,vAO.Group))continue;if(vAO.Cond.OCSMode!=null)DES_DoValidate(vAO,vAO.IsValid!=false?1:0);else DES_DoAction(vAO);}DES_PostValidate("*",false,true);}}function DES_HookupRFM(pAO,pCO,pFld){if(gDES_VG.AHRFM){if(!pAO.RFMFld&&pAO.ErrFldID)pAO.RFMFld=DES_GetByIdEx(pAO.ErrFldID,"_RFM");if(pAO.RFMFld&&!pFld.ChkRFM){pFld.ChkRFM=1;DES_AttachEvent(pFld,DES_EvtType(pFld)?"onchange":"onclick","DES_UpdateRFM();",false);}}}function DES_DoValidate(pAO,pEvalRes){pAO.IsValid=pEvalRes!=0;if(pAO.FmttrFnc&&pAO.ErrFld){if(pEvalRes!=-1){if(pAO.BeforeFmt)pAO.BeforeFmt(pAO,pEvalRes);pAO.FmttrFnc(pAO,!pAO.IsValid);}if(pAO.Dspl==2)pAO.ErrFld.style.display=pAO.IsValid?"none":"inline";pAO.ErrFld.style.visibility=pAO.IsValid?"hidden":"inherit";pAO.HasEval=1;if(pAO.NEFMd)DES_NoErrFmt(pAO);if(window.DES_StartBlink)if(!pAO.IsValid)DES_StartBlink(pAO);else DES_StopBlink(pAO);}}function DES_CanRunVal(pAO){if((pAO.EvtToVal==1)&&!gDES_SubmitEvent)return false;if((pAO.EvtToVal==2)&&gDES_SubmitEvent)return false;return DES_CanRunActn(pAO);}function DES_ValidateGroup(pGrp,pReal,pHasEval){gDES_PageIsValid=true;var vIsValid=true;gDES_SubmitEvent=pReal!=false;if(this.gDES_Vals==null)return true;for(var vI=0;vI<gDES_Vals.length;vI++){var vAO=gDES_Vals[vI];if(!vAO)continue;if(pHasEval&&!vAO.HasEval)continue;if(DES_MatchGroup(pGrp,vAO.Group)){vAO.IsValid=true;DES_DoAction(vAO);if(!vAO.IsValid)if(vAO.EvtToVal!=3)vIsValid=false;}else if(!gDES_VG.SKVG)DES_HideVal(vAO);}var vT=window.gDES_SSMsgs;if(vIsValid)gDES_SSMsgs=null;DES_PostValidate(pGrp,true,false);gDES_SSMsgs=vT;gDES_PageIsValid=vIsValid;if(gDES_VG.PPVFN)eval(gDES_VG.PPVFN+"('"+pGrp+"',"+(vIsValid?"true":"false")+");")
return vIsValid;}function DES_ValOnSubWGrp(pGrp){gDES_CauseVal=false;if(window.gDES_VG)for(var vI=0;vI<3;vI++){switch(gDES_VG.SOrd[vI]){case 0:if(!DES_ValidateGroup(pGrp,true))return false;break;case 1:if(this.confirm){if(gDES_AltCfmMsg==null)break;if(gDES_AltCfmMsg!=""){if(!confirm(DES_NLTkn(gDES_AltCfmMsg,true,2)))return false;}else if((gDES_VG.CnfM!=null)&&((this.gDES_VG.CnfG=="*")||(this.gDES_VG.CnfG==pGrp)))if(!confirm(DES_NLTkn(gDES_VG.CnfM,true,2)))return false;}if(window.DES_ConfirmWarnings)if(!DES_ConfirmWarnings(pGrp))return false;break;case 2:if(gDES_VG.CSFN!=null)if(!eval(gDES_VG.CSFN+"('"+pGrp+"');"))return false;break;}}if(this.DES_DisableSubmit)DES_DisableSubmit();return true;}function DES_ValOnSubmit(){if(!gDES_CauseVal){gDES_AltCfmMsg="";if(this.DES_DisableSubmit)DES_DisableSubmit();return true;}gDES_CauseVal=true;var vGrpFld=DES_GetById("DES_Group");if(vGrpFld==null){var vFlds=document.getElementsByName("DES_Group");if((vFlds==null)||(vFlds.length==0)){gDES_AltCfmMsg="";return true;}vGrpFld=vFlds[0];}var vR=DES_ValOnSubWGrp(vGrpFld.value);if(!vR&&(window.event!=null)){window.event.cancelBubble=true;window.event.returnValue=false;}if(!vR&&(window.__defaultFired!=null))window.__defaultFired=false;if(window.DES_Reanimate)DES_Reanimate();return vR;}function DES_ValOnClick(pGrp,pAltMsg){var vGrpFld=DES_GetById("DES_Group");if(vGrpFld==null){var vFlds=document.getElementsByName("DES_Group");if((vFlds==null)||(vFlds.length==0))return;vGrpFld=vFlds[0];}vGrpFld.value=pGrp;gDES_CauseVal=true;gDES_AltCfmMsg=pAltMsg?pAltMsg:"";}function DES_PostValidate(pGrp,pAll,pAUVS){if(!window.gDES_VG)return;if(gDES_VG.POS){var vIsV=true;gDES_ValPassCnt++;gDES_ValErrMsgs=new Array;var vFstInv=null;if(window.gDES_ValFlds)for(var vI=0;vI<gDES_ValFlds.length;vI++){var vFld=gDES_ValFlds[vI];if(!vFld)continue;if(!DES_PostValidateBody(vFld,pGrp,true)){vIsV=false;if(vFstInv==null)vFstInv=vFld;}}for(var vI=0;vI<gDES_AONoIDs.length;vI++){var vAO=gDES_AONoIDs[vI];if(vAO.Enabled&&!vAO.IsValid&&DES_MatchGroup(pGrp,vAO.Group)){DES_UpdateValErrMsgs(vAO,true,null);vIsV=false;}}if(this.gDES_SSMsgs)for(var vI=0;vI<gDES_SSMsgs.length;vI++)if(gDES_SSMsgs[vI].FldId==null)gDES_ValErrMsgs[gDES_ValErrMsgs.length]=gDES_SSMsgs[vI];if((!vIsV||(gDES_ValErrMsgs.length>0))&&pAll){var vA=gDES_VG.AOS&&((this.gDES_SSMsgs==null)||(this.gDES_SSMsgs.length<gDES_ValErrMsgs.length));DES_PostValidateAction(vFstInv,gDES_VG.FOS,vA);}if(window.DES_UpdateSummaries)DES_UpdateSummaries(pGrp,pAUVS);}if(window.DES_CEMDoAction)DES_CEMDoAction();DES_RefreshPage(true);}function DES_PostValidateFld(pFld){if(!window.gDES_VG)return;if(gDES_VG.POC){gDES_ValPassCnt++;gDES_ValErrMsgs=new Array;if(!DES_PostValidateBody(pFld,"*",false))DES_PostValidateAction(pFld,gDES_VG.FOC,gDES_VG.AOC);}var vAO=gDES_Actions[pFld.ActionIDs[0]];if(!vAO)return;if(window.DES_UpdateSummaries)DES_AutoUpdateSummaries(vAO.Group);if(this.DES_CEMDoAction)DES_CEMDoAction();DES_RefreshPage(true);}function DES_PostValidateBody(pFld,pGrp,pS){pFld.IsV=null;if(pFld.ValPassCnt==null)pFld.ValPassCnt=0;if(pFld.ValPassCnt<gDES_ValPassCnt){var vOFA=new Array;if(!pFld.gocDE&&(pFld.OFPassCnt!=gDES_ValPassCnt))vOFA[0]=pFld;pFld.ValPassCnt=gDES_ValPassCnt;pFld.OFPassCnt=gDES_ValPassCnt;for(var vI=0;vI<pFld.ActionIDs.length;vI++){vAO=gDES_Actions[pFld.ActionIDs[vI]];if(!vAO)continue;if(vAO.VT!="VAL")continue;if(vAO.ValPassCnt==null)vAO.ValPassCnt=0;if((vAO.IsValid!=null)&&(vAO.CondResult!=-1)&&DES_MatchGroup(pGrp,vAO.Group)){if(!vAO.IsValid){if(vAO.ValPassCnt<gDES_ValPassCnt)DES_UpdateValErrMsgs(vAO,pS,pFld.id);pFld.IsV=false;}else if(pFld.IsV==null)pFld.IsV=true;DES_GetOtherErrCtl(vOFA,pFld,vAO,pS);}else if((vAO.CondResult==-1)&&DES_MatchGroup(pGrp,vAO.Group)){if(pFld.IsV==null)pFld.IsV=true;DES_GetOtherErrCtl(vOFA,pFld,vAO,pS);}vAO.ValPassCnt=gDES_ValPassCnt;DES_SetHiliteFields(vAO,vAO.CondResult);}if((pFld.IsV!=null)&&(gDES_VG.ErrCtlCss!=null)){for(var vI=0;vI<vOFA.length;vI++)DES_PostValidateErrCtl(vOFA[vI],vOFA[vI].IsV);}}return pFld.IsV!=false;}function DES_GetOtherErrCtl(pOFA,pFld,pAO,pS){if(!pFld.gocDE&&(pS||(pAO.EvtToVal==1)))return;var vMS=pFld.gocDE!=null;var vFA=vMS?pFld.gocDE:pAO.Ctl;for(var vJ=0;vJ<vFA.length;vJ++){var vO=vFA[vJ];if(vO.gocDE){DES_GetOtherErrCtl(pOFA,vO,pAO,pS);continue;}if(vO!=pFld){var vUPC=(vO.OFPassCnt==null)||(vO.OFPassCnt<gDES_ValPassCnt);if(vUPC)pOFA[pOFA.length]=vO;if(vUPC||!pAO.IsValid)vO.IsV=pAO.IsValid;if(DES_IsValid(vO)==false)vO.IsV=false;vO.OFPassCnt=gDES_ValPassCnt;}}if(pFld.gocfld){for(var vI=0;vI<pFld.gocfld.length;vI++){if(DES_IsValid(pFld.gocfld[vI])==false){pFld.IsV=false;break;}}}}function DES_UpdateValErrMsgs(pAO,pS,pFldId){if(!pS||(pAO.EvtToVal!=2)){if(!gDES_VG.ASEM)pS=true;var vMsg=pS?DES_GetSumMsg(pAO):DES_GetErrMsg(pAO);if(vMsg!=""){var vId=pAO.Ctl?pAO.Ctl[0].id:pFldId;gDES_ValErrMsgs[gDES_ValErrMsgs.length]={Msg:vMsg,Grp:pAO.Group,FldId:vId,OStl:pAO.OStl};}}}function DES_PostValidateErrCtl(pF,pIsV){var vOStl=0;if(pF.ActionIDs)for(var vI=0;vI<pF.ActionIDs.length;vI++){var vAO=gDES_Actions[pF.ActionIDs[vI]];if(vAO&&vAO.OStl&&vAO.IsValid==false){vOStl=1;break;}}if(pF.SetErrStyle){pF.SetErrStyle(pF.id,pIsV,vOStl);return;}var vCss="";var vCB=false;var vAltF=null;if((pF.tagName=="INPUT")&&((pF.type=="checkbox")||(pF.type=="radio"))){vCss=!vOStl?gDES_VG.ErrChkCss:gDES_VG.ErrChkCss2;vCB=true;if(pF.style.OrigCss==null){var vP=pF.parentNode;if(vP.id=="")for(var vI=0;vP&&(vI<4);vI++)if(vP.style&&(vP.style.OrigCss!=null)){vAltF=vP;break;}else vP=vP.parentNode;}}else if(pF.tagName=="SELECT")vCss=!vOStl?gDES_VG.ErrLstCss:gDES_VG.ErrLstCss2;if(vCss=="")vCss=!vOStl?gDES_VG.ErrCtlCss:gDES_VG.ErrCtlCss2;if((vCss!="")&&(pF.className!=null)){if(!vCB||(gDES_VG.CBECCMd<2)){DES_SetErrCtlCss(vAltF?vAltF:pF,pIsV,vCss);}if(vCB&&(gDES_VG.CBECCMd!=1)){vL=pF.nextSibling;if(vL&&(vL.tagName=="LABEL"))DES_SetErrCtlCss(vL,pIsV,vCss);}}}function DES_FlashErrCtl(pF){if(window.gDES_VG&&(DES_IsValid(pF)==true)){DES_PostValidateErrCtl(pF,false);window.setTimeout("DES_PostValidateErrCtl(DES_GetById('"+pF.id+"'), true);",500);}}function DES_SetErrCtlCss(pF,pIsV,pCss){pF=DES_GetById(pF);if(pF.OrigCss==null){if(pF.style.OrigCss!=null){pF.OrigCss=pF.style.OrigCss;if(pF.OrigCss==" ")pF.OrigCss="";pF.className=pF.OrigCss;}else pF.OrigCss=pF.className;}else if(pF.OrigCss!=null){pF.className=pF.OrigCss;if(pIsV&&window.DES_VWBInit)DES_VWBApplyCss(pF,true);}if(!pIsV){if(typeof(pCss)=="number")switch(pCss){case 0:pCss=gDES_VG.ErrCtlCss;break;case 1:pCss=gDES_VG.ErrLstCss;break;case 2:pCss=gDES_VG.ErrChkCss;break;case 10:pCss=gDES_VG.ErrCtlCss2;break;case 11:pCss=gDES_VG.ErrLstCss2;break;case 12:pCss=gDES_VG.ErrChkCss2;break;default:pCss="";break;}if(pCss!="")DES_ApplyCssPlus(pF,pCss);}}function DES_PostValidateAction(pFld,pFocus,pAlert){if(!window.gDES_VG)return;if(pAlert){var vMsg=gDES_VG.AltTmpt;var vNB=(vMsg=="")||(vMsg.indexOf("{0}")>-1);var vHB=false;if(vNB){var vBody="";for(var vI=0;vI<gDES_ValErrMsgs.length;vI++){var vCnt=vI+1;var vLine="";if(gDES_VG.AltLstStl)vLine=gDES_VG.AltLdTxt.replace("#",vCnt)+gDES_ValErrMsgs[vI].Msg+"\n";else vLine=gDES_ValErrMsgs[vI].Msg+" ";vBody=vBody+vLine;}vHB=vBody!="";if(vMsg=="")vMsg=vBody;else vMsg=vMsg.replace("{0}",vBody);}if((vMsg!="")&&(vHB||(!vNB&&(gDES_VG.AltTmpt!="")))){if(vMsg.indexOf("{COUNT")>-1){var vEC=gDES_ValErrMsgs.length;vMsg=DES_SPReplToken(vMsg,vEC,"COUNT");vMsg=DES_RERpl(vMsg,"{COUNT}",vEC);}if(gDES_VG.DAOS)gDES_VG.DAOS--;if(!gDES_VG.DAOS)alert(DES_StripTags(DES_NLTkn(vMsg,true,2)));}}if(pFocus&&(pFld!=null)){var vCode="javascript:DES_SetFocus('"+pFld.id+"');";setTimeout(vCode,10);}}function DES_SetHiliteFields(pAO,pEvalRes){if(pAO.HltFlds!=null)for(var vI=0;vI<pAO.HltFlds.length;vI++){var vHF=pAO.HltFlds[vI];vFld=DES_GetById(vHF.FID);if(!vFld)continue;if(pEvalRes!=0){if(vFld.HFPassCnt<gDES_ValPassCnt)vFld.className=vHF.OCss;}else{if(vFld.HFPassCnt<gDES_ValPassCnt){var vCN=(vHF.Txt==1)?gDES_VG.THltCss:gDES_VG.NTHltCss;if(vCN!="")DES_ApplyCssPlus(vFld,vCN);vFld.HFPassCnt=gDES_ValPassCnt;}}}}function DES_TextFmttr(pAO,pShow){if(pShow){if(pAO.TxtErrFld==null)pAO.TxtErrFld=DES_GetById(pAO.ErrFldID+"_Txt");DES_SetInnerHTML(pAO.TxtErrFld,DES_NLTkn(DES_GetErrMsg(pAO),pAO.Tkns,1));}}function DES_TTFmttr(pAO,pShow){if(pShow&&pAO.ImgErrFld)pAO.ImgErrFld.title=DES_NLTkn(DES_GetErrMsg(pAO),pAO.Tkns,3);}function DES_AlertFmttr(pAO,pShow){if(pShow&&pAO.ImgErrFld&&(pAO.ImgErrFld.onclick==null))pAO.ImgErrFld.onclick=new Function(DES_GetErrFmtAlert(pAO));}function DES_HyperLinkFmttr(pAO,pShow){if(pShow){if(pAO.LnkErrFld==null){pAO.LnkErrFld=DES_GetByIdEx(pAO.ErrFldID,"_Link");pAO.LnkErrFld.href="javascript: "+DES_GetErrFmtAlert(pAO)+"DES_Reanimate();";}}}function DES_GetErrFmtAlert(pAO){var vR="";if(pAO.VIdx!=null)vR="var vAO=gDES_Vals["+pAO.VIdx+"];";else vR="var vAO=gDES_Actions["+pAO.id+"];";vR+="alert(DES_NLTkn(DES_GetErrMsg(vAO), vAO.Tkns, 2));";if(gDES_VG.FAA){var vId=null;if((pAO.Ctl!=null)&&(pAO.Ctl.length>0))vId=pAO.Ctl[0].id;else if((pAO.Cond.IDToEval!=null)&&(pAO.Cond.IDToEval!=""))vId=pAO.Cond.IDToEval;if(vId)vR=vR+"DES_SetFocus('"+vId+"');";}return vR;}function DES_GetErrMsg(pAO){var vMsg=pAO.SelErrMsg(pAO);if(vMsg==null)return"";if(pAO.TokenRepl&&(vMsg.indexOf("{")!=-1))vMsg=pAO.TokenRepl(pAO,vMsg);return vMsg;}function DES_GetSumMsg(pAO){var vMsg=pAO.SelSumMsg(pAO);if(vMsg==null)return"";if(pAO.TokenRepl&&(vMsg.indexOf("{")!=-1))vMsg=pAO.TokenRepl(pAO,vMsg);if(vMsg=="")vMsg=DES_GetErrMsg(pAO);return vMsg;}function DES_SelErrMsg(pAO){return pAO.ErrMsg;}function DES_SelSumMsg(pAO){return pAO.SumMsg;}function DES_OneFldReplToken(pAO,pText){var vCO=pAO.Cond;if(vCO.IDToEval!="")return DES_RERpl(pText,"{TEXTVALUE}",DES_GetTextValue(vCO.IDToEval,vCO.Trim,vCO.GetText));else return pText;}function DES_TwoFldReplToken(pAO,pText){pText=DES_OneFldReplToken(pAO,pText);var vCO=pAO.Cond;if(vCO.IDToEval2!="")return DES_RERpl(pText,"{TEXTVALUE2}",DES_GetTextValue(vCO.IDToEval2,vCO.Trim,vCO.GetText2));else return pText;}function DES_SPReplToken(pText,pCnt,pTName){var vRE=new RegExp("\\{"+pTName+":([^:}]*):([^:}]*)\\}");var vMatch=vRE.exec(pText);if((vMatch!=null)&&(vMatch.length==3)){var vOrig=new RegExp("{"+pTName+":"+vMatch[1]+":"+vMatch[2]+"}","gi");if(pCnt==1)return pText.replace(vOrig,vMatch[1]);else return pText.replace(vOrig,vMatch[2]);}else return pText;}function DES_InitValA(){if(window.gDES_VG&&(gDES_VG.VCnt>0)){gDES_Vals=new Array(gDES_VG.VCnt);for(var vI=0;vI<gDES_VG.VCnt;vI++)gDES_Vals[vI]=null;}else gDES_Vals=null;}function DES_VALReset(pIsPostBack){if(this.gDES_Vals&&this.gDES_VG){var vT=(gDES_VG.AOS!=null)?gDES_VG.AOS:false;gDES_VG.AOS=false;if(pIsPostBack)DES_ValidateGroup("*",false);else{for(var vI=0;vI<gDES_Vals.length;vI++){var vAO=gDES_Vals[vI];if(!vAO)continue;DES_HideVal(vAO);}DES_PostValidate("*",true,false);}gDES_VG.AOS=vT;}}function DES_HideVal(pVO){pVO.IsValid=true;pVO.CondResult=1;if(pVO.Enabled&&pVO.ActnFnc)pVO.ActnFnc(pVO,1);}function DES_UpdVal(pVID,pCR,pEMsg,pSMsg){var vAO=DES_FindAOById(pVID);if(pCR!=null){vAO.CondResult=parseInt(pCR);vAO.LastResult=vAO.CondResult;}if(pEMsg!=null)vAO.ErrMsg=pEMsg;if(pSMsg!=null)vAO.SumMsg=pSMsg;DES_DoValidate(vAO,vAO.CondResult);if(vAO.Ctl!=null){var vFld=DES_GetById(vAO.Ctl[0].id);if(vFld.gocfld)vFld=vFld.gocfld[0];DES_PostValidateFld(vFld);}}function DES_IsValid(pFld){if(typeof(pFld)=="string")pFld=DES_GetById(pFld);var vA=pFld.ActionIDs;if(vA){for(var vI=0;vI<vA.length;vI++){var vAO=gDES_Actions[vA[vI]];if(!vAO)continue;if((vAO.VT=="VAL")&&!vAO.IsValid)return false;}return true;}return null;}function DES_PageIsValid(pGrp){if(!window.gDES_Vals)return true;for(var vI=0;vI<gDES_Vals.length;vI++){var vAO=gDES_Vals[vI];if(!vAO)continue;if(DES_MatchGroup(pGrp,vAO.Group)){if(!vAO.IsValid)return false;}}return true;}function DES_CountErrors(pGrp){var vC=0;for(var vI=0;vI<gDES_Vals.length;vI++){var vAO=gDES_Vals[vI];if(!vAO)continue;if(DES_MatchGroup(pGrp,vAO.Group)){if(vAO.IsValid==false)vC++;}}return vC;}function DES_UpdateRFM(){if(gDES_ValRFM&&gDES_Vals)for(var vI=0;vI<gDES_Vals.length;vI++){var vAO=gDES_Vals[vI];if(!vAO)continue;if(vAO.RFMFld){var vS=DES_DoEnabler(vAO);vAO.HasEval=0;vAO.RFMFld.style.visibility=vS?"inherit":"hidden";if(vAO.Dspl==2)vAO.RFMFld.style.display=vS?"inline":"none";}}}//DES_UpdateRFM
function DES_UpdateSummaries(pGrp,pAutoUpd){if(this.gDES_ValSummary!=null){for(var vI=0;vI<this.gDES_ValSummary.length;vI++){var vVSO=this.gDES_ValSummary[vI];if(!pAutoUpd||(vVSO.Showing&&vVSO.AutoUpd))DES_UpdateValSum(vVSO,pGrp);}}}function DES_AutoUpdateSummaries(pGrp){if(this.gDES_ValSummary!=null){for(var vI=0;vI<this.gDES_ValSummary.length;vI++){var vVSO=this.gDES_ValSummary[vI];if(vVSO.Showing&&vVSO.AutoUpd){DES_PostValidate(pGrp,false,true);return;}else if((vVSO.RCDM==11)||vVSO.AUFS){var vEC=DES_CountErrors(pGrp);if((vEC>0)&&vVSO.AUFS&&(vVSO.AUFS<=vEC)){vVSO.Showing=1;DES_PostValidate(pGrp,false,true);}else if((vVSO.RCDM==11)&&vVSO.RelCtl&&(vEC>0)){var vRC=DES_GetById(vVSO.RelCtl);if((vRC.style.visibility!="hidden")){vRC.style.visibility="hidden";if(!vVSO.RCIS)vRC.style.display="none";}}}}}}function DES_UpdateValSum(pVSO,pGrp){if(pVSO.fAllGrps==null){pVSO.fAllGrps=pVSO.Grp=="*";if(!pVSO.fAllGrps){pVSO.fGroups=pVSO.Grp.split('|');for(var vI=0;vI<pVSO.fGroups.length;vI++)pVSO.fGroups[vI]=DES_Trim(pVSO.fGroups[vI]);}}var vList="";if(pVSO.fAllGrps||DES_MatchGroup(pGrp,pVSO.Grp)){var vPosNum=0;for(var vI=0;vI<gDES_ValErrMsgs.length;vI++){var vMsgGrp=gDES_ValErrMsgs[vI].Grp;var vMatch=pVSO.fAllGrps;if(!vMatch)for(var vJ=0;!vMatch&&(vJ<pVSO.fGroups.length);vJ++)vMatch=DES_MatchGroup(pVSO.fGroups[vJ],vMsgGrp);if(vMatch){if(pVSO.FmtListFnc!=null){vMsg=gDES_ValErrMsgs[vI].Msg;if(pVSO.Links&&(gDES_ValErrMsgs[vI].FldId!=null))vMsg="<a href=\"javascript:DES_SetFocus('"+gDES_ValErrMsgs[vI].FldId+"');\">"+vMsg+"</a>";if(gDES_ValErrMsgs[vI].OStl&&pVSO.ErrMsgCss2)vMsg="<span class='"+pVSO.ErrMsgCss2+"'>"+vMsg+"</span>";vList=vList+pVSO.FmtListFnc(pVSO,vMsg,vPosNum);vPosNum++;}else vList="!";}}}else return;pVSO.Showing=(vList!="");var vFld=DES_GetById(pVSO.ValSumID);var vHEFld=DES_GetById(pVSO.ValSumID+"_HadErrs");if(pVSO.Showing){DES_SetInnerHTML(vFld,DES_NLTkn(pVSO.GetInner(pVSO,vList),true,1));vFld.style.visibility="inherit";if(!pVSO.InvSpc)vFld.style.display=pVSO.Inl?pVSO.Inl:"block";if(gDES_SubmitEvent&&(pVSO.Scroll!=null)&&vFld.scrollIntoView)vFld.scrollIntoView(pVSO.Scroll==1);if(vHEFld)vHEFld.value="1";}else{if(!pVSO.InvSpc)vFld.style.display="none";vFld.style.visibility="hidden";DES_SetInnerHTML(vFld,"");}if(pVSO.RelCtl!=null){var vSRC=pVSO.Showing;switch(pVSO.RCDM){case 10:vSRC=!vSRC;break;case 11:vSRC=!vSRC&&(vHEFld.value!="");break;}var vRC=DES_GetById(pVSO.RelCtl);vRC.style.visibility=vSRC?"inherit":"hidden";if(!pVSO.RCIS)vRC.style.display=vSRC?DES_DisplayStyle(vRC):"none";}}function DES_ValSumInnerHTML(pVSO,pList){var vIH="";if(pVSO.Hdr!="")vIH=pVSO.Hdr+pVSO.HdrSep;if(pVSO.PreListFnc!=null)vIH+=pVSO.PreListFnc(pVSO)+pList+pVSO.PostListFnc(pVSO);if(pVSO.Ftr!="")vIH+=pVSO.Ftr;if(pVSO.CntTkn==null)pVSO.CntTkn=vIH.indexOf("{COUNT")>0;if(pVSO.CntTkn){var vEC=DES_CountErrors(pVSO.Grp);vIH=DES_SPReplToken(vIH,vEC,"COUNT");vIH=DES_RERpl(vIH,"{COUNT}",vEC);}return vIH;}function DES_ValSumPreDefault(pVSO){return"<p"+DES_ValSumPreAttributes(pVSO)+">";}function DES_ValSumPreBullet(pVSO){return pVSO.BulletTL+"' "+DES_ValSumPreAttributes(pVSO)+">";}function DES_ValSumPreDiv(pVSO){return"<div style='width:100%'"+DES_ValSumPreAttributes(pVSO)+">";}function DES_ValSumPreAttributes(pVSO){var vAttr="";if(pVSO.ErrMsgCss!="")vAttr=vAttr+" class='"+pVSO.ErrMsgCss+"'";if(pVSO.LinkTT!="")vAttr=vAttr+" title='"+pVSO.LinkTT+"'";return vAttr;}function DES_ValSumPostDefault(pVSO){return"</p>";}function DES_ValSumPostBullet(pVSO){if(pVSO.BulletTL.charAt(1)=='o')return"</ol>";else return"</ul>";}function DES_ValSumPostDiv(pVSO){return"</div>";}function DES_ValSumFmtItemList(pVSO,pMsg,pRowNum){var vR=pVSO.ListLdTxt+pMsg+"<br />";if(pRowNum>0)vR=pVSO.ListRSep+vR;return vR;}function DES_ValSumFmtBullet(pVSO,pMsg,pRowNum){return"<li>"+pMsg+"</li>";}





var Page_ValidationVer = "125";
var Page_IsValid = true;
var Page_BlockSubmit = false;
var Page_InvalidControlToBeFocused = null;
var Page_TextTypes = /^(text|password|file|search|tel|url|email|number|range|color|datetime|date|month|week|time|datetime-local)$/i;
function ValidatorUpdateDisplay(val) {
    if (typeof(val.display) == "string") {
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            val.style.display = val.isvalid ? "none" : "inline";
            return;
        }
    }
    if ((navigator.userAgent.indexOf("Mac") > -1) &&
        (navigator.userAgent.indexOf("MSIE") > -1)) {
        val.style.display = "inline";
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}
function ValidatorUpdateIsValid() {
    Page_IsValid = AllValidatorsValid(Page_Validators);
}
function AllValidatorsValid(validators) {
    if ((typeof(validators) != "undefined") && (validators != null)) {
        var i;
        for (i = 0; i < validators.length; i++) {
            if (!validators[i].isvalid) {
                return false;
            }
        }
    }
    return true;
}
function ValidatorHookupControlID(controlID, val) {
    if (typeof(controlID) != "string") {
        return;
    }
    var ctrl = document.getElementById(controlID);
    if ((typeof(ctrl) != "undefined") && (ctrl != null)) {
        ValidatorHookupControl(ctrl, val);
    }
    else {
        val.isvalid = true;
        val.enabled = false;
    }
}
function ValidatorHookupControl(control, val) {
    if (typeof(control.tagName) != "string") {
        return;  
    }
    if (control.tagName != "INPUT" && control.tagName != "TEXTAREA" && control.tagName != "SELECT") {
        var i;
        for (i = 0; i < control.childNodes.length; i++) {
            ValidatorHookupControl(control.childNodes[i], val);
        }
        return;
    }
    else {
        if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
            var eventType;
            if (control.type == "radio") {
                eventType = "onclick";
            } else {
                eventType = "onchange";
                if (typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                    ValidatorHookupEvent(control, "onblur", "ValidatedControlOnBlur(event); ");
                }
            }
            ValidatorHookupEvent(control, eventType, "ValidatorOnChange(event); ");
            if (Page_TextTypes.test(control.type)) {
                ValidatorHookupEvent(control, "onkeypress", 
                    "event = event || window.event; if (!ValidatedTextBoxOnKeyPress(event)) { event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation(); return false; } ");
            }
        }
        control.Validators[control.Validators.length] = val;
    }
}
function ValidatorHookupEvent(control, eventType, functionPrefix) {
    var ev = control[eventType];
    if (typeof(ev) == "function") {
        ev = ev.toString();
        ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
    }
    else {
        ev = "";
    }
    control[eventType] = new Function("event", functionPrefix + " " + ev);
}
function ValidatorGetValue(id) {
    var control;
    control = document.getElementById(id);
    if (typeof(control.value) == "string") {
        return control.value;
    }
    return ValidatorGetValueRecursive(control);
}
function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.checked == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.childNodes.length; i++) {
        val = ValidatorGetValueRecursive(control.childNodes[i]);
        if (val != "") return val;
    }
    return "";
}
function Page_ClientValidate(validationGroup) {
    Page_InvalidControlToBeFocused = null;
    if (typeof(Page_Validators) == "undefined") {
        return true;
    }
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        ValidatorValidate(Page_Validators[i], validationGroup, null);
    }
    ValidatorUpdateIsValid();
    ValidationSummaryOnSubmit(validationGroup);
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}
function ValidatorCommonOnSubmit() {
    Page_InvalidControlToBeFocused = null;
    var result = !Page_BlockSubmit;
    if ((typeof(window.event) != "undefined") && (window.event != null)) {
        window.event.returnValue = result;
    }
    Page_BlockSubmit = false;
    return result;
}
function ValidatorEnable(val, enable) {
    val.enabled = (enable != false);
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}
function ValidatorOnChange(event) {
    event = event || window.event;
    Page_InvalidControlToBeFocused = null;
    var targetedControl;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        targetedControl = event.srcElement;
    }
    else {
        targetedControl = event.target;
    }
    var vals;
    if (typeof(targetedControl.Validators) != "undefined") {
        vals = targetedControl.Validators;
    }
    else {
        if (targetedControl.tagName.toLowerCase() == "label") {
            targetedControl = document.getElementById(targetedControl.htmlFor);
            vals = targetedControl.Validators;
        }
    }
    if (vals) {
        for (var i = 0; i < vals.length; i++) {
            ValidatorValidate(vals[i], null, event);
        }
    }
    ValidatorUpdateIsValid();
}
function ValidatedTextBoxOnKeyPress(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
        ValidatorOnChange(event);
        var vals;
        if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
            vals = event.srcElement.Validators;
        }
        else {
            vals = event.target.Validators;
        }
        return AllValidatorsValid(vals);
    }
    return true;
}
function ValidatedControlOnBlur(event) {
    event = event || window.event;
    var control;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        control = event.srcElement;
    }
    else {
        control = event.target;
    }
    if ((typeof(control) != "undefined") && (control != null) && (Page_InvalidControlToBeFocused == control)) {
        control.focus();
        Page_InvalidControlToBeFocused = null;
    }
}
function ValidatorValidate(val, validationGroup, event) {
    val.isvalid = true;
    if ((typeof(val.enabled) == "undefined" || val.enabled != false) && IsValidationGroupMatch(val, validationGroup)) {
        if (typeof(val.evaluationfunction) == "function") {
            val.isvalid = val.evaluationfunction(val);
            if (!val.isvalid && Page_InvalidControlToBeFocused == null &&
                typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                ValidatorSetFocus(val, event);
            }
        }
    }
    ValidatorUpdateDisplay(val);
}
function ValidatorSetFocus(val, event) {
    var ctrl;
    if (typeof(val.controlhookup) == "string") {
        var eventCtrl;
        if ((typeof(event) != "undefined") && (event != null)) {
            if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
                eventCtrl = event.srcElement;
            }
            else {
                eventCtrl = event.target;
            }
        }
        if ((typeof(eventCtrl) != "undefined") && (eventCtrl != null) &&
            (typeof(eventCtrl.id) == "string") &&
            (eventCtrl.id == val.controlhookup)) {
            ctrl = eventCtrl;
        }
    }
    if ((typeof(ctrl) == "undefined") || (ctrl == null)) {
        ctrl = document.getElementById(val.controltovalidate);
    }
    if ((typeof(ctrl) != "undefined") && (ctrl != null) &&
        (ctrl.tagName.toLowerCase() != "table" || (typeof(event) == "undefined") || (event == null)) && 
        ((ctrl.tagName.toLowerCase() != "input") || (ctrl.type.toLowerCase() != "hidden")) &&
        (typeof(ctrl.disabled) == "undefined" || ctrl.disabled == null || ctrl.disabled == false) &&
        (typeof(ctrl.visible) == "undefined" || ctrl.visible == null || ctrl.visible != false) &&
        (IsInVisibleContainer(ctrl))) {
        if ((ctrl.tagName.toLowerCase() == "table" && (typeof(__nonMSDOMBrowser) == "undefined" || __nonMSDOMBrowser)) ||
            (ctrl.tagName.toLowerCase() == "span")) {
            var inputElements = ctrl.getElementsByTagName("input");
            var lastInputElement  = inputElements[inputElements.length -1];
            if (lastInputElement != null) {
                ctrl = lastInputElement;
            }
        }
        if (typeof(ctrl.focus) != "undefined" && ctrl.focus != null) {
            ctrl.focus();
            Page_InvalidControlToBeFocused = ctrl;
        }
    }
}
function IsInVisibleContainer(ctrl) {
    if (typeof(ctrl.style) != "undefined" &&
        ( ( typeof(ctrl.style.display) != "undefined" &&
            ctrl.style.display == "none") ||
          ( typeof(ctrl.style.visibility) != "undefined" &&
            ctrl.style.visibility == "hidden") ) ) {
        return false;
    }
    else if (typeof(ctrl.parentNode) != "undefined" &&
             ctrl.parentNode != null &&
             ctrl.parentNode != ctrl) {
        return IsInVisibleContainer(ctrl.parentNode);
    }
    return true;
}
function IsValidationGroupMatch(control, validationGroup) {
    if ((typeof(validationGroup) == "undefined") || (validationGroup == null)) {
        return true;
    }
    var controlGroup = "";
    if (typeof(control.validationGroup) == "string") {
        controlGroup = control.validationGroup;
    }
    return (controlGroup == validationGroup);
}
function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val.evaluationfunction) == "string") {
            eval("val.evaluationfunction = " + val.evaluationfunction + ";");
        }
        if (typeof(val.isvalid) == "string") {
            if (val.isvalid == "False") {
                val.isvalid = false;
                Page_IsValid = false;
            }
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        }
        if (typeof(val.controltovalidate) == "string") {
            ValidatorHookupControlID(val.controltovalidate, val);
        }
        if (typeof(val.controlhookup) == "string") {
            ValidatorHookupControlID(val.controlhookup, val);
        }
    }
    Page_ValidationActive = true;
}
function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        var twoDigitCutoffYear = val.cutoffyear % 100;
        var cutoffYearCentury = val.cutoffyear - twoDigitCutoffYear;
        return ((year > twoDigitCutoffYear) ? (cutoffYearCentury - 100 + year) : (cutoffYearCentury + year));
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null)
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d*)\\" + val.decimalchar + "?(\\d*)\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && m[3].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + (m[2].length>0 ? m[2] : "0") + (m[3].length>0 ? "." + m[3] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Currency") {
        var hasDigits = (val.digits > 0);
        var beginGroupSize, subsequentGroupSize;
        var groupSizeNum = parseInt(val.groupsize, 10);
        if (!isNaN(groupSizeNum) && groupSizeNum > 0) {
            beginGroupSize = "{1," + groupSizeNum + "}";
            subsequentGroupSize = "{" + groupSizeNum + "}";
        }
        else {
            beginGroupSize = subsequentGroupSize = "+";
        }
        exp = new RegExp("^\\s*([-\\+])?((\\d" + beginGroupSize + "(\\" + val.groupchar + "\\d" + subsequentGroupSize + ")+)|\\d*)"
                        + (hasDigits ? "\\" + val.decimalchar + "?(\\d{0," + val.digits + "})" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && hasDigits && m[5].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + m[2].replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((hasDigits && m[5].length > 0) ? "." + m[5] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\.?\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (((typeof(m[2]) != "undefined") && (m[2].length == 4)) || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
        }
        else {
            if (val.dateorder == "ymd"){
                return null;
            }
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})(?:\\s|\\2)((\\d{4})|(\\d{2}))(?:\\s\u0433\\.|\\.)?\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = ((typeof(m[5]) != "undefined") && (m[5].length == 4)) ? m[5] : GetFullYear(parseInt(m[6], 10));
        }
        month -= 1;
        var date = new Date(year, month, day);
        if (year < 100) {
            date.setFullYear(year);
        }
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}
function ValidatorCompare(operand1, operand2, operator, val) {
    var dataType = val.type;
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);
    }
}
function CompareValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";
    if ((typeof(val.controltocompare) != "string") ||
        (typeof(document.getElementById(val.controltocompare)) == "undefined") ||
        (null == document.getElementById(val.controltocompare))) {
        if (typeof(val.valuetocompare) == "string") {
            compareTo = val.valuetocompare;
        }
    }
    else {
        compareTo = ValidatorGetValue(val.controltocompare);
    }
    var operator = "Equal";
    if (typeof(val.operator) == "string") {
        operator = val.operator;
    }
    return ValidatorCompare(value, compareTo, operator, val);
}
function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    if (typeof(val.controltovalidate) == "string") {
        value = ValidatorGetValue(val.controltovalidate);
        if ((ValidatorTrim(value).length == 0) &&
            ((typeof(val.validateemptytext) != "string") || (val.validateemptytext != "true"))) {
            return true;
        }
    }
    var args = { Value:value, IsValid:true };
    if (typeof(val.clientvalidationfunction) == "string") {
        eval(val.clientvalidationfunction + "(val, args) ;");
    }
    return args.IsValid;
}
function RegularExpressionValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var rx = new RegExp(val.validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}
function ValidatorTrim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function RequiredFieldValidatorEvaluateIsValid(val) {
    return (ValidatorTrim(ValidatorGetValue(val.controltovalidate)) != ValidatorTrim(val.initialvalue))
}
function RangeValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    return (ValidatorCompare(value, val.minimumvalue, "GreaterThanEqual", val) &&
            ValidatorCompare(value, val.maximumvalue, "LessThanEqual", val));
}
function ValidationSummaryOnSubmit(validationGroup) {
    if (typeof(Page_ValidationSummaries) == "undefined")
        return;
    var summary, sums, s;
    var headerSep, first, pre, post, end;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        if (!summary) continue;
        summary.style.display = "none";
        if (!Page_IsValid && IsValidationGroupMatch(summary, validationGroup)) {
            var i;
            if (summary.showsummary != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        end = "";
                        break;
                    case "BulletList":
                    default:
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        end = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        end = "<br>";
                        break;
                }
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + headerSep;
                }
                s += first;
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        s += pre + Page_Validators[i].errormessage + post;
                    }
                }
                s += end;
                summary.innerHTML = s;
                window.scrollTo(0,0);
            }
            if (summary.showmessagebox == "True") {
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + "\r\n";
                }
                var lastValIndex = Page_Validators.length - 1;
                for (i=0; i<=lastValIndex; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                s += Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "BulletList":
                            default:
                                s += "- " + Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "SingleParagraph":
                                s += Page_Validators[i].errormessage + " ";
                                break;
                        }
                    }
                }
                alert(s);
            }
        }
    }
}
if (window.jQuery) {
    (function ($) {
        var dataValidationAttribute = "data-val",
            dataValidationSummaryAttribute = "data-valsummary",
            normalizedAttributes = { validationgroup: "validationGroup", focusonerror: "focusOnError" };
        function getAttributesWithPrefix(element, prefix) {
            var i,
                attribute,
                list = {},
                attributes = element.attributes,
                length = attributes.length,
                prefixLength = prefix.length;
            prefix = prefix.toLowerCase();
            for (i = 0; i < length; i++) {
                attribute = attributes[i];
                if (attribute.specified && attribute.name.substr(0, prefixLength).toLowerCase() === prefix) {
                    list[attribute.name.substr(prefixLength)] = attribute.value;
                }
            }
            return list;
        }
        function normalizeKey(key) {
            key = key.toLowerCase();
            return normalizedAttributes[key] === undefined ? key : normalizedAttributes[key];
        }
        function addValidationExpando(element) {
            var attributes = getAttributesWithPrefix(element, dataValidationAttribute + "-");
            $.each(attributes, function (key, value) {
                element[normalizeKey(key)] = value;
            });
        }
        function dispose(element) {
            var index = $.inArray(element, Page_Validators);
            if (index >= 0) {
                Page_Validators.splice(index, 1);
            }
        }
        function addNormalizedAttribute(name, normalizedName) {
            normalizedAttributes[name.toLowerCase()] = normalizedName;
        }
        function parseSpecificAttribute(selector, attribute, validatorsArray) {
            return $(selector).find("[" + attribute + "='true']").each(function (index, element) {
                addValidationExpando(element);
                element.dispose = function () { dispose(element); element.dispose = null; };
                if ($.inArray(element, validatorsArray) === -1) {
                    validatorsArray.push(element);
                }
            }).length;
        }
        function parse(selector) {
            var length = parseSpecificAttribute(selector, dataValidationAttribute, Page_Validators);
            length += parseSpecificAttribute(selector, dataValidationSummaryAttribute, Page_ValidationSummaries);
            return length;
        }
        function loadValidators() {
            if (typeof (ValidatorOnLoad) === "function") {
                ValidatorOnLoad();
            }
            if (typeof (ValidatorOnSubmit) === "undefined") {
                window.ValidatorOnSubmit = function () {
                    return Page_ValidationActive ? ValidatorCommonOnSubmit() : true;
                };
            }
        }
        function registerUpdatePanel() {
            if (window.Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {
                var prm = Sys.WebForms.PageRequestManager.getInstance(),
                    postBackElement, endRequestHandler;
                if (prm.get_isInAsyncPostBack()) {
                    endRequestHandler = function (sender, args) {
                        if (parse(document)) {
                            loadValidators();
                        }
                        prm.remove_endRequest(endRequestHandler);
                        endRequestHandler = null;
                    };
                    prm.add_endRequest(endRequestHandler);
                }
                prm.add_beginRequest(function (sender, args) {
                    postBackElement = args.get_postBackElement();
                });
                prm.add_pageLoaded(function (sender, args) {
                    var i, panels, valFound = 0;
                    if (typeof (postBackElement) === "undefined") {
                        return;
                    }
                    panels = args.get_panelsUpdated();
                    for (i = 0; i < panels.length; i++) {
                        valFound += parse(panels[i]);
                    }
                    panels = args.get_panelsCreated();
                    for (i = 0; i < panels.length; i++) {
                        valFound += parse(panels[i]);
                    }
                    if (valFound) {
                        loadValidators();
                    }
                });
            }
        }
        $(function () {
            if (typeof (Page_Validators) === "undefined") {
                window.Page_Validators = [];
            }
            if (typeof (Page_ValidationSummaries) === "undefined") {
                window.Page_ValidationSummaries = [];
            }
            if (typeof (Page_ValidationActive) === "undefined") {
                window.Page_ValidationActive = false;
            }
            $.WebFormValidator = {
                addNormalizedAttribute: addNormalizedAttribute,
                parse: parse
            };
            if (parse(document)) {
                loadValidators();
            }
            registerUpdatePanel();
        });
    } (jQuery));
}


// Anthem.js
// Updated Mar 3, 2009
// Anthem.Manager.GetScripts: false

function Anthem_Encode(s){
	if (typeof encodeURIComponent == "function") {
		// Use JavaScript built-in function
		// IE 5.5+ and Netscape 6+ and Mozilla
		return encodeURIComponent(s);
	} else {
		// Need to mimic the JavaScript version
		// Netscape 4 and IE 4 and IE 5.0
		return encodeURIComponentNew(s);
	}
}

// Primarily used by Anthem.Manager to add an onsubmit event handler
// when validators are added to a page during a callback.
function Anthem_AddEvent(control, eventType, functionPrefix) {
    var ev;
    eval("ev = control." + eventType + ";");
    if (typeof(ev) == "function") {
        ev = ev.toString();
        ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
    }
    else {
        ev = "";
    }
    var func;
    if (navigator.appName.toLowerCase().indexOf('explorer') > -1) {
        func = new Function(functionPrefix + " " + ev);
    }
    else {
        func = new Function("event", functionPrefix + " " + ev);
    }
    eval("control." + eventType + " = func;");
}

function Anthem_GetXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		if (window.Anthem_XMLHttpRequestProgID) {
			return new ActiveXObject(window.Anthem_XMLHttpRequestProgID);
		} else {
			var progIDs = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var i = 0; i < progIDs.length; ++i) {
				var progID = progIDs[i];
				try {
					var x = new ActiveXObject(progID);
					window.Anthem_XMLHttpRequestProgID = progID;
					return x;
				} catch (e) {
				}
			}
		}
	}
	return null;
}

// This array is used to keep track of clientCallBack functions when using
// an IOFrame to handle callbacks.
var callbackFrames = new Array();

// This function is called by the onload event of the IOFrame after the
// callback response is received. The function parses the response, updates
// the page, and invokes the clientCallBack function.
function Anthem_HandleIOFrameResponse(frameid) {
    var iframe = document.getElementById(frameid);
    if (iframe != null) {
        var doc = Anthem_ExtractIFrameDocument(iframe);
        if (doc.getElementsByTagName("textarea").length > 0) {
            // Extract the response
            var response = { responseText: doc.getElementById("response").value.replace(/<\/anthemarea>/, "</textarea>") };
            if (typeof(Anthem_DebugResponseText) == "function") {
                Anthem_DebugResponseText(response.responseText); 
            }
            // Parse the response
            var result = Anthem_GetResult(response); 
            if (result.error) { 
                if (typeof(Anthem_DebugError) == "function") {
                    Anthem_DebugError(result.error); 
                }
                if (typeof(window.Anthem_Error) == "function") { 
                    Anthem_Error(result); 
                } 
            } 
            // Update the page 
            Anthem_UpdatePage(result); 
            // Run the client scripts
            Anthem_EvalClientSideScript(result); 
            // Run the custom post callback function
            for (var index in callbackFrames) {
                var frame = callbackFrames[index];
                if (frame != null && frame.id == frameid) {
                    callbackFrames.splice(index, 1);
                    frame.clientCallBack(result, frame.clientCallBackArg);
                    break;
                }
            }
            // Run the common post callback function
            if (typeof(window.Anthem_PostCallBack) == "function") { 
                Anthem_PostCallBack(); 
            } 
        }
        setTimeout("document.body.removeChild(document.getElementById(\"" + frameid + "\"))", 10);
    }
}

// Returns the iframe document
function Anthem_ExtractIFrameDocument(iFrameEl) {
  var doc = null;
  if (iFrameEl.contentDocument) { // For NS6
    doc = iFrameEl.contentDocument;
  } else if (iFrameEl.contentWindow) { // For IE5.5 and IE6
    doc = iFrameEl.contentWindow.document;
  } else if (iFrameEl.document) { // For IE5
    doc = iFrameEl.document;
  } else {
    //alert("Error: could not find iFrame document");
    return null;
  }
  return doc;
}

// Returns the form that is posted back using AJAX
function Anthem_GetForm() {
    var form = document.getElementById(Anthem_FormID);
    return form;
}

// Returns the URL for callbacks
function Anthem_GetCallBackUrl() {
    var form = Anthem_GetForm();
    var action = form.action + (form.action.indexOf('?') == -1 ? "?" : "&") + "Anthem_CallBack=true";
    return action;
}

function Anthem_CallBack(url, target, id, method, args, clientCallBack, clientCallBackArg, includeControlValuesWithCallBack, updatePageAfterCallBack) {
	if (typeof(window.Anthem_PreCallBack) == "function") {
		var preCallBackResult = Anthem_PreCallBack();
		if (!(typeof preCallBackResult == "undefined" || preCallBackResult)) {
			if (typeof(window.Anthem_CallBackCancelled) == "function") {
				Anthem_CallBackCancelled();
			}
			return null;
		}
	}
    var encodedData = "";
    if (target == "Page") {
        encodedData += "&Anthem_PageMethod=" + method;
    } else if (target == "MasterPage") {
        encodedData += "&Anthem_MasterPageMethod=" + method;
    } else if (target == "Control") {
        encodedData += "&Anthem_ControlID=" + id.split(":").join("_");
        encodedData += "&Anthem_ControlMethod=" + method;
    }
	if (args) {
		for (var argsIndex = 0; argsIndex < args.length; ++argsIndex) {
			if (args[argsIndex] instanceof Array) {
				for (var i = 0; i < args[argsIndex].length; ++i) {
					encodedData += "&Anthem_CallBackArgument" + argsIndex + "=" + Anthem_Encode(args[argsIndex][i]);
				}
			} else {
				encodedData += "&Anthem_CallBackArgument" + argsIndex + "=" + Anthem_Encode(args[argsIndex]);
			}
		}
	}
	
	if (updatePageAfterCallBack) {
		encodedData += "&Anthem_UpdatePage=true";
	}
	
	// Anthem will normally use an XmlHttpRequest to communicate with the server. 
	// But if an Anthem.FileUpload control is discovered on the page, then Anthem
	// will use a hidden IFRAME instead. This hidden IFRAME is often called an IOFrame
	// by AJAX library authors, so that is the name we use here.
	var useIOFrame = false;
	
	// Scan the controls on the form and extract their values.
	if (includeControlValuesWithCallBack) {
		var form = Anthem_GetForm();
		if (form != null) {
			for (var elementIndex = 0; elementIndex < form.length; ++elementIndex) {
				var element = form.elements[elementIndex];
				if (element.name) {
					var elementValue = null;
					if (element.nodeName.toUpperCase() == "INPUT") {
						var inputType = element.getAttribute("type").toUpperCase();
						if (inputType == "TEXT" || inputType == "PASSWORD" || inputType == "HIDDEN") {
							elementValue = element.value;
						} else if (inputType == "CHECKBOX" || inputType == "RADIO") {
							if (element.checked) {
								elementValue = element.value;
							}
						} else if (inputType == "FILE") {
						    // If the FILE element has a value (the path to the file), then an
						    // IOFrame will be used to handle the callback.
						    useIOFrame = useIOFrame | !(element.value == null || element.value.length == 0);
						}
					} else if (element.nodeName.toUpperCase() == "SELECT") {
						if (element.multiple) {
							elementValue = [];
							for (var i = 0; i < element.length; ++i) {
								if (element.options[i].selected) {
									elementValue.push(element.options[i].value);
								}
							}
						} else if (element.length == 0) {
						    elementValue = null;
						} else {
							elementValue = element.value;
						}
					} else if (element.nodeName.toUpperCase() == "TEXTAREA") {
						elementValue = element.value;
					}
					if (elementValue instanceof Array) {
						for (var i = 0; i < elementValue.length; ++i) {
							encodedData += "&" + element.name + "=" + Anthem_Encode(elementValue[i]);
						}
					} else if (elementValue != null) {
						encodedData += "&" + element.name + "=" + Anthem_Encode(elementValue);
					}
				}
			}
			// ASP.NET 1.1 won't fire any events if neither of the following
			// two parameters are not in the request so make sure they're
			// always in the request.
			if (typeof form.__VIEWSTATE == "undefined") {
				encodedData += "&__VIEWSTATE=";
			}
			if (typeof form.__EVENTTARGET == "undefined") {
				encodedData += "&__EVENTTARGET=";
			}
		}
	}
	
	if (encodedData.length > 0) {
	    encodedData = encodedData.substring(1);
	}
	if (typeof(Anthem_DebugRequestText) == "function") {
	    Anthem_DebugRequestText(encodedData.split("&").join("\n&"));
	}

    // Send the callback request to the server. Use an IOFrame if there is a file upload,
    // otherwise use an XmlHttpRequest.
    if (useIOFrame) {
        // To allow multiple requests at the same time, all of the Anthem parameters are 
        // passed to the server via the querystring
        var action = Anthem_GetCallBackUrl();
        action = action + "&Anthem_IOFrame=true";
        if (updatePageAfterCallBack) {
            action = action + "&Anthem_UpdatePage=true";
        }
        
        // We could generate an anonymous function on the fly to handle the clientCallBack
        // and assign that to the iframe onload event (in fact this is how XmlHttpRequests are
        // handled). But that makes it very hard to debug the callback response. Instead
        // we will stuff the clientCallBack function and args into an array and then hard code
        // the onload event handler. The handler will find the appropriate callback info in
        // the array and handle the clientCallBack.
        var id = "f" + new String(Math.floor(9999 * Math.random())); // Generate frame number
        if (typeof(clientCallBack) == "function") {
            var frame = { "id":id, "clientCallBack":clientCallBack, "clientCallBackArg":clientCallBackArg };
            callbackFrames.push(frame);
        }
        
        // Create a new, invisible iframe to handle the io.
        var ioframe = null;
        if (window.ActiveXObject) {
            ioframe = document.createElement("<iframe name=\"" + id + "\" id=\"" + id + "\" onload=\"Anthem_HandleIOFrameResponse('" + id + "');\"/>");
        } else {
            ioframe = document.createElement("iframe");
            ioframe.id = id;
            ioframe.name = id;
            ioframe.onload = function (){ Anthem_HandleIOFrameResponse(id); }
        }
        ioframe.style.visibility = "hidden";
        ioframe.style.height = "1px";
        document.body.appendChild(ioframe);

        // Submit this form in the hidden iframe
        var theForm = Anthem_GetForm(); 
        var tempActionUri = theForm.action; 
        theForm.action = action; 
        theForm.target = id;
        try { 
            theForm.submit(); 
        } catch (e) {
            result = { "value": null, "error": e.message };
		    if (typeof(Anthem_DebugError) == "function") {
		        Anthem_DebugError(e.name + ": " + e.message + " (" + e.number + ")");
		    }
		    if (typeof(window.Anthem_Error) == "function") {
			    Anthem_Error(result);
		    }            
        }

        // Restore the form 
        theForm.target = ""; 
        theForm.action = tempActionUri;
        
    } else {
    
	    var x = Anthem_GetXMLHttpRequest();
	    var result = null;
	    if (!x) {
		    result = { "value": null, "error": "NOXMLHTTP" };
		    if (typeof(Anthem_DebugError) == "function") {
		        Anthem_DebugError(result.error);
		    }
		    if (typeof(window.Anthem_Error) == "function") {
			    Anthem_Error(result);
		    }
		    if (typeof(clientCallBack) == "function") {
			    clientCallBack(result, clientCallBackArg);
		    }
		    return result;
	    }
	    var action1 = Anthem_GetCallBackUrl();
	    var action = action1.replace("www.bonaparte.catalogi.ru","de.bonaparteshop.com");
	    x.open("POST", url ? url : action);
	    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	    x.setRequestHeader('Access-Control-Allow-Origin', '*');
	    x.setRequestHeader('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
	    x.setRequestHeader('Access-Control-Max-Age: 1728000');
	    //x.setRequestHeader("Accept-Encoding", "gzip, deflate");
	    if (typeof(clientCallBack) == "function") {
		    x.onreadystatechange = function() {
			    if (x.readyState != 4) {
				    return;
			    }
			    if (typeof(Anthem_DebugResponseText) == "function") {
			        Anthem_DebugResponseText(x.responseText);
			    }
			    result = Anthem_GetResult(x);
			    if (result.error) {
			        if (typeof(Anthem_DebugError) == "function") {
				        Anthem_DebugError(result.error);
				    }
				    if (typeof(window.Anthem_Error) == "function") {
					    Anthem_Error(result);
				    }
			    }
			    if (updatePageAfterCallBack) {
				    Anthem_UpdatePage(result);
			    }
			    Anthem_EvalClientSideScript(result);
			    clientCallBack(result, clientCallBackArg);
			    x = null;
			    if (typeof(window.Anthem_PostCallBack) == "function") {
				    Anthem_PostCallBack();
			    }
		    }
	    }
	    x.send(encodedData);
	    if (typeof(clientCallBack) != "function") {
	        if (typeof(Anthem_DebugResponseText) == "function") {
		        Anthem_DebugResponseText(x.responseText);
		    }
		    result = Anthem_GetResult(x);
		    if (result.error) {
		        if (typeof(Anthem_DebugError) == "function") {
			        Anthem_DebugError(result.error);
			    }
			    if (typeof(window.Anthem_Error) == "function") {
				    Anthem_Error(result);
			    }
		    }
		    if (updatePageAfterCallBack) {
			    Anthem_UpdatePage(result);
		    }
		    Anthem_EvalClientSideScript(result);
		    if (typeof(window.Anthem_PostCallBack) == "function") {
			    Anthem_PostCallBack();
		    }
	    }
    }	
	return result;
}

function Anthem_GetResult(x) {
	var result = { "value": null, "error": null };
	var responseText = x.responseText;
	try {
		result = eval("(" + responseText + ")");
	} catch (e) {
		if (responseText.length == 0) {
			result.error = "NORESPONSE";
		} else {
			result.error = "BADRESPONSE";
			result.responseText = responseText;
		}
	}
	return result;
}

function Anthem_SetHiddenInputValue(form, name, value) {
    var input = null;
    if (form[name]) {
        input = form[name];
    } else {
        input = document.createElement("input");
        input.setAttribute("name", name);
        input.setAttribute("type", "hidden");
    }
    if (input != null) {
        input.setAttribute("value", value);
        var parentElement = input.parentElement ? input.parentElement : input.parentNode;
        if (parentElement == null) {
            form.appendChild(input);
            //IE7
            try { form[name] = input; } catch (e) { }
        }
    }
}

function Anthem_RemoveHiddenInput(form, name) {
    var input = form[name];
    if (input != null && typeof(input) != "undefined") {
      var parentElement = input.parentElement ? input.parentElement : input.parentNode;
      if (parentElement != null) {
          //IE7
          try { form[name] = null; } catch (e) { }
          parentElement.removeChild(input);
      }
    }
}

function Anthem_FireEvent(eventTarget, eventArgument, clientCallBack, clientCallBackArg, includeControlValuesWithCallBack, updatePageAfterCallBack) {
	var form = Anthem_GetForm();
	Anthem_SetHiddenInputValue(form, "__EVENTTARGET", eventTarget);
	Anthem_SetHiddenInputValue(form, "__EVENTARGUMENT", eventArgument);
	Anthem_CallBack(null, null, null, null, null, clientCallBack, clientCallBackArg, includeControlValuesWithCallBack, updatePageAfterCallBack);
	form.__EVENTTARGET.value = "";
	form.__EVENTARGUMENT.value = "";
}

function Anthem_UpdatePage(result) {
	var form = Anthem_GetForm();
	if (result.viewState) {
		Anthem_SetHiddenInputValue(form, "__VIEWSTATE", result.viewState);
	}
	if (result.viewStateEncrypted) {
		Anthem_SetHiddenInputValue(form, "__VIEWSTATEENCRYPTED", result.viewStateEncrypted);
	}
	if (result.eventValidation) {
		Anthem_SetHiddenInputValue(form, "__EVENTVALIDATION", result.eventValidation);
	}
	if (result.controls) {
		for (var controlID in result.controls) {
			var containerID = "Anthem_" + controlID.split("$").join("_") + "__";
			var control = document.getElementById(containerID);
			if (control) {
				control.innerHTML = result.controls[controlID];
				if (control.innerHTML == "") {
					control.style.display = "none";
				} else {
					control.style.display = "";
				}
			}
		}
	}
	if (result.pagescript) {
	    Anthem_LoadPageScript(result, 0);
	}
}

// Load each script in order and wait for each one to load before proceeding
function Anthem_LoadPageScript(result, index) {
    if (index < result.pagescript.length) {
		try {
		    var isExternalScript = false;
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    if (result.pagescript[index].indexOf('src=') == 0) {
		        isExternalScript = true;
		        script.src = result.pagescript[index].substring(4);
		    } else {
		        if (script.canHaveChildren ) {
		            script.appendChild(document.createTextNode(result.pagescript[index]));
		        } else {
		            script.text = result.pagescript[index];
		        }
		    }
		    var heads = document.getElementsByTagName('head');
		    if (heads != null && typeof(heads) != "undefined" && heads.length > 0) {
		        var head = heads[0];

		        // The order that scripts appear is important since later scripts can
		        // redefine a function. Therefore it is important to add every script
		        // to the page and in the same order that they were added on the server.
		        // On the other hand, if we just keep adding scripts the DOM will grow
		        // unnecessarily. This code scans the <head> element block and removes 
		        // previous instances of the identical script.
		        var found = false;
		        for (var child = 0; child < head.childNodes.length; child++) {
		            var control = head.childNodes[child];
		            if (typeof(control.tagName) == "string") {
		                if (control.tagName.toUpperCase() == "SCRIPT") {
		                    if (script.src.length > 0) {
		                        if (script.src == control.src) {
		                            found = true;
		                            break;
		                        }
		                    } else if (script.innerHTML.length > 0) {
		                        if (script.innerHTML == control.innerHTML) {
		                            found = true;
		                            break;
		                        }
		                    }
		                }
		            }
		        }
		        if (found) {
		            head.removeChild(control);
		        }
                
                var scriptAddedToHead = false;
                if (typeof script.readyState != "undefined" && !window.opera) {
                    script.onreadystatechange = function() {
                        if (script.readyState != "complete" && script.readyState != "loaded") {
                            return;
                        } else {
                            Anthem_LoadPageScript(result, index + 1);
                        }
                    }
                } else {
                    if (isExternalScript) // if it's an external script, only execute the next script when the previous one is loaded.
                    {
                        script.onload = function() {
                            Anthem_LoadPageScript(result, index + 1);
                        }
                    }
                    else // I didn't find a way for script blocks to fire some onload event. So in this case directly call the Anthem_LoadPageScript for the next script.
                    {
                        document.getElementsByTagName('head')[0].appendChild(script);
                        scriptAddedToHead = true;
                        Anthem_LoadPageScript(result, index + 1);
                    }
                }
                
                // Now we append the new script and move on to the next script.
		        // Note that this is a recursive function. It stops when the
		        // index grows larger than the number of scripts.
		        if (!scriptAddedToHead)
                    document.getElementsByTagName('head')[0].appendChild(script);
	        }
		} catch (e) {
		    Anthem_DebugError("Error adding page script to head. " + e.name + ": " + e.message);
		}
	}
} 

function Anthem_EvalClientSideScript(result) {
	if (result.script) {
		for (var i = 0; i < result.script.length; ++i) {
			try {
				eval(result.script[i]);
			} catch (e) {
				alert("Error evaluating client-side script!\n\nScript: " + result.script[i] + "\n\nException: " + e);
			}
		}
	}
}

//Fix for bug #1429412, "Reponse callback returns previous response after file push".
//see http://sourceforge.net/tracker/index.php?func=detail&aid=1429412&group_id=151897&atid=782464
function Anthem_Clear__EVENTTARGET() {
	var form = Anthem_GetForm();
	Anthem_SetHiddenInputValue(form, "__EVENTTARGET", "");
}

function Anthem_InvokePageMethod(methodName, args, clientCallBack, clientCallBackArg) {
	Anthem_Clear__EVENTTARGET(); // fix for bug #1429412
    return Anthem_CallBack(null, "Page", null, methodName, args, clientCallBack, clientCallBackArg, true, true);
}

function Anthem_InvokeMasterPageMethod(methodName, args, clientCallBack, clientCallBackArg) {
	Anthem_Clear__EVENTTARGET(); // fix for bug #1429412
    return Anthem_CallBack(null, "MasterPage", null, methodName, args, clientCallBack, clientCallBackArg, true, true);
}

function Anthem_InvokeControlMethod(id, methodName, args, clientCallBack, clientCallBackArg) {
	Anthem_Clear__EVENTTARGET(); // fix for bug #1429412
    return Anthem_CallBack(null, "Control", id, methodName, args, clientCallBack, clientCallBackArg, true, true);
}

function Anthem_PreProcessCallBack(
    control,
    e,
    eventTarget,
    causesValidation, 
    validationGroup, 
    imageUrlDuringCallBack, 
    textDuringCallBack, 
    enabledDuringCallBack,
    preCallBackFunction,
    callBackCancelledFunction,
    preProcessOut
) {
	var valid = true;
	if (causesValidation && typeof(Page_ClientValidate) == "function") {
		valid = Page_ClientValidate(validationGroup);
	}
	if (typeof(WebForm_OnSubmit) == "function") {
	    valid = WebForm_OnSubmit();
	}
	if (valid) {
        var preCallBackResult = true;
        if (typeof(preCallBackFunction) == "function") {
	        preCallBackResult = preCallBackFunction(control, e);
        }
        if (typeof(preCallBackResult) == "undefined" || preCallBackResult) {
		    var inputType = control.getAttribute("type");
		    inputType = (inputType == null) ? '' : inputType.toUpperCase();
		    if (inputType == "IMAGE" && e != null) {
                var form = Anthem_GetForm();
                if (e.offsetX) { // IE
                    Anthem_SetHiddenInputValue(form, eventTarget + ".x", e.offsetX);
                    Anthem_SetHiddenInputValue(form, eventTarget + ".y", e.offsetY);
                } else { // FireFox + ???
                    var offset = GetControlLocation(control);
                    Anthem_SetHiddenInputValue(form, eventTarget + ".x", e.clientX - offset.x + 1 + window.pageXOffset);
                    Anthem_SetHiddenInputValue(form, eventTarget + ".y", e.clientY - offset.y + 1 + window.pageYOffset);
                }
		    }
		    if (imageUrlDuringCallBack || textDuringCallBack) {
		        var nodeName = control.nodeName.toUpperCase();
		        if (nodeName == "INPUT") {
		            if (inputType == "CHECKBOX" || inputType == "RADIO" || inputType == "TEXT") {
		                preProcessOut.OriginalText = GetLabelText(control.id);
		                SetLabelText(control.id, textDuringCallBack);
		            } else if (inputType == "IMAGE") {
		                if (imageUrlDuringCallBack) {
		                    preProcessOut.OriginalText = control.src;
		                    control.src = imageUrlDuringCallBack;
		                } else {
		                    preProcessOut.ParentElement = control.parentElement ? control.parentElement : control.parentNode;
		                    if (preProcessOut.ParentElement) {
		                        preProcessOut.OriginalText = preProcessOut.ParentElement.innerHTML;
		                        preProcessOut.ParentElement.innerHTML = textDuringCallBack;
		                    }
		                }
		            } else if (inputType == "SUBMIT" || inputType == "BUTTON") {
		                preProcessOut.OriginalText = control.value;
		                control.value = textDuringCallBack;
		            }
		        } else if (nodeName == "SELECT" || nodeName == "SPAN") {
		            preProcessOut.OriginalText = GetLabelText(control.id);
		            SetLabelText(control.id, textDuringCallBack);
		        } else {
		            preProcessOut.OriginalText = control.innerHTML;
			        control.innerHTML = textDuringCallBack;
			    }
		    }
		    // Disable the control during callback if required
		    control.disabled = (typeof(enabledDuringCallBack) == "undefined") ? false : !enabledDuringCallBack;
		    return true;
		} else {
		    // Callback cancelled
            if (typeof(callBackCancelledFunction) == "function") {
	            callBackCancelledFunction(control, e);
	        }
	        return false;
		}
    } else {
        // Validation failed
        return false;
    }
}

function Anthem_PreProcessCallBackOut() {
    // Fields
    this.ParentElement = null;
    this.OriginalText = '';
}

function Anthem_PostProcessCallBack(
    result, 
    control,
    e,
    eventTarget, 
    clientCallBack, 
    clientCallBackArg, 
    imageUrlDuringCallBack, 
    textDuringCallBack, 
    postCallBackFunction, 
    preProcessOut
) {
    if (typeof(postCallBackFunction) == "function") {
        postCallBackFunction(control, e);
    }
    // Re-enable the control if it was disabled during callback
	control.disabled = false;
    var inputType = control.getAttribute("type");
    inputType = (inputType == null) ? '' : inputType.toUpperCase();
	if (inputType == "IMAGE") {
	    var form = Anthem_GetForm();
        Anthem_RemoveHiddenInput(form, eventTarget + ".x");
        Anthem_RemoveHiddenInput(form, eventTarget + ".y");
	}
	if (imageUrlDuringCallBack || textDuringCallBack) {
	    var nodeName = control.nodeName.toUpperCase();
	    if (nodeName == "INPUT") {
	        if (inputType == "CHECKBOX" || inputType == "RADIO" || inputType == "TEXT") {
	            SetLabelText(control.id, preProcessOut.OriginalText);
	        } else if (inputType == "IMAGE") {
	            if (imageUrlDuringCallBack) {
	                control.src = preProcessOut.OriginalText;
	            } else {
	                preProcessOut.ParentElement.innerHTML = preProcessOut.OriginalText;
	            }
	        } else if (inputType == "SUBMIT" || inputType == "BUTTON") {
	            control.value = preProcessOut.OriginalText;
	        }
	    } else if (nodeName == "SELECT" || nodeName == "SPAN") {
	        SetLabelText(control.id, preProcessOut.OriginalText);
	    } else {
	        control.innerHTML = preProcessOut.OriginalText;
	    }
	}
	if (typeof(clientCallBack) == "function") {
	    clientCallBack(result, clientCallBackArg);
	}
}

function Anthem_FireCallBackEvent(
	control,
	e,
	eventTarget,
	eventArgument,
	causesValidation,
	validationGroup,
	imageUrlDuringCallBack,
	textDuringCallBack,
	enabledDuringCallBack,
	preCallBackFunction,
	postCallBackFunction,
	callBackCancelledFunction,
	includeControlValuesWithCallBack,
	updatePageAfterCallBack
) {
    // Cancel the callback if the control is disabled. Although most controls will
    // not raise their callback event if they are disabled, the LinkButton will.
    // This check is for the LinkButton. See SourceForge Patch 1639700.
    if (control.disabled) return;
	var preProcessOut = new Anthem_PreProcessCallBackOut();
	var preProcessResult = Anthem_PreProcessCallBack(
	    control, 
	    e, 
	    eventTarget,
	    causesValidation, 
	    validationGroup, 
	    imageUrlDuringCallBack, 
	    textDuringCallBack, 
	    enabledDuringCallBack, 
	    preCallBackFunction, 
	    callBackCancelledFunction, 
	    preProcessOut
	);
    if (preProcessResult) {
        var eventType = e ? e.type : null;
	    Anthem_FireEvent(
		    eventTarget,
		    eventArgument,
		    function(result) {
                Anthem_PostProcessCallBack(
                    result, 
                    control, 
                    eventType,
                    eventTarget,
                    null, 
                    null, 
                    imageUrlDuringCallBack, 
                    textDuringCallBack, 
                    postCallBackFunction, 
                    preProcessOut
                );
		    },
		    null,
		    includeControlValuesWithCallBack,
		    updatePageAfterCallBack
	    );
    }
    return false;
}

function AnthemListControl_OnClick(
    e,
	causesValidation,
	validationGroup,
	textDuringCallBack,
	enabledDuringCallBack,
	preCallBackFunction,
	postCallBackFunction,
	callBackCancelledFunction,
	includeControlValuesWithCallBack,
	updatePageAfterCallBack
) {
	var target = e.target || e.srcElement;
	if (target.nodeName.toUpperCase() == "LABEL" && target.htmlFor != '')
	    return;
	var eventTarget = target.id.split("_").join("$");
	Anthem_FireCallBackEvent(
	    target, 
	    e,
	    eventTarget, 
	    '', 
	    causesValidation, 
	    validationGroup, 
	    '',
	    textDuringCallBack, 
	    enabledDuringCallBack, 
	    preCallBackFunction, 
	    postCallBackFunction, 
	    callBackCancelledFunction, 
	    true, 
	    true
	);
}

// Returns the top, left control location in FireFox
function GetControlLocation(control) {
    var offsetX = 0;
    var offsetY = 0;
    var parent;
    
    for (parent = control; parent; parent = parent.offsetParent) {
        if (parent.offsetLeft) {
            offsetX += parent.offsetLeft;
        }
        if (parent.offsetTop) {
            offsetY += parent.offsetTop;
        }
    }
    
    return { x: offsetX, y: offsetY };
}

function GetLabelText(id) {
    var labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == id) {
            return labels[i].innerHTML;
        }
    }
    return null;
}

function SetLabelText(id, text) {
    var labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == id) {
            labels[i].innerHTML = text;
            return;
        }
    }
}

// Used by encodeURIComponentNew to mimic function encodeURIComponent in 
// IE 5.5+, Netscape 6+, and Mozilla
function utf8(wide) {
  var c, s;
  var enc = "";
  var i = 0;
  while(i<wide.length) {
    c= wide.charCodeAt(i++);
    // handle UTF-16 surrogates
    if (c>=0xDC00 && c<0xE000) continue;
    if (c>=0xD800 && c<0xDC00) {
      if (i>=wide.length) continue;
      s= wide.charCodeAt(i++);
      if (s<0xDC00 || c>=0xDE00) continue;
      c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
    }
    // output value
    if (c<0x80) enc += String.fromCharCode(c);
    else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
    else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
    else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F));
  }
  return enc;
}

var hexchars = "0123456789ABCDEF";

function toHex(n) {
  return hexchars.charAt(n>>4)+hexchars.charAt(n & 0xF);
}

var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

// Mimics function encodeURIComponent in IE 5.5+, Netscape 6+, and Mozilla
function encodeURIComponentNew(s) {
  var s = utf8(s);
  var c;
  var enc = "";
  for (var i= 0; i<s.length; i++) {
    if (okURIchars.indexOf(s.charAt(i))==-1)
      enc += "%"+toHex(s.charCodeAt(i));
    else
      enc += s.charAt(i);
  }
  return enc;
}


function WebForm_PostBackOptions(eventTarget, eventArgument, validation, validationGroup, actionUrl, trackFocus, clientSubmit) {
    this.eventTarget = eventTarget;
    this.eventArgument = eventArgument;
    this.validation = validation;
    this.validationGroup = validationGroup;
    this.actionUrl = actionUrl;
    this.trackFocus = trackFocus;
    this.clientSubmit = clientSubmit;
}
function WebForm_DoPostBackWithOptions(options) {
    var validationResult = true;
    if (options.validation) {
        if (typeof(Page_ClientValidate) == 'function') {
            validationResult = Page_ClientValidate(options.validationGroup);
        }
    }
    if (validationResult) {
        if ((typeof(options.actionUrl) != "undefined") && (options.actionUrl != null) && (options.actionUrl.length > 0)) {
            theForm.action = options.actionUrl;
        }
        if (options.trackFocus) {
            var lastFocus = theForm.elements["__LASTFOCUS"];
            if ((typeof(lastFocus) != "undefined") && (lastFocus != null)) {
                if (typeof(document.activeElement) == "undefined") {
                    lastFocus.value = options.eventTarget;
                }
                else {
                    var active = document.activeElement;
                    if ((typeof(active) != "undefined") && (active != null)) {
                        if ((typeof(active.id) != "undefined") && (active.id != null) && (active.id.length > 0)) {
                            lastFocus.value = active.id;
                        }
                        else if (typeof(active.name) != "undefined") {
                            lastFocus.value = active.name;
                        }
                    }
                }
            }
        }
    }
    if (options.clientSubmit) {
        __doPostBack(options.eventTarget, options.eventArgument);
    }
}
var __pendingCallbacks = new Array();
var __synchronousCallBackIndex = -1;
function WebForm_DoCallback(eventTarget, eventArgument, eventCallback, context, errorCallback, useAsync) {
    var postData = __theFormPostData +
                "__CALLBACKID=" + WebForm_EncodeCallback(eventTarget) +
                "&__CALLBACKPARAM=" + WebForm_EncodeCallback(eventArgument);
    if (theForm["__EVENTVALIDATION"]) {
        postData += "&__EVENTVALIDATION=" + WebForm_EncodeCallback(theForm["__EVENTVALIDATION"].value);
    }
    var xmlRequest,e;
    try {
        xmlRequest = new XMLHttpRequest();
    }
    catch(e) {
        try {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e) {
        }
    }
    var setRequestHeaderMethodExists = true;
    try {
        setRequestHeaderMethodExists = (xmlRequest && xmlRequest.setRequestHeader);
    }
    catch(e) {}
    var callback = new Object();
    callback.eventCallback = eventCallback;
    callback.context = context;
    callback.errorCallback = errorCallback;
    callback.async = useAsync;
    var callbackIndex = WebForm_FillFirstAvailableSlot(__pendingCallbacks, callback);
    if (!useAsync) {
        if (__synchronousCallBackIndex != -1) {
            __pendingCallbacks[__synchronousCallBackIndex] = null;
        }
        __synchronousCallBackIndex = callbackIndex;
    }
    if (setRequestHeaderMethodExists) {
        xmlRequest.onreadystatechange = WebForm_CallbackComplete;
        callback.xmlRequest = xmlRequest;
        // e.g. http:
        var action = theForm.action || document.location.pathname, fragmentIndex = action.indexOf('#');
        if (fragmentIndex !== -1) {
            action = action.substr(0, fragmentIndex);
        }
        if (!__nonMSDOMBrowser) {
            var domain = "";
            var path = action;
            var query = "";
            var queryIndex = action.indexOf('?');
            if (queryIndex !== -1) {
                query = action.substr(queryIndex);
                path = action.substr(0, queryIndex);
            }
            if (path.indexOf("%") === -1) {
                // domain may or may not be present (e.g. action of "foo.aspx" vs "http:
                if (/^https?\:\/\/.*$/gi.test(path)) {
                    var domainPartIndex = path.indexOf("\/\/") + 2;
                    var slashAfterDomain = path.indexOf("/", domainPartIndex);
                    if (slashAfterDomain === -1) {
                        // entire url is the domain (e.g. "http:
                        domain = path;
                        path = "";
                    }
                    else {
                        domain = path.substr(0, slashAfterDomain);
                        path = path.substr(slashAfterDomain);
                    }
                }
                action = domain + encodeURI(path) + query;
            }
        }
        xmlRequest.open("POST", action, true);
        xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlRequest.send(postData);
        return;
    }
    callback.xmlRequest = new Object();
    var callbackFrameID = "__CALLBACKFRAME" + callbackIndex;
    var xmlRequestFrame = document.frames[callbackFrameID];
    if (!xmlRequestFrame) {
        xmlRequestFrame = document.createElement("IFRAME");
        xmlRequestFrame.width = "1";
        xmlRequestFrame.height = "1";
        xmlRequestFrame.frameBorder = "0";
        xmlRequestFrame.id = callbackFrameID;
        xmlRequestFrame.name = callbackFrameID;
        xmlRequestFrame.style.position = "absolute";
        xmlRequestFrame.style.top = "-100px"
        xmlRequestFrame.style.left = "-100px";
        try {
            if (callBackFrameUrl) {
                xmlRequestFrame.src = callBackFrameUrl;
            }
        }
        catch(e) {}
        document.body.appendChild(xmlRequestFrame);
    }
    var interval = window.setInterval(function() {
        xmlRequestFrame = document.frames[callbackFrameID];
        if (xmlRequestFrame && xmlRequestFrame.document) {
            window.clearInterval(interval);
            xmlRequestFrame.document.write("");
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.write('<html><body><form method="post"><input type="hidden" name="__CALLBACKLOADSCRIPT" value="t"></form></body></html>');
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.forms[0].action = theForm.action;
            var count = __theFormPostCollection.length;
            var element;
            for (var i = 0; i < count; i++) {
                element = __theFormPostCollection[i];
                if (element) {
                    var fieldElement = xmlRequestFrame.document.createElement("INPUT");
                    fieldElement.type = "hidden";
                    fieldElement.name = element.name;
                    fieldElement.value = element.value;
                    xmlRequestFrame.document.forms[0].appendChild(fieldElement);
                }
            }
            var callbackIdFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIdFieldElement.type = "hidden";
            callbackIdFieldElement.name = "__CALLBACKID";
            callbackIdFieldElement.value = eventTarget;
            xmlRequestFrame.document.forms[0].appendChild(callbackIdFieldElement);
            var callbackParamFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackParamFieldElement.type = "hidden";
            callbackParamFieldElement.name = "__CALLBACKPARAM";
            callbackParamFieldElement.value = eventArgument;
            xmlRequestFrame.document.forms[0].appendChild(callbackParamFieldElement);
            if (theForm["__EVENTVALIDATION"]) {
                var callbackValidationFieldElement = xmlRequestFrame.document.createElement("INPUT");
                callbackValidationFieldElement.type = "hidden";
                callbackValidationFieldElement.name = "__EVENTVALIDATION";
                callbackValidationFieldElement.value = theForm["__EVENTVALIDATION"].value;
                xmlRequestFrame.document.forms[0].appendChild(callbackValidationFieldElement);
            }
            var callbackIndexFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIndexFieldElement.type = "hidden";
            callbackIndexFieldElement.name = "__CALLBACKINDEX";
            callbackIndexFieldElement.value = callbackIndex;
            xmlRequestFrame.document.forms[0].appendChild(callbackIndexFieldElement);
            xmlRequestFrame.document.forms[0].submit();
        }
    }, 10);
}
function WebForm_CallbackComplete() {
    for (var i = 0; i < __pendingCallbacks.length; i++) {
        callbackObject = __pendingCallbacks[i];
        if (callbackObject && callbackObject.xmlRequest && (callbackObject.xmlRequest.readyState == 4)) {
            if (!__pendingCallbacks[i].async) {
                __synchronousCallBackIndex = -1;
            }
            __pendingCallbacks[i] = null;
            var callbackFrameID = "__CALLBACKFRAME" + i;
            var xmlRequestFrame = document.getElementById(callbackFrameID);
            if (xmlRequestFrame) {
                xmlRequestFrame.parentNode.removeChild(xmlRequestFrame);
            }
            WebForm_ExecuteCallback(callbackObject);
        }
    }
}
function WebForm_ExecuteCallback(callbackObject) {
    var response = callbackObject.xmlRequest.responseText;
    if (response.charAt(0) == "s") {
        if ((typeof(callbackObject.eventCallback) != "undefined") && (callbackObject.eventCallback != null)) {
            callbackObject.eventCallback(response.substring(1), callbackObject.context);
        }
    }
    else if (response.charAt(0) == "e") {
        if ((typeof(callbackObject.errorCallback) != "undefined") && (callbackObject.errorCallback != null)) {
            callbackObject.errorCallback(response.substring(1), callbackObject.context);
        }
    }
    else {
        var separatorIndex = response.indexOf("|");
        if (separatorIndex != -1) {
            var validationFieldLength = parseInt(response.substring(0, separatorIndex));
            if (!isNaN(validationFieldLength)) {
                var validationField = response.substring(separatorIndex + 1, separatorIndex + validationFieldLength + 1);
                if (validationField != "") {
                    var validationFieldElement = theForm["__EVENTVALIDATION"];
                    if (!validationFieldElement) {
                        validationFieldElement = document.createElement("INPUT");
                        validationFieldElement.type = "hidden";
                        validationFieldElement.name = "__EVENTVALIDATION";
                        theForm.appendChild(validationFieldElement);
                    }
                    validationFieldElement.value = validationField;
                }
                if ((typeof(callbackObject.eventCallback) != "undefined") && (callbackObject.eventCallback != null)) {
                    callbackObject.eventCallback(response.substring(separatorIndex + validationFieldLength + 1), callbackObject.context);
                }
            }
        }
    }
}
function WebForm_FillFirstAvailableSlot(array, element) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (!array[i]) break;
    }
    array[i] = element;
    return i;
}
var __nonMSDOMBrowser = (window.navigator.appName.toLowerCase().indexOf('explorer') == -1);
var __theFormPostData = "";
var __theFormPostCollection = new Array();
var __callbackTextTypes = /^(text|password|hidden|search|tel|url|email|number|range|color|datetime|date|month|week|time|datetime-local)$/i;
function WebForm_InitCallback() {
    var formElements = theForm.elements,
        count = formElements.length,
        element;
    for (var i = 0; i < count; i++) {
        element = formElements[i];
        var tagName = element.tagName.toLowerCase();
        if (tagName == "input") {
            var type = element.type;
            if ((__callbackTextTypes.test(type) || ((type == "checkbox" || type == "radio") && element.checked))
                && (element.id != "__EVENTVALIDATION")) {
                WebForm_InitCallbackAddField(element.name, element.value);
            }
        }
        else if (tagName == "select") {
            var selectCount = element.options.length;
            for (var j = 0; j < selectCount; j++) {
                var selectChild = element.options[j];
                if (selectChild.selected == true) {
                    WebForm_InitCallbackAddField(element.name, element.value);
                }
            }
        }
        else if (tagName == "textarea") {
            WebForm_InitCallbackAddField(element.name, element.value);
        }
    }
}
function WebForm_InitCallbackAddField(name, value) {
    var nameValue = new Object();
    nameValue.name = name;
    nameValue.value = value;
    __theFormPostCollection[__theFormPostCollection.length] = nameValue;
    __theFormPostData += WebForm_EncodeCallback(name) + "=" + WebForm_EncodeCallback(value) + "&";
}
function WebForm_EncodeCallback(parameter) {
    if (encodeURIComponent) {
        return encodeURIComponent(parameter);
    }
    else {
        return escape(parameter);
    }
}
var __disabledControlArray = new Array();
function WebForm_ReEnableControls() {
    if (typeof(__enabledControlArray) == 'undefined') {
        return false;
    }
    var disabledIndex = 0;
    for (var i = 0; i < __enabledControlArray.length; i++) {
        var c;
        if (__nonMSDOMBrowser) {
            c = document.getElementById(__enabledControlArray[i]);
        }
        else {
            c = document.all[__enabledControlArray[i]];
        }
        if ((typeof(c) != "undefined") && (c != null) && (c.disabled == true)) {
            c.disabled = false;
            __disabledControlArray[disabledIndex++] = c;
        }
    }
    setTimeout("WebForm_ReDisableControls()", 0);
    return true;
}
function WebForm_ReDisableControls() {
    for (var i = 0; i < __disabledControlArray.length; i++) {
        __disabledControlArray[i].disabled = true;
    }
}
function WebForm_SimulateClick(element, event) {
    var clickEvent;
    if (element) {
        if (element.click) {
            element.click();
        } else { 
            clickEvent = document.createEvent("MouseEvents");
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            if (!element.dispatchEvent(clickEvent)) {
                return true;
            }
        }
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        return false;
    }
    return true;
}
function WebForm_FireDefaultButton(event, target) {
    if (event.keyCode == 13) {
        var src = event.srcElement || event.target;
        if (src &&
            ((src.tagName.toLowerCase() == "input") &&
             (src.type.toLowerCase() == "submit" || src.type.toLowerCase() == "button")) ||
            ((src.tagName.toLowerCase() == "a") &&
             (src.href != null) && (src.href != "")) ||
            (src.tagName.toLowerCase() == "textarea")) {
            return true;
        }
        var defaultButton;
        if (__nonMSDOMBrowser) {
            defaultButton = document.getElementById(target);
        }
        else {
            defaultButton = document.all[target];
        }
        if (defaultButton) {
            return WebForm_SimulateClick(defaultButton, event);
        } 
    }
    return true;
}
function WebForm_GetScrollX() {
    if (__nonMSDOMBrowser) {
        return window.pageXOffset;
    }
    else {
        if (document.documentElement && document.documentElement.scrollLeft) {
            return document.documentElement.scrollLeft;
        }
        else if (document.body) {
            return document.body.scrollLeft;
        }
    }
    return 0;
}
function WebForm_GetScrollY() {
    if (__nonMSDOMBrowser) {
        return window.pageYOffset;
    }
    else {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        else if (document.body) {
            return document.body.scrollTop;
        }
    }
    return 0;
}
function WebForm_SaveScrollPositionSubmit() {
    if (__nonMSDOMBrowser) {
        theForm.elements['__SCROLLPOSITIONY'].value = window.pageYOffset;
        theForm.elements['__SCROLLPOSITIONX'].value = window.pageXOffset;
    }
    else {
        theForm.__SCROLLPOSITIONX.value = WebForm_GetScrollX();
        theForm.__SCROLLPOSITIONY.value = WebForm_GetScrollY();
    }
    if ((typeof(this.oldSubmit) != "undefined") && (this.oldSubmit != null)) {
        return this.oldSubmit();
    }
    return true;
}
function WebForm_SaveScrollPositionOnSubmit() {
    theForm.__SCROLLPOSITIONX.value = WebForm_GetScrollX();
    theForm.__SCROLLPOSITIONY.value = WebForm_GetScrollY();
    if ((typeof(this.oldOnSubmit) != "undefined") && (this.oldOnSubmit != null)) {
        return this.oldOnSubmit();
    }
    return true;
}
function WebForm_RestoreScrollPosition() {
    if (__nonMSDOMBrowser) {
        window.scrollTo(theForm.elements['__SCROLLPOSITIONX'].value, theForm.elements['__SCROLLPOSITIONY'].value);
    }
    else {
        window.scrollTo(theForm.__SCROLLPOSITIONX.value, theForm.__SCROLLPOSITIONY.value);
    }
    if ((typeof(theForm.oldOnLoad) != "undefined") && (theForm.oldOnLoad != null)) {
        return theForm.oldOnLoad();
    }
    return true;
}
function WebForm_TextBoxKeyHandler(event) {
    if (event.keyCode == 13) {
        var target;
        if (__nonMSDOMBrowser) {
            target = event.target;
        }
        else {
            target = event.srcElement;
        }
        if ((typeof(target) != "undefined") && (target != null)) {
            if (typeof(target.onchange) != "undefined") {
                target.onchange();
                event.cancelBubble = true;
                if (event.stopPropagation) event.stopPropagation();
                return false;
            }
        }
    }
    return true;
}
function WebForm_TrimString(value) {
    return value.replace(/^\s+|\s+$/g, '')
}
function WebForm_AppendToClassName(element, className) {
    var currentClassName = ' ' + WebForm_TrimString(element.className) + ' ';
    className = WebForm_TrimString(className);
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index === -1) {
        element.className = (element.className === '') ? className : element.className + ' ' + className;
    }
}
function WebForm_RemoveClassName(element, className) {
    var currentClassName = ' ' + WebForm_TrimString(element.className) + ' ';
    className = WebForm_TrimString(className);
    var index = currentClassName.indexOf(' ' + className + ' ');
    if (index >= 0) {
        element.className = WebForm_TrimString(currentClassName.substring(0, index) + ' ' +
            currentClassName.substring(index + className.length + 1, currentClassName.length));
    }
}
function WebForm_GetElementById(elementId) {
    if (document.getElementById) {
        return document.getElementById(elementId);
    }
    else if (document.all) {
        return document.all[elementId];
    }
    else return null;
}
function WebForm_GetElementByTagName(element, tagName) {
    var elements = WebForm_GetElementsByTagName(element, tagName);
    if (elements && elements.length > 0) {
        return elements[0];
    }
    else return null;
}
function WebForm_GetElementsByTagName(element, tagName) {
    if (element && tagName) {
        if (element.getElementsByTagName) {
            return element.getElementsByTagName(tagName);
        }
        if (element.all && element.all.tags) {
            return element.all.tags(tagName);
        }
    }
    return null;
}
function WebForm_GetElementDir(element) {
    if (element) {
        if (element.dir) {
            return element.dir;
        }
        return WebForm_GetElementDir(element.parentNode);
    }
    return "ltr";
}
function WebForm_GetElementPosition(element) {
    var result = new Object();
    result.x = 0;
    result.y = 0;
    result.width = 0;
    result.height = 0;
    if (element.offsetParent) {
        result.x = element.offsetLeft;
        result.y = element.offsetTop;
        var parent = element.offsetParent;
        while (parent) {
            result.x += parent.offsetLeft;
            result.y += parent.offsetTop;
            var parentTagName = parent.tagName.toLowerCase();
            if (parentTagName != "table" &&
                parentTagName != "body" && 
                parentTagName != "html" && 
                parentTagName != "div" && 
                parent.clientTop && 
                parent.clientLeft) {
                result.x += parent.clientLeft;
                result.y += parent.clientTop;
            }
            parent = parent.offsetParent;
        }
    }
    else if (element.left && element.top) {
        result.x = element.left;
        result.y = element.top;
    }
    else {
        if (element.x) {
            result.x = element.x;
        }
        if (element.y) {
            result.y = element.y;
        }
    }
    if (element.offsetWidth && element.offsetHeight) {
        result.width = element.offsetWidth;
        result.height = element.offsetHeight;
    }
    else if (element.style && element.style.pixelWidth && element.style.pixelHeight) {
        result.width = element.style.pixelWidth;
        result.height = element.style.pixelHeight;
    }
    return result;
}
function WebForm_GetParentByTagName(element, tagName) {
    var parent = element.parentNode;
    var upperTagName = tagName.toUpperCase();
    while (parent && (parent.tagName.toUpperCase() != upperTagName)) {
        parent = parent.parentNode ? parent.parentNode : parent.parentElement;
    }
    return parent;
}
function WebForm_SetElementHeight(element, height) {
    if (element && element.style) {
        element.style.height = height + "px";
    }
}
function WebForm_SetElementWidth(element, width) {
    if (element && element.style) {
        element.style.width = width + "px";
    }
}
function WebForm_SetElementX(element, x) {
    if (element && element.style) {
        element.style.left = x + "px";
    }
}
function WebForm_SetElementY(element, y) {
    if (element && element.style) {
        element.style.top = y + "px";
    }
}