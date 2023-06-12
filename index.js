const audioClips = [
    {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}]




function App() {

    const [volume, setVolume] = React.useState(1)
    const [recording, setRecording] = React.useState('')
    const [speed, setSpeed] = React.useState(1)
    
    const playRecording = () => {
        let index = 0;
        let recordArray = recording.split(" ")
        const interval = setInterval(() => {
            const audioTag = document.getElementById(recordArray[index])
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        index++;
        }, speed * 300)
        setTimeout(
            () => clearInterval(interval), 300 * speed * recordArray.length - 1
        )
    }

    return (
        <div class="bg-info min-vh-100 text-white">
            <div class="text-center">
                <h2>Drum Machine</h2>
                {audioClips.map(clip => (
                    <Pad key={clip.id} clip={clip} volume={volume} setRecording = {setRecording}/>
                ) )}
                <h4>Volume</h4>
                <input type="range" value={volume} onChange={((e) => setVolume(e.target.value))} class="w-50" step=".01" min="0" max="1"></input>
                <h4>{recording}</h4>
                {recording && (
                    <>
                <button onClick={playRecording} class="btn btn-success">play</button>
                <button onClick={() => setRecording("")} class="btn btn-danger">clear</button>
                <br />
                <h3>Speed</h3>
                <input type="range" value={speed} onChange={((e) => setSpeed(e.target.value))} class="w-50" step=".01" min="0.1" max="2"></input>
                    </>
                )}
            </div>
        </div>
    )
}
function Pad({clip, volume, setRecording}) {

    const [active, setActive] = React.useState(false)

    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    });

    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode) {
            playSound()
        }
    }
     
    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger)
        setActive(true)
        setTimeout(() => setActive(false), 200)
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording(prev => prev + clip.keyTrigger + " ")
    }
    return (
        <div onClick={playSound} class={`btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
            <audio class="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))