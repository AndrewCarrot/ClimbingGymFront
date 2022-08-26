
export default function ClassScheduleTile(props){
    let data = props.data

    let groupLevel
    const startTimeInSecs = data.classTime[0]*3600 + data.classTime[1]*60
    const durationInSecs = data.duration[0]*3600 + data.duration[1]*60
    let begHour
    let endHour
    let groupAdvancementClassName


    if(data.type === 'ADVANCED') {
        groupLevel = 'Zaawansowani'
        groupAdvancementClassName = 'advanced'
    }
    else if(data.type === 'INTERMEDIATE') {
        groupLevel = 'Średnio Zaawansowani'
        groupAdvancementClassName = 'intermediate'
    }
    else if(data.type === 'BEGINNERS') {
        groupLevel = "Początkujący"
        groupAdvancementClassName = 'beginner'
    }else{
        groupLevel = "Dzieci"
        groupAdvancementClassName = 'children'
    }

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);


        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}

        return hours+':'+minutes;
    }

    begHour = startTimeInSecs.toString().toHHMMSS()
    endHour = (startTimeInSecs + durationInSecs).toString().toHHMMSS()

    return(
        <div className={`Tile ${groupAdvancementClassName}`}>
            <h1>{props.data.coach}</h1>
            <h2>{groupLevel + " (" +props.data.name + ")"}</h2>
            <h3>{begHour+"-"+endHour}</h3>
        </div>
    )
}