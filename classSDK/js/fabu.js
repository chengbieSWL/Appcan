var luj="";
var videoId;
var coverUrl;
(function($) {
  
    
    
})($);
appcan.button("#chatVideo1", "btn-act",function() {
       actionsheetVideo("#chatVideo6","1");
});
function actionsheetVideo(id,cppIndex){
          
           
    uexWindow.cbActionSheet = function(opId,dataType,data){  
        switch(parseInt(data)){  
            case 0:  
                appcan.locStorage.setVal("check_is_closed","1");
                uexVideo.closePlayer();
                cameraVideo(id,cppIndex);  
                break;  
            case 1:  
                appcan.locStorage.setVal("check_is_closed","1");
                uexVideo.closePlayer();
                    videoBrowse(id,cppIndex);
                break;
        }
    }
    
        uexWindow.actionSheet("选择视频", "取消", ["照相机拍摄","选择视频"]); 
     
}
function videoBrowse(id,cppIndex){
                
    uexVideo.videoPicker();
    uexVideo.onVideoPickerClosed = function(data){
        if(data.isCancelled==false){
            uploadVideo(data.data[0].src,id,cppIndex);
        }
        
    };
      
}
function cameraVideo(id,cppIndex) {
     var params = {
        maxDuration:15,
        qualityType:0,
        bitRateType:0,
        fileType:"mp4"
    }
    uexVideo.record(JSON.stringify(params));
    uexVideo.onRecordFinish = function(info){
        info = JSON.parse(info);
        if(0==info.result){
             uploadVideo(info.path,id,cppIndex);
        }
    };
}

   
var uploadHttp =  basrUrl+'lujing';


function uploadVideo(fileSrc,id,cppIndex){
      var index = fileSrc.lastIndexOf(".");
      var ext = fileSrc.substr(index+1);
      if("mp4"!=ext && "MP4" !=ext && "MOV" !=ext){//此处兼容IOS
           alert("请选择mp4格式的文件，否则可能不能正常播放");
           return;
      }
      var uploader=uexUploaderMgr.create({
            url: uploadHttp,
            type: 1
        });
        if (uploader!=null){
            uexUploaderMgr.uploadFile(uploader,fileSrc,"imageField",1,640,function(packageSize, percent, responseString, status){
                switch (status) {
                    case 0:
                        //alert("上传包大小:"+packageSize+"<br>上传进度:"+percent+"%");
                        //$.toast("上传进度:"+percent+"%",'text');
                         $.showLoading("正在上传..."); 
                        break;
                    case 1:
                       responseString  = eval('(' + responseString + ')');
                      // alert(JSON.stringify(responseString))
                       //videoId = responseString.videoId;
                       if (responseString.tooBig) {
                           alert("视频文件禁止大于30M!")
                       } else{
                           $("#chatVideo1").text('重新上传');
                           luj = responseString.playUrl;
                            if (responseString.coverUrl) {
                                coverUrl = responseString.coverUrl;
                                $("#chatvideo1_").html('<div><video controls="controls" controlslist="nodownload" autoplay="false" width="100%" height="180" preload="none" poster="'+responseString.coverUrl+'"><source src="'+responseString.playUrl+'"></video></div>') 
                            } else{
                                coverUrl = ''
                                $("#chatvideo1_").html('<div><video controls="controls" controlslist="nodownload" autoplay="false" width="100%" height="180" preload="none" poster="imgs/sp33.png"><source src="'+responseString.playUrl+'"></video></div>') 
                            };
                       };
                        
                        $.hideLoading(); 
                        
                        break;
                    case 2:
                        alert("上传失败"); $.hideLoading(); 
                        break;
                }
            });
        }else {
          alert("上传失败!");
        }

    
    }
    


// function shanTu (obj) {
    // shiPtop();//删除后视频停止<img src="imgs/close1.png" width="10%" class="sc_close" onclick="shanTu(this)">
  // $(obj).parent().fadeOut("slow");
// }




