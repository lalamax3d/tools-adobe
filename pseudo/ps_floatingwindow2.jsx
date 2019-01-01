#target estoolkit
var win, windowResource;
 
windowResource = "palette {  \
    orientation: 'column', \
    alignChildren: ['fill', 'top'],  \
    preferredSize:[300, 130], \
    text: 'ScriptUI Window - palette',  \
    margins:15, \
    \
    sliderPanel: Panel { \
        orientation: 'row', \
        alignChildren: 'right', \
        margins:15, \
        text: ' PANEL ', \
        st: StaticText { text: 'Value:' }, \
        sl: Slider { minvalue: 1, maxvalue: 100, value: 30, size:[220,20] }, \
        te: EditText { text: '30', characters: 5, justify: 'left'} \
        } \
    \
    bottomGroup: Group{ \
        cd: Checkbox { text:'Checkbox value', value: true }, \
        cancelButton: Button { text: 'Cancel', properties:{name:'cancel'}, size: [120,24], alignment:['right', 'center'] }, \
        applyButton: Button { text: 'Apply', properties:{name:'ok'}, size: [120,24], alignment:['right', 'center'] }, \
    }\
}"
 
win = new Window(windowResource);
 
win.bottomGroup.cancelButton.onClick = function() {
  return win.close();
};
win.bottomGroup.applyButton.onClick = function() {
  return win.close();
};
 
win.show();