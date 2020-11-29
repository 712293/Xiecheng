window.addEventListener('load', function() {
        banner();
        search();
    })
    // 轮播图
function banner() {
    //1.设置修改轮播图的页面结构
    //在开始的位置添加原始的最后一张图片
    //在结束的位置添加原始的第一张图片
    //1.1获取轮播图的结构
    var focus = document.querySelector('.focus');
    //1.2获取图片容器
    var ul = focus.children[0];
    //1.3获取第一张图片
    var first = ul.children[0];
    //1.4获取最后一张图片
    var last = ul.children[ul.children.length - 1];
    // console.log(first);
    // console.log(last);
    //克隆添加图片
    //1.5在尾插入两张图片 
    ul.appendChild(first.cloneNode(true));
    //1.6在首插入图片
    ul.insertBefore(last.cloneNode(true), ul.children[0]);
    //获取对应的样式
    //2.1获取li的位置
    var lis = ul.querySelectorAll('li');
    //2.2获取li元素的数量
    var count = lis.length;
    // 2.3获取focus的宽度
    var focusWidth = focus.offsetWidth;
    //2.4 设置容器宽度
    ul.style.width = count * focusWidth + 'px';
    //2.5设置每一个li的宽度
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = focusWidth + 'px';
    }
    //定义图片索引 ：图片已经有一个宽度的默认偏移
    var index = 1;
    //3.设置默认的偏移（让窗口显示第一张而不是克隆的第三张）
    ul.style.left = -focusWidth + 'px';
    /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize = function() {
            focusWidth = focus.offsetWidth + "px";
            ul.style.width = count * focusWidth + "px";
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.width = focusWidth + "px";
            }
            ul.style.left = -index * focusWidth + "px";
        }
        //自动轮播
    var timerId;

    function strtime() {
        timerId = setInterval(function() {
            index++;
            //添加过度效果
            ul.style.transition = 'left .5s';
            //设置偏移量
            ul.style.left = (-index * focusWidth) + 'px';
            setTimeout(function() {
                // 当位置走到最后一张时(克隆的第一张)，就让位置等于实际的第一张
                if (index == (count - 1)) {
                    index = 1;
                    //清除过度效果
                    ul.style.transition = 'none';
                    //偏移到指定的位置
                    ul.style.left = (-index * focusWidth) + 'px';
                }
            }, 500)
        }, 1500)
    }
    //自动播放
    strtime();
    //实现手动轮播
    var startX, moveX, distanceX;
    //为图片添加触摸事件--触摸开始
    var isEnd = true;
    ul.addEventListener('touchstart', function(e) {
        //停止定时器
        clearInterval(timerId);
        // console.log(e);
        startX = e.targetTouches[0].clientX;
    });
    //为图片添加触摸过程，滑动图片
    ul.addEventListener('touchmove', function(e) {
            if (isEnd == true) {
                // console.log(312);
                //记录手指滑动过程的位置
                moveX = e.targetTouches[0].clientX;
                // 计算坐标的差异
                distanceX = moveX - startX;
                // 清除过度效果
                ul.style.transition = 'none';
                // 在原有的轮播图位置上偏移
                ul.style.left = (-index * focusWidth + distanceX) + 'px';
            }
        })
        // 添加触摸结束事件
    ul.addEventListener('touchend', function(e) {
        // 获取滑动距离，并判断是否超过100px
        isEnd = false;
        if (Math.abs(distanceX) > 50) {
            // 判断滑动方向
            if (distanceX > 0) {
                //上一张
                index--;
            } else {
                //下一站
                index++;
            }
            // 过度效果
            ul.style.transition = 'left 0.5s';
            //偏移位置
            ul.style.left = -index * focusWidth + 'px';
        } else if (Math.abs(distanceX) > 0) {
            // 移动小于50回归原位置
            // 过度效果
            ul.style.transition = 'left 0.5s';
            //偏移位置
            ul.style.left = -index * focusWidth + 'px';
        }
        setTimeout(function() {
                isEnd = true;
                clearInterval(timerId);
                strtime();
            }, 100)
            //将上一次move所产生的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
    // TransitionEnd 当前元素过度效果执行完毕，会触发这个事件
    ul.addEventListener('transitionend', function() {
        // console.log(2222);
        //如果到了最后一张（count-1）,回到索引1
        //如果到了第一张（0），回到索引count-2
        if (index == (count - 1)) {
            index = 1;
            ul.style.transition = 'none';
            ul.style.left = -index * focusWidth + 'px';
        } else if (index == 0) {
            index = count - 2;
            ul.style.transition = 'none';
            ul.style.left = -index * focusWidth + 'px';
        }
        dots(index);
        setTimeout(function() {
            isEnd = true;
            clearInterval(timerId);
            strtime();
        }, 100)
    });

    function dots(index) {
        // 获取所有小圆点
        var lis = focus.children[1].querySelectorAll('li');
        // 去除所有小圆点里的 'current'类名
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('current');
        }
        // 让当前索引号的小li加上'current'
        lis[index - 1].classList.add('current');
    }
}
//搜索框
function search(){
    var search = document.querySelector('.search-index');
    window.addEventListener('scroll' ,function(){
        if(window.pageYOffset > search.offsetTop){
            search.style.background='rgb(255,255,255)';
        }else{
            search.style.background='rgb(0,0,0,0)';
        }
    })
}