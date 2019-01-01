/**
 *  tabbed panel sample
 */

var u;
var w = new Window('dialog', "title", u);
w.orientation = 'column';
// w.margins = 5;
// w.spacing = 10;
w.alignChildren = ['fill', 'fill'];

// body
var tab_pnl = w.add('tabbedpanel')
var boo_tab = tab_pnl.add('tab', u, "boo");
boo_tab.add('edittext', u, "enter here please");
var moo_tab = tab_pnl.add('tab', u, "moo")
moo_tab.add('edittext', u, "please enter me")

tab_pnl.selection = moo_tab;

w.btn_g = w.add('group');
var ok_btn  = w.btn_g.add('button', u, "OK", {name: "ok"});
var can_btn = w.btn_g.add('button', u, "Cancel", {name: "cancel"});

ok_btn.minimumSize = can_btn.minimumSize = [66,23];
ok_btn.size  = ok_btn.minimumSize;
can_btn.size = can_btn.minimumSize;


ok_btn.onClick = function () {
  // do somthing
  $.writeln(tab_pnl.selection.toSource());
  // tab { text:moo,bounds:0,0,136,40,location:0,0,preferredSize:136,40,size:136,40,layout:[object AutoLayoutManager],type:tab }
  
  w.close();
}

can_btn.onClick = function () {
  w.close();
}

w.show();