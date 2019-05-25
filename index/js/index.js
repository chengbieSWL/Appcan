(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});

    appcan.ready(function() {
        
    })

	appcan.ready(function() {
        })
        var lv = appcan.listview({
            selector : "#listview1",
            type : "singleLine",
            hasIcon : false,
            hasAngle : true,
            hasSubTitle : false
        });
        lv.set([{
            title : "下拉刷新及上拉加载(WEUI)"
        }, {
            title : "图片放大(Mui)"
        }, {
            title : "版本更新(WEUI)"
        }]);
        lv.on('click', function(ele, context, obj, subobj) {
            console.log(context.title);
            //*********************************************************这是跳页处
            switch(context.title){
                case "下拉刷新及上拉加载(WEUI)":
                        appcan.window.open({
                            name:'refresh',
                            dataType:0,
                            aniId:2,
                            data:'classUI/refresh.html'
                        }); 
                    break;
                case "图片放大(Mui)":
                     appcan.window.open({
                            name:'imgsEnlarge',
                            dataType:0,
                            aniId:2,
                            data:'classUI/imgsEnlarge.html'
                        }); 
                    break;
                 case "版本更新(WEUI)":
                     appcan.window.open({
                            name:'supDate',
                            dataType:0,
                            aniId:2,
                            data:'classUI/supDate.html'
                        }); 
                    break;
            }
            
        })
        var lv1 = appcan.listview({
            selector : "#listview2",
            type : "singleLine",
            hasIcon : false,
            hasAngle : true,
            hasSubTitle : false
        });
        lv1.set([{
            title : "uexLocation(定位功能)"
        }, {
            title : "uexCamera(拍照录屏功能)"
        }, {
            title : "待更新..."
        }]);
        lv1.on('click', function(ele, context, obj, subobj) {
            
             console.log(context.title);
            //*********************************************************这是跳页处
            switch(context.title){
                case "uexLocation(定位功能)":
                        appcan.window.open({
                            name:'uexLocation',
                            dataType:0,
                            aniId:2,
                            data:'classSDK/uexLocation.html'
                        }); 
                    break;
                case "uexCamera(拍照录屏功能)":
                     appcan.window.open({
                            name:'uexCamera',
                            dataType:0,
                            aniId:2,
                            data:'classSDK/uexCamera.html'
                        }); 
                    break;
            }
        })
        var lv2 = appcan.listview({
            selector : "#listview3",
            type : "singleLine",
            hasIcon : false,
            hasAngle : true,
            hasSubTitle : false
        });
        lv2.set([{
            title : "tab滑动"
        },{
            title : "待更新..."
        }]);
        lv2.on('click', function(ele, context, obj, subobj) {
             console.log(context.title);
            //*********************************************************这是跳页处
            switch(context.title){
                case "tab滑动":
                        appcan.window.open({
                            name:'dh',
                            dataType:0,
                            aniId:2,
                            data:'classAPPcan/dh.html'
                        }); 
                    break;
                    break;
            }
        })
})($);