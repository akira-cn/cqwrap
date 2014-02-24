define(function(require, exports, module){

var audio = cc.AudioEngine.getInstance();
var audio_enable = {effect: true, music: true};

var Audio = {
    preloadEffect: function(name){
        audio.preloadEffect(name);
    },
    preloadMusic: function(name){
        audio.preloadMusic(name);
    },
    playEffect: function(name){
        if(audio_enable.effect){
            audio.playEffect(name, false);
        }
    },
    playMusic: function(name){
        if(audio_enable.music){
            audio.playMusic(name, true);
        }
    },
    pauseMusic: function(name){
        audio.pauseMusic(name);
    },
    resumeMusic: function(name){
        audio.resumeMusic(name);
    },
    stopMusic: function(name){
        audio.stopMusic(name);
    },
    setEnable: function(enable){
        if(typeof enable !== 'object'){
            enable = {effect: enable, music: enable};
        }
        audio_enable = enable;
        
        if(audio_enable.music == false){
            audio.pauseAllEffects();
        }else{
            audio.resumeAllEffects();
        }
    }
};

module.exports = Audio;

});