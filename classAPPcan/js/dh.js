var tabview_Tab;
(function($) {
    tabview_Tab = appcan.tab({
        selector: $("#Tab"),
        hasIcon: true,
        hasAnim: false,
        hasLabel: true,
        hasBadge: false,
        index: 0,
        data: [{
            "label": "首页",
            "icon": "fa-home"
        },
        {
            "label": "购物车",
            "icon": "fa-shopping-cart"
        },
        {
            "label": "我的",
            "icon": "fa-user"
        }]
    });
    tabview_Tab.on("click",function(obj, index){
        appcan.frame.selectMulti('content',index)
       //-------------------------------------------------这是点击事件
    })
    //console.log(parseInt($('#footer').css('height').split('px')[0])+'px' );
    $('#content').css('height',window.outerHeight - parseInt($('#Footer').css('height').split('px')[0])+'px')
    
    appcan.ready(function(){
        appcan.frame.open({
            id : "content",
             url : [{
                 "inPageName" : "SP_index",
                 "inUrl" : "1.html",
             }, {
                "inPageName" : "gwcnew",
                "inUrl" : "2.html",
            }, {
                "inPageName" : "yhzx",
                "inUrl" : "3.html",
            }],
            top : 0,
            left : 0,
            index : 0,
            change:function(index,res){ /*浮动窗口推拽变更时回调，可控制tab进行同步变更*/
                tabview_Tab.moveTo(res.multiPopSelectedIndex);
                
            }
        })
        window.onorientationchange = window.onresize = function() {
            //var h = $('#content').offset().height;
            //appcan.window.setMultiPopoverFrame("content",0,0,0,h)
        }
    })
})($);