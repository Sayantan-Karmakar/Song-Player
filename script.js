console.log("Welcome to SKAR Musics")


//variables**************************************************************************

let index=0;
let previous=0;
let audioElement=new Audio('songs/music_0.mp3');
let masterPlay=document.getElementById('playSong');
let previousPlay=document.getElementById('prev');
let nextPlay=document.getElementById('next');
let loop=document.getElementById('loop');
let myProgressBar=document.getElementById('myProgress');
let songItems=Array.from(document.getElementsByClassName('songDetails'));
let flag=0;
let navbar=0;


//song list***********************************************************************************

let songs=[
    {songName:"Senorita",filePath:"songs/music_0.mp3",coverPath:"covers/1.jpg",songDuration:"03:11"},
    {songName:"Aashiyan",filePath:"song/music_1.mp3",coverPath:"covers/2.jpg",songDuration:"03:55"},
    {songName:"Ik Lamha",filePath:"song/music_2.mp3",coverPath:"covers/3.jpg",songDuration:"04:09"},
    {songName:"Gilehriyaan",filePath:"song/music_3.mp3",coverPath:"covers/4.jpg",songDuration:"03:22"},
    {songName:"Khulke Jeene Ka",filePath:"song/music_4.mp3",coverPath:"covers/5.jpg",songDuration:"03:23"}
]

let totalSongs=5;

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByClassName('songNameClass')[0].innerHTML=songs[i].songName;
    element.getElementsByClassName('songDuration')[0].innerHTML=" ("+songs[i].songDuration+")";
});

//functions*****************************************************************************************************

const currSong=()=>{
    currentSong=document.getElementById('currentSong');
    currentSong.innerHTML=songs[index].songName;
}

const songBanner=()=>{
    cover=document.getElementById('coverSource');
    cover.src=`covers/${index}.jpg`;
}

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('songButton')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
const makePlaySong=()=>{
    songIndex=document.getElementById(`${index}`);
    songIndex.classList.remove('fa-play');
    songIndex.classList.add('fa-pause');
}

const func=(playButton)=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        makePlaySong();
    }else{
        audioElement.pause();
        playButton.classList.add('fa-play');
        playButton.classList.remove('fa-pause');
        makeAllPlay();
    }
}

const checkSongIsFinish=()=>{
    if((audioElement.duration/audioElement.currentTime)==1){
        index=(index+1)%totalSongs;
        previous=index;
        songOnLoop(flag);
    }
}

const previousNext=(i)=>{
    index=i;
    previous=index;
    makeAllPlay();
    audioElement.src=`songs/music_${index}.mp3`;
    audioElement.play();
    makePlaySong();
}


//song on loop************************************************************************************************************************

const songOnLoop=(flag)=>{
    if(flag==1){
        index=(index-1)%totalSongs;
        previous=index;
    }
    makeAllPlay();
    audioElement.src=`songs/music_${index}.mp3`;
    audioElement.play();
    makePlaySong();
}

//master play button*********************************************************************************************

masterPlay.addEventListener('click',()=>{
    func(masterPlay);
    songBanner();
    currSong();
})

previousPlay.addEventListener('click',()=>{
    flag=0;
    document.getElementById('loop').style.color='#ffffff';
    makeAllPlay();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    songBanner();
    currSong();
    if(index==0){
        previousNext(totalSongs-1);
    }else{
        previousNext((index-1)%totalSongs);
    }
})

nextPlay.addEventListener('click',()=>{
    flag=0;
    document.getElementById('loop').style.color='#ffffff';
    makeAllPlay();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    songBanner();
    currSong();
    previousNext((index+1)%totalSongs);
})

loop.addEventListener('click',()=>{
    if(flag==0){
        flag=1;
        document.getElementById('loop').style.color='#00ff00';
    }else{
        flag=0;
        document.getElementById('loop').style.color='#ffffff';
    }
    func(masterPlay);
})

//time span bar*************************************************************************************************************

const timeSpan=()=>{
    document.getElementById('totalDuration').innerHTML=parseInt(audioElement.duration/60)+":"+parseInt(audioElement.duration%60);
    document.getElementById('songTimeUpdate').innerHTML=parseInt(audioElement.currentTime/60)+":"+parseInt(audioElement.currentTime%60);
}

audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    timeSpan();
    checkSongIsFinish();
    currSong();
    songBanner();
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=parseInt((myProgressBar.value*audioElement.duration)/100);
    timeSpan();
})


//play from list*******************************************************************************************************************************

Array.from(document.getElementsByClassName('songButton')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index=parseInt(e.target.id);
        currSong();
        songBanner();
        if(previous==index && !(audioElement.paused)){
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');  
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }else if(audioElement.paused && previous==index){
            audioElement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');  
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }else{
            flag=0;
            document.getElementById('loop').style.color='#ffffff';
            makeAllPlay();
            previous=index;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src=`songs/music_${index}.mp3`;  
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
    })
})

//navigation bar********************************************************************************************

const listOpen=()=>{
    if(navbar==0){
        navbar=1;
        document.getElementById('navbarIcon').classList.remove('fa-list');
        document.getElementById('navbarIcon').classList.add('fa-close');
        document.getElementById('songListId').style.display="block";
        document.getElementById('playFieldId').style.display="none";
    }else if(navbar==1){
        navbar=0;
        document.getElementById('navbarIcon').classList.add('fa-list');
        document.getElementById('navbarIcon').classList.remove('fa-close');
        document.getElementById('songListId').style.display="none";
        document.getElementById('playFieldId').style.display="flex";
    }
}

const showNavigation=()=>{
    let navigation=document.getElementById('navbar');
    navigation.style.display='inline';
    listOpen();
}

let myMediaQuary=window.matchMedia('(max-width:820px)');
let minWidth=window.matchMedia('(min-width:820px)');
const changeCallBack=(myMediaQuary)=>{
    if(myMediaQuary.matches || myMediaQuary>=minWidth){
        showNavigation();
    }
    else{
        let navigation=document.getElementById('navbar');
        navigation.style.display='none';
        document.getElementById('songListId').style.display="block";
        document.getElementById('playFieldId').style.display="flex";
    }
}
myMediaQuary.addEventListener('change',changeCallBack);
