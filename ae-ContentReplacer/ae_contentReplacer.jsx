// THIS SCRIPTS NEEDS TO PLACED HERE FOR MENU ITEM AS PANEL
// C:\Program Files\Adobe\Adobe After Effects CC 2015\Support Files\Scripts\ScriptUI Panels

{
    
    var scriptName = "Content Replacer";
    var scriptVersion = "0.1";

    // initialize stuff

    function myScript(thisObj) {
        function myScript_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", scriptName+" v"+scriptVersion,undefined); //[0, 0, 300, 200]);

            // res="group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
            //           myStaticText: StaticText{text:'StaticText Text'},\
            //           myEditText: EditText{text:'EditText text'},\
            //           myButton: Button{text:'Button Name'},\
            //           myCheckbox: Checkbox{text:'Checkbox Name'},\
            //           myRadioButton: RadioButton{text:'RadioButton Name'},\
            //           myDropDownList: DropDownList{properties:{items:['Item 1 Name', 'Item 2 Name', 'Item 3 Name', 'Item 4 Name']}},\
            //           myListBox: ListBox{properties:{items:['Item 1 Name', 'Item 2 Name', 'Item 3 Name', 'Item 4 Name']}},\
            //           myGroup: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
            //                     myGroupItem1: Button{text:'Hi'},\
            //                     myGroupItem2: Button{text:'Hello'},\
            //                     myGroupItem3: Button{text:'Goodbye'},\
            //           },\
            //           myPanel: Panel{text:'Panel Name', orientation:'column', alignChildren:['right', 'fill'],\
            //                     myPanelItem1: Button{text:'One'},\
            //                     myPanelItem2: Button{text:'Two'},\
            //                     myPanelItem3: Button{text:'Three'},\
            //           },\
            //           myTabbedPanel: Panel{type:'tabbedpanel', text:'Tabbed Panel Name', orientation:'column', alignChildren:['right', 'fill'],\
            //               myTab1: Panel{type:'tab', text:'Tab 1', orientation:'column', alignChildren:['right', 'center'],\
            //                   aButton1: Button{text:'Button1'},\
            //               },\
            //               myTab2: Panel{type:'tab', text:'Tab 2', orientation:'column', alignChildren:['left', 'center'],\
            //                   aButton2: Button{text:'Button2'},\
            //               },\
            //                                                   },\
            //           myProgressBar: Progressbar{text:'Progressbar Name', minvalue:0, maxvalue:100, value:50},\
            // }"
            var group1 = myPanel.add("panel",undefined,"SETTINGS");
            group1.orientation = "column"; group1.alignment=['fill','top'];// group1alignChildren=['fill','fill'];
            //var myEditText = group1.add("edittext",undefined,"EditText");
            //myEditText.alignment=['fill','fill'];
            var group1row = group1.add("group",undefined,"test");
            group1row.orientation = "row"; group1row.alignment=['left','fill'];
            var cbScaleToFit = group1row.add("checkbox",undefined,"Scale To Fit"); cbScaleToFit.alignment=['left','fill'];
            var rbScaleMethod1 = group1row.add("radiobutton", undefined, "Scale By Width");
            var rbScaleMethod2 = group1row.add("radiobutton", undefined, "Scale By Height");
            var group1row2 = group1.add("group",undefined,"test");
            group1row2.orientation = "row"; group1row2.alignment=['fill','fill'];
            var cbFillBg = group1row2.add("checkbox",undefined,"Fill BG Blurred"); cbFillBg.alignment=['left','fill'];
            var slBlur = group1row2.add("slider", undefined, "Slider");
            slBlur.value=50;
            slBlur.alignment=['fill','fill'];
            var txtBlur = group1row2.add("StaticText",undefined,'50');
            txtBlur.alignment=['fill','right'];
            var cbDisableText = group1.add("checkbox",undefined,"Disable Text Layers"); cbDisableText.alignment=['left','fill'];
            //var mycheckbox = group1.add("checkbox",undefined,"Scale To Fit"); mycheckbox.alignment=['left','fill'];

            var buttons = myPanel.add("panel", undefined, "Actions");  
            buttons.orientation = "row";  buttons.alignment=['fill','fill'];
            button1 = buttons.add ('button {text: "Analyize"}');button1.alignment=['fill','fill']  ;
            button2 = buttons.add ('button {text: "Process"}');button2.alignment=['fill','fill']  ;
            //Add resource string to panel
            //myPanel.grp = myPanel.add(res);
            
            // SETTING DEFAULT VALUES
            
            // BINDING EVENTS
            button1.onClick = function () {
                //testFunction();
                getUserSelectionAnalysis();
            }
            button2.onClick = function () {
                getUserProjectSelectionForReplacement();
            }
            
            //Setup panel sizing and make panel resizable
            myPanel.layout.layout(true);
            //myPanel.grp.minimumSize = myPanel.grp.size;
            myPanel.layout.resize();
            myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}
            return myPanel;
        }
        // OTHER FUNCTIONS
        function testFunction(){
            alert ("hello");
        }
        function getProjectCompItems() {
            if (app.project.selection.length > 0) {
                var selection = app.project.selection;
                for (var i = 0; i < selection.length; i++) {
                    if (selection[i] instanceof CompItem) selection[i].selected = true
                    else selection[i].selected = false;
                }

            } 
            else if (app.project.items.length > 0){
                for (var i = 1; i <= app.project.items.length; i++) {
                    if (app.project.items[i] instanceof CompItem) app.project.items[i].selected = true
                    else app.project.items[i].selected = false;
                }
            }
        }
        function getUserSelectionAnalysis(){
            if (app.project.selection.length > 2) {
                var selection = app.project.selection;
                compItems = [];
                footageItems = [];
                for (var i = 0; i < selection.length; i++) {
                    if (selection[i] instanceof CompItem) {
                        compItems.push(selection[i]);
                    }
                    else if (selection[i] instanceof FootageItem) {
                        footageItems.push(selection[i]);
                    }
                }
                // now replace items
                for (var i = 0; i < compItems.length; i++) {
                    ci = compItems[i];
                    ii = footageItems[i];
                    replaceItem(ci,ii);
                }
 

            } else {
                alert ("Minimum Select 2 Items , Come On..\r\n You can do it");
            }
        }
        function getUserProjectSelectionForReplacement(){
            if (app.project.selection.length == 2) {
                var selection = app.project.selection;
                item1 =  selection[0]; 
                item2 = selection[1];
                // alert (item1.name);
                // alert(item2.name);
                if (item2 instanceof CompItem && item1 instanceof FootageItem) {
                    replaceItem(item2,item1);
                } else {
                    alert ("items not selected in correct order Probably (Comp and Footage)");
                }
                    
            } else {
                alert ("Please select two Items (Comp and Footage Item)")
            }
        }
        function replaceItem(myComp,myImage) {
            //var comp = currentProj.items.addComp("mycomp", 1920, 1080, 1.0, 5, 29.97);
            msg = "Comp:("+myComp.width + "," + myComp.height + ")\r\n";
            msg = msg + "Image:(" + myImage.width + "," + myImage.height+")";
            // TODO : double check selection order
            //alert(msg);
            addImageLayer(myImage,myComp);
            // compItem.selectedLayers
            // compItem.workAreaDuration
            
            // compItem.layer(index)
            // compItem.layer(otherLayer, relIndex)
            // compItem.layer(name)
            // compItem.openInViewer()

        }
        function addImageLayer(image,comp){
            footageName = image.name
            var layerItem = null;
            // check if not already added
            for (var i = 1; i <= comp.numLayers; i++){
                testLayer = comp.layer(i);
                if (testLayer.name == footageName && testLayer instanceof FootageItem){
                    layerItem = comp.layer(i)
                    break;
                }
            }
            // alert (layerItem);
            if (layerItem == null){
                layerItem = comp.layers.add(image);
                // alert ("Adding Layer" + layerItem.width);
            }
            // scaling layer by height of comp
            sf = (comp.height * 100) / layerItem.height;
            layerScale = [sf,sf];
            layerItem.scale.setValue(layerScale);
            // duplicate if width is lower
            scaledWidth = layerItem.width / sf;
            // alert (comp.width + " >> " + scaledWidth);
            if (comp.width > scaledWidth ) {
                //bgLayer = layerItem.duplicate()
                //bgLayer.name("BG_LAYER");
                bgItem = comp.layers.add(image);
                sf = (comp.width * 100) / bgItem.width;
                layerScale = [sf,sf];
                bgItem.scale.setValue(layerScale);
                bgItem.moveAfter(layerItem);

                // add blur effects
                var effectsGroup = bgItem("Effects");             // Get the PropertyGroup for the effects
                if (effectsGroup !== null)                       // Filter out layers that cannot use effects
                {
                    if (effectsGroup.canAddProperty("Gaussian Blur"))   // First check if the effect can be applied
                    {
                        var effectBase = effectsGroup.addProperty("Gaussian Blur");
                        if (effectBase !== null)
                        {
                            bluramount = image.width / 10;
                            effectBase.property("Blurriness").setValue(bluramount);

                        } else {
                            alert ("can't add successfully");
                        }
                    } else {
                        alert ("can't add this property");
                    }
                }
            }else {
                alert ("skipping blur stuff");
            }
            
        }

        var myScriptPal = myScript_buildUI(thisObj);

        if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
            myScriptPal.center();
            myScriptPal.show();
        } else {
            //myScriptPal.layout.layout(true);
        }
    }
    myScript(this);

}