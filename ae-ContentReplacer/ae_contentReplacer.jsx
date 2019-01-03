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
             var group1row0 = group1.add("group",undefined,"test");
            group1row0.orientation = "row"; group1row0.alignment=['fill','fill'];
            var insertAt = group1row0.add("checkbox",undefined,"Insert At Index (else top)"); insertAt.alignment=['left','fill'];
            var insertIndex = group1row0.add("slider", undefined, "Slider");
            insertIndex.value=1; insertIndex.minvalue=1; insertIndex.maxvalue=20;
            insertIndex.alignment=['fill','fill'];
            var txtIndex = group1row0.add("StaticText",undefined,'1');
            txtIndex.alignment=['fill','right']; 
            var group1row1 = group1.add("group",undefined,"test");
            group1row1.orientation = "row"; group1row1.alignment=['left','fill'];
            var cbScaleToFit = group1row1.add("checkbox",undefined,"Scale To Fit"); cbScaleToFit.alignment=['left','fill'];
            var rbScaleMethod1 = group1row1.add("radiobutton", undefined, "Scale By Width");
            var rbScaleMethod2 = group1row1.add("radiobutton", undefined, "Scale By Height");
            var group1row2 = group1.add("group",undefined,"test");
            group1row2.orientation = "row"; group1row2.alignment=['fill','fill'];
            var cbFillBg = group1row2.add("checkbox",undefined,"Fill BG Blurred"); cbFillBg.alignment=['left','fill'];
            var slBlur = group1row2.add("slider", undefined, "Slider");
            slBlur.value=50; slBlur.minvalue=5; slBlur.maxvalue=100;
            slBlur.alignment=['fill','fill'];
            var txtBlur = group1row2.add("StaticText",undefined,'50');
            txtBlur.alignment=['fill','right'];
            var cbDeleteOld = group1.add("checkbox",undefined,"Delete Item(s) (if Already Exists)"); cbDeleteOld.alignment=['left','fill'];
            var cbDisableText = group1.add("checkbox",undefined,"Disable Text Layers"); cbDisableText.alignment=['left','fill'];
            //var mycheckbox = group1.add("checkbox",undefined,"Scale To Fit"); mycheckbox.alignment=['left','fill'];

            var buttons = myPanel.add("panel", undefined, "Actions");  
            buttons.orientation = "row";  buttons.alignment=['fill','fill'];
            button1 = buttons.add ('button {text: "Analyize"}');button1.alignment=['fill','fill']  ;
            button2 = buttons.add ('button {text: "Process"}');button2.alignment=['fill','fill']  ;
            button3 = buttons.add ('button {text: "Debug Evaluate"}');button3.alignment=['fill','fill']  ;
            //Add resource string to panel
            //myPanel.grp = myPanel.add(res);
            
            // SETTING DEFAULT VALUES
            cbScaleToFit.value = true;
            rbScaleMethod2.value = true;
            cbFillBg.value=true;
            button2.disable = true;
            cbDeleteOld.value = true;
            // BINDING EVENTS
            slBlur.onChange = function () { txtBlur.text = Math.round(slBlur.value) ;}
            insertIndex.onChange = function () { txtIndex.text = Math.round(insertIndex.value) ;}
            button1.onClick = function () {
                getUserSelectionAnalysis();
            }
            button2.onClick = function () {
                doBulkReplacement();
            }
            button3.onClick = function (){
                unitTestReplaceItem();
            }
            
            //Setup panel sizing and make panel resizable
            myPanel.layout.layout(true);
            //myPanel.grp.minimumSize = myPanel.grp.size;
            myPanel.layout.resize();
            myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}
            return myPanel;
        }
        // OTHER FUNCTIONS // generic stuff // ui access will be hard, only way is pass parameters
        function testFunction () {
            alert ("hello");
        }
        function getProjectCompItems() {
            // took from web somewhere, just select all comps in project panel
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
            // checks weather user has selected equal footageItems or not and report
            if (app.project.selection.length > 1) {
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
                if (compItems.length == footageItems.length ) {
                    userPrompt = "All seems good\r\nCompItems:" + compItems.length +"\r\nFootageItems:" + footageItems.length;
                    alert (userPrompt);
                }
            } else {
                alert ("Minimum Select 2 Items , Come On..\r\n You can do it");
            }
        }
        function doBulkReplacement(){
            // checks weather user has selected equal footageItems or not and report
            if (app.project.selection.length > 1) {
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
                if (compItems.length == footageItems.length ) {
                    bulkReplace(compItems,footageItems);
                }
            } else {
                alert ("Minimum Select 2 Items , Come On..\r\n You can do it");
            }
        }
        function unitTestReplaceItem(){
            if (app.project.selection.length == 2) {
                var selection = app.project.selection;
                item1 =  selection[0]; 
                item2 = selection[1];
                p1 = win.children[0]; // this is a panel
                
                // if (item2 instanceof CompItem && item1 instanceof FootageItem) {
                //     if (imageExistInComp(item2,item1)) {
                //        existingItems = getAVLayersInCompMatchFooage(item2,item1);
                //        alert ("Items count :" + existingItems.length );
                //        removeAVLayersInCompMatchFootage(item2,item1,existingItems);
                //     } else {
                //        alert("item doesn't exist in comp");
                //     }
                // } else {
                //     alert ("items not selected in correct order Probably (Comp and Footage)");
                // }
                    
            } else {
                alert ("Please select two Items (Comp and Footage Item)")
            }
        }
        function bulkReplace (compItems,footageItems){
            // assuming both array objects are of same length
            for (var i = 0; i < compItems.length; i++) {
                ci = compItems[i];
                ii = footageItems[i];
                addImageLayer(ii,ci);
            }
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
        function imageExistInComp(compItem,footageItem){
            // return true or false
            //alert (footageItem.name);
            //alert(footageItem.mainSource); // returns filesource
            //alert(compItem.name); // comp name
            footageName = footageItem.name; // TODO: ideally it should be footage Item main source
            imageFound = false;
            for(var i = 1; i <= compItem.numLayers; i++){ 
                layer = compItem.layer(i); // object avLayer
                if (layer instanceof AVLayer && layer.source.name == footageName) {
                    imageFound = true;
                    break;
                }
            }
            return imageFound;
        }
        function getAVLayersInCompMatchFooage(compItem,footageItem){
            // will return array of AVLayer Objects which exist in that comp
            footageName = footageItem.name; // TODO: ideally it should be footage Item main source
            avLayers = []
            for(var i = 1; i <= compItem.numLayers; i++){ 
                layer = compItem.layer(i); // object avLayer
                if (layer instanceof AVLayer && layer.source.name == footageName) {
                    avLayers.push(layer);
                }
            }
            return avLayers;
        }
        function removeAVLayersInCompMatchFootage(compItem,footageItem,avLayersList){
            footageName = footageItem.name; // TODO: ideally it should be footage Item main source
            alert("In Loop Start");
            for(var i = avLayersList.length; i--;) {
                layToRm = avLayersList[i];
                layToRm.remove();
            }
            // for (var i=avLayersList.length; i>=0; i--){
            //     try {  
            //         var layToRm = compItem.layers.getByName(avLayersList[i].name);  
            //         alert(layToRm);
            //         //var layToRm = avLayersList[i];
            //         if(!layToRm.visisible) layToRm.visible = true;  
            //         if(layToRm.locked) layToRm.locked = false;  
            //         layToRm.remove();  
            //     } catch (e) {}
            // }
            
            
        }
        function disableTextLayersInComp(compItem){

        }

        var win = myScript_buildUI(thisObj);

        if ((win != null) && (win instanceof Window)) {
            win.center();
            win.show();
        } else {
            //win.layout.layout(true);
        }
    }
    myScript(this);

}