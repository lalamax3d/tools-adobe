// THIS SCRIPTS NEEDS TO PLACED HERE FOR MENU ITEM AS PANEL
// C:\Program Files\Adobe\Adobe After Effects CC 2015\Support Files\Scripts\ScriptUI Panels
    (function(thisObj) {  
        var scriptPalette = scriptBuildUI(thisObj);  
        if (scriptPalette !== null && scriptPalette instanceof Window) {  
            scriptPalette.center();  
            scriptPalette.show();  
        } else {  
            scriptPalette.layout.layout(true);  
        }  
      
        function scriptBuildUI(thisObj) {  
            //UI Creation     
            //var myWindow = (thisObj instanceof Panel) ? thisObj : new Window("palette", prefs.script.name, undefined, {resizeable: true });  
            var myWindow = (thisObj instanceof Panel) ? thisObj : new Window("palette", "TEST WINDOW", undefined, {resizeable: true });  
      
            var myMessage = myWindow.add("statictext");  
            myMessage.text = "תסריט להפיכת טקסט. נעשה על ידי איתי אסולין";  
      
            var buttons = myWindow.add("panel", undefined, "buttons");  
            buttons.orientation = "row";  
      
            var HebrewThis = buttons.add("button", undefined, "HebrewThis!");  
            var Cancel = buttons.add("button", undefined, "Cancel");  
      
            //Hebrew this button     
            HebrewThis.onClick = function() {  
                    app.beginUndoGroup("AddEffect");  
                    var curItem = app.project.activeItem;  
                    var selectedLayers = curItem.selectedLayers;  
      
                    // check if comp is selected     
                    if (curItem == null || !(curItem instanceof CompItem)) {  
                        // if no comp selected, display an alert     
                        alert("בבקשה בחר שכבה");  
                    } else {  
                        // define the layer in the loop we're currently looking at     
                        var myLayer = app.project.activeItem.layer(1);  
                        var curVal = myLayer.property("Scale").value;  
                        myLayer.property("Scale").setValue([-100, 100]);  
      
                        var Text = selectedLayers[0].Text.Animators.addProperty("ADBE Text Animator");  
                        myText.property("ADBE Text Selectors").addProperty("ADBE Text Selector");  
                        myText.property("ADBE Text Animator Properties").addProperty("ADBE Text Scale 3D").setValue([-100, 100]);  
                    }  
      
                    // close the undo group     
                    app.endUndoGroup();  
                } //Hebrew this button ended.     
      
            //cancel button     
            Cancel.onClick = function() {  
                app.beginUndoGroup("AddEffect");  
                var curItem = app.project.activeItem;  
                var selectedLayers = curItem.selectedLayers;  
      
                // check if comp is selected     
                if (curItem == null || !(curItem instanceof CompItem)) {  
                    // if no comp selected, display an alert     
                    alert("בבקשה בחר שכבה");  
                } else {  
                    // define the layer in the loop we're currently looking at     
                    var myLayer = app.project.activeItem.layer(1);  
                    var curVal = myLayer.property("Scale").value;  
                    myLayer.property("Scale").setValue([100, 100]);  
      
                    var myAnim = selectedLayers[0].Text.Animators.property("ADBE Text Animator");  
                    myAnim.property("ADBE Text Selectors").property("ADBE Text Selector");  
                    myAnim.property("ADBE Text Animator Properties").property("ADBE Text Scale 3D").setValue([100, 100]);  
                }  
      
                // close the undo group     
                app.endUndoGroup();  
            }  
            return myWindow;  
      
        } //UI Creation End.//     
    })(this);  