对config.json 做解释说明。

{
    "animation": [      所有动画
        {
            "container": ".item1",   容器名称
            "allAnimate": [{    item1的所有动画
                "animateWay": "to",动画类型
                "params": {
                    "autoAlpha": 1,
                    "delay": 5.3,
                    "onComplete":true   是否需要回调
                },
                "duration": 0.3,
                "onCompleteName":"itemEnd"  回调的方法名称
            }, {
                "animateWay": "fromTo",
                "params1": {
                    "rotation": "-3deg"
                },
                "params2": {
                    "rotation": "3deg",
                    "repeat": -1,
                    "yoyo": true
                },
                "duration": 0.2
            }]
        }
    ],
    "localEvent": [     
        {
            "originContainer": ".done",     被监听的容器名称
            "targets": [{                    
                "targetName": ".frame3", 目标容器
                "animateWay": "to",
                "params": {
                    "autoAlpha": 1
                },
                "duration": 0.5,
                "extendFun":"doneExtend"        扩展方法
            }],
            "eventName": "click",           事件类型
            "trackName": "DONE_BUTTON"      tracking命名
        },{
            "originContainer": ".frame3",
            "targets": [{
                "targetName": ".frame3",
                "animateWay": "to",
                "params": {
                    "autoAlpha": 0
                },
                "duration": 0.2
            }],
            "eventName": "click",
            "trackName": null
        }
    ]
}