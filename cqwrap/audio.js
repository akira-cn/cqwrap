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
        }else{
            this._music = name;
        }
    },
    pauseMusic: function(){
        if(audio_enable.music){
            audio.pauseMusic();
        }
    },
    resumeMusic: function(){
        if(audio_enable.music){
            audio.resumeMusic();
        }
    },
    stopMusic: function(){
        if(audio_enable.music){
            audio.stopMusic();
        }
    },
    isMusicPlaying: function(){
        return audio.isMusicPlaying();
    },
    setEnable: function(enable){
        if(typeof enable !== 'object'){
            enable = {effect: enable, music: enable};
        }
        audio_enable = enable;
        
        if(audio_enable.music == false){
            audio.stopMusic();
        }else{
            audio.playMusic(this._music);
        }
    }
};

module.exports = Audio;

});