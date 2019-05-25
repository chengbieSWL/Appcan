 var luj="";
(function($) {
      
//**********点击按钮时发生事件**********
    appcan.button("#addanswerImg1", "btn-act",function() {actionsheet("#addanswerImg1","1");});
    //可多按钮上传
    //appcan.button("#addanswerImg2", "btn-act",function() {actionsheet("#addanswerImg2","2");});
    
    
//**********变量**********
    var imgurl="";
    //此乃请求路径、
   
    var uploadHttp = basrUrl+'lujing';
    
    
//**********选择打开方式**********
    function actionsheet(id,cppIndex){
        uexWindow.cbActionSheet = function(opId,dataType,data){  
          switch(parseInt(data)){  
            case 0:  
                camera(id,cppIndex);  
                break;  
            case 1:  
                imageBrowse(id,cppIndex); //打开照片选择器
                break;
          }
        }
         uexWindow.actionSheet("选择图片", "取消", ["照相机拍摄","选择相册"]);//从界面底部弹出按钮列表
      }
      
      
//**********照片选择器**********      
      function imageBrowse(id,cppIndex){
           //onPickerClosed 照片选择器被关闭的监听方法(3.0)
           uexImage.onPickerClosed=function(info){
               info=JSON.parse(info);
                if(info.isCancelled==false){//选择器是否是由于点击取消而关闭 
                   // cropImage(info.data[0],id,cppIndex);//打开图片裁剪
                    info.data.forEach(function(key){
                        uploadpic(key,id,cppIndex);//**********单一上传图片**********
                    });
                   //uploadpic(info.data,id,cppIndex);//**********全部上传图片**********
                }
            }
            //打开照片选择器
            var data = {
                min:1,//最小选择数量 ,传0表示无限制,默认 1
                max:3,//最大选择数量 ,传0表示无限制,默认 1
                quality:0.6,//JPG压缩质量 取值范围 0-1,越大表示质量越好,默认0.5
            }
            var json = JSON.stringify(data);
            uexImage.openPicker(json); 
        }
        
        
//**********拍照**********  
        function camera(id,cppIndex) {
            uexCamera.cbOpen = function(opId, dataType, data) {//拍照的回调方法
                if (dataType == 0) {//uex.cText=0;uex.cJSON=1;uex.cInt=2;
                        //cropImage(data,id,cppIndex);//打开图片裁剪
                        uploadpic(data,id,cppIndex);
                }else{
                    alert('异常');
                }
            };
            uexCamera.open();//调用系统相机
        }
        /**
         * 裁剪图片
         * @param {Object} file
         */
        function cropImage(file,id,cppIndex)
        { 
            //onCropperClosed 图片裁剪器被关闭的监听方法（3.0）
            uexImage.onCropperClosed=function(info){
                info = JSON.parse(info);
                if(info.isCancelled==false)//isCancelled Boolean 选择器是否是由于点击取消而关闭
                { 
                    //alert(file);
                   imgurl=info.data;
                    //$("#addanswerImg1_").attr("src",file);
                    uploadpic(info.data,id,cppIndex);//**********上传图片**********
                }                            
            }
            //openCropper 打开图片裁剪器
            var data={
                src:file,
                mode:1,//1- 正方型裁剪；2- 圆形裁剪(仅iOS支持圆形裁剪)；4-矩形裁剪，宽高比(4:3)；5-矩形裁剪，宽高比(16:9)；6-矩形裁剪，宽高自由缩放(mode为6仅支持安卓)
                quality:0.8//JPG压缩质量 取值范围 0-1 越大表示质量越好
            }
            var json=JSON.stringify(data);
            uexImage.openCropper(json);
        }
       
        
     //上传图片
    function uploadpic(fileSrc,id,cppIndex){
      var uploader=uexUploaderMgr.create({//创建上传对象
            url: uploadHttp,
            type: 1
        });
        if (uploader!=null){//上传文件
            uexUploaderMgr.uploadFile(uploader,fileSrc,"imageField",1,640,function(packageSize, percent, serverPath, status){
                switch (status) {
                    case 0:
                        uexWindow.toast('1', '5', '上传进度：' + percent + '%','0');//上传进度条
                        break;
        
                    case 1:
                       uexWindow.closeToast();
                  
                       var ser=eval("("+serverPath+")");
                      
                       var serverPath1 = JSON.parse(serverPath);//格式转换
                      
                        if (luj == "") {//多张上传
                            luj +=serverPath1.imgFileUrls;//参数根据后台返回为准
                        }else{
                            luj +=','+serverPath1.imgFileUrls;
                        }
                        
                    $("#fileName").append('<img src='+serverPath1.imgFileUrls+' style="height:100px;width:100%">');
                   // alert(basrUrl + ser[0].fileurl)
                    
                      uexUploaderMgr.closeUploader(uopCode);
                    break;
                case 2:
                    alert("上传失败");
                    uexUploaderMgr.closeUploader(uopCode);
                    break;
        
                 }
            });
        }else {
          alert("上传失败!");
        }

    
    }
	
})($);
//===============================================删除图片，仅提供思路，改变因实际拆页为准
function shanTu (obj) {
    $(obj).parent().remove();
    luj = "";
      $(".sc_close").each(function(){
            if (luj == "") {
                luj +=$(this).data('lj');
            }else{
                luj +=','+$(this).data('lj');
                }
          });
}



