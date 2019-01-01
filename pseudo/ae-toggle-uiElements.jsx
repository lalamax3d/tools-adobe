    #targetengine 'testShowHidePanel'  
      
    var NULL_SIZE = [0,0],  
        MAX_SIZE = [1000,1000];  
      
    var u,  
        w = new Window('palette'),  
        // ---  
        p1 = w.add('panel'),  
        c1 = p1.add('checkbox', u, "My checkbox1"),  
        e1 = p1.add('edittext', u, "Edit text1"),  
        // ---  
        p2 = w.add('panel'),  
        c2 = p2.add('checkbox', u, "My checkbox2"),  
        e2 = p2.add('edittext', u, "Edit text2"),  
        // ---  
        b = w.add('button', u, "Show filter");  
      
    p2.visible = false;  
    p2.maximumSize = NULL_SIZE;  
      
    b.onClick = function()  
    {  
        p2.maximumSize = p2.visible ? NULL_SIZE : MAX_SIZE;  
        b.text = (p2.visible ? "Show" : "Hide") + " filter";  
        p2.visible ^= 1;  
        w.layout.layout(1);  
    };  
      
    w.show();