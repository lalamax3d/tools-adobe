{
	function myScript(thisObj){
		function myScript_buildUI(thisObj){
			var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "AK_toolkit_V01", undefined, {resizeable:true});

			res = "group{orientation:'row',\
				myTabbedPanel: Panel{type:'tabbedpanel', text:'',\
					myTab1: Panel{type:'tab', text:'tab1',\
						myTabContent1: Button{text:'my tabbed button1'},\
						myTabContent2: Button{text:'my tabbed button2'},\
						myTabContent3: Button{text:'my tabbed button3'},\
						myTabContent4: Button{text:'my tabbed button4'},\
						myTabContent5: Button{text:'my tabbed button5'},\
					},\
					myTab2: Panel{type:'tab', text:'tab2',\
					},\
					myTab3: Panel{type:'tab', text:'tab3',\
					},\
				},\
			}";

			myPanel.grp = myPanel.add(res);

			//Defaults
			myPanel.grp.myTabbedPanel.myTab1.myTabContent1.onClick = function() {
				alert("button 1 clicked");
			}
		
			myPanel.grp.myTabbedPanel.myTab1.myTabContent2.onClick =  onTabClicked;
			
			myPanel.layout.layout(true);

			return myPanel;
		}
	
		function onTabClicked() {
			alert(this.text + " button clicked");
		}
	
		var myScriptPal = myScript_buildUI(thisObj);

		if (myScriptPal != null && myScriptPal instanceof Window){
			myScriptPal.center();
			myScriptPal.show();
		}

	}
	myScript(this);
}