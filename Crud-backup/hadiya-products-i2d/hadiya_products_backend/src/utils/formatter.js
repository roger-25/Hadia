export class Formatter {
    static formatDate2Timestamp(date){
        if(date instanceof Date){
            const yyyy = date.getFullYear();
            const MM = +date.getMonth()+1;
            const dd = date.getDate();
            const hh = date.getHours();
            const mm = date.getMinutes();
            const ss = date.getSeconds();
            const ms = date.getMilliseconds();

            return `${yyyy}-${MM < 10 ? '0'+MM : MM}-${dd < 10 ? '0'+dd : dd}T${hh}:${mm < 10 ? '0'+mm : mm}:${ss < 10 ? '0'+ss : ss}.${ms}`
        }
        return date;
    }
}